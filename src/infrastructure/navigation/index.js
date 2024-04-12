import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { AccountNavigator } from "./account.navigator";
import { AppNavigator } from "./app.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AdminAppNavigator } from "./AdminAppNavigator";
import { loginRequest } from "../../services/authentication/authentication.service";

export const Navigation = () => {
  const { isAuthenticated, user, getUserData } = useContext(
    AuthenticationContext
  );
  console.log("User", user);
  useEffect(() => {
    getUserData().then((userData) => {
      if (userData) {
        // Automatically sign in the user
        loginRequest(userData.email, userData.password)
          .then((u) => {
            setUser(u);
            console.log(u);
          })
          .catch((e) => {
            console.log(e.toString());
          });
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        user.email === "admin@admin.com" ? (
          <AdminAppNavigator />
        ) : (
          <AppNavigator />
        )
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};
