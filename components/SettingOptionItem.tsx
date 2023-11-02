import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import IonIcon from "react-native-vector-icons/Ionicons";

type IconType = {
  type: string;
  name: string;
  color?: string;
};

type Props = {
  iconName: string;
  title: string;
  type: string;
  iconColor?: string;
};

function Icon({ type, name, color }: IconType) {
  const size = 25;
  switch (type) {
    case "entypo":
      return <EntypoIcon name={name} size={size} color={color ?? "black"} />;

    case "antdesign":
      return <AntDesignIcon name={name} size={size} color={color ?? "black"} />;

    case "feather":
      return <FeatherIcon name={name} size={size} color={color ?? "black"} />;

    case "fa5":
      return (
        <FontAwesome5Icon name={name} size={size} color={color ?? "black"} />
      );

    case "evil-icon":
      return <EvilIcon name={name} size={size} color={color ?? "black"} />;

    case "material-icon":
      return <MaterialIcon name={name} size={size} color={color ?? "black"} />;

    case "ion-icon":
      return <IonIcon name={name} size={size} color={color ?? "black"} />;
  }
}

const SettingOptionItem = ({ title, iconName, type, iconColor }: Props) => {
  return (
    <TouchableOpacity style={styles.optionItem}>
      <View style={styles.iconBackground}>
        <Icon name={iconName} type={type} color={iconColor} />
      </View>
      <Text style={styles.optionTitle}>{title}</Text>

      <Icon name="chevron-forward-sharp" type="ion-icon" color="#B0B3C3" />
    </TouchableOpacity>
  );
};

export default SettingOptionItem;

const styles = StyleSheet.create({
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconBackground: {
    backgroundColor: "#FFF3E1",
    padding: 10,
    borderRadius: 10,
  },

  optionTitle: {
    fontSize: 16,
    color: "#313966",
    fontWeight: "700",
  },
});
