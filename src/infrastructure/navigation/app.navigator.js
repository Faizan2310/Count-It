import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { HomeNavigator } from "./home.navigator";
import { InventoryNavigator } from "./inventory.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { TemplatorNavigator } from "./templator.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home-sharp",
  Templator: "list-sharp",
  Inventory: "stats-chart-sharp",
  Settings: "cog-outline",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "#a07aaa",
    tabBarInactiveTintColor: "gray",
    headerShown: false,
    keyboardHidesTabBar: true,
    tabBarHideOnKeyboard: true,
  };
};

export const AppNavigator = () => (
  <Tab.Navigator screenOptions={createScreenOptions}>
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Templator" component={TemplatorNavigator} />
    <Tab.Screen name="Inventory" component={InventoryNavigator} />
    <Tab.Screen name="Settings" component={SettingsNavigator} />
  </Tab.Navigator>
);
console.disableYellowBox = true;
