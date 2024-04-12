import React, { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, List, TouchableRipple } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  return (
    <SafeArea style={{ backgroundColor: "aliceblue" }}>
      <List.Section style={{ alignItems: "center" }}>
        <Spacer size="medium" />
        <Text variant="heading2">Settings</Text>
      </List.Section>
      <ScrollView>
        <AvatarContainer>
          <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
          <Spacer position="top" size="large"></Spacer>
        </AvatarContainer>

        <List.Section title="Settings">
          <SettingsItem
            title="Edit Profile"
            left={(props) => (
              <List.Icon {...props} color="black" icon="pencil" />
            )}
            description="Tap here to edit your profile details."
            onPress={() => navigation.navigate("EditProfile")}
          />
          <SettingsItem
            title="Give Feedback"
            left={(props) => <List.Icon {...props} color="black" icon="send" />}
            description="Tap here to give feedback."
            onPress={() => navigation.navigate("Feedback")}
          />
          <SettingsItem
            title="Logout"
            left={(props) => <List.Icon {...props} color="black" icon="door" />}
            description="Tap here to logout from the system."
            onPress={onLogout}
          />
        </List.Section>
      </ScrollView>
    </SafeArea>
  );
};
