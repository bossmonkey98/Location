import {ScrollView, View, Text, StyleSheet ,TouchableOpacity } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamTypes } from '../App';
import { useMapDetails } from '../context/MapDetailsContext';
import { useLocation } from '../context/LocationContext';

const Home = () => {

  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes,'Home'>>()
  const { currentLocation,
          previousLocation,
          setPreviousLocation,
          setNoApiCall,
      } = useLocation()
  const {setMapDetails} = useMapDetails()
  

  return (

    <View style={styles.container}>
      <Text style={styles.headerStyle}>Current Location</Text>
      
      { !currentLocation ? 
      <Text>Loading...</Text>
      :
       <TouchableOpacity onPress={()=>{
            setMapDetails(currentLocation)
            navigator.navigate('Map')
          }
        } style={styles.currentContainer}>
        <Text >{currentLocation.results[0]?.formatted}</Text>
        <Text style ={styles.textStyle}>{currentLocation.timestamp.created_http}</Text>
      </TouchableOpacity>}
        <Text style={styles.headerStyle}>Your Location History</Text>
      <ScrollView>
          { previousLocation && previousLocation.map((i:any)=>
            <View key={i.id} style={styles.pastContainer} >
              <TouchableOpacity onPress={()=>{
                setMapDetails(i)
                navigator.navigate('Map')
              }} style={styles.pastLocationContainer}>
                  <Text>{i?.results[0]?.formatted}</Text>
                  <Text style ={styles.textStyle}>{i.timestamp.created_http}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress ={()=>{
                let newArr = previousLocation.filter((j:any)=>i.timestamp.created_http !== j.timestamp.created_http)
                setPreviousLocation([...newArr])
              }}
                >
                  <Text style={{color:'white'}}>Remove</Text>
                </TouchableOpacity>
            </View>
          )}
      </ScrollView>
      <TouchableOpacity style={styles.clearAll} onPress={()=>{
        setPreviousLocation([])
        setNoApiCall(1)
      }}>
        <Text style={{fontSize:24,color:'white'}}>Clear All</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF'
    },
    currentContainer:{
        marginHorizontal:8,
        padding:8,
        marginVertical:12,
        backgroundColor:'#FCFFB2'
    },
    pastContainer:{
        marginHorizontal:8,
        padding:8,
        marginVertical:12,
        flexDirection:'row',
        backgroundColor:'#F9F9F9'
    },
    headerStyle:{
      fontSize:20,
      margin:8,
    },
    textStyle:{
        color:'grey',
        marginBottom:6,
    },
    pastLocationContainer:{
      flex:5,
    },
    button:{
      flex:1.4,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      height:40,
      margin:4,
      borderRadius:100,
      backgroundColor:'red'
    },
    clearAll:{
      justifyContent:'center',
      alignItems:'center',
      margin:8,
      height:50,
      borderWidth:1,
      borderRadius:100,
      backgroundColor:'blue',
    }
})

export default Home