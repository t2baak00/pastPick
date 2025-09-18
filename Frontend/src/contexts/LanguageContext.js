'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

// Complete translation data for English and Finnish
const translations = {
  en: {
    // App Name & Branding
    appName: 'PastPick',
    appTagline: 'Your smart companion for analyzing toothpaste ingredients',
    
    // Navigation
    home: 'Home',
    favorites: 'Favorites',
    scan: 'Scan',
    recent: 'Recent',
    settings: 'Settings',
    
    // Home Page
    productsScanned: 'Products Scanned',
    safeIngredients: 'Safe Ingredients',
    quickScan: 'Quick Scan',
    searchProducts: 'Search Products',
    safetyAnalysis: 'Safety Analysis',
    safetyAnalysisDesc: 'Detailed ingredient safety ratings',
    smartRecommendations: 'Smart Recommendations',
    smartRecommendationsDesc: 'Better alternatives based on your needs',
    poweredBy: 'Powered by AI-driven ingredient analysis',
    learnHow: 'Learn how PastPick works →',
    
    // Scanning
    scanProduct: 'Scan Product',
    scanToothpaste: 'Scan Toothpaste',
    scanIngredients: 'Scan Ingredients',
    analyzeIngredients: 'Analyze toothpaste ingredients instantly',
    startCameraScan: 'Start Camera Scan',
    chooseFromGallery: 'Choose from Gallery',
    takePhoto: 'Take Photo',
    openCamera: 'Open Camera',
    scanningTips: 'Scanning Tips',
    scanFront: 'Scan Product Front',
    scanIngredientsList: 'Scan Ingredients List',
    scanPackage: 'Scan Package/Box',
    
    // Analysis Results
    ingredientAnalysis: 'Ingredient Analysis',
    overallScore: 'Overall Safety Score',
    overallSafetyScore: 'Overall Safety Score (1-10)',
    dailyUse: 'Daily Use',
    sensitivity: 'Sensitivity',
    formula: 'Formula',
    ingredients: 'Ingredients',
    summary: 'Summary',
    concerns: 'Concerns',
    benefits: 'Benefits',
    sources: 'Sources',
    claims: 'Claims',
    keyIngredients: 'Key Ingredients',
    keyBenefits: 'Key Benefits',
    mainConcerns: 'Main Concerns',
    positiveIngredients: 'Beneficial Ingredients',
    negativeIngredients: 'Ingredients of Concern',
    safetyScore: 'Safety Score',
    ingredientCategories: 'Ingredient Categories',
    
    // Score Categories
    beneficial: 'Beneficial',
    moderate: 'Moderate',
    concerning: 'Concerning',
    unknown: 'Unknown',
    
    // Status Labels
    excellent: 'Excellent',
    safe: 'Safe',
    good: 'Good',
    average: 'Average',
    belowAverage: 'Below Average',
    poor: 'Poor',
    caution: 'Caution',
    avoid: 'Avoid',
    
    // Analysis Messages
    scanningInProgress: 'Scanning in progress...',
    analyzingImage: 'Analyzing image...',
    processingResults: 'Processing results...',
    scanSuccessful: 'Scan successful!',
    analysisComplete: 'Analysis complete',
    analyzing: 'Analyzing...',
    analyzeIngredientsCTA: 'Analyze Ingredients',
    
    // Error Messages
    imageTooBlurry: 'Image is too blurry. Please retake with better focus.',
    noTextFound: 'No ingredients found. Make sure to scan the ingredients list.',
    noIngredientsFound: 'Could not identify ingredients. Please try again.',
    productNotFound: 'Product not found. Try scanning the ingredients list directly.',
    scanError: 'Something went wrong. Please try again.',
    cameraError: 'Unable to access camera. Please check permissions.',
    networkError: 'Network error. Please check your connection.',
    
    // Camera Tips
    scanTip1: 'Ensure good lighting',
    scanTip2: 'Hold camera steady',
    scanTip3: 'Focus on ingredients list',
    scanTip4: 'Keep text clear and readable',
    scanTip5: 'Avoid shadows and glare',
    mobileDetected: 'Mobile device detected',
    cameraWorksBesetMobile: 'Camera works best on mobile devices',
    
    // Settings Page
    profile: 'Profile',
    notifications: 'Notifications',
    manageAlerts: 'Manage alerts',
    updateInfo: 'Update your information',
    safetyThreshold: 'Safety Threshold',
    highSensitivity: 'High sensitivity',
    darkMode: 'Dark Mode',
    language: 'Language',
    helpCenter: 'Help Center',
    getSupport: 'Get support',
    aboutApp: 'About PastPick',
    version: 'Version 1.0.0',
    account: 'Account',
    preferences: 'Preferences',
    support: 'Support',
    
    // Theme Options
    lightTheme: 'Light',
    darkTheme: 'Dark',
    systemTheme: 'System Default',
    
    // Actions
    retake: 'Retake',
    analyze: 'Analyze',
    save: 'Save',
    share: 'Share',
    viewDetails: 'View Details',
    tryAgain: 'Try Again',
    cancel: 'Cancel',
    ok: 'OK',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    
    // Favorites
    noFavorites: 'No favorites yet',
    noFavoritesDesc: 'Start scanning products to add them to your favorites',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    
    // Recent Scans
    recentScans: 'Recent Scans',
    noRecentScans: 'No recent scans',
    noRecentScansDesc: 'Your scan history will appear here',
    scanHistory: 'Scan History',
    scannedAt: 'Scanned {time}',
    
    // Scan Types
    productFront: 'Product Front',
    ingredientsList: 'Ingredients List',
    packageBox: 'Package/Box',
    
    // Analysis Details
    overallAnalysis: 'Overall Analysis',
    recommendations: 'Recommendations',
    highlyRecommended: 'Highly Recommended',
    goodChoice: 'Good Choice',
    useWithCaution: 'Use with Caution',
    notRecommended: 'Not Recommended',
    generalSafetyTips: 'General Safety Tips',
    noMajorConcerns: 'No Major Concerns',
    limitedBenefits: 'Limited Benefits',
    
    // Ingredient Analysis
    foundIngredients: 'Found {count} ingredients',
    analyzedWithDatabase: 'Analyzed with our safety database',
    whatThisMeans: 'What this means:',
    whoShouldBeCareful: 'Who should be careful:',
    whatToDo: 'What to do:',
    
    // Language Selection
    selectLanguage: 'Select Language',
    currentLanguage: 'Current Language',
    changeLanguage: 'Change Language',
    
    // Time Formats
    hoursAgo: '{count} hours ago',
    daysAgo: '{count} days ago',
    minutesAgo: '{count} minutes ago',
    justNow: 'just now',
    
    // Pluralization
    ingredientsAnalyzed: '{count} ingredients analyzed',
    concernsFound: '{count} concerns found',
    
    // Loading States
    loading: 'Loading...',
    pleaseWait: 'Please wait...',
  },
  
  fi: {
    // App Name & Branding
    appName: 'PastPick',
    appTagline: 'Älykäs kumppanisi hammastahnien ainesosien analysointiin',
    
    // Navigation
    home: 'Koti',
    favorites: 'Suosikit',
    scan: 'Skannaa',
    recent: 'Viimeisimmät',
    settings: 'Asetukset',
    
    // Home Page
    productsScanned: 'Skannattuja Tuotteita',
    safeIngredients: 'Turvallisia Ainesosia',
    quickScan: 'Pikaskannaus',
    searchProducts: 'Hae Tuotteita',
    safetyAnalysis: 'Turvallisuusanalyysi',
    safetyAnalysisDesc: 'Yksityiskohtaiset ainesosien turvallisuusarviot',
    smartRecommendations: 'Älykkäät Suositukset',
    smartRecommendationsDesc: 'Parempia vaihtoehtoja tarpeidesi perusteella',
    poweredBy: 'Tekoälyyn perustuva ainesosien analyysi',
    learnHow: 'Opi kuinka PastPick toimii →',
    
    // Scanning
    scanProduct: 'Skannaa Tuote',
    scanToothpaste: 'Skannaa Hammastahna',
    scanIngredients: 'Skannaa Ainesosat',
    analyzeIngredients: 'Analysoi hammastahnien ainesosat välittömästi',
    startCameraScan: 'Aloita Kameraskannaus',
    chooseFromGallery: 'Valitse Galleriasta',
    takePhoto: 'Ota Kuva',
    openCamera: 'Avaa Kamera',
    scanningTips: 'Skannausvinkit',
    scanFront: 'Skannaa Tuotteen Etupuoli',
    scanIngredientsList: 'Skannaa Ainesosaluettelo',
    scanPackage: 'Skannaa Pakkaus/Laatikko',
    
    // Analysis Results
    ingredientAnalysis: 'Ainesosa-analyysi',
    overallScore: 'Kokonaisturvallisuuspisteet',
    overallSafetyScore: 'Kokonaisturvallisuuspisteet (1-10)',
    dailyUse: 'Päivittäinen Käyttö',
    sensitivity: 'Herkkyys',
    formula: 'Koostumus',
    ingredients: 'Ainesosat',
    summary: 'Yhteenveto',
    concerns: 'Huolenaiheet',
    benefits: 'Hyödyt',
    sources: 'Lähteet',
    claims: 'Väitteet',
    keyIngredients: 'Tärkeimmät Ainesosat',
    keyBenefits: 'Keskeiset Hyödyt',
    mainConcerns: 'Päähuolenaiheet',
    positiveIngredients: 'Hyödylliset Ainesosat',
    negativeIngredients: 'Huolestuttavat Ainesosat',
    safetyScore: 'Turvallisuuspisteet',
    ingredientCategories: 'Ainesosa Kategoriat',
    
    // Score Categories
    beneficial: 'Hyödyllinen',
    moderate: 'Kohtalainen',
    concerning: 'Huolestuttava',
    unknown: 'Tuntematon',
    
    // Status Labels
    excellent: 'Erinomainen',
    safe: 'Turvallinen',
    good: 'Hyvä',
    average: 'Keskiverto',
    belowAverage: 'Keskitason Alapuolella',
    poor: 'Huono',
    caution: 'Varoitus',
    avoid: 'Vältä',
    
    // Analysis Messages
    scanningInProgress: 'Skannaus käynnissä...',
    analyzingImage: 'Analysoidaan kuvaa...',
    processingResults: 'Käsitellään tuloksia...',
    scanSuccessful: 'Skannaus onnistui!',
    analysisComplete: 'Analyysi valmis',
    analyzing: 'Analysoidaan...',
    analyzeIngredientsCTA: 'Analysoi Ainesosat',
    
    // Error Messages
    imageTooBlurry: 'Kuva on liian epätarkka. Ota uusi kuva paremmalla tarkennuksella.',
    noTextFound: 'Ainesosia ei löytynyt. Varmista että skannaat ainesosaluetteloa.',
    noIngredientsFound: 'Ainesosia ei voitu tunnistaa. Yritä uudelleen.',
    productNotFound: 'Tuotetta ei löytynyt. Kokeile skannata ainesosaluettelo suoraan.',
    scanError: 'Jotain meni pieleen. Yritä uudelleen.',
    cameraError: 'Kameraan ei saada yhteyttä. Tarkista käyttöoikeudet.',
    networkError: 'Verkkovirhe. Tarkista internetyhteytesi.',
    
    // Camera Tips
    scanTip1: 'Varmista hyvä valaistus',
    scanTip2: 'Pidä kamera vakaana',
    scanTip3: 'Kohdista ainesosaluetteloon',
    scanTip4: 'Pidä teksti selkeänä ja luettavana',
    scanTip5: 'Vältä varjoja ja heijastuksia',
    mobileDetected: 'Mobiililaite havaittu',
    cameraWorksBesetMobile: 'Kamera toimii parhaiten mobiililaitteilla',
    
    // Settings Page
    profile: 'Profiili',
    notifications: 'Ilmoitukset',
    manageAlerts: 'Hallinnoi hälytyksiä',
    updateInfo: 'Päivitä tietosi',
    safetyThreshold: 'Turvallisuuskynnys',
    highSensitivity: 'Korkea herkkyys',
    darkMode: 'Tumma Tila',
    language: 'Kieli',
    helpCenter: 'Ohje',
    getSupport: 'Hanki tukea',
    aboutApp: 'Tietoa PastPick',
    version: 'Versio 1.0.0',
    account: 'Tili',
    preferences: 'Asetukset',
    support: 'Tuki',
    
    // Theme Options
    lightTheme: 'Vaalea',
    darkTheme: 'Tumma',
    systemTheme: 'Järjestelmän Oletus',
    
    // Actions
    retake: 'Ota Uudelleen',
    analyze: 'Analysoi',
    save: 'Tallenna',
    share: 'Jaa',
    viewDetails: 'Näytä Tiedot',
    tryAgain: 'Yritä Uudelleen',
    cancel: 'Peruuta',
    ok: 'OK',
    close: 'Sulje',
    back: 'Takaisin',
    next: 'Seuraava',
    done: 'Valmis',
    
    // Favorites
    noFavorites: 'Ei suosikkeja vielä',
    noFavoritesDesc: 'Aloita tuotteiden skannaaminen lisätäksesi niitä suosikkeihin',
    addToFavorites: 'Lisää Suosikkeihin',
    removeFromFavorites: 'Poista Suosikeista',
    
    // Recent Scans
    recentScans: 'Viimeisimmät Skannaukset',
    noRecentScans: 'Ei viimeaikaisia skannauksia',
    noRecentScansDesc: 'Skannaushistoriasi näkyy täällä',
    scanHistory: 'Skannaushistoria',
    scannedAt: 'Skannattu {time}',
    
    // Scan Types
    productFront: 'Tuotteen Etupuoli',
    ingredientsList: 'Ainesosaluettelo',
    packageBox: 'Pakkaus/Laatikko',
    
    // Analysis Details
    overallAnalysis: 'Kokonaisanalyysi',
    recommendations: 'Suositukset',
    highlyRecommended: 'Erittäin Suositeltava',
    goodChoice: 'Hyvä Valinta',
    useWithCaution: 'Käytä Varovasti',
    notRecommended: 'Ei Suositella',
    generalSafetyTips: 'Yleiset Turvallisuusvinkit',
    noMajorConcerns: 'Ei Merkittäviä Huolenaiheita',
    limitedBenefits: 'Rajoitetut Hyödyt',
    
    // Ingredient Analysis
    foundIngredients: 'Löydettiin {count} ainesosaa',
    analyzedWithDatabase: 'Analysoitu turvallisuustietokannallamme',
    whatThisMeans: 'Mitä tämä tarkoittaa:',
    whoShouldBeCareful: 'Kenen tulisi olla varovainen:',
    whatToDo: 'Mitä tehdä:',
    
    // Language Selection
    selectLanguage: 'Valitse Kieli',
    currentLanguage: 'Nykyinen Kieli',
    changeLanguage: 'Vaihda Kieli',
    
    // Time Formats
    hoursAgo: '{count} tuntia sitten',
    daysAgo: '{count} päivää sitten',
    minutesAgo: '{count} minuuttia sitten',
    justNow: 'juuri nyt',
    
    // Pluralization
    ingredientsAnalyzed: '{count} ainesosaa analysoitu',
    concernsFound: '{count} huolenaihetta löydetty',
    
    // Loading States
    loading: 'Ladataan...',
    pleaseWait: 'Odota hetki...',
  }
}

// Ingredient translation mappings (Foreign → English)
const ingredientTranslations = {
  // Finnish to English
  'natriumfluoridi': 'sodium fluoride',
  'kalsiumkarbonaatti': 'calcium carbonate',
  'natriumlauryylisulfaatti': 'sodium lauryl sulfate',
  'natriumlauryylieetterinylätti': 'sodium laureth sulfate',
  'titaanidioksidi': 'titanium dioxide',
  'hydratoitu piidioksidi': 'hydrated silica',
  'kaliumnitraatti': 'potassium nitrate',
  'ksylitoli': 'xylitol',
  'sorbitoli': 'sorbitol',
  'glyseriini': 'glycerin',
  'mentoli': 'menthol',
  'tritriumfosfaatti': 'trisodium phosphate',
  'natriumsakariini': 'sodium saccharin',
  'selluloosakumi': 'cellulose gum',
  'natriumhydroksidi': 'sodium hydroxide',
  
  // German to English
  'natriumfluorid': 'sodium fluoride',
  'kalziumkarbonat': 'calcium carbonate',
  'natriumlaurylsulfat': 'sodium lauryl sulfate',
  'titandioxid': 'titanium dioxide',
  'hydratisierte kieselsäure': 'hydrated silica',
  'kaliumnitrat': 'potassium nitrate',
  'glyzerin': 'glycerin',
  'natriumsaccharin': 'sodium saccharin',
  
  // French to English
  'fluorure de sodium': 'sodium fluoride',
  'carbonate de calcium': 'calcium carbonate',
  'laurylsulfate de sodium': 'sodium lauryl sulfate',
  'dioxyde de titane': 'titanium dioxide',
  'silice hydratée': 'hydrated silica',
  'nitrate de potassium': 'potassium nitrate',
  'glycérine': 'glycerin',
  
  // Spanish to English
  'fluoruro de sodio': 'sodium fluoride',
  'carbonato de calcio': 'calcium carbonate',
  'lauril sulfato de sodio': 'sodium lauryl sulfate',
  'dióxido de titanio': 'titanium dioxide',
  'sílice hidratada': 'hydrated silica',
  'nitrato de potasio': 'potassium nitrate',
  'glicerina': 'glycerin',
  
  // Common abbreviations and synonyms
  'sls': 'sodium lauryl sulfate',
  'sles': 'sodium laureth sulfate',
  'peg': 'polyethylene glycol',
  'edta': 'ethylenediaminetetraacetic acid',
  'bht': 'butylated hydroxytoluene',
  'bha': 'butylated hydroxyanisole',
  'fdc&c': 'food drug and cosmetic color',
  'fd&c': 'food drug and cosmetic color',
  'ci': 'color index',
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('pastpick-language')
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.slice(0, 2)
      if (translations[browserLang]) {
        setLanguage(browserLang)
      }
    }
  }, [])

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang)
      localStorage.setItem('pastpick-language', lang)
    }
  }

  // Translation function with interpolation support
  const t = (key, params = {}) => {
    let translation = translations[language][key] || translations['en'][key] || key
    
    // Handle parameter interpolation {param}
    Object.keys(params).forEach(param => {
      translation = translation.replace(new RegExp(`{${param}}`, 'g'), params[param])
    })
    
    return translation
  }

  // Translate ingredients from foreign languages to English
  const translateIngredients = (ingredientText) => {
    if (!ingredientText) return ''
    
    let translatedText = ingredientText.toLowerCase()
    
    // Apply ingredient translations
    Object.entries(ingredientTranslations).forEach(([foreign, english]) => {
      const regex = new RegExp(foreign, 'gi')
      translatedText = translatedText.replace(regex, english)
    })
    
    return translatedText
  }

  // Get available languages with their native names
  const getAvailableLanguages = () => [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fi', name: 'Finnish', nativeName: 'Suomi' }
  ]

  // Get current language info
  const getCurrentLanguageInfo = () => {
    const languages = getAvailableLanguages()
    return languages.find(lang => lang.code === language) || languages[0]
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      changeLanguage, 
      t, 
      translateIngredients,
      getAvailableLanguages,
      getCurrentLanguageInfo,
      availableLanguages: Object.keys(translations),
      ingredientTranslations
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}