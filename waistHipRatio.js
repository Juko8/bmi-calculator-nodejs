function waistHipRatio(ratio, gender) {
  if (gender == "male") {
    if (ratio < 0.9) {
      return "healthy"
    } else if (ratio < 0.99 && ratio >= 0.9) {
      return "overweight"
    } else if (ratio >= 1) {
      return "obese"
    }
  } else if (gender == "female") {
    if (ratio < 0.8) {
      return "healthy"
    } else if (ratio < 0.85 && ratio >= 0.80) {
      return "overweight"
    } else if (ratio >= 0.85) {
      return "obese"
    }
  }
}
module.exports = waistHipRatio;