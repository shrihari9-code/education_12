import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import React, { useReducer } from "react";

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
  userName: string;
  password: string;
  confirmPassword: string;
}

const initialState: CredentialType = {
  userName: "",
  password: "",
  confirmPassword: "",
};

const reducer = (state: CredentialType, action: CredentialAction) => {
  const { type, payload } = action;

  switch (type) {
    case Actions.UPDATE_USERNAME:
      return {
        ...state,
        userName: payload,
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

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          placeholder="User Name"
          value={credentials.userName}
          onChangeText={(text) => handleInput(Actions.UPDATE_USERNAME, text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={credentials.password}
          onChangeText={(text) => handleInput(Actions.UPDATE_PASSSWORD, text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          onChangeText={(text) =>
            handleInput(Actions.UPDATE_CONFIRM_PASSWORD, text)
          }
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
