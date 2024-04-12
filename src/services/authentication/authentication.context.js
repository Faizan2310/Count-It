import React, { useState, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { loginRequest } from "./authentication.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((usr) => {
    console.log(usr);
    if (usr) {
      setUser(usr);
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        // Save the user data to AsyncStorage
        saveUserData({ email, password });
        console.log(u);
        setIsLoading(true);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (
    email,
    password,
    repeatedPassword,
    fullName,
    address,
    phonenumber
  ) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        console.log(u);
        // Save the user data to AsyncStorage
        saveUserData({ email, password });
        setIsLoading(true);
        firebase.firestore().collection("users").doc(u.user.uid).set({
          email: email,
          password: password,
          fullName: fullName,
          address: address,
          phonenumber: phonenumber,
        });
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };
  const saveUserData = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.log("Error saving user data:", e);
    }
  };
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      return userData != null ? JSON.parse(userData) : null;
    } catch (e) {
      console.log("Error getting user data:", e);
    }
  };

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
        AsyncStorage.removeItem("user")
          .then(() => {
            console.log("User data cleared");
          })
          .catch((error) => {
            console.log("Error clearing user data:", error);
          });
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        getUserData,
        saveUserData,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
