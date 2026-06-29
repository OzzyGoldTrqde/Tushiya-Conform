/**
 * 5×5 Risk Matrix aligned to Namibian OHS guidance
 * Risk = Severity × Likelihood
 */

export const SEVERITY_LABELS = {
  1: 'Negligible',
  2: 'Minor',
  3: 'Moderate',
  4: 'Major',
  5: 'Catastrophic',
}

export const LIKELIHOOD_LABELS = {
  1: 'Rare',
  2: 'Unlikely',
  3: 'Possible',
  4: 'Likely',
  5: 'Almost Certain',
}

export function calculateRisk(severity, likelihood) {
  const score = severity * likelihood
  let rating, colour
  if (score >= 15)      { rating = 'EXTREME';  colour = 'red' }
  else if (score >= 8)  { rating = 'HIGH';     colour = 'orange' }
  else if (score >= 4)  { rating = 'MEDIUM';   colour = 'amber' }
  else                  { rating = 'LOW';      colour = 'green' }
  return { score, rating, colour }
}

export function ratingTailwind(rating) {
  switch (rating) {
    case 'EXTREME': return 'bg-red-600 text-white'
    case 'HIGH':    return 'bg-red-100 text-red-800 border border-red-300'
    case 'MEDIUM':  return 'bg-amber-100 text-amber-800 border border-amber-300'
    case 'LOW':     return 'bg-green-100 text-green-800 border border-green-300'
    default:        return 'bg-gray-100 text-gray-600'
  }
}

/** Matrix cell lookup — returns rating for [severity][likelihood] */
export const MATRIX = Array.from({ length: 5 }, (_, s) =>
  Array.from({ length: 5 }, (_, l) => calculateRisk(s + 1, l + 1).rating)
)
