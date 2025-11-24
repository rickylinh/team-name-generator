<template>
  <div class="share-buttons">
    <div class="share-card card">
      <div class="share-header">
        <div class="share-icon-main">🔗</div>
        <h4 class="share-title">Share This Name</h4>
      </div>
      <div class="share-grid">
        <a
          :href="getTwitterShareUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="share-btn share-btn-twitter"
        >
          <span class="share-icon">🐦</span>
          <span>Twitter</span>
        </a>
        <a
          :href="getFacebookShareUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="share-btn share-btn-facebook"
        >
          <span class="share-icon">📘</span>
          <span>Facebook</span>
        </a>
        <a
          :href="getRedditShareUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="share-btn share-btn-reddit"
        >
          <span class="share-icon">🔴</span>
          <span>Reddit</span>
        </a>
        <button
          @click="copyToClipboard"
          class="share-btn share-btn-copy"
        >
          <span class="share-icon">📋</span>
          <span>{{ copied ? 'Copied!' : 'Copy Link' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  teamName: {
    type: String,
    required: true
  }
})

const copied = ref(false)

// Share text
const shareText = computed(() => {
  return `I just generated an awesome team name: ${props.teamName}! Try Team Name Generator now!`
})

// Share URL
const shareUrl = computed(() => {
  return encodeURIComponent(window.location.href)
})

// Twitter share link
const getTwitterShareUrl = computed(() => {
  const text = encodeURIComponent(shareText.value)
  return `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl.value}`
})

// Facebook share link
const getFacebookShareUrl = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php?u=${shareUrl.value}`
})

// Reddit share link
const getRedditShareUrl = computed(() => {
  const title = encodeURIComponent(`Team Name: ${props.teamName}`)
  return `https://reddit.com/submit?title=${title}&url=${shareUrl.value}`
})

/**
 * Copy link to clipboard
 */
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Copy failed:', err)
    // Fallback method
    const textArea = document.createElement('textarea')
    textArea.value = window.location.href
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.share-buttons {
  margin: 2.5rem 0;
  padding-top: 2.5rem;
  border-top: 2px dashed var(--border-color);
}

.share-card {
  padding: 2rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(236, 72, 153, 0.03) 100%);
}

.share-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.share-icon-main {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  display: inline-block;
}

.share-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.share-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
}

.share-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-white);
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.share-btn-twitter:hover {
  background-color: #1da1f2;
  color: white;
  border-color: #1da1f2;
}

.share-btn-facebook:hover {
  background-color: #1877f2;
  color: white;
  border-color: #1877f2;
}

.share-btn-reddit:hover {
  background-color: #ff4500;
  color: white;
  border-color: #ff4500;
}

.share-btn-copy:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.share-icon {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .share-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

