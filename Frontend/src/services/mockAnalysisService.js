// Mock ingredient analysis service for PastPick

// Database of common toothpaste ingredients with their analysis
const ingredientDatabase = {
  // Safe ingredients (7-10 score)
  'potassium nitrate': {
    name: 'Potassium Nitrate',
    score: 9.2,
    category: 'beneficial',
    purpose: 'Desensitizing agent',
    description: 'Helps reduce tooth sensitivity by blocking pain signals to nerves',
    concerns: [],
    benefits: ['Reduces sensitivity', 'Clinically proven', 'FDA approved'],
    impact: 'positive'
  },
  'sodium fluoride': {
    name: 'Sodium Fluoride',
    score: 9.0,
    category: 'beneficial',
    purpose: 'Anticavity agent',
    description: 'Prevents tooth decay and strengthens enamel',
    concerns: [],
    benefits: ['Prevents cavities', 'Strengthens enamel', 'ADA recommended'],
    impact: 'positive'
  },
  'calcium carbonate': {
    name: 'Calcium Carbonate',
    score: 8.8,
    category: 'beneficial',
    purpose: 'Natural abrasive',
    description: 'Natural mineral that gently removes plaque and stains',
    concerns: [],
    benefits: ['Natural ingredient', 'Gentle cleaning', 'Whitening effect'],
    impact: 'positive'
  },
  'xylitol': {
    name: 'Xylitol',
    score: 9.5,
    category: 'beneficial',
    purpose: 'Natural sweetener',
    description: 'Natural sugar alcohol that helps prevent cavities',
    concerns: [],
    benefits: ['Prevents cavities', 'Natural sweetener', 'Reduces bacteria'],
    impact: 'positive'
  },

  // Moderate ingredients (5-6.9 score)
  'hydrated silica': {
    name: 'Hydrated Silica',
    score: 7.2,
    category: 'moderate',
    purpose: 'Mild abrasive',
    description: 'Helps remove plaque and surface stains gently',
    concerns: ['May be too abrasive with excessive use'],
    benefits: ['Effective cleaning', 'Whitening properties'],
    impact: 'neutral'
  },
  'titanium dioxide': {
    name: 'Titanium Dioxide',
    score: 6.5,
    category: 'concerning',
    purpose: 'Whitening agent',
    description: 'Provides whitening and opacity to toothpaste',
    concerns: ['Potential respiratory irritant', 'Under regulatory review', 'May cause inflammation'],
    benefits: ['Whitening effect', 'Color enhancement'],
    impact: 'negative'
  },

  // Concerning ingredients (3-4.9 score)
  'sodium lauryl sulfate': {
    name: 'Sodium Lauryl Sulfate (SLS)',
    score: 4.2,
    category: 'concerning',
    purpose: 'Foaming agent',
    description: 'Creates foam and helps distribute toothpaste',
    concerns: ['May cause mouth ulcers', 'Can irritate sensitive gums', 'Strips natural protective oils', 'May worsen canker sores'],
    benefits: ['Creates satisfying foam', 'Helps cleaning action'],
    impact: 'negative'
  },
  'triclosan': {
    name: 'Triclosan',
    score: 3.8,
    category: 'concerning',
    purpose: 'Antibacterial agent',
    description: 'Antimicrobial agent used to prevent plaque',
    concerns: ['Potential hormone disruption', 'Antibiotic resistance concerns', 'Environmental impact', 'Banned in some countries'],
    benefits: ['Antibacterial properties', 'Reduces plaque'],
    impact: 'negative'
  },
  'artificial colors': {
    name: 'Artificial Colors',
    score: 4.0,
    category: 'concerning',
    purpose: 'Coloring agent',
    description: 'Synthetic dyes to make toothpaste visually appealing',
    concerns: ['No oral health benefit', 'Potential allergic reactions', 'Unnecessary chemical exposure'],
    benefits: ['Aesthetic appeal'],
    impact: 'negative'
  },

  // Common synonyms and abbreviations
  'sls': 'sodium lauryl sulfate',
  'sodium fluoride 0.24%': 'sodium fluoride',
  'calcium carbonate precipitated': 'calcium carbonate'
}

// Parse ingredient text and normalize names
export const parseIngredients = (ingredientText) => {
  if (!ingredientText) return []
  
  // Remove common prefixes
  let cleanText = ingredientText.toLowerCase()
    .replace(/^(ingredients|ainesosat|inhaltsstoffe):\s*/i, '')
    .replace(/\([^)]*\)/g, '') // Remove parentheses content
  
  // Split by common separators
  const ingredients = cleanText
    .split(/[,;.]/)
    .map(ingredient => ingredient.trim())
    .filter(ingredient => ingredient.length > 2)
    .map(ingredient => {
      // Handle common synonyms
      const normalized = ingredient.toLowerCase()
      return ingredientDatabase[normalized] ? normalized : ingredient
    })
  
  return ingredients
}

// Analyze a single ingredient
const analyzeIngredient = (ingredientName) => {
  const normalizedName = ingredientName.toLowerCase().trim()
  
  // Check if ingredient exists in database
  if (ingredientDatabase[normalizedName]) {
    return ingredientDatabase[normalizedName]
  }
  
  // For unknown ingredients, provide generic analysis
  return {
    name: ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1),
    score: 6.5, // Neutral score for unknown ingredients
    category: 'unknown',
    purpose: 'Not identified',
    description: 'This ingredient is not in our database. Consider researching it independently.',
    concerns: ['Unknown safety profile'],
    benefits: ['Function not determined'],
    impact: 'neutral'
  }
}

// Calculate overall score based on ingredients
const calculateOverallScore = (analyzedIngredients) => {
  if (analyzedIngredients.length === 0) return 5.0
  
  let weightedSum = 0
  let totalWeight = 0
  
  analyzedIngredients.forEach((ingredient, index) => {
    // Earlier ingredients in the list have more weight (toothpaste ingredients are listed by concentration)
    const weight = Math.max(1, analyzedIngredients.length - index)
    weightedSum += ingredient.score * weight
    totalWeight += weight
  })
  
  const baseScore = weightedSum / totalWeight
  
  // Apply penalties for concerning ingredients
  const concerningIngredients = analyzedIngredients.filter(ing => ing.category === 'concerning')
  const penalty = concerningIngredients.length * 0.5
  
  // Apply bonuses for beneficial ingredients
  const beneficialIngredients = analyzedIngredients.filter(ing => ing.category === 'beneficial')
  const bonus = Math.min(beneficialIngredients.length * 0.3, 1.0)
  
  const finalScore = Math.max(1.0, Math.min(10.0, baseScore - penalty + bonus))
  return Math.round(finalScore * 10) / 10 // Round to 1 decimal place
}

// Get key ingredients that most affected the score
const getKeyIngredients = (analyzedIngredients) => {
  const sortedIngredients = [...analyzedIngredients].sort((a, b) => {
    // Sort by impact magnitude (distance from neutral score of 6.5)
    const impactA = Math.abs(a.score - 6.5)
    const impactB = Math.abs(b.score - 6.5)
    return impactB - impactA
  })
  
  const positive = sortedIngredients
    .filter(ing => ing.impact === 'positive')
    .slice(0, 3)
    .map(ing => ing.name)
  
  const negative = sortedIngredients
    .filter(ing => ing.impact === 'negative')
    .slice(0, 3)
    .map(ing => ing.name)
  
  return { positive, negative }
}

// Main analysis function
export const analyzeIngredients = async (ingredientText) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // Parse ingredients from text
        const ingredientNames = parseIngredients(ingredientText)
        
        if (ingredientNames.length === 0) {
          resolve({
            success: false,
            error: 'No ingredients found in the text'
          })
          return
        }
        
        // Analyze each ingredient
        const analyzedIngredients = ingredientNames.map(analyzeIngredient)
        
        // Calculate overall score
        const overallScore = calculateOverallScore(analyzedIngredients)
        
        // Get key ingredients
        const keyIngredients = getKeyIngredients(analyzedIngredients)
        
        // Generate overall assessment
        let overallAssessment = ''
        if (overallScore >= 8.5) {
          overallAssessment = 'Excellent choice with high-quality, safe ingredients'
        } else if (overallScore >= 7.0) {
          overallAssessment = 'Good formulation with mostly safe ingredients'
        } else if (overallScore >= 5.5) {
          overallAssessment = 'Average product with some ingredients of concern'
        } else if (overallScore >= 3.5) {
          overallAssessment = 'Below average with several concerning ingredients'
        } else {
          overallAssessment = 'Poor formulation with many problematic ingredients'
        }
        
        // Get primary concerns and benefits
        const allConcerns = analyzedIngredients
          .flatMap(ing => ing.concerns)
          .filter((concern, index, arr) => arr.indexOf(concern) === index)
          .slice(0, 5)
        
        const allBenefits = analyzedIngredients
          .flatMap(ing => ing.benefits)
          .filter((benefit, index, arr) => arr.indexOf(benefit) === index)
          .slice(0, 5)
        
        resolve({
          success: true,
          analysis: {
            overallScore,
            overallAssessment,
            totalIngredients: analyzedIngredients.length,
            keyIngredients,
            primaryConcerns: allConcerns,
            primaryBenefits: allBenefits,
            ingredients: analyzedIngredients,
            scoreBreakdown: {
              beneficial: analyzedIngredients.filter(ing => ing.category === 'beneficial').length,
              moderate: analyzedIngredients.filter(ing => ing.category === 'moderate').length,
              concerning: analyzedIngredients.filter(ing => ing.category === 'concerning').length,
              unknown: analyzedIngredients.filter(ing => ing.category === 'unknown').length
            }
          }
        })
      } catch (error) {
        resolve({
          success: false,
          error: 'Error analyzing ingredients: ' + error.message
        })
      }
    }, 1500) // Simulate processing time
  })
}

// Sample ingredient texts for testing
export const sampleIngredientTexts = [
  "Ingredients: Potassium Nitrate, Sodium Fluoride, Hydrated Silica, Calcium Carbonate, Water, Natural Mint Flavor",
  "Ingredients: Sodium Lauryl Sulfate, Titanium Dioxide, Triclosan, Artificial Colors, Sodium Fluoride, Water",
  "Ingredients: Calcium Carbonate, Xylitol, Natural Flavors, Sodium Fluoride, Potassium Nitrate, Cellulose Gum"
]