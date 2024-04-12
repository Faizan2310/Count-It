import {
  Alert,
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeArea } from "../../../components/utility/safe-area.component";
import firebase from "firebase/compat/app";
import { Text } from "../../../components/typography/text.component";
import { AuthButton } from "../../account/components/account.styles";
import { List } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";

export const AddRemoveTemplates = ({ navigation }) => {
  const DEVICE_WIDTH = Dimensions.get("screen").width;
  const DEVICE_HEIGHT = Dimensions.get("screen").height;
  const [templates, setTemplates] = useState([]);
  const handleTemplateSelection = (item) => {
    let arr = [...templates];
    const findIndex = arr.findIndex((itm) => item.key == itm.key);
    arr[findIndex].isChecked = !arr[findIndex].isChecked;
    setTemplates(arr);
  };
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      fetchTemplatesFromFirebase();
    });
    return () => {
      unsubscribeFocus;
    };
  }, []);
  const fetchTemplatesFromFirebase = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection("templates")
        .doc("templatesData")
        .get();
      if (snapshot.exists) {
        const data = snapshot.data();
        setTemplates(data.templates);
        console.log("Templates retrieved from Firebase successfully!");
      } else {
        console.log("No templates found in Firebase.");
      }
    } catch (error) {
      console.error("Error fetching templates from Firebase:", error);
    }
  };
  const updateTemplates = async () => {
    try {
      // Reference to the "templates" collection
      const templatesCollectionRef = firebase
        .firestore()
        .collection("templates");
      // Create the collection document
      await templatesCollectionRef.doc("templatesData").set({ templates });
      console.log("Templates collection created successfully.");
      Alert.alert("Templates collection created successfully.");
    } catch (error) {
      console.error("Error creating templates collection:", error);
      Alert.alert("Error creating templates collection:");
    }
  };

  return (
    <SafeArea style={{ backgroundColor: "aliceblue", flex: 1 }}>
      <List.Section
        style={{ alignItems: "center", backgroundColor: "aliceblue" }}
      >
        <Spacer size="medium" />
        <Text variant="heading">Templates</Text>
      </List.Section>
      <List.Section>
        <View>
          <FlatList
            data={templates}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => handleTemplateSelection(item)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  width: "90%",
                  paddingVertical: "5%",
                  paddingHorizontal: "5%",
                  justifyContent: "space-between",
                  borderRadius: 15,
                  backgroundColor: item.isChecked ? "#25D366" : "#E68889",
                  alignSelf: "center",
                }}
              >
                <Text style={{ fontSize: 16 }}>{item.label}</Text>

                <Icon
                  name={item.isChecked ? "checkmark-sharp" : "close-sharp"}
                  size={23}
                  color="black"
                />
              </TouchableOpacity>
            )}
          />

          <View style={{ alignItems: "center", marginTop: "5%" }}>
            <AuthButton
              icon="download"
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                borderRadius: 14,
                elevation: 3,
                width: "80%",
                //backgroundColor: "black",
              }}
              mode="contained"
              onPress={updateTemplates}
            >
              Save Selected Templates
            </AuthButton>
          </View>
        </View>
      </List.Section>
    </SafeArea>
  );
};
