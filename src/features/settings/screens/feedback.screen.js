import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { useContext, useState } from "react";
import { Alert, View } from "react-native";
import { Avatar, List, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AuthButton } from "../../account/components/account.styles";
const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export const Feedback = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [feedback, setFeedback] = useState("");
  console.log(user);
  const onSubmit = () => {
    firebase
      .firestore()
      .collection("feedbacks")
      .add({
        email: user.email,
        feedbacks: feedback,
      })
      .then((res) => {
        Alert.alert("Feedback Submit Successfully");
        setFeedback("");
        navigation.goBack();
      });
  };
  return (
    <View style={{ alignItems: "center", backgroundColor: "#FFFFFF", flex: 1 }}>
      <Text variant="heading">Contact Us</Text>
      <Spacer size="large"></Spacer>
      <Text variant="heading2">
        Reach Us at <Text variant="error">111-222-333 </Text>!
      </Text>
      <Spacer size="large"></Spacer>
      <TextInput
        style={{ width: 350, height: 50, borderRadius: 10, elevation: 20 }}
        editable={false}
      >
        {user.email}
      </TextInput>
      <Spacer size="large"></Spacer>
      <TextInput
        style={{
          width: "85%",
          height: 90,
          elevation: 20,
        }}
        label="Feedback"
        multiline={true}
        numberOfLines={3}
        onChangeText={(val) => setFeedback(val)}
        value={feedback}
      />

      <Spacer size="large"></Spacer>
      <AuthButton icon="lock-open-outline" mode="contained" onPress={onSubmit}>
        Submit
      </AuthButton>
    </View>
  );
};
