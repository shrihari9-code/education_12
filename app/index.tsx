import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { Link, router } from "expo-router";

type Props = {};

const Index = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>index</Text>
      <Link href="/login" style={styles.loginButton}>
        <Pressable>
          <Text>Login</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginButton: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 50,
    color: "white",
    backgroundColor: "blue",
  },
});
