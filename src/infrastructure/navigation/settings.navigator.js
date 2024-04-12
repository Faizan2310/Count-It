import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { EditProfile } from "../../features/settings/screens/editprofile.screen";
import { Feedback } from "../../features/settings/screens/feedback.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="EditProfile" component={EditProfile} />
      <SettingsStack.Screen name="Feedback" component={Feedback} />
    </SettingsStack.Navigator>
  );
};
