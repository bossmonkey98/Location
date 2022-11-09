import { View, Text ,StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useMapDetails } from '../context/MapDetailsContext'
import MapView ,{Marker} from 'react-native-maps';

const Map = () => {
    const {mapDetails} = useMapDetails()
    let lng
    let lat
    if(mapDetails){
    lat = mapDetails.results[0].geometry.lat
    lng = mapDetails.results[0].geometry.lng
    }

  return (
    mapDetails &&
    <View style={styles.container}>
       <MapView style={styles.map}
        initialRegion ={{latitude:lat,longitude:lng , latitudeDelta:0.05,longitudeDelta:0.0221}}
      >
      <Marker coordinate={{
        latitude:lat,
        longitude:lng
      }}/>
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map