import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { inventory } from "../../features/inventory/screens/inventory.screen";

const InventoryStack = createStackNavigator();

export const InventoryNavigator = ({ route, navigation }) => {
  return (
    <InventoryStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <InventoryStack.Screen
        options={{
          header: () => null,
        }}
        name="Inventory"
        component={inventory}
      />
    </InventoryStack.Navigator>
  );
};
