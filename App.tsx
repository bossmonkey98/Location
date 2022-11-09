import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { LocationProvider } from './context/LocationContext';
import { MapDetailsProvider } from './context/MapDetailsContext';
import Home from './Screens/Home';
import Map from './Screens/Map';

export type ScreenParamTypes ={
  'Home':undefined,
  "Map":undefined
}

export default function App() {

  const Stack = createNativeStackNavigator<ScreenParamTypes>()

  return (
    <MapDetailsProvider>
      <LocationProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} options={{title:'Location Manager'}}/>
            <Stack.Screen name='Map' component={Map} options={{title:'Your Location'}}/>
          </Stack.Navigator>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
      </LocationProvider>
    </MapDetailsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
