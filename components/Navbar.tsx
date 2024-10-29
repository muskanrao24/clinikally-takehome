import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import CartIcon from "./CartIcon";

const Navbar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconGroup}>
        <TouchableOpacity style={styles.icon}>
          <AntDesign name="menuunfold" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      <View style={styles.iconGroup}>
        <TouchableOpacity style={styles.icon}>
          <AntDesign name="user" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <CartIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  iconGroup: {
    width: "auto",
    flexDirection: "row",
    gap: 8,
  },
  icon: {
    width: 40,
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 40,
    resizeMode: "contain",
    flex: 1,
    marginLeft: 16,
  },
});

export default Navbar;
