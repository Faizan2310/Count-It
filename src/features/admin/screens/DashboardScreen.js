import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import Icon from "react-native-vector-icons/Ionicons";

export const DashboardScreen = ({ navigation }) => {
  return (
    <SafeArea style={{ backgroundColor: "aliceblue" }}>
      <List.Section style={{ alignItems: "center" }}>
        <Spacer size="medium" />
        <Text variant="heading2">Dashboard</Text>
      </List.Section>
      {/* <Text
        variant="heading"
        style={{ textAlign: "center", Spacer: "top,large" }}
      >
        Users Statistics
      </Text> */}

      <List.Section>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [10, 45, 28, 80, 99, 43, 80, 99, 43],
                strokeWidth: 1.5,
              },
            ],
          }}
          width={Dimensions.get("window").width - 10}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 18,
            borderRadius: 26,
          }}
        />
      </List.Section>
      <ScrollView>
        <List.Section style={styles.listItemContainer}>
          <Text
            variant="heading2"
            onPress={() => navigation.navigate("FeedbackDetails")}
          >
            Feedbacks
          </Text>
          <Icon name="caret-forward-sharp" size={20} color="black" />
        </List.Section>
        <Spacer size={"large"} />
        <List.Section style={styles.listItemContainer}>
          <Text
            variant="heading2"
            onPress={() => navigation.navigate("UsersDatabase")}
          >
            Users Database
          </Text>
          <Icon name="caret-forward-sharp" size={20} color="black" />
        </List.Section>
        <Spacer size={"large"} />
        <List.Section style={styles.listItemContainer}>
          <Text
            variant="heading2"
            onPress={() => navigation.navigate("EditProfileDatabase")}
          >
            Edit Profile Database
          </Text>
          <Icon name="caret-forward-sharp" size={20} color="black" />
        </List.Section>
        <Spacer size={"large"} />
        <List.Section style={styles.listItemContainer}>
          <Text
            variant="heading2"
            onPress={() => navigation.navigate("AddRemoveTemplates")}
          >
            Add/Remove Templates
          </Text>
          <Icon name="caret-forward-sharp" size={20} color="black" />
        </List.Section>
        <Spacer size={"large"} />
        <List.Section style={styles.listItemContainer}>
          <Text
            variant="heading2"
            onPress={() => navigation.navigate("Inventory")}
          >
            Inventory
          </Text>
          <Icon name="caret-forward-sharp" size={20} color="black" />
        </List.Section>
        <Spacer size={"large"} />

        <Spacer size={"large"} />
      </ScrollView>
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#a07aaa",
    padding: 20,
    borderRadius: 10,
    elevation: 20,
  },
});
