import axios from 'axios'
import {createContext , useContext , useState ,useEffect } from 'react'
import { Props } from './MapDetailsContext'
import * as Location from 'expo-location'


const LocationContext = createContext<any>(null)

const useLocation = () => useContext(LocationContext)

const LocationProvider: React.FC<Props> = ({children}) =>{
  
    const [currentLocation , setCurrentLocation] = useState<any| undefined>(undefined)
    const [previousLocation , setPreviousLocation] = useState<any|[]>([])
    const [noOfApicall , setNoApiCall] = useState<number>(1)
    
    const fetchData = async(lat:any | string,lang:any | string)=>{
      const key ='571853b15b6d455d9f586a76c105f062'
      const url = `https://api.opencagedata.com/geocode/v1/json?key=${key}&q=${lat}%2C${lang}&pretty=1`
      try{
      const res = await axios.get(url)
      return res.data
      }catch(err){
        console.log(err)
      }
  }

  const getLocation = async() =>{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access location is required');
        return;
      }
    let res = await Location.getCurrentPositionAsync({});
    let response = await fetchData(res.coords.latitude,res.coords.longitude)
    if(currentLocation) setPreviousLocation((prev:any)=>[currentLocation,...prev])
    setCurrentLocation(response)
     if(noOfApicall<30) setNoApiCall((prev:number)=>prev+1)
  }

   const delay =() => {
      return new Promise(resolve => setTimeout(resolve,50000));
   }

  useEffect(()=>{
    console.log(noOfApicall)
    if(noOfApicall === 1) {
      getLocation()
    }
    else{
      (async()=>{
      await delay()
      getLocation()
    })()
  }
  },[noOfApicall])

    return(
        <LocationContext.Provider value ={{currentLocation , previousLocation , setPreviousLocation,setNoApiCall}}>
            {children}
        </LocationContext.Provider>
    )
}

export {useLocation , LocationProvider}