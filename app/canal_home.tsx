import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import CanalList from "../components/CanalList";
import React from "react";

const canal_home = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/canal-logo.svg")}
          style={{
            width: 150,
            height: 40,
          }}
        />
        <TouchableOpacity onPress={() => router.push("/addCanal")}>
          <Image
            source={require("@/assets/images/add_circle.svg")}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </TouchableOpacity>
      </View>
      <CanalList />
    </View>
  );
};

export default canal_home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
});
