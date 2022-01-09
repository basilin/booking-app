import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Seller} from './src/components/Seller';
import {Appointment} from './src/components/Appointment';
import {DateSelection} from './src/components/DateSelection';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {}, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Seller" component={Seller} />
        <Stack.Screen name="Appointment" component={Appointment} />
        <Stack.Screen name="DateSelection" component={DateSelection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
