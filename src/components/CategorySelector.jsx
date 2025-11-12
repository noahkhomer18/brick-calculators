function CategorySelector({ selectedCategory, onCategoryChange }) {
  const categories = [
    { id: 'thin-brick', name: 'THIN BRICK' },
    { id: 'face-full-brick', name: 'FACE/FULL BRICK' },
    { id: 'manufactured-stone', name: 'MANUFACTURED STONE' },
    { id: 'natural-stone', name: 'NATURAL STONE' },
    { id: 'pavers', name: 'PAVERS' },
  ]

  return (
    <div className="border-b border-border mb-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              selectedCategory === category.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector

