import { Heart, Star, Shield } from 'lucide-react'

export default function FavoritesPage() {
  const favoriteProducts = [
    {
      id: 1,
      name: "Sensodyne Pronamel",
      brand: "Sensodyne",
      rating: 4.8,
      safetyScore: 92,
      image: "🦷"
    },
    {
      id: 2,
      name: "Tom's of Maine Natural",
      brand: "Tom's of Maine",
      rating: 4.6,
      safetyScore: 96,
      image: "🌿"
    },
    {
      id: 3,
      name: "Colgate Total",
      brand: "Colgate",
      rating: 4.3,
      safetyScore: 88,
      image: "⭐"
    }
  ]

  return (
    <div className="pb-20 px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Favorites</h1>
        <p className="text-gray-600 text-sm">Your saved toothpaste products</p>
      </header>

      {/* Favorites List */}
      {favoriteProducts.length > 0 ? (
        <div className="space-y-4">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{product.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500" size={14} />
                      <span className="text-sm text-gray-700">{product.rating}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Shield className="text-green-600" size={14} />
                      <span className="text-sm text-gray-700">{product.safetyScore}% Safe</span>
                    </div>
                  </div>
                </div>
                
                <button className="p-2">
                  <Heart className="text-red-500 fill-current" size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600 text-sm">Start scanning products to add them to your favorites</p>
        </div>
      )}
    </div>
  )
}