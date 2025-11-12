import { useState } from 'react'

function PatioCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [paverLength, setPaverLength] = useState('12')
  const [paverWidth, setPaverWidth] = useState('12')
  const [jointWidth, setJointWidth] = useState('0.125')
  const [wastePercent, setWastePercent] = useState('10')
  const [unit, setUnit] = useState('feet')

  const calculatePavers = () => {
    const len = parseFloat(length) || 0
    const wid = parseFloat(width) || 0
    const paverL = parseFloat(paverLength) || 0
    const paverW = parseFloat(paverWidth) || 0
    const joint = parseFloat(jointWidth) || 0
    const waste = parseFloat(wastePercent) || 0

    if (len <= 0 || wid <= 0 || paverL <= 0 || paverW <= 0) {
      return { total: 0, withoutWaste: 0, waste: 0, area: 0 }
    }

    const conversionFactor = unit === 'feet' ? 12 : 39.3701
    const lengthInches = len * conversionFactor
    const widthInches = wid * conversionFactor

    const effectivePaverLength = paverL + joint
    const effectivePaverWidth = paverW + joint

    const paversPerRow = Math.ceil(lengthInches / effectivePaverLength)
    const paversPerColumn = Math.ceil(widthInches / effectivePaverWidth)

    const withoutWaste = paversPerRow * paversPerColumn
    const wasteAmount = Math.ceil(withoutWaste * (waste / 100))
    const total = withoutWaste + wasteAmount
    const area = len * wid

    return { total, withoutWaste, waste: wasteAmount, area }
  }

  const results = calculatePavers()

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
          Patio/Paving Calculator
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

        {/* Patio Dimensions */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Length ({unit === 'feet' ? 'ft' : 'm'})
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Width ({unit === 'feet' ? 'ft' : 'm'})
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </div>

        {/* Paver Dimensions */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">
            Paver Size
          </h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Paver Length (inches)
            </label>
            <input
              type="number"
              value={paverLength}
              onChange={(e) => setPaverLength(e.target.value)}
              placeholder="12"
              step="0.25"
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Paver Width (inches)
            </label>
            <input
              type="number"
              value={paverWidth}
              onChange={(e) => setPaverWidth(e.target.value)}
              placeholder="12"
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
              Joint Width (inches)
            </label>
            <input
              type="number"
              value={jointWidth}
              onChange={(e) => setJointWidth(e.target.value)}
              placeholder="0.125"
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

        {length && width ? (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Pavers Needed
                </span>
              </div>
              <div className="text-4xl font-bold text-primary">
                {results.total.toLocaleString()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Pavers (without waste)
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
                <span className="text-sm text-muted-foreground">
                  Patio Area
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {results.area.toFixed(2)} {unit === 'feet' ? 'sq ft' : 'sq m'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <p>Enter patio dimensions to calculate</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PatioCalculator

