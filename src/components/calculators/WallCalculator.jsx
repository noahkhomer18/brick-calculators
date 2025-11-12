import { useState } from 'react'

function WallCalculator() {
  const [wallLength, setWallLength] = useState('')
  const [wallHeight, setWallHeight] = useState('')
  const [brickLength, setBrickLength] = useState('8')
  const [brickHeight, setBrickHeight] = useState('2.25')
  const [mortarGap, setMortarGap] = useState('0.375')
  const [wastePercent, setWastePercent] = useState('10')
  const [unit, setUnit] = useState('feet')

  const calculateBricks = () => {
    const length = parseFloat(wallLength) || 0
    const height = parseFloat(wallHeight) || 0
    const brickL = parseFloat(brickLength) || 0
    const brickH = parseFloat(brickHeight) || 0
    const mortar = parseFloat(mortarGap) || 0
    const waste = parseFloat(wastePercent) || 0

    if (length <= 0 || height <= 0 || brickL <= 0 || brickH <= 0) {
      return { total: 0, withoutWaste: 0, waste: 0 }
    }

    const conversionFactor = unit === 'feet' ? 12 : 39.3701
    const lengthInches = length * conversionFactor
    const heightInches = height * conversionFactor

    const effectiveBrickLength = brickL + mortar
    const effectiveBrickHeight = brickH + mortar

    const bricksPerRow = Math.ceil(lengthInches / effectiveBrickLength)
    const bricksPerColumn = Math.ceil(heightInches / effectiveBrickHeight)

    const withoutWaste = bricksPerRow * bricksPerColumn
    const wasteAmount = Math.ceil(withoutWaste * (waste / 100))
    const total = withoutWaste + wasteAmount

    return { total, withoutWaste, waste: wasteAmount }
  }

  const results = calculateBricks()
  const area = (parseFloat(wallLength) || 0) * (parseFloat(wallHeight) || 0)

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
          Single Wall Calculator
        </h2>

        {/* Unit Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Unit of Measurement
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setUnit('feet')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'feet'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Feet
            </button>
            <button
              onClick={() => setUnit('meters')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'meters'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Meters
            </button>
          </div>
        </div>

        {/* Wall Dimensions */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Wall Length ({unit === 'feet' ? 'ft' : 'm'})
            </label>
            <input
              type="number"
              value={wallLength}
              onChange={(e) => setWallLength(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Wall Height ({unit === 'feet' ? 'ft' : 'm'})
            </label>
            <input
              type="number"
              value={wallHeight}
              onChange={(e) => setWallHeight(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </div>

        {/* Brick Dimensions */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">
            Brick Size
          </h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Brick Length (inches)
            </label>
            <input
              type="number"
              value={brickLength}
              onChange={(e) => setBrickLength(e.target.value)}
              placeholder="8"
              step="0.25"
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Brick Height (inches)
            </label>
            <input
              type="number"
              value={brickHeight}
              onChange={(e) => setBrickHeight(e.target.value)}
              placeholder="2.25"
              step="0.25"
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">
            Advanced Settings
          </h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Mortar Gap (inches)
            </label>
            <input
              type="number"
              value={mortarGap}
              onChange={(e) => setMortarGap(e.target.value)}
              placeholder="0.375"
              step="0.125"
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Waste Percentage (%)
            </label>
            <input
              type="number"
              value={wastePercent}
              onChange={(e) => setWastePercent(e.target.value)}
              placeholder="10"
              step="1"
              min="0"
              max="50"
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: 10-15% for cuts and breakage
            </p>
          </div>
        </div>
      </div>

      {/* Results Card */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
          Results
        </h2>

        {wallLength && wallHeight ? (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Bricks Needed
                </span>
              </div>
              <div className="text-4xl font-bold text-primary">
                {results.total.toLocaleString()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Bricks (without waste)
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {results.withoutWaste.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Waste ({wastePercent}%)
                </span>
                <span className="text-lg font-semibold text-foreground">
                  +{results.waste.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Wall Area</span>
                <span className="text-lg font-semibold text-foreground">
                  {area.toFixed(2)} {unit === 'feet' ? 'sq ft' : 'sq m'}
                </span>
              </div>
            </div>

            <div className="bg-muted/50 border border-border rounded-md p-4 mt-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> This is an
                estimate. Actual requirements may vary based on brick pattern,
                openings (doors/windows), and site conditions.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <p>Enter your wall dimensions to calculate</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WallCalculator

