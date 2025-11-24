<template>
  <div class="app">
    <header class="header">
      <div class="header-background"></div>
      <div class="container">
        <div class="header-content">
          <div class="logo-wrapper">
            <div class="logo-icon">🏆</div>
            <h1 class="logo">Team Name Generator</h1>
          </div>
          <p class="subtitle">Find the Perfect Name for Your Team</p>
          <div class="header-decoration">
            <span class="decoration-dot"></span>
            <span class="decoration-dot"></span>
            <span class="decoration-dot"></span>
          </div>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <TeamNameGenerator />
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p class="footer-text">
          <span class="footer-icon">✨</span>
          Please keep your input family friendly
        </p>
        <div class="footer-links">
          <a href="#" class="footer-link" @click.prevent="showPrivacyInfo">Data and Privacy Information</a>
          <span class="footer-separator">|</span>
          <a href="#" class="footer-link" @click.prevent="showPrivacySettings">Change privacy settings</a>
        </div>
      </div>
    </footer>

    <!-- Privacy Modals -->
    <PrivacyModal 
      :is-open="showPrivacyModal" 
      @close="showPrivacyModal = false" 
    />
    <PrivacySettingsModal 
      :is-open="showPrivacySettingsModal" 
      @close="showPrivacySettingsModal = false"
      @open-privacy-info="openPrivacyFromSettings"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TeamNameGenerator from './components/TeamNameGenerator.vue'
import PrivacyModal from './components/PrivacyModal.vue'
import PrivacySettingsModal from './components/PrivacySettingsModal.vue'

const showPrivacyModal = ref(false)
const showPrivacySettingsModal = ref(false)

const showPrivacyInfo = () => {
  showPrivacyModal.value = true
}

const showPrivacySettings = () => {
  showPrivacySettingsModal.value = true
}

const openPrivacyFromSettings = () => {
  showPrivacySettingsModal.value = false
  setTimeout(() => {
    showPrivacyModal.value = true
  }, 300)
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

.header {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-light);
  padding: 3rem 0 2.5rem;
  text-align: center;
  overflow: hidden;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%);
  opacity: 0.5;
}

.header-content {
  position: relative;
  z-index: 1;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.logo-icon {
  font-size: 3rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.logo {
  font-size: 2.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 50%, var(--accent-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  font-weight: 400;
  margin-top: 0.5rem;
}

.header-decoration {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.decoration-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  animation: pulse 2s ease-in-out infinite;
}

.decoration-dot:nth-child(2) {
  animation-delay: 0.3s;
}

.decoration-dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.main {
  flex: 1;
  padding: 3rem 0 4rem;
}

.footer {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-light);
  padding: 2rem 0;
  text-align: center;
}

.footer-text {
  color: var(--text-secondary);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.footer-icon {
  font-size: 1rem;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-size: 0.875rem;
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.footer-link:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.footer-separator {
  color: var(--text-light);
  user-select: none;
}

@media (max-width: 768px) {
  .header {
    padding: 2rem 0 1.5rem;
  }

  .logo-wrapper {
    flex-direction: column;
    gap: 0.5rem;
  }

  .logo-icon {
    font-size: 2.5rem;
  }

  .logo {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .main {
    padding: 2rem 0 3rem;
  }
}
</style>

