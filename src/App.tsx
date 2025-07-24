import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { defaultPalette, type ColorPalette } from "./lib/color"

function matchPixel(r: number, g: number, b: number, pallete: ColorPalette): string {
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

export default function App() {
  const [file, setFile] = useState<File | null>(null)
  const [output, setOutput] = useState("")
  const [fontSize, setFontSize] = useState(12)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!file || !file.type.match("image.*")) return

    setFile(file)
  }

  function processImage(img: HTMLImageElement) {
    const canvas = canvasRef.current
    if (!canvas) return 
    const ctx = canvas.getContext("2d")

    canvas.width = img.width
    canvas.height = img.height

    ctx?.drawImage(img, 0, 0)
    
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData?.data
    if (!data) return

    let pixls = 0
    let out = ""

    for (let i = 0; i < data.length; i+=4) {
      pixls++
      const r = data[i]
      const g = data[i+1]
      const b = data[i+2]

      console.log(r,g,b)

      const pixel = matchPixel(r,g,b, defaultPalette)
      out += pixel
      if (pixls == img.width) {
        out += "\n"
        pixls = 0
      }
    }
    setOutput(out)
  }

  useEffect(() => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target?.result) return

      const img = new Image()
      img.onload = () => processImage(img)
      img.src = e.target.result.toString()
    }
    reader.readAsDataURL(file)
  }, [file])

  return (
    <div className="grid grid-cols-2 gap-3 min-h-screen max-w-screen bg-slate-600 text-white">
      <div className="bg-slate-500 rounded-2xl flex items-center justify-center flex-col">
        <input className="p-2 bg-slate-600 rounded-2xl hover:bg-slate-700" type="file" onChange={onFileChange}/>
        <canvas className="bg-slate-600 p-5 rounded-2xl my-2" width={64} height={64} ref={canvasRef}></canvas>
        <ul className="list-disc my-2 bg-slate-600 p-5 rounded-2xl">
          <li>
            This page will try to recognize the pixels and convert them to emojis
          </li>
          <li>
            The color range consists of ⬛⬜🟫❤️💙🧡💛💚💜, unrecognized pixels will replace to ❓
          </li>
          <li>
            Recommended for pixel arts of 48x48 and less, too big images will explode the page
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center flex-col">
        <input type="range" min={4} max={20} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}></input>
        <span>font size: {fontSize}</span>
        <code className={`whitespace-pre-wrap bg-slate-700 rounded-2xl p-2`} style={{
          fontSize: `${fontSize}px`
        }}>
          {output}
        </code>
      </div>
    </div>
  )
}
