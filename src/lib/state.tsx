import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react"
import { defaultPalette, type ColorPalette } from "./color"

export interface PropertiesState {
    brightness: number,
    saturation: number,
    contrast: number,
    scale: number,
    font: number,
    palette: ColorPalette,
}

type SetPropertyAction = {
    key: keyof PropertiesState,
    value: PropertiesState[keyof PropertiesState]
}

const initialState : PropertiesState = {
    brightness: 100,
    saturation: 100,
    contrast: 100,
    scale: 1,
    font: 10,

    palette: defaultPalette,
}

function usePropertiesReducer() {
    return useReducer((state, action: SetPropertyAction) => {
        const newState = {...state}
        newState[action.key] = action.value as any
        return newState
    }, initialState)
}

const PropertiesContext = createContext<PropertiesState | null>(null)
const PropertiesDispatchContext = createContext<Dispatch<SetPropertyAction> | null>(null)

export const PropertiesProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [properties, dispatch] = usePropertiesReducer()
    
    return (
        <PropertiesContext.Provider value={properties}>
            <PropertiesDispatchContext.Provider value={dispatch}>
                {children}
            </PropertiesDispatchContext.Provider>
        </PropertiesContext.Provider>
    )
}

export function useProperties() {
    return useContext(PropertiesContext)
}

export function usePropertiesDispatch() {
    return useContext(PropertiesDispatchContext)
}