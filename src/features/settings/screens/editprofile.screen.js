import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Caption, List, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AuthButton } from "../../account/components/account.styles";
import { KeyboardAvoidingView } from "react-native";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export const EditProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [usr, setUsr] = useState(null);
  const { onLogout, user } = useContext(AuthenticationContext);
  const getUser = async () => {
    const usr = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get();
    console.log(usr.data());
    setUsr(usr.data());
    setFullName(usr.data().fullName);
    setPhoneNumber(usr.data().phonenumber);
    setAddress(usr.data().address);
  };
  const handleSubmit = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        fullName: fullName,
        address: address,
        phonenumber: phoneNumber,
      })
      .then((res) => {
        Alert.alert("User Updated Successfully");
        navigation.goBack();
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        flex: 1,
        keyboardHidesNavigationBar: "true",
      }}
    >
      <ScrollView>
        <AvatarContainer>
          <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
          <Spacer position="top" size="large">
            <Text
              variant="label"
              style={{
                textAlign: "center",
                fontSize: 30,
                color: "rgb(149,105,195)",
              }}
            >
              {fullName}
            </Text>
            <Text
              variant="label"
              style={{ textAlign: "center", color: "rgb(149,105,195)" }}
            >
              {user.email}
            </Text>
          </Spacer>
        </AvatarContainer>
        <Caption style={{ textAlign: "left" }}>
          Note: Email cannot be changed.
        </Caption>
        <List.Section>
          <Text variant="label" style={{ textAlign: "center" }}>
            Full Name
          </Text>
          <Spacer size="small"></Spacer>
          <TextInput
            style={{ width: 350, height: 50 }}
            value={fullName}
            placeholder="Full Name"
            onChangeText={(val) => setFullName(val)}
          />
          <Spacer size="small"></Spacer>
          <Text variant="label" style={{ textAlign: "center" }}>
            Email
          </Text>
          <Spacer size="small"></Spacer>
          <TextInput
            style={{
              width: 350,
              height: 50,
              colors: { text: "gray" },
            }}
            placeholder="Email"
            value={user.email}
            editable={false}
          />
          <Spacer size="small"></Spacer>
          <Text variant="label" style={{ textAlign: "center" }}>
            Address
          </Text>
          <Spacer size="small"></Spacer>
          <TextInput
            style={{ width: 350, height: 50 }}
            value={address}
            placeholder="Address"
            keyboardType="phone-pad"
            onChangeText={(val) => setAddress(val)}
          />
          <Spacer size="small"></Spacer>
          <Text variant="label" style={{ textAlign: "center" }}>
            Phone Number
          </Text>
          <Spacer size="small"></Spacer>
          <TextInput
            style={{ width: 350, height: 50 }}
            value={phoneNumber}
            placeholder="Phone Number"
            onChangeText={(val) => setPhoneNumber(val)}
          />
          <Spacer size="large"></Spacer>
        </List.Section>

        <AuthButton icon="check" mode="contained" onPress={handleSubmit}>
          Save Changes
        </AuthButton>
      </ScrollView>
    </View>
  );
};
