
export type Color = {
  emoji: string,
  rgb: [number, number, number]
}

export type ColorPalette = Color[]


// suited for roblox/discord emojis
export const defaultPalette: ColorPalette = [
  {
    emoji: "❤️",
    rgb: [221, 46, 68]
  },
  {
    emoji: "🧡",
    rgb: [255, 172, 51]
  },
  {
    emoji: "💛",
    rgb: [253, 203, 33]
  },
  {
    emoji: "💚",
    rgb: [120, 177, 89]
  },
  {
    emoji: "💙",
    rgb: [93, 173, 236]
  },
  {
    emoji: "💜",
    rgb: [170, 142, 214]
  },
  {
    emoji: "🟫",
    rgb: [193, 105, 79]
  },
  {
    emoji: "⬛",
    rgb: [49, 55, 61]
  },
  {
    emoji: "⬜",
    rgb: [230, 231, 232]
  },
  {
    emoji: "🌑",
    rgb: [102, 117, 127]
  }
]

export function matchPixel(r: number, g: number, b: number, pallete: ColorPalette): string {
  let result = "❓"
  let closest = Infinity
  for (const color of pallete) {
    // squared euclidian distance
    const [tr, tg, tb] = color.rgb
    const distance = (r - tr) ** 2 + (g - tg) ** 2 + (b - tb) ** 2
    if (distance < closest) {
      closest = distance
      result = color.emoji
    }
  }
  return result
}