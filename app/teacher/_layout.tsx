import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Slot } from "expo-router";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

type Props = {};

const Layout = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <Slot />
      {isMenuOpen && <Sidebar toggleSidebar={toggleMenu} />}
    </>
  );
};

export default Layout;
