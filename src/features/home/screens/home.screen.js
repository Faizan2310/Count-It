import { PieChart } from "expo-chart-kit";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import LottieView from "lottie-react-native";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView, View } from "react-native";
import { List } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [data1, setData1] = useState("");

  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
  const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
  console.log(randomRGB());
  const getUser = async () => {
    const usr = firebase
      .firestore()
      .collection("detection results")
      .doc(user.email);
    usr.get().then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        console.log("first");
        const documentdata = documentSnapshot.data();
        console.log(documentdata);
        if (documentdata && documentdata.data) {
          console.log("1");
          const myArray = Object.values(documentdata.data); // convert object to array
          console.log(myArray); // array of objects
          const newData = myArray.map((obj) => ({
            ...obj,
            name: obj.label,
            color: randomRGB(),
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          }));
          setData1(newData);
        }
      }
    });

    console.log("DATA 1 ----------------------", data1);

    console.log(
      "----------------------------------**********--------------------------------",
      data1
    );
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeArea style={{ backgroundColor: "aliceblue" }}>
      <List.Section style={{ alignItems: "center" }}>
        <Spacer size="medium" />
        <Text variant="heading2">Dashboard</Text>
      </List.Section>

      {data1.length > 0 ? (
        <PieChart
          data={data1}
          width={Dimensions.get("window").width}
          height={200}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor={"count"}
          backgroundColor={"#abdbe3"}
        />
      ) : (
        <View style={{ height: "35%", width: "100%" }}>
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="contain"
            source={require("../../../../assets/no-data-animated.json")}
          />
        </View>
      )}
      <List.Section style={{ flex: 1 }}>
        <Text
          variant="heading"
          style={{ textAlign: "center", Spacer: "top,large" }}
        >
          Recent Operations
        </Text>
        <ScrollView>
          <View style={{ alignItems: "center", flex: 1 }}>
            <FlatList
              data={data1}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    padding: 15,
                    justifyContent: "space-between",
                    width: 300,
                    height: 50,
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
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{ margin: 8 }} />}
              contentContainerStyle={{
                paddingVertical: 8,
              }}
              ListEmptyComponent={() => <Text>No Operations Performed !</Text>}
            />
          </View>
        </ScrollView>
      </List.Section>
    </SafeArea>
  );
};
