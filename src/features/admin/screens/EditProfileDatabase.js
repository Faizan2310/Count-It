import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "firebase/compat/app";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

export const EditProfileDatabase = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [onClose, setonClose] = useState(false);
  const [data1, setData1] = useState("");

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.label}</Text>
      <Text style={styles.itemText}>{item.count}</Text>
    </TouchableOpacity>
  );

  const db = firebase.firestore();
  const getDocument = async (documentName) => {
    try {
      const documentRef = firebase
        .firestore()
        .collection("detection results")
        .doc(documentName);
      console.log("it------------- exists", documentName);
      const documentSnapshot = await documentRef.get();
      console.log("it exists");
      if (documentSnapshot.exists) {
        // Document exists, you can access its data
        const documentData = documentSnapshot.data();
        console.log("Document data:", documentData);
        const myArray = Object.values(documentData.data); // convert object to array
        setData1(myArray);
        console.log("This is data of the particular user", data1);
        setVisible(true);
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error retrieving document:", error);
    }
  };

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("detection results")
      .get()
      .then((querySnapshot) => {
        const names = [];
        querySnapshot.forEach((doc) => {
          names.push(doc.id);
        });
        setItems(names);
      });

    return () => {
      subscriber;
    }; // Cleanup the listener on unmount
  }, []);

  return (
    <SafeArea
      style={{ backgroundColor: "aliceblue", alignItems: "center", flex: 1 }}
    >
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              getDocument(item);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 15,
                justifyContent: "center",
                width: 350,
                height: 60,
                backgroundColor: "#a07aaa",
                borderRadius: 10,
                elevation: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{ margin: 8 }} />}
        contentContainerStyle={{
          paddingVertical: 8,
        }}
        ListEmptyComponent={() => <Text>No Operations Performed !</Text>}
      />

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <FlatList
              data={data1}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 32,
    maxHeight: "80%",
    width: "80%",
  },
  itemContainer: {
    flexDirection: "row",
    paddingHorizontal: 25,
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: 50,
    backgroundColor: "#a07aaa",
    borderRadius: 15,
    elevation: 5,
    marginVertical: 10,
  },
  itemText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
