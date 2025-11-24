<template>
  <div class="name-display">
    <div class="name-card card">
      <div class="name-card-header">
        <div class="name-icon">🎉</div>
        <h3 class="name-title">Your Team Name</h3>
      </div>
      <div class="name-content-wrapper">
        <div class="name-content">{{ name }}</div>
        <div class="name-decoration"></div>
      </div>
      <button @click="$emit('regenerate')" class="btn btn-secondary">
        <span>🔄</span>
        <span>Regenerate</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})

defineEmits(['regenerate'])
</script>

<style scoped>
.name-display {
  margin: 2.5rem 0;
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.name-card {
  text-align: center;
  padding: 3rem 2.5rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(236, 72, 153, 0.08) 100%);
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1), var(--shadow-lg);
  position: relative;
}

.name-card-header {
  margin-bottom: 2rem;
}

.name-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  display: inline-block;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.1);
  }
}

.name-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.name-content-wrapper {
  position: relative;
  margin-bottom: 2rem;
}

.name-content {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 50%, var(--accent-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 1.5rem 2rem;
  background-color: var(--bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  word-break: break-word;
  line-height: 1.3;
  position: relative;
  z-index: 1;
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.name-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
  border-radius: var(--radius-lg);
  z-index: 0;
  filter: blur(20px);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0.8;
  }
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-weight: 600;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-color: transparent;
}

@media (max-width: 768px) {
  .name-card {
    padding: 2rem 1.5rem;
  }

  .name-content {
    font-size: 1.75rem;
    padding: 1.25rem 1.5rem;
  }

  .name-icon {
    font-size: 3rem;
  }
}
</style>

