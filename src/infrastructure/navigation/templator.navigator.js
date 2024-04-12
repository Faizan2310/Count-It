import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { SafeArea } from "../../components/utility/safe-area.component";
import { templator } from "../../features/templator/screens/templator.screen";

const TemplatorStack = createStackNavigator();

export const TemplatorNavigator = ({ route, navigation }) => {
  return (
    <SafeArea>
      <TemplatorStack.Navigator
        headerMode="screen"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <TemplatorStack.Screen
          options={{
            header: () => null,
          }}
          name="Templates"
          component={templator}
        />
      </TemplatorStack.Navigator>
    </SafeArea>
  );
};
