import type { ChangeEvent } from "react"
import { useProperties, usePropertiesDispatch } from "../lib/state"
import { defaultPalette } from "../lib/color"

export default function Properties() {
    const properties = useProperties()
    const dispatch = usePropertiesDispatch()

    function loadPalette(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                if (!e.target?.result || !dispatch) return
                const data = JSON.parse(e.target.result.toString())
                dispatch({
                    key: "palette",
                    value: data
                })
            } catch (err) {
                alert(`invalid json: ${err}`)
            }
        }
        reader.readAsText(file)
    }

    function resetPalette() {
        if (!dispatch) return
        dispatch({
            key: "palette",
            value: defaultPalette
        })
    }

    function downloadPalette() {
        const blob = new Blob([JSON.stringify(defaultPalette)], {type: "application/json"})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a');
        a.href = url;
        a.download = 'imoji_default.json'; 
        document.body.appendChild(a); 
        a.click();

        document.body.removeChild(a); 
        URL.revokeObjectURL(url);
    }

    return (
        <div className="flex flex-col p-5 bg-slate-600">
            <input type="range" min={4} max={20}
                value={properties?.font}
                onChange={(e) => {
                    if (!dispatch) return
                    dispatch({
                        key: "font",
                        value: Number(e.target.value)
                    })
                }}
            />
            <span>font size: {properties?.font}</span>
            
            <input type="range" min={0.1} max={2} step={0.1}
                value={properties?.scale}
                onChange={(e) => {
                    if (!dispatch) return
                    dispatch({
                        key: "scale",
                        value: Number(e.target.value)
                    })
                }}
            />
            <span>scale: {properties?.scale}</span>
            
            <span className="mt-3">custom palette</span>
            <div className="w-full flex flex-row">
                <input 
                className="p-2 bg-slate-500 rounded-2xl hover:bg-slate-700 w-24" 
                type="file" 
                accept=".json,application/json"
                onChange={(e) => {
                    loadPalette(e)
                }}/>
                <button onClick={() => resetPalette()} className="px-2 py-1 mx-2 bg-slate-500 hover:bg-slate-700 rounded-2xl">set default</button>
                <button onClick={() => downloadPalette()} className="px-2 py-1 mx-2 bg-slate-500 hover:bg-slate-700 rounded-2xl">download default</button>
            </div>

            <h2 className="text-2xl text-red-500 mt-5">fields below DONT WORK, to be fixed later</h2>

            <input type="range" min={1} max={200}
                value={properties?.brightness}
                onChange={(e) => {
                    if (!dispatch) return
                    dispatch({
                        key: "brightness",
                        value: Number(e.target.value)
                    })
                }}
            />
            <span>brightness: {properties?.brightness}</span>

            <input type="range" min={1} max={200}
                value={properties?.contrast}
                onChange={(e) => {
                    if (!dispatch) return
                    dispatch({
                        key: "contrast",
                        value: Number(e.target.value)
                    })
                }}
            />
            <span>contrast: {properties?.contrast}</span>

            <input type="range" min={1} max={200}
                value={properties?.saturation}
                onChange={(e) => {
                    if (!dispatch) return
                    dispatch({
                        key: "saturation",
                        value: Number(e.target.value)
                    })
                }}
            />
            <span>saturation: {properties?.saturation}</span>
        </div>
    )
}