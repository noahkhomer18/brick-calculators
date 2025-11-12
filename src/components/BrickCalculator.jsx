import { useState } from 'react'
import CategorySelector from './CategorySelector'
import CalculatorSelector from './CalculatorSelector'
import WallCalculator from './calculators/WallCalculator'
import HouseCalculator from './calculators/HouseCalculator'
import BuildingCalculator from './calculators/BuildingCalculator'
import CoverageCalculator from './calculators/CoverageCalculator'
import PatioCalculator from './calculators/PatioCalculator'

function BrickCalculator() {
  const [selectedCategory, setSelectedCategory] = useState('face-full-brick')
  const [selectedCalculator, setSelectedCalculator] = useState('wall')

  // Define calculators for each category
  const categoryCalculators = {
    'thin-brick': [
      { id: 'coverage', name: 'Coverage Calculator', component: <CoverageCalculator productName="Thin Brick" /> }
    ],
    'face-full-brick': [
      { id: 'wall', name: 'Single Wall', component: <WallCalculator /> },
      { id: 'house', name: 'House/Square Footage', component: <HouseCalculator /> },
      { id: 'building', name: 'Large Building', component: <BuildingCalculator /> }
    ],
    'manufactured-stone': [
      { id: 'coverage', name: 'Coverage Calculator', component: <CoverageCalculator productName="Manufactured Stone" /> }
    ],
    'natural-stone': [
      { id: 'coverage', name: 'Coverage Calculator', component: <CoverageCalculator productName="Natural Stone" /> }
    ],
    'pavers': [
      { id: 'patio', name: 'Patio/Paving', component: <PatioCalculator /> }
    ]
  }

  // Handle category change and reset calculator to first one
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    const calculators = categoryCalculators[categoryId]
    if (calculators && calculators.length > 0) {
      setSelectedCalculator(calculators[0].id)
    }
  }

  const calculators = categoryCalculators[selectedCategory] || []
  const currentCalculator = calculators.find(calc => calc.id === selectedCalculator)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Brick Calculator
          </h1>
          <p className="text-muted-foreground">
            Estimate materials needed for your project
          </p>
        </div>

        {/* Category Selector */}
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Calculator Selector */}
        <CalculatorSelector
          calculators={calculators}
          selectedCalculator={selectedCalculator}
          onCalculatorChange={setSelectedCalculator}
        />

        {/* Current Calculator */}
        {currentCalculator && currentCalculator.component}
      </div>
    </div>
  )
}

export default BrickCalculator
