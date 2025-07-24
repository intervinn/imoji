import { matchPixel, type ColorPalette } from "./color"

export function img2emoji(
    data: Uint8ClampedArray<ArrayBufferLike>,
    palette: ColorPalette,
    width: number,
): string {
    let pixels = 0
    let out = ""

    for (let i = 0; i < data.length; i+=4) {
        pixels++
        const r = data[i]
        const g = data[i+1]
        const b = data[i+2]

        const pixel = matchPixel(r,g,b, palette)
        out += pixel
        if (pixels == width) {
            out += "\n"
            pixels = 0
        }   
    }
    return out
}