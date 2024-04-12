import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "../../../components/typography/text.component";
import {
  ActivityIndicator,
  Dimensions,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "firebase/compat/app";
import { Spacer } from "../../../components/spacer/spacer.component";
import { UserEditdatabase } from "./UserEditdatabase";

export const UsersDisplayData = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const feedbacks = [];
        querySnapshot.forEach((documentSnapshot) => {
          feedbacks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setItems(feedbacks);
        setLoading(false);
        console.log(feedbacks);
      });
    if (loading) {
      return <ActivityIndicator />;
    }
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <FlatList
      data={items}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserEditdatabase", { user: item })
          }
        >
          <View
            style={{
              backgroundColor: "#a07aaa",
              borderRadius: 15,
              width: Dimensions.get("window").width / 2.18,
              height: Dimensions.get("window").width / 2,
              padding: 10,
              margin: 5,
            }}
          >
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              User Email:
            </Text>
            <Text style={{ fontStyle: "italic" }}>{item.email}</Text>
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              User Details:
            </Text>
            <Text style={{ fontStyle: "italic" }}>
              Full Name:- {item.fullName}
            </Text>
            <Text style={{ fontStyle: "italic" }}>
              Address:- {item.phonenumber}
            </Text>
            <Text style={{ fontStyle: "italic" }}>
              Phone Number:- {item.address}
            </Text>
            <Spacer position="top" size="large"></Spacer>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
