import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { View } from "@/components/Themed";
import { router } from "expo-router";
import CompterList from "@/components/CompterList";

const Eneo_Home = () => {
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
          source={require("@/assets/images/eneo-logo.svg")}
          style={{
            width: 150,
            height: 70,
          }}
        />
        <TouchableOpacity onPress={() => router.push("/addCompter")}>
          <Image
            source={require("@/assets/images/add_circle.svg")}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </TouchableOpacity>
      </View>
      <CompterList />
    </View>
  );
};

export default Eneo_Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
});
