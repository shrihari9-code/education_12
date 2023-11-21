import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import React, { useReducer } from "react";
import { showToast } from "../../helpers/toast-helper";
import { addStudent } from "../../services/auth";
import { router } from "expo-router";

type Props = {};

enum Actions {
  UPDATE_USERNAME = "UPDATE_USERNAME",
  UPDATE_PASSSWORD = "UPDATE_PASSSWORD",
  UPDATE_CONFIRM_PASSWORD = "UPDATE_CONFIRM_PASSWORD",
}

interface CredentialAction {
  type: Actions;
  payload: string;
}

interface CredentialType {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: CredentialType = {
  email: "",
  password: "",
  confirmPassword: "",
};

const reducer = (state: CredentialType, action: CredentialAction) => {
  const { type, payload } = action;

  switch (type) {
    case Actions.UPDATE_USERNAME:
      return {
        ...state,
        email: payload,
      };

    case Actions.UPDATE_PASSSWORD:
      return {
        ...state,
        password: payload,
      };

    case Actions.UPDATE_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: payload,
      };

    default:
      return state;
  }
};

const AddStudent = ({}: Props) => {
  const [credentials, dispatch] = useReducer(reducer, initialState);

  const handleInput = (type: Actions, text: string) => {
    dispatch({
      type,
      payload: text,
    });
  };

  const handleSubmit = async () => {
    try {
      if (credentials.password !== credentials.confirmPassword) {
        showToast("Passwords do not match");
        return;
      }

      if (credentials.password.length < 5) {
        showToast("Enter a valid password with atleast six characters");
        return;
      }

      const { data } = await addStudent(
        credentials.email,
        credentials.password
      );

      if (!data.success) throw new Error("Failed to create student");

      showToast("Successfully added student");
      router.push("/teacher/lectures");
    } catch (error: unknown) {
      console.log(error);
      showToast("Error in creating student");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={credentials.email}
          onChangeText={(text) => handleInput(Actions.UPDATE_USERNAME, text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={credentials.password}
          onChangeText={(text) => handleInput(Actions.UPDATE_PASSSWORD, text)}
          textContentType="password"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          onChangeText={(text) =>
            handleInput(Actions.UPDATE_CONFIRM_PASSWORD, text)
          }
          textContentType="password"
        />

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddStudent;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },

  form: {
    marginVertical: 50,
  },

  textInput: {
    padding: 7,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 8,
  },

  submitBtn: {
    backgroundColor: "#145AAC",
    padding: 15,
    borderRadius: 10,
    marginTop: 50,
  },

  submitBtnText: {
    color: "white",
    textAlign: "center",
  },
});
