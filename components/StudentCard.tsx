import { StyleSheet, Text, View } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

type Props = {
  firstName: string;
  lastName?: string;
  school?: string;
};

const StudentCard = ({ firstName, school, lastName }: Props) => {
  return (
    <View style={styles.studentCard}>
      <View style={styles.horizontalFlexBox}>
        <FontAwesomeIcon name="user" size={25} />
        <Text style={styles.studentName}>
          {firstName} {lastName}
        </Text>
      </View>

      <Text>School: {school}</Text>
    </View>
  );
};

export default StudentCard;

const styles = StyleSheet.create({
  studentCard: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 12,
  },

  horizontalFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  studentName: {
    fontWeight: "600",
  },
});
