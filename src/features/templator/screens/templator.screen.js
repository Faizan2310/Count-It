import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import mime from "mime";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ImageView from "react-native-image-viewing";
import { Button, Searchbar } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AuthButton } from "../../account/components/account.styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Item = ({ title }) => (
  <View
    style={{
      backgroundColor: "rgb(149,125,195)",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 25,
      elevation: 10,
    }}
  >
    <Text style={{ fontSize: 32 }}>{title}</Text>
  </View>
);

export const templator = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [data, setData] = useState("");
  const [visible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, email } = useContext(AuthenticationContext);
  const [value, setValue] = useState([]);
  const [show, setShow] = useState(false);
  const [disableDropdown, setDisableDropdown] = useState(false);
  const [text, setText] = useState([]);


  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <Text
        style={{ padding: 10, fontSize: 18, textAlign: "center" }}
        onPress={() => getItem(item)}
      >
        Nothing detected !
      </Text>
    );
  };

  // Fetch templates whenever the screen is focused
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      fetchTemplatesFromFirebase();
    });
    return () => {
      unsubscribeFocus;
    };
  }, []);

  // Fetch templates from Firestore
  const fetchTemplatesFromFirebase = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection("templates")
        .doc("templatesData")
        .get();
      if (snapshot.exists) {
        //Extract data
        const data = snapshot.data();
        // Filter templates to include only those that are checked
        const filteredTemplates = data.templates.filter(
          (template) => template.isChecked === true
        );
        setText(filteredTemplates);
        console.log("Templates retrieved from Firebase successfully!");
      } else {
        console.log("No templates found in Firebase.");
      }
    } catch (error) {
      console.error("Error fetching templates from Firebase:", error);
    }
  };

  // const onSubmit = () => {
  //   firebase
  //     .firestore()
  //     .collection("detection results")
  //     .doc(user.email)
  //     .update({
  //       data: firebase.firestore.FieldValue.arrayUnion(...data),
  //     })
  //     .then((res) => {
  //       Alert.alert("Data saved Successfully");
  //     });
  //   console.log("THIS IS DATA SAVED TO FIRESTORE", data);
  // };

  //Handle the submission of detection results to Firestore
  const onSubmit = () => {
    const firestore = firebase.firestore();
    const collectionRef = firestore.collection("detection results");
    //Document reference for the current user based on their email
    const docRef = collectionRef.doc(user.email);

    // Attempt to get the document for the current user
    docRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        // Retrieve existing data
        const existingData = docSnapshot.data().data; 
        //Update the count of existing items
        const updatedData = existingData.map((existingItem) => {
          // Serach for data that has same label as existing label
          const matchingItem = data.find(
            (newItem) => newItem.label === existingItem.label
          );
          //If the data matches return new count
          if (matchingItem) {
            return {
              label: existingItem.label,
              count: existingItem.count + matchingItem.count,
            };
          } 
          //else return the existing data unchanged
          else {
            return existingItem;
          }
        });
        // Append new items that don't exist in the existing data
        data.forEach((newItem) => {
          const existingItem = existingData.find(
            (item) => item.label === newItem.label
          );
          if (!existingItem) {
            updatedData.push(newItem);
          }
        });
        docRef
          .update({
            data: updatedData,
          })
          .then((res) => {
            Alert.alert("Data updated successfully");
          });
      } else {
        // Document doesn't exist, append the new data
        docRef
          .set({
            data,
          })
          .then((res) => {
            Alert.alert("Data saved successfully");
          });
      }
    });

    console.log("THIS IS DATA SAVED/UPDATED IN FIRESTORE", data);
  };

  // Pick an image from the library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    handleImage(result);
  };

  // Capture an image using the camera
  const takeImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted !== true) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    console.log(
      "------------------------------------------------------------------------",
      value
    );
    handleImage(result, value);
  };

  // Handle image processing after selection or capture
  const handleImage = async (result) => {
    setImage(result.assets[0]?.uri);
    console.log(result, "fffffff");

    setDisableDropdown(true);
    console.log("Classes to detect ", value);

    //Create FormData Obj to send data as HTTP request
    const formData = new FormData();
    formData.append("classesToDetect", value);
    //formData.append("file", imageObject);
    formData.append("file", {
      name: result.assets[0]?.uri.split("/").pop(),
      type: mime.getType(result.assets[0]?.uri),
      uri: result.assets[0]?.uri,
    });
    
    //Specify the content type of the request
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    // Send the image to the server for processing
    let res = await axios.post("http://192.168.0.38:5000/detect", formData, {
      headers: headers,
      timeout:5000,
    });
    console.log("res data",res.data);
    console.log("---------------");
    //Transforms the response data into an array of objects
    const dataArray = Object.keys(res?.data).map((key) => {
      return { label: key, count: res?.data[key] };
    });
    console.log(dataArray);
    setData(dataArray);
    setShow(true);
  };
  const images = [
    {
      uri: image,
    },
  ];
  return (
    <SafeArea>
      <View
        style={{
          backgroundColor: "aliceblue",
          flex: 1,
        }}
      >
        <Text variant="heading" style={{ textAlign: "center" }}>
          List Of Templates
        </Text>
        <Spacer size={"large"} />
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <DropDownPicker
            open={open}
            style={{
              width: "90%",
              alignSelf: "center",
              elevation: 20,
              //position: "relative",
            }}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            placeholder="Select classes to detect"
            value={value}
            items={text}
            setOpen={setOpen}
            disabled={disableDropdown}
            setValue={setValue}
            setItems={setText}
            theme="LIGHT"
            multiple={true}
            mode="BADGE"
            badgeDotColors={[
              "#e76f51",
              "#00b4d8",
              "#e9c46a",
              "#e76f51",
              "#8ac926",
              "#00b4d8",
              "#e9c46a",
            ]}
            dropDownContainerStyle={{
              width: "90%",
              alignSelf: "center",
              //position: "absolute",
            }}
            itemSeparatorStyle={{
              backgroundColor: "#000",
            }}
          />

          <Spacer size={"large"} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              marginTop: 10,
              zIndex: -1,
            }}
          >
            {/* <Button
              icon="camera"
              mode="contained"
              style={{
                padding: 10,
                borderRadius: 14,
                elevation: 3,
                backgroundColor: "black",
                // width: "50%",
              }}
              onPress={takeImage}
            >
              Capture photo
            </Button> */}
            <AuthButton
              icon="camera"
              mode="contained"
              style={{
                padding: 10,
                borderRadius: 14,
                elevation: 3,
                marginHorizontal:2,
              }}
              onPress={takeImage}
            >
              Capture photo
            </AuthButton>
            <Spacer size={"large"} />
            <AuthButton
              icon="image"
              mode="contained"
              style={{
                padding: 10,
                borderRadius: 14,
                elevation: 3,
              }}
              onPress={pickImage}
            >
              Select photo
            </AuthButton>
          </View>
          <Spacer size={"large"} />

          {image && (
            <>
              <Pressable onPress={() => setIsVisible(true)}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 380,
                    height: 300,
                    borderRadius: 20,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 7.5,
                    top: 7.5,
                    zIndex: 1,
                  }}
                  onPress={() => {
                    setDisableDropdown(false);
                    setImage("");
                    setData("");
                  }}
                >
                  <MaterialIcons name={"cancel"} size={35} color="white" />
                </TouchableOpacity>
              </Pressable>
              <ImageView
                images={images}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
                style={{ borderRadius: 8, resizeMode: "contain", width: 300 }}
              />
            </>
          )}
          <ScrollView>
            <Spacer size={"large"} />
            {show == true && (
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 15,
                      justifyContent: "space-between",
                      width: 300,
                      height: 60,
                      backgroundColor: "#a07aaa",
                      borderRadius: 10,
                      elevation: 5,
                    }}
                  >
                    <Text style={{ textTransform: "uppercase" }}>
                      {item.label}
                    </Text>
                    <Text>{item.count}</Text>
                  </View>
                )}
                ListEmptyComponent={EmptyListMessage}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{ margin: 8 }} />}
                contentContainerStyle={{
                  paddingVertical: 8,
                }}
              />
            )}

            {/* Save/Update Button */}
            <Spacer size={"large"} />
            {data.length != 0 && (
              <Button
                icon="database-export-outline"
                mode="contained"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                  borderRadius: 14,
                  elevation: 3,
                  backgroundColor: "black",
                }}
                onPress={onSubmit}
              >
                Save/Update
              </Button>
            )}

            <Spacer size={"large"} />
          </ScrollView>
        </View>
      </View>
    </SafeArea>
  );
};
