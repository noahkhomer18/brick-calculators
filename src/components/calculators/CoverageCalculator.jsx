import { useState } from 'react'

function CoverageCalculator({ productName }) {
  const [totalSqFt, setTotalSqFt] = useState('')
  const [coveragePerBox, setCoveragePerBox] = useState('')
  const [wastePercent, setWastePercent] = useState('10')
  const [unit, setUnit] = useState('feet')

  const calculateBoxes = () => {
    const sqFt = parseFloat(totalSqFt) || 0
    const coverage = parseFloat(coveragePerBox) || 0
    const waste = parseFloat(wastePercent) || 0

    if (sqFt <= 0 || coverage <= 0) {
      return { total: 0, withoutWaste: 0, waste: 0 }
    }

    const withoutWaste = Math.ceil(sqFt / coverage)
    const wasteAmount = Math.ceil(withoutWaste * (waste / 100))
    const total = withoutWaste + wasteAmount

    return { total, withoutWaste, waste: wasteAmount }
  }

  const results = calculateBoxes()

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
          {productName} Coverage Calculator
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
              Square Feet
            </button>
            <button
              onClick={() => setUnit('meters')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'meters'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Square Meters
            </button>
          </div>
        </div>

        {/* Total Area */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Total Area to Cover ({unit === 'feet' ? 'sq ft' : 'sq m'})
          </label>
          <input
            type="number"
            value={totalSqFt}
            onChange={(e) => setTotalSqFt(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>

        {/* Coverage per Box */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Coverage per Box ({unit === 'feet' ? 'sq ft' : 'sq m'})
          </label>
          <input
            type="number"
            value={coveragePerBox}
            onChange={(e) => setCoveragePerBox(e.target.value)}
            placeholder="0"
            step="0.1"
            className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Check the product label for coverage information
          </p>
        </div>

        {/* Waste Percentage */}
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

      {/* Results Card */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
          Results
        </h2>

        {totalSqFt && coveragePerBox ? (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Boxes Needed
                </span>
              </div>
              <div className="text-4xl font-bold text-primary">
                {results.total.toLocaleString()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Boxes (without waste)
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
                  Total Area
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {parseFloat(totalSqFt).toLocaleString()} {unit === 'feet' ? 'sq ft' : 'sq m'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <p>Enter area and coverage to calculate</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoverageCalculator

