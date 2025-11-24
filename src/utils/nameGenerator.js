/**
 * Team Name Generator Utility Functions
 * Provides custom generation and random generation modes
 */

// Preset word bank
const wordBank = {
  colors: [
    'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Black', 'White',
    'Gold', 'Silver', 'Crimson', 'Navy', 'Emerald', 'Azure', 'Scarlet', 'Teal',
    'Violet', 'Indigo', 'Amber', 'Coral', 'Lime', 'Magenta', 'Turquoise', 'Maroon'
  ],
  adjectives: [
    'Mighty', 'Swift', 'Brave', 'Agile', 'Fierce', 'Bold', 'Elite', 'Supreme',
    'Storm', 'Thunder', 'Fire', 'Ice', 'Lightning', 'Steel', 'Golden', 'Diamond',
    'Royal', 'Champion', 'Legendary', 'Mythic', 'Peak', 'Glory', 'Victory', 'Conquer',
    'Wild', 'Savage', 'Noble', 'Proud', 'Stalwart', 'Valiant', 'Dauntless', 'Invincible'
  ],
  places: [
    'New York', 'Los Angeles', 'Chicago', 'Mountain', 'Valley', 'Ocean', 'Forest', 'Desert',
    'City', 'Island', 'River', 'Lake', 'Plains', 'Highland', 'Coast', 'Bay',
    'East', 'West', 'North', 'South', 'Central', 'Edge', 'Peak', 'Summit',
    'Brooklyn', 'Manhattan', 'Queens', 'Bronx', 'Phoenix', 'Denver', 'Seattle', 'Portland'
  ],
  animals: [
    'Eagles', 'Tigers', 'Panthers', 'Lions', 'Wolves', 'Cheetahs', 'Bears', 'Sharks',
    'Dragons', 'Phoenix', 'Hawks', 'Falcons', 'Ravens', 'Wolves', 'Bulls', 'Stallions',
    'Rhinos', 'Elephants', 'Jaguars', 'Cobras', 'Vipers', 'Stallions', 'Mustangs', 'Thunder',
    'Lightning', 'Storm', 'Blaze', 'Fury', 'Rage', 'Thunder', 'Blizzard', 'Tornado'
  ],
  people: [
    'Warriors', 'Knights', 'Heroes', 'Champions', 'Kings', 'Leaders', 'Pioneers', 'Elite',
    'Cowboys', 'Pirates', 'Samurai', 'Ninjas', 'Gladiators', 'Spartans', 'Vikings', 'Crusaders',
    'Guardians', 'Conquerors', 'Explorers', 'Trailblazers', 'Defenders', 'Fighters', 'Hunters', 'Rangers',
    'Rebels', 'Outlaws', 'Mavericks', 'Renegades', 'Legends', 'Masters', 'Lords', 'Titans'
  ]
}

/**
 * Get a random item from an array
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Get multiple random unique items from an array
 */
function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, array.length))
}

/**
 * Find similar word in word bank (fuzzy matching)
 */
function findSimilarWord(input, wordList) {
  const inputLower = input.toLowerCase().trim()
  
  // Exact match
  const exactMatch = wordList.find(w => w.toLowerCase() === inputLower)
  if (exactMatch) return exactMatch
  
  // Contains match
  const containsMatch = wordList.find(w => 
    w.toLowerCase().includes(inputLower) || inputLower.includes(w.toLowerCase())
  )
  if (containsMatch) return containsMatch
  
  // Return random from list if no match
  return getRandomItem(wordList)
}

/**
 * Get semantic associations for colors - returns related words from wordBank
 */
function getColorAssociations(color) {
  const colorLower = color.toLowerCase()
  
  // Map colors to related adjectives from wordBank
  const colorAdjectiveMap = {
    red: ['Fire', 'Storm', 'Thunder', 'Fierce', 'Bold'],
    blue: ['Storm', 'Thunder', 'Steel', 'Noble', 'Royal'],
    green: ['Wild', 'Nature', 'Swift', 'Agile', 'Brave'],
    yellow: ['Golden', 'Lightning', 'Fire', 'Bold', 'Royal'],
    black: ['Steel', 'Dark', 'Fierce', 'Bold', 'Noble'],
    white: ['Pure', 'Light', 'Noble', 'Royal', 'Elite'],
    purple: ['Royal', 'Noble', 'Mythic', 'Supreme', 'Elite'],
    orange: ['Fire', 'Storm', 'Bold', 'Fierce', 'Wild']
  }
  
  // Find matching color and return related adjectives
  for (const [key, adjectives] of Object.entries(colorAdjectiveMap)) {
    if (colorLower.includes(key) || key.includes(colorLower)) {
      // Filter to only include adjectives that exist in wordBank
      return adjectives.filter(adj => 
        wordBank.adjectives.some(w => w.toLowerCase() === adj.toLowerCase())
      )
    }
  }
  
  // Default: return strong adjectives from wordBank
  return ['Mighty', 'Brave', 'Elite', 'Royal', 'Supreme'].filter(adj =>
    wordBank.adjectives.some(w => w.toLowerCase() === adj.toLowerCase())
  )
}

/**
 * Generate team name based on user input with intelligent associations
 * @param {Object} formData - User input form data
 * @returns {string} Generated team name
 */
export function generateTeamName(formData) {
  const userInputs = {
    color: formData.color?.trim() || '',
    adjective: formData.adjective?.trim() || '',
    place: formData.place?.trim() || '',
    animal: formData.animal?.trim() || '',
    people: formData.people?.trim() || ''
  }
  
  // Count how many fields user filled
  const filledFields = Object.values(userInputs).filter(v => v.length > 0).length
  
  // If user didn't input anything, use random generation
  if (filledFields === 0) {
    return generateRandomTeamName()
  }
  
  const parts = []
  const usedTypes = new Set()
  
  // Process user inputs and add to parts
  if (userInputs.color) {
    const color = findSimilarWord(userInputs.color, wordBank.colors)
    parts.push(color)
    usedTypes.add('color')
    
    // Add semantic association for colors
    const associations = getColorAssociations(userInputs.color)
    if (associations.length > 0 && Math.random() > 0.5) {
      parts.push(getRandomItem(associations))
      usedTypes.add('adjective')
    }
  }
  
  if (userInputs.adjective) {
    const adj = findSimilarWord(userInputs.adjective, wordBank.adjectives)
    parts.push(adj)
    usedTypes.add('adjective')
  }
  
  if (userInputs.place) {
    const place = findSimilarWord(userInputs.place, wordBank.places)
    parts.push(place)
    usedTypes.add('place')
  }
  
  if (userInputs.animal) {
    const animal = findSimilarWord(userInputs.animal, wordBank.animals)
    parts.push(animal)
    usedTypes.add('animal')
  }
  
  if (userInputs.people) {
    const people = findSimilarWord(userInputs.people, wordBank.people)
    parts.push(people)
    usedTypes.add('people')
  }
  
  // Intelligent completion: add missing parts to create a complete name
  // Target: 2-3 parts for a good team name
  const targetParts = filledFields === 1 ? 2 : (filledFields === 2 ? 2 : 3)
  const neededParts = Math.max(0, targetParts - parts.length)
  
  if (neededParts > 0) {
    const availableTypes = ['color', 'adjective', 'place', 'animal', 'people']
      .filter(type => !usedTypes.has(type))
    
    // Priority order for completion
    const priorityOrder = ['animal', 'people', 'adjective', 'place', 'color']
    const typesToAdd = priorityOrder.filter(type => availableTypes.includes(type))
    
    // Add complementary parts
    for (let i = 0; i < neededParts && i < typesToAdd.length; i++) {
      const type = typesToAdd[i]
      const randomWord = getRandomItem(wordBank[type + 's'])
      parts.push(randomWord)
    }
  }
  
  // Ensure we have at least 2 parts
  if (parts.length === 1) {
    // If only one part, add a complementary part
    if (usedTypes.has('color') || usedTypes.has('adjective')) {
      // Add animal or people
      parts.push(getRandomItem([...wordBank.animals, ...wordBank.people]))
    } else {
      // Add adjective
      parts.push(getRandomItem(wordBank.adjectives))
    }
  }
  
  // Combine name parts (limit to 3 parts max for readability)
  const finalParts = parts.slice(0, 3)
  let name = finalParts.join(' ')
  
  // Capitalize first letter of each word
  name = name.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }).join(' ')
  
  return name
}

/**
 * Generate random team name
 * @returns {string} Randomly generated team name
 */
export function generateRandomTeamName() {
  // Randomly select 2-3 parts to combine
  const partCount = Math.floor(Math.random() * 2) + 2 // 2 or 3 parts
  
  const selectedParts = []
  
  // Randomly select different types of words
  const types = ['colors', 'adjectives', 'places', 'animals', 'people']
  const selectedTypes = getRandomItems(types, partCount)
  
  selectedTypes.forEach(type => {
    selectedParts.push(getRandomItem(wordBank[type]))
  })
  
  // Combine name
  let name = ''
  if (selectedParts.length === 2) {
    name = `${selectedParts[0]} ${selectedParts[1]}`
  } else {
    name = `${selectedParts[0]} ${selectedParts[1]} ${selectedParts[2]}`
  }
  
  // Capitalize first letter of each word
  name = name.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }).join(' ')
  
  return name
}

/**
 * Generate multiple team names with variations
 * @param {number} count - Number of names to generate (minimum 15)
 * @param {Object} formData - Optional form data (if provided, generates variants based on it)
 * @returns {string[]} Array of generated team names
 */
export function generateMultipleNames(count = 15, formData = null) {
  const names = []
  const seen = new Set()
  const minCount = Math.max(15, count) // Ensure at least 15 names
  
  // Generate more attempts to ensure we get enough unique names
  const maxAttempts = minCount * 3
  
  for (let i = 0; i < maxAttempts; i++) {
    let name
    if (formData) {
      // Generate variant based on user input
      const variant = { ...formData }
      
      // Vary the input: sometimes keep all, sometimes clear some fields
      const filledFields = Object.values(variant).filter(v => v && v.trim()).length
      
      if (filledFields > 0) {
        // Randomly clear 0 to filledFields-1 fields to create variations
        const clearCount = Math.floor(Math.random() * filledFields)
        const keys = Object.keys(variant).filter(k => variant[k] && variant[k].trim())
        const keysToClear = getRandomItems(keys, clearCount)
        keysToClear.forEach(key => {
          variant[key] = ''
        })
      }
      
      name = generateTeamName(variant)
    } else {
      name = generateRandomTeamName()
    }
    
    // Add name if unique
    if (!seen.has(name) && name.length > 0) {
      seen.add(name)
      names.push(name)
      if (names.length >= minCount) {
        break
      }
    }
  }
  
  // If we still don't have enough, fill with random names
  while (names.length < minCount) {
    const randomName = generateRandomTeamName()
    if (!seen.has(randomName)) {
      seen.add(randomName)
      names.push(randomName)
    }
  }
  
  return names.slice(0, minCount)
}
