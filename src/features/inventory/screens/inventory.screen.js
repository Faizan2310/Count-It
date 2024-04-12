import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AuthButton } from "../../account/components/account.styles";

const InventoryItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
export const inventory = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [data1, setData1] = useState("");
  const [visible, setVisible] = useState(false); //Modal visibility
  const [selectedItem, setSelectedItem] = useState(null); //Currently selected Item
  const [count, setCount] = useState(""); //Keep track of current item count

  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <Text
        style={{ padding: 10, fontSize: 18, textAlign: "center" }}
        onPress={() => getItem(item)}
      >
        Database is empty!
      </Text>
    );
  };
  
  //Fetching dection results data from the Firestore
  const getUser = async () => {
    //Create doc reference
    const usr = firebase
      .firestore()
      .collection("detection results")
      .doc(user.email);
      //Retrieve data from the doc
    usr.get().then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        //Extract the data from the snapshot
        const documentdata = documentSnapshot.data();
        console.log(documentdata, "\n\n\n\n\nYES JEE");
        if (documentdata && documentdata.data) {
          //Convert object to array
          const myArray = Object.values(documentdata.data); 
          setData1(myArray);
        }
      }
    });
  };
  
  //Fetch the detection results data when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser();
    });
    return () => {
      // executed when unmount
      unsubscribe();
    };
  }, [navigation, visible]);
  

  const handleDeleteItem = (index) => {
    // Create a copy of the data1 array
    const updatedArray = [...data1];
    console.log("This is the Updated Array ------------",updatedArray);
    // Remove the item at the specified index and store its label
    const deletedItem = updatedArray.splice(index, 1)[0];
    console.log("This is the Deleted Item ------------",deletedItem)

    // Update the state with the modified array
    setData1(updatedArray);
    console.log("This is the Updated Array Nowww ------------", updatedArray)

    // Delete the item from Firebase Firestore
    const usr = firebase
      .firestore()
      .collection("detection results")
      .doc(user.email);
      //Retrieve document snapshot
    usr.get().then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        const documentData = documentSnapshot.data();
        if (documentData && documentData.data) {
          // Find the index of the deleted item in the Firebase data array
          const deletedIndex = documentData.data.findIndex(
            (item) => item.label === deletedItem.label
          );
 
          if (deletedIndex !== -1) {
            // Remove the item from the Firebase data array
            documentData.data.splice(deletedIndex, 1);
            // Update the Firebase document with the modified data
            usr.set(documentData);
          }
        }
      }
    });
  };

  const updateItem = () => {
    const usr = firebase
      .firestore()
      .collection("detection results")
      .doc(user.email);

    usr.get().then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        const documentData = documentSnapshot.data();
        if (documentData && documentData.data) {
          if (count > 0) {
            const newData = documentData.data.map((item) => {
              if (item.label === selectedItem.label) {
                return { ...item, count: count };
              } else {
                return item;
              }
            });
            documentData.data = newData;
            usr.set(documentData);
          } else {
            const deletedIndex = documentData.data.findIndex(
              (item) => item.label === selectedItem.label
            );

            if (deletedIndex !== -1) {
              // Remove the item from the Firebase data array
              documentData.data.splice(deletedIndex, 1);
              // Update the document with the modified data
              usr.set(documentData);
            }
          }
          getUser();
        }
      }
    });
    setVisible(false);
  };

  return (
    <SafeArea style={{ backgroundColor: "aliceblue" }}>
      <List.Section
        style={{ alignItems: "center", backgroundColor: "aliceblue" }}
      >
        <Spacer size="medium" />
        <Text variant="heading2">Statistics</Text>
      </List.Section>
      <ScrollView>
        <Spacer size={"large"} />
        <View style={{ alignItems: "center", flex: 1 }}>
          <FlatList
            data={data1}
            renderItem={({ item, index }) => (
              <View style={styles.inventoryContainer}>
                <Text style={{ textTransform: "uppercase" }}>{item.label}</Text>
                <Text>{item.count}</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.editContainer}
                    onPress={() => {
                      setSelectedItem(item);
                      setCount(item?.count.toString());
                      setVisible(true);
                    }}
                  >
                    <Icon name={"edit"} size={23} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteContainer}
                    onPress={() => handleDeleteItem(index)}
                  >
                    <Icon name={"trash-2"} size={23} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={EmptyListMessage}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ margin: 8 }} />}
            contentContainerStyle={{
              paddingVertical: 8,
            }}
          />
        </View>

        <Spacer size={"large"} />
      </ScrollView>
      {/*Edit Button*/}
      {selectedItem && (
        <Modal visible={visible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem?.label}</Text>
              <TextInput
                style={styles.input}
                value={count}
                onChangeText={setCount}
                keyboardType="numeric"
              />

              <AuthButton
                icon="database-export-outline"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                  borderRadius: 14,
                  elevation: 3,
                  width: "100%",
                }}
                mode="contained"
                onPress={updateItem}
              >
                Update
              </AuthButton>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setVisible(false)}
              >
                <MaterialIcons name={"cancel"} size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  inventoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    width: 350,
    height: 60,
    backgroundColor: "#a07aaa",
    borderRadius: 10,
    elevation: 5,
  },
  editContainer: {
    backgroundColor: "#29c5f6",
    borderRadius: 50,
    padding: 8.5,
  },
  deleteContainer: {
    backgroundColor: "#D21F3C",
    borderRadius: 50,
    padding: 8.5,
    marginLeft: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.60)",
  },
  modalContent: {
    backgroundColor: "white",
    width: 300,
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#a07aaa",
    borderWidth: 2,
    borderRadius: 14,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: "#a07aaa",
    fontSize: 20,
  },
  closeIcon: {
    position: "absolute",
    right: 7.5,
    top: 7.5,
  },
});
