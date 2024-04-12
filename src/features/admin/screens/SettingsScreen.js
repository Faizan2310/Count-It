import React, { useContext } from "react";
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";
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

export const SettingsScreenAdmin = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  return (
    <SafeArea style={{ backgroundColor: "aliceblue" }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
            title="Logout"
            left={(props) => <List.Icon {...props} color="black" icon="door" />}
            description="Tap here to logout from the system."
            onPress={onLogout}
          />
        </List.Section>
      </ScrollView>
      </GestureHandlerRootView>
    </SafeArea>
  );
};
