import firebase from "firebase/compat/app";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

export const FeedbackDetails = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("feedbacks")
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
          style={{
            backgroundColor: "#a07aaa",
            borderRadius: 15,
            width: Dimensions.get("window").width / 2.18,
            height: Dimensions.get("window").width / 2.6,
            padding: 10,
            margin: 5,
          }}
          onPress={() => {
            Linking.openURL(
              `mailto:${item?.email.trim()}?subject=Feedback&body=In response to this feedback, ${
                item?.feedbacks
              } we assure you we are working on this issue.`
            );
          }}
        >
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            User Email:
          </Text>

          <Text style={{ fontStyle: "italic" }}>{item.email}</Text>
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            User feedback:
          </Text>
          <Text style={{ fontStyle: "italic" }}>{item.feedbacks}</Text>
          <Spacer position="top" size="large"></Spacer>
        </TouchableOpacity>
      )}
    />
  );
};
