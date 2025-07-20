import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import PrincipalButton from "@/components/PrincipalButton";
import Colors from "@/constants/Colors";
import React, { useState } from "react";

const addCanal = () => {
  const handleAction = () => {
    alert("couscous");
  };
  const [suscriberNumber, setSuscriberNumber] = useState<string>();
  const [suscriberLabel, setSuscriberLabel] = useState<string>("");
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/canal-logo.svg")}
            style={{
              width: 150,
              height: 40,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 36 }}>Ajouter un</Text>
          <Text style={{ fontSize: 36 }}>décodeur</Text>
        </View>
        <View style={styles.textInputLabel}>
          <Text style={styles.label}>Enter le numero de reabonement</Text>
          <TextInput
            value={suscriberNumber?.toString()}
            onChangeText={(text) => setSuscriberNumber(text)}
            placeholder="014XXXXXX"
            keyboardType="numeric"
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Entrer un libéllé</Text>
          <TextInput
            value={suscriberLabel}
            onChangeText={(text) => setSuscriberLabel(text)}
            placeholder="télé du salon"
            style={styles.textInput}
          />
        </View>
      </View>
      <PrincipalButton
        title="Enregistrer"
        onPress={handleAction}
        service={"canal"}
      />
    </View>
  );
};

export default addCanal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
  label: {
    marginLeft: 15,
    fontSize: 15,
  },
  textInput: {
    borderColor: Colors.dark.yellow,
    borderWidth: 1,
    marginTop: 10,
    width: "95%",
    height: 50,
    padding: 4,
    borderRadius: 5,
    alignSelf: "center",
  },
  textInputLabel: {
    marginBottom: 20,
  },
});
