import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import Recover from './pages/Recover';
import NewUser from './pages/NewUser';
import ListProduct from './pages/ListProduct';



export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Recover" component={Recover} />
                <AppStack.Screen name="NewUser" component={NewUser} />
                <AppStack.Screen name="ListProduct" component={ListProduct} />
               
            </AppStack.Navigator>

        </NavigationContainer>
    );
}


