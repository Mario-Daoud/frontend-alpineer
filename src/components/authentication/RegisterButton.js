import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import constants from "../../styles/constants";
import { useAppContext } from "../../../AppContext";
import { API_URL } from "@env";

const onRegisterPress = (props) => {
  const { username, password, confirmPassword } = props.user;
  const { navigation } = props.navigation;

  if (password !== confirmPassword) {
    console.log("Passwords do not match");
    return;
  }

  fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        navigation.goBack();
      } else {
        console.log("Register failed");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default function RegisterButton(props) {
  const { user, navigation } = props;
  const { theme } = useAppContext();

  return (
    <Pressable
      style={[styles.registerButton, { backgroundColor: theme.PRIMARY }]}
      onPress={() => onRegisterPress({ user, navigation })}
    >
      <Text style={styles.registerText}>Register</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  registerButton: {
    borderRadius: constants.BORDERRADIUS.MEDIUM,
    padding: constants.MARGIN.MEDIUM,
    alignItems: "center",
  },
  registerText: {
    color: "white",
    fontSize: constants.FONTSIZE.MEDIUM,
  },
});
