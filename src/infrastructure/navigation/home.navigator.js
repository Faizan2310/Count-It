import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { HomeScreen } from "../../features/home/screens/home.screen";

const HomeStack = createStackNavigator();

export const HomeNavigator = ({ route, navigation }) => {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        options={{
          header: () => null,
        }}
        name="Home"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};
