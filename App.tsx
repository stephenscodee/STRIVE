import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import {AuthProvider} from './contexts/AuthContext';
import {APIProvider} from './contexts/APIContext';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import PhotoAnalysisScreen from './screens/PhotoAnalysisScreen';
import RoutineScreen from './screens/RoutineScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <APIProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1a1a2e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{title: 'Registro'}}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Looq Fitness'}}
            />
            <Stack.Screen
              name="PhotoAnalysis"
              component={PhotoAnalysisScreen}
              options={{title: 'Análisis Corporal'}}
            />
            <Stack.Screen
              name="Routine"
              component={RoutineScreen}
              options={{title: 'Mi Rutina'}}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{title: 'Perfil'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </APIProvider>
  );
};

export default App;
