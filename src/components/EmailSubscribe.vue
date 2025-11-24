<template>
  <div class="email-subscribe">
    <div class="subscribe-card card">
      <div class="subscribe-header">
        <div class="subscribe-icon">📧</div>
        <h4 class="subscribe-title">Stay Updated</h4>
        <p class="subscribe-description">
          Want to know when our app and card game go live? Enter your email address (optional)
        </p>
      </div>
      <form @submit.prevent="handleSubscribe" class="subscribe-form">
        <input
          v-model="email"
          type="email"
          class="input"
          placeholder="your.email@example.com"
        />
        <button type="submit" class="btn btn-secondary">
          <span>Subscribe</span>
        </button>
      </form>
      <p v-if="subscribed" class="subscribe-success">
        <span class="success-icon">✓</span>
        <span>Subscribed successfully! We'll notify you soon.</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

/**
 * 处理邮件订阅
 * 注意：这是一个纯前端应用，实际项目中需要连接后端API
 */
const handleSubscribe = () => {
  if (email.value && isValidEmail(email.value)) {
    // 这里可以添加实际的订阅逻辑
    console.log('订阅邮箱:', email.value)
    subscribed.value = true
    email.value = ''
    
    // 3秒后重置状态
    setTimeout(() => {
      subscribed.value = false
    }, 3000)
  }
}

/**
 * 验证邮箱格式
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
</script>

<style scoped>
.email-subscribe {
  margin: 2.5rem 0;
  padding-top: 2.5rem;
  border-top: 2px dashed var(--border-color);
}

.subscribe-card {
  padding: 2rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(236, 72, 153, 0.03) 100%);
}

.subscribe-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.subscribe-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  display: inline-block;
}

.subscribe-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subscribe-description {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

.subscribe-form {
  display: flex;
  gap: 0.75rem;
  max-width: 500px;
  margin: 0 auto;
}

.subscribe-form .input {
  flex: 1;
  font-size: 1rem;
}

.subscribe-form .btn {
  white-space: nowrap;
  font-weight: 600;
}

.subscribe-success {
  margin-top: 1.25rem;
  text-align: center;
  color: var(--success-color);
  font-size: 0.9375rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: var(--radius-md);
}

.success-icon {
  font-size: 1.25rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .subscribe-card {
    padding: 1.5rem;
  }

  .subscribe-form {
    flex-direction: column;
  }

  .subscribe-form .btn {
    width: 100%;
  }
}
</style>

