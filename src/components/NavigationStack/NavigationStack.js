import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dashboard } from "../../screen/Dashboard/Dashboard";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

const NavigationStack = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Dashboard" component={ Dashboard } options={{ headerShown: false }}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

export { NavigationStack };