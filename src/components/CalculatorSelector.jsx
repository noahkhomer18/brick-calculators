function CalculatorSelector({ calculators, selectedCalculator, onCalculatorChange }) {
  if (calculators.length <= 1) return null

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {calculators.map((calc) => (
          <button
            key={calc.id}
            onClick={() => onCalculatorChange(calc.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
              selectedCalculator === calc.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {calc.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CalculatorSelector

