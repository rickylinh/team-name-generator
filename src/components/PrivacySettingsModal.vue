<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Change Privacy Settings</h2>
          <button class="modal-close" @click="close" aria-label="Close">
            <span>×</span>
          </button>
        </div>
        
        <div class="modal-content">
          <div class="settings-intro">
            <p>
              Manage how your personal data is collected and used on this website.
            </p>
          </div>

          <div class="settings-section">
            <div class="setting-item">
              <div class="setting-header">
                <h3 class="setting-title">Essential Cookies</h3>
                <label class="toggle-switch">
                  <input type="checkbox" checked disabled />
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <p class="setting-description">
                Required for core site functionality. These cannot be disabled.
              </p>
            </div>

            <div class="setting-item">
              <div class="setting-header">
                <h3 class="setting-title">Analytics Cookies</h3>
                <label class="toggle-switch">
                  <input 
                    type="checkbox" 
                    v-model="settings.analytics"
                    @change="saveSettings"
                  />
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <p class="setting-description">
                Allow us to measure site performance and improve user experience.
              </p>
            </div>

            <div class="setting-item">
              <div class="setting-header">
                <h3 class="setting-title">Advertising Cookies</h3>
                <label class="toggle-switch">
                  <input 
                    type="checkbox" 
                    v-model="settings.advertising"
                    @change="saveSettings"
                  />
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <p class="setting-description">
                Enable personalized ads and third-party ad services.
              </p>
            </div>
          </div>

          <div class="settings-section">
            <h3 class="section-title">Data Processing Preferences</h3>
            <p class="section-description">
              Control whether your information may be used for personalization, service improvement, or marketing purposes.
            </p>
            
            <div class="preference-item">
              <label class="preference-label">
                <input 
                  type="checkbox" 
                  v-model="settings.personalization"
                  @change="saveSettings"
                  class="preference-checkbox"
                />
                <span class="preference-text">Allow personalization</span>
              </label>
            </div>

            <div class="preference-item">
              <label class="preference-label">
                <input 
                  type="checkbox" 
                  v-model="settings.serviceImprovement"
                  @change="saveSettings"
                  class="preference-checkbox"
                />
                <span class="preference-text">Allow service improvement</span>
              </label>
            </div>

            <div class="preference-item">
              <label class="preference-label">
                <input 
                  type="checkbox" 
                  v-model="settings.marketing"
                  @change="saveSettings"
                  class="preference-checkbox"
                />
                <span class="preference-text">Allow marketing purposes</span>
              </label>
            </div>
          </div>

          <div class="settings-section">
            <div class="withdraw-section">
              <h3 class="section-title">Withdraw Consent</h3>
              <p class="section-description">
                You may change or withdraw your consent at any time. Your updated settings will apply immediately.
              </p>
              <button class="btn btn-secondary withdraw-btn" @click="withdrawConsent">
                Withdraw All Consent
              </button>
            </div>
          </div>

          <div class="settings-footer-note">
            <p>
              For more details, please review our 
              <a href="#" @click.prevent="openPrivacyInfo" class="privacy-link">Privacy Policy</a>.
            </p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="close">Cancel</button>
          <button class="btn btn-primary" @click="saveAndClose">Save Settings</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'openPrivacyInfo'])

// Settings state
const settings = ref({
  analytics: true,
  advertising: true,
  personalization: true,
  serviceImprovement: true,
  marketing: false
})

// Load settings from localStorage
const loadSettings = () => {
  const saved = localStorage.getItem('privacySettings')
  if (saved) {
    try {
      settings.value = { ...settings.value, ...JSON.parse(saved) }
    } catch (e) {
      console.error('Failed to load privacy settings:', e)
    }
  }
}

// Save settings to localStorage
const saveSettings = () => {
  localStorage.setItem('privacySettings', JSON.stringify(settings.value))
}

// Withdraw all consent
const withdrawConsent = () => {
  settings.value = {
    analytics: false,
    advertising: false,
    personalization: false,
    serviceImprovement: false,
    marketing: false
  }
  saveSettings()
}

// Save and close
const saveAndClose = () => {
  saveSettings()
  close()
}

// Open privacy info
const openPrivacyInfo = () => {
  emit('openPrivacyInfo')
}

const close = () => {
  emit('close')
}

// Close on Escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    close()
  }
}

// Load settings when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    loadSettings()
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-container {
  background: var(--bg-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.modal-close {
  background: transparent;
  border: none;
  font-size: 2rem;
  color: var(--text-secondary);
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  line-height: 1;
}

.modal-close:hover {
  background: var(--bg-light);
  color: var(--text-primary);
  transform: rotate(90deg);
}

.modal-content {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
}

.settings-intro {
  margin-bottom: 2rem;
}

.settings-intro p {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

.settings-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-light);
}

.settings-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
}

.setting-item {
  margin-bottom: 1.5rem;
}

.setting-item:last-child {
  margin-bottom: 0;
}

.setting-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.setting-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.setting-description {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-color);
  transition: 0.3s;
  border-radius: 26px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
}

.toggle-switch input:checked + .toggle-slider {
  background-color: var(--primary-color);
}

.toggle-switch input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

.toggle-switch input:disabled + .toggle-slider {
  background-color: var(--text-light);
  cursor: not-allowed;
  opacity: 0.6;
}

.toggle-switch input:focus + .toggle-slider {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* Section Title */
.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  margin-top: 0;
}

.section-description {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Preference Items */
.preference-item {
  margin-bottom: 1rem;
}

.preference-item:last-child {
  margin-bottom: 0;
}

.preference-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  transition: background 0.2s ease;
}

.preference-label:hover {
  background: var(--bg-light);
}

.preference-checkbox {
  width: 18px;
  height: 18px;
  margin-right: 0.75rem;
  cursor: pointer;
  accent-color: var(--primary-color);
}

.preference-text {
  font-size: 0.9375rem;
  color: var(--text-primary);
  font-weight: 500;
}

/* Withdraw Section */
.withdraw-section {
  background: var(--bg-light);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
}

.withdraw-btn {
  margin-top: 1rem;
}

/* Footer Note */
.settings-footer-note {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
  text-align: center;
}

.settings-footer-note p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.privacy-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.privacy-link:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
    margin: 0.5rem;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .modal-footer {
    padding: 1rem 1.5rem;
    flex-direction: column-reverse;
  }

  .modal-footer .btn {
    width: 100%;
  }

  .section-title {
    font-size: 1.125rem;
  }
}
</style>

