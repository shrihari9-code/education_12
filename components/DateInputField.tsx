import { StyleSheet, Text, Pressable, View } from "react-native";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker/";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  value: Date | null;
  changeHandler(event: DateTimePickerEvent, date?: Date, field?: string): void;
  placeholder: string;
};

const DateInputField = ({ value, changeHandler, placeholder }: Props) => {
  const showMode = () => {
    // if (value === null) return;

    DateTimePickerAndroid.open({
      value: value ?? new Date(1598051730000),
      onChange: changeHandler,
      mode: "time",
    });
  };

  return (
    <View style={styles.dateInput}>
      <Pressable
        onPress={showMode}
        style={[styles.dateInputButton, styles.dateInputBorder]}
      >
        <Text style={styles.dateInputText}>
          {value ? value.toLocaleTimeString() : placeholder}
        </Text>
        <MaterialCommunityIcon name="clock-time-four-outline" size={20} />
      </Pressable>
    </View>
  );
};

export default DateInputField;

const styles = StyleSheet.create({
  dateInput: {
    paddingVertical: 6,
  },

  dateInputText: {
    padding: 6,
    minWidth: 120,
  },

  dateInputButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 120,
    paddingVertical: 6,
    paddingHorizontal: 2,
  },

  dateInputBorder: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#D3D3D3",
  },
});
