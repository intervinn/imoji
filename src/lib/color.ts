
export class Color {
  public r: number
  public g: number
  public b: number

  constructor(r: number, g: number, b: number) {
    this.r = r
    this.g = g
    this.b = b
  }


  toHsv(): [number, number, number] {
    let r = this.r/255
    let g = this.g/255
    let b = this.b/255
    let max = Math.max(r,g,b)
    let min = Math.min(r,g,b)
    let delta = max - min

    let hue: number
    let sat: number
    let val: number

    if (delta == 0) hue = 0
    else if (max == r) hue = (60 * ((g - b) / delta) + 360) % 360
    else if (max == g) hue = (60 * ((b - r) / delta) + 120) % 360
    else hue = (60 * ((r - g) / delta) + 240) % 360

    sat = max == 0 ? 0 : delta / max
    val = max
    return [hue, sat, val]
  }

  isBlack() {
    const [,,v] = this.toHsv()
    return v < 0.1
  }

  isWhite() {
    const [,s,v] = this.toHsv()
    return s < 0.5 && v > 0.9
  }

  isBrown() {
    const [h,s,v] = this.toHsv()
    return (
      (h <= 45 || h >= 345) &&
      v >= 0.1 && v <= 0.6 &&
      s >= 0.2 && s <= 0.8
     )
  }

  isRed() {
    const [h,s,v] = this.toHsv()
    if (this.isBlack() || this.isWhite() || this.isBrown())
      return false

    return (
        (h <= 15 || h >= 345) &&
        s >= 0.2 &&
        v >= 0.3
    )
  }

  isOrange() {
    const [h,s,v] = this.toHsv()
    if (this.isBlack() || this.isWhite() || this.isBrown())
      return false

    return (
      h > 15 && h <= 45 &&
      s >= 0.2 &&
      v >= 0.3
    )
  }

  isYellow() {
    const [h,s,v] = this.toHsv()
    if (this.isBlack() || this.isWhite())
      return false

    return (
      h > 45 && h <= 45 &&
      s >= 0.2 &&
      v >= 0.3
    )
  }

  isGreen() {
    const [h,s,v] = this.toHsv()
    if (this.isBlack() || this.isWhite())
      return false

    return (
      h > 75 && h <= 165 &&
      s >= 0.2 &&
      v >= 0.3
    )
  }

  isBlue() {
    const [h,s,v] = this.toHsv()
    if (this.isBlack() || this.isWhite())
      return false

    return (
        h >= 195 && h <= 240 &&
        s >= 0.2 &&
        v >= 0.3
    )
  }

  isPurple() {
        const [h,s,v] = this.toHsv()
    if (this.isBlack() || this.isWhite())
      return false

    return (
        h <= 15 && h >= 345 &&
        s >= 0.2 &&
        v >= 0.3
    )
  }
}