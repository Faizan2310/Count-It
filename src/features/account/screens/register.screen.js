import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { TouchableOpacity, View } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setaddress] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const { onRegister, isLoading, error } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <AccountCover />
      <Title style={{ color: "white" }}>Count It!</Title>
      <AccountContainer>
        <AuthInput
          label="Full Name"
          value={fullName}
          textContentType="name"
          autoCapitalize="none"
          onChangeText={(f) => setFullName(f)}
        />
        <Spacer size="large"></Spacer>

        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(rp) => setRepeatedPassword(rp)}
          />
          <Spacer size="large"></Spacer>
          <AuthInput
            label="Phone Number"
            value={phonenumber}
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            autoCapitalize="none"
            onChangeText={(pn) => setphonenumber(pn)}
          />
          <Spacer size="large"></Spacer>
          <AuthInput
            label="Address"
            textContentType="fullStreetAddress"
            value={address}
            autoCapitalize="none"
            onChangeText={(a) => setaddress(a)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() =>
                onRegister(
                  email,
                  password,
                  repeatedPassword,
                  fullName,
                  phonenumber,
                  address
                )
              }
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.red800} />
          )}
        </Spacer>
        <View
          style={{
            alignItems: "center",
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>Already have an account?</Text>
          <TouchableOpacity
            style={{ paddingHorizontal: 5 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: colors.brand.primary }}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
