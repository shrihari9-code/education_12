import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from "react-native";
import React, { ForwardedRef } from "react";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import { LinkProps } from "expo-router";

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
} & LinkProps<any> &
  Readonly<TouchableOpacityProps>;

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

const SettingOptionItem = React.forwardRef(
  (
    { title, iconName, type, iconColor, ...props }: Props,
    ref: ForwardedRef<TouchableOpacity>
  ) => {
    return (
      <TouchableOpacity style={styles.optionItem} {...props} ref={ref}>
        <View style={styles.iconBackground}>
          <Icon name={iconName} type={type} color={iconColor} />
        </View>
        <Text style={styles.optionTitle}>{title}</Text>

        <Icon name="chevron-forward-sharp" type="ion-icon" color="#B0B3C3" />
      </TouchableOpacity>
    );
  }
);

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
