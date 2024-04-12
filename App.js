import {
  Lato_400Regular,
  Lato_700Bold_Italic,
  useFonts as useLato,
} from "@expo-google-fonts/lato";
import {
  Oswald_400Regular,
  useFonts as useOswald,
} from "@expo-google-fonts/oswald";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React from "react";
import { LogBox } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { Navigation } from "./src/infrastructure/navigation";
import { theme } from "./src/infrastructure/theme";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyD8eLOaQOiCrrRXNKAxNaEYwhJqH_jNJaM",
  authDomain: "mealstogo-edc71.firebaseapp.com",
  projectId: "mealstogo-edc71",
  storageBucket: "mealstogo-edc71.appspot.com",
  messagingSenderId: "12515044890",
  appId: "1:12515044890:web:65a7ab5ff9bdf42015eba3",
  measurementId: "G-XSRVQ07GLN",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
LogBox.ignoreAllLogs(); //Ignore all log notifications
const app = initializeApp(firebaseConfig);
firebase.firestore();

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold_Italic,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
