import {createContext , useContext , useState } from 'react'

const MapDetailsContext = createContext<any>(null)

const useMapDetails = () => useContext(MapDetailsContext)

export interface Props {
    children:React.ReactNode
}

const MapDetailsProvider :React.FC<Props> = ({children}) =>{
    const [mapDetails , setMapDetails] = useState<any>()
    return(
        <MapDetailsContext.Provider value={{mapDetails ,setMapDetails}}>
            {children}
        </MapDetailsContext.Provider>
    )
}

export {MapDetailsProvider ,useMapDetails}