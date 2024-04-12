import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { DashboardScreen } from "../../features/admin/screens/DashboardScreen";
import { FeedbackDetails } from "../../features/admin/screens/FeedbackDetails";
import { InventoryScreen } from "../../features/admin/screens/InventoryScreen";
import { SettingsScreenAdmin } from "../../features/admin/screens/SettingsScreen";
import { UsersDatabase } from "../../features/admin/screens/UsersDatabase";
import { EditProfileDatabase } from "../../features/admin/screens/EditProfileDatabase";

import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { AddRemoveTemplates } from "../../features/admin/screens/AddRemoveTemplates";
import { UserEditdatabase } from "../../features/admin/screens/UserEditdatabase";
import { UsersDisplayData } from "../../features/admin/screens/UsersDisplayData";

const Tab = createBottomTabNavigator();
const DashboardStack = createStackNavigator();
export const DashboardNavigator = ({ route, navigation }) => {
  return (
    <DashboardStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        //headerShown: false,
      }}
    >
      <DashboardStack.Screen
        options={{
          header: () => null,
        }}
        name="Dashboard"
        component={DashboardScreen}
      />

      <DashboardStack.Screen
        name="FeedbackDetails"
        component={FeedbackDetails}
      />
      <DashboardStack.Screen name="UsersDatabase" component={UsersDatabase} />
      <DashboardStack.Screen
        name="EditProfileDatabase"
        component={UsersDisplayData}
      />
      <DashboardStack.Screen
        name="AddRemoveTemplates"
        component={AddRemoveTemplates}
        options={{
          //headerMode: false,
          headerShown: false,
        }}
      />
      <DashboardStack.Screen
        name="UserEditdatabase"
        component={UserEditdatabase}
        options={{
          //headerMode: false,
          headerShown: false,
        }}
      />
      <DashboardStack.Screen
        name="Inventory"
        component={EditProfileDatabase}
        options={
          {
            //headerMode: false,
            //headerShown: false,
          }
        }
      />
    </DashboardStack.Navigator>
  );
};

const TAB_ICON = {
  Dashboard: "apps-sharp",

  Inventory: "analytics",
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
  };
};
export const AdminAppNavigator = () => (
  <Tab.Navigator screenOptions={createScreenOptions}>
    <Tab.Screen name="Dashboard" component={DashboardNavigator} />

    <Tab.Screen name="Settings" component={SettingsScreenAdmin} />
  </Tab.Navigator>
);
console.disableYellowBox = true;
