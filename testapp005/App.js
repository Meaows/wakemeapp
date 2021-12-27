import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Main from "./components/Main"
import Second from "./components/Second"
import Create from './components/Create';
function App() {
  return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="main" component={Main}  />
                <Stack.Screen name="budziki" component={Second}  />
                <Stack.Screen name="create" component={Create}  />            
            </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;
