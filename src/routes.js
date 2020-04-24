import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, StackNavigator  } from '@react-navigation/stack';


const AppStack = createStackNavigator();



import Login from './pages/Login';
import Recover from './pages/Recover';
import NewUser from './pages/NewUser';
import ListProduct from './pages/ListProduct';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';




export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Recover" component={Recover} />
                <AppStack.Screen name="NewUser" component={NewUser} />
                <AppStack.Screen name="CreateProduct" component={CreateProduct} />
                <AppStack.Screen name="EditProduct" component={EditProduct} />
                <AppStack.Screen name="ListProduct" component={ListProduct} />
            </AppStack.Navigator>

        </NavigationContainer>

        
          
             
           

       
    );
}
 