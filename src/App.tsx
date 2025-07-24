import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { useProperties } from "./lib/state"
import Properties from "./components/Properties"
import { img2emoji } from "./lib/image"

export default function App() {
  const properties = useProperties()
  
  const [file, setFile] = useState<File | null>(null)
  const [output, setOutput] = useState("")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!file || !file.type.match("image.*")) return

    setFile(file)
  }

  function processImage(img: HTMLImageElement) {
    const canvas = canvasRef.current
    if (!canvas || !properties) return 
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = img.width * properties.scale
    canvas.height = img.height * properties.scale

    const filter = `brightness(${properties.brightness}%) constrast(${properties.contrast}%)` // doesnt work pls help
    console.log(filter)
    ctx.filter = filter
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    const out = img2emoji(data, properties.palette, canvas.width)
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
  }, [file, properties?.brightness, properties?.contrast, properties?.saturation, properties?.scale, properties?.palette])

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
            <li>
              This project is <a className="text-blue-300 hover:underline" href="https://github.com/intervinn/imoji">open source</a>
            </li>
          </ul>

          <Properties/>
        </div>
        <div className="flex items-center justify-center flex-col">
          <code className={`whitespace-pre-wrap bg-slate-700 rounded-2xl p-2`} style={{
            fontSize: `${properties?.font}px`
          }}>
            {output}
          </code>
        </div>
      </div>
  )
}
