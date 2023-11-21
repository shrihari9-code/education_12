import { Image, StyleSheet, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { showToast } from "../helpers/toast-helper";
import { startActivityAsync } from "expo-intent-launcher";
import * as FileSystem from "expo-file-system";

type Props = {
  name: string;
  type: string;
  uri: string;
};

const NotesCard = ({ name, type, uri }: Props) => {
  const [notesIcon, setNotesIcon] = useState("");

  const handleFileType = () => {
    switch (type) {
      case "application/pdf":
        setNotesIcon(
          "https://png.pngtree.com/png-clipart/20220612/original/pngtree-pdf-file-icon-png-png-image_7965915.png"
        );
        break;
    }
  };

  const openFile = async () => {
    let fileUrl = "";

    try {
      const cacheDir = FileSystem.cacheDirectory + name;
      let res = await FileSystem.downloadAsync(uri, cacheDir);
      const content = await FileSystem.getContentUriAsync(res.uri);
      fileUrl = res.uri;

      const intentLauncherResult = await startActivityAsync(
        "android.intent.action.VIEW",
        {
          data: content,
          flags: 1,
          type,
        }
      );

      intentLauncherResult.resultCode;
    } catch (error) {
      console.log(error);
      showToast("Error in opening file");
    } finally {
      await FileSystem.deleteAsync(fileUrl, { idempotent: true });
    }
  };

  useEffect(() => {
    handleFileType();
  }, [type]);

  return (
    <Pressable style={styles.notesCard} onPress={openFile}>
      {notesIcon && (
        <Image
          style={styles.notesIcon}
          source={{
            uri: notesIcon,
          }}
          alt=""
        />
      )}
      <Text>{name}</Text>
      {/* <Text>{uri}</Text> */}

      <EntypoIcon name="dots-three-vertical" size={20} />
    </Pressable>
  );
};

export default NotesCard;

const styles = StyleSheet.create({
  notesCard: {
    height: 100,
    backgroundColor: "#E5E3E3",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  notesIcon: {
    height: 50,
    width: 50,
  },
});
