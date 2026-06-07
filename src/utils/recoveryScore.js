export function calculateRecoveryScore({ sleepHours, sleepQuality, sorenessLevel, workoutIntensity }) {

  // each factor scored 0–100, then weighted
  const sleepHoursScore = Math.min(sleepHours / 9, 1) * 100       // 9hr = max
  const sleepQualityScore = ((sleepQuality - 1) / 4) * 100        // 1–5 → 0–100
  const sorenessScore = ((5 - sorenessLevel) / 4) * 100           // inverted: less soreness = higher
  const intensityScore = ((10 - workoutIntensity) / 9) * 100      // inverted: lighter session = faster recovery

  const score = Math.round(
    sleepHoursScore    * 0.35 +
    sleepQualityScore  * 0.30 +
    sorenessScore      * 0.25 +
    intensityScore     * 0.10
  )

  let recommendation, reason

  if (score >= 75) {
    recommendation = 'TRAIN_HARD'
    reason = 'Your body is recovered and primed. Push intensity today.'
  } else if (score >= 55) {
    recommendation = 'MODERATE'
    reason = 'Good enough to train, but keep intensity controlled.'
  } else if (score >= 35) {
    recommendation = 'LIGHT'
    reason = 'Fatigue detected. Stick to mobility, walks, or light cardio.'
  } else {
    recommendation = 'REST'
    reason = 'Your body needs recovery. Sleep, eat, and skip the gym today.'
  }

  return { score, recommendation, reason }
}