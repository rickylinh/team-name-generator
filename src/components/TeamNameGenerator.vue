<template>
  <div class="generator-container">
    <div class="generator-card card">
      <div class="card-header">
        <div class="card-icon">✨</div>
        <h2 class="card-title">Generate Team Name</h2>
        <p class="card-description">Fill in the options below or use the random generator</p>
      </div>

      <!-- Input Form -->
      <form @submit.prevent="generateName" class="generator-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="color" class="form-label">
              <span class="label-icon">🎨</span>
              Color (Optional)
            </label>
            <input
              id="color"
              v-model="formData.color"
              type="text"
              class="input"
              placeholder="e.g., Red, Blue, Green"
            />
          </div>

          <div class="form-group">
            <label for="adjective" class="form-label">
              <span class="label-icon">⚡</span>
              Adjective (Optional)
            </label>
            <input
              id="adjective"
              v-model="formData.adjective"
              type="text"
              class="input"
              placeholder="e.g., Mighty, Swift, Brave"
            />
          </div>

          <div class="form-group">
            <label for="place" class="form-label">
              <span class="label-icon">📍</span>
              Place (Optional)
            </label>
            <input
              id="place"
              v-model="formData.place"
              type="text"
              class="input"
              placeholder="e.g., New York, Mountain"
            />
          </div>

          <div class="form-group">
            <label for="animal" class="form-label">
              <span class="label-icon">🦁</span>
              Animal (Optional)
            </label>
            <input
              id="animal"
              v-model="formData.animal"
              type="text"
              class="input"
              placeholder="e.g., Panthers, Eagles"
            />
          </div>

          <div class="form-group">
            <label for="people" class="form-label">
              <span class="label-icon">👥</span>
              Group of People (Optional)
            </label>
            <input
              id="people"
              v-model="formData.people"
              type="text"
              class="input"
              placeholder="e.g., Cowboys, Warriors"
            />
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            <span>Generate Name</span>
            <span class="btn-icon">→</span>
          </button>
          <button
            type="button"
            @click="generateRandom"
            class="btn btn-random"
          >
            <span>🎲</span>
            <span>Go Random!</span>
          </button>
        </div>
      </form>

      <!-- Generated Names Display -->
      <div v-if="generatedNames.length > 0" class="names-display-section">
        <div class="names-header">
          <h3 class="names-title">Generated Team Names</h3>
          <p class="names-count">{{ generatedNames.length }} names generated</p>
        </div>
        <div class="names-grid">
          <div
            v-for="(name, index) in generatedNames"
            :key="index"
            class="name-item"
            :class="{ 'name-item-featured': index === 0 }"
            @click="selectName(name)"
          >
            <div class="name-item-number">{{ index + 1 }}</div>
            <div class="name-item-text">{{ name }}</div>
            <button
              class="name-item-copy"
              @click.stop="copyName(name)"
              :title="copiedIndex === index ? 'Copied!' : 'Copy name'"
            >
              {{ copiedIndex === index ? '✓' : '📋' }}
            </button>
          </div>
        </div>
        <div class="names-actions">
          <button @click="generateName" class="btn btn-secondary">
            <span>🔄</span>
            <span>Generate More</span>
          </button>
        </div>
      </div>

      <!-- Social Share -->
      <ShareButtons
        v-if="selectedName"
        :team-name="selectedName"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ShareButtons from './ShareButtons.vue'
import { generateMultipleNames, generateRandomTeamName } from '../utils/nameGenerator'

// Form data
const formData = reactive({
  color: '',
  adjective: '',
  place: '',
  animal: '',
  people: ''
})

// Generated names (at least 15)
const generatedNames = ref([])
const selectedName = ref('')
const copiedIndex = ref(-1)

/**
 * Generate multiple team names (at least 15)
 */
const generateName = () => {
  generatedNames.value = generateMultipleNames(15, formData)
  selectedName.value = generatedNames.value[0] || ''
}

/**
 * Random generate team names
 */
const generateRandom = () => {
  // Clear form
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
  // Generate 15 random names
  generatedNames.value = generateMultipleNames(15, null)
  selectedName.value = generatedNames.value[0] || ''
}

/**
 * Select a name
 */
const selectName = (name) => {
  selectedName.value = name
}

/**
 * Copy name to clipboard
 */
const copyName = async (name) => {
  try {
    await navigator.clipboard.writeText(name)
    const index = generatedNames.value.indexOf(name)
    copiedIndex.value = index
    setTimeout(() => {
      copiedIndex.value = -1
    }, 2000)
  } catch (err) {
    console.error('Copy failed:', err)
    // Fallback
    const textArea = document.createElement('textarea')
    textArea.value = name
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    const index = generatedNames.value.indexOf(name)
    copiedIndex.value = index
    setTimeout(() => {
      copiedIndex.value = -1
    }, 2000)
  }
}
</script>

<style scoped>
.generator-container {
  max-width: 900px;
  margin: 0 auto;
}

.generator-card {
  padding: 3rem;
}

.card-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.card-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  display: inline-block;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.card-title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
}

.card-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.generator-form {
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.75rem;
  margin-bottom: 2.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label-icon {
  font-size: 1.25rem;
}

.input {
  transition: all 0.3s ease;
}

.input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  color: white;
  box-shadow: var(--shadow-md);
  min-width: 180px;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-color) 100%);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.btn-icon {
  margin-left: 0.5rem;
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-icon {
  transform: translateX(4px);
}

.btn-random {
  min-width: 180px;
}

/* Names Display Section */
.names-display-section {
  margin: 3rem 0;
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

.names-header {
  text-align: center;
  margin-bottom: 2rem;
}

.names-title {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 50%, var(--accent-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.names-count {
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.names-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.name-item {
  position: relative;
  background: var(--bg-white);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.25rem 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100px;
  justify-content: center;
}

.name-item:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
}

.name-item-featured {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(236, 72, 153, 0.08) 100%);
  box-shadow: var(--shadow-md);
}

.name-item-number {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  background: var(--bg-light);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name-item-featured .name-item-number {
  background: var(--primary-color);
  color: white;
}

.name-item-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  word-break: break-word;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name-item-featured .name-item-text {
  font-size: 1.125rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.name-item-copy {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10;
}

.name-item:hover .name-item-copy {
  opacity: 1;
}

.name-item-copy:hover {
  transform: scale(1.2);
}

.names-actions {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .generator-card {
    padding: 2rem 1.5rem;
  }

  .card-icon {
    font-size: 2.5rem;
  }

  .card-title {
    font-size: 1.75rem;
  }

  .card-description {
    font-size: 1rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .btn {
    width: 100%;
  }

  .names-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
  }

  .name-item {
    padding: 1rem 0.75rem;
    min-height: 80px;
  }

  .name-item-text {
    font-size: 0.875rem;
  }

  .name-item-featured .name-item-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .names-grid {
    grid-template-columns: 1fr;
  }
}
</style>

