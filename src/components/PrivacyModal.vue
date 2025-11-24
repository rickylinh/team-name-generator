<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Data and Privacy Information</h2>
          <button class="modal-close" @click="close" aria-label="Close">
            <span>×</span>
          </button>
        </div>
        
        <div class="modal-content">
          <div class="privacy-section">
            <p class="privacy-intro">
              We value your privacy and are committed to protecting your personal data. 
              This page explains what information we collect, how it is used, and your choices 
              regarding your data when using this website.
            </p>
          </div>

          <div class="privacy-section">
            <h3 class="privacy-heading">Information We Collect</h3>
            <p>We may collect the following types of information:</p>
            <ul class="privacy-list">
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent on the site, browser type, 
                device information, and general analytics data.
              </li>
              <li>
                <strong>Cookies:</strong> Small data files stored on your device to improve your 
                browsing experience and provide personalized content or ads.
              </li>
              <li>
                <strong>Voluntary Information:</strong> Any data you choose to submit through forms 
                (e.g., feedback, contact requests, or generator inputs).
              </li>
            </ul>
            <p>
              We do not collect sensitive personal information such as financial data, 
              identification numbers, or precise location unless explicitly provided by you.
            </p>
          </div>

          <div class="privacy-section">
            <h3 class="privacy-heading">How We Use Your Information</h3>
            <p>Your data may be used for:</p>
            <ul class="privacy-list">
              <li>Improving website performance and user experience</li>
              <li>Analytics and site functionality</li>
              <li>Displaying personalized or non-personalized ads</li>
              <li>Preventing abuse or security issues</li>
            </ul>
          </div>

          <div class="privacy-section">
            <h3 class="privacy-heading">Advertising and Third-Party Services</h3>
            <p>
              This website may use third-party services such as Google AdSense, Google Analytics, 
              or other advertising partners.
            </p>
            <p>These services may use cookies or tracking technologies to:</p>
            <ul class="privacy-list">
              <li>Measure ad performance</li>
              <li>Deliver more relevant ads</li>
              <li>Analyze aggregated, non-personal data</li>
            </ul>
            <p>
              You can learn more about how Google uses data here: 
              <a 
                href="https://policies.google.com/technologies/partner-sites" 
                target="_blank" 
                rel="noopener noreferrer"
                class="privacy-link"
              >
                "How Google uses information from sites or apps that use our services"
              </a>.
            </p>
          </div>

          <div class="privacy-section">
            <h3 class="privacy-heading">Your Choices</h3>
            <p>You may:</p>
            <ul class="privacy-list">
              <li>Disable cookies through your browser settings</li>
              <li>
                Opt out of personalized ads through 
                <a 
                  href="https://adssettings.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="privacy-link"
                >
                  Google's Ads Settings
                </a>
              </li>
              <li>Request the deletion of any personal information you voluntarily submitted</li>
            </ul>
          </div>

          <div class="privacy-section">
            <h3 class="privacy-heading">Data Protection</h3>
            <p>
              We take reasonable measures to safeguard your data and prevent unauthorized 
              access or misuse.
            </p>
          </div>

          <div class="privacy-section">
            <h3 class="privacy-heading">Contact</h3>
            <p>
              If you have questions about this privacy information or data usage, you may 
              contact us through the form provided on this website.
            </p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-primary" @click="close">I Understand</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

// Close on Escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    close()
  }
}

// Add/remove event listener based on modal state
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleEscape)
    // Prevent body scroll when modal is open
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
  max-width: 800px;
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
  line-height: 1.7;
}

.privacy-section {
  margin-bottom: 2rem;
}

.privacy-section:last-of-type {
  margin-bottom: 0;
}

.privacy-intro {
  font-size: 1.0625rem;
  color: var(--text-primary);
  margin-bottom: 0;
  line-height: 1.8;
}

.privacy-heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  margin-top: 0;
}

.privacy-section p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.9375rem;
}

.privacy-list {
  margin: 1rem 0;
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

.privacy-list li {
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
}

.privacy-list li strong {
  color: var(--text-primary);
  font-weight: 600;
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
  }

  .privacy-heading {
    font-size: 1.125rem;
  }
}
</style>

