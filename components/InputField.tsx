import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
} from "react-native";
import { useState } from "react";
import { BLUE, LIGHT_GRAY } from "../constants/Colors";

type Props = {
  value: string;
  changeHandler(text: string): void;
  placeholder: string;
  multiline?: boolean;
};

const InputField = ({
  value,
  changeHandler,
  placeholder,
  multiline = false,
}: Props) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={(text) => changeHandler(text)}
      placeholder={placeholder}
      onFocus={(e) => setFocused(true)}
      onBlur={(e) => setFocused(false)}
      underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY}
      multiline={multiline}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
});
