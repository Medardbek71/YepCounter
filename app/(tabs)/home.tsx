import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { Text, View } from "@/components/Themed";
import { getDateDuJour } from "@/utils/date";
import MonthlySpendedAmount from "@/components/MonthlySpendedAmount";
import { initializeNotifications } from "@/services/NotificationService";
import { difference } from "@/utils/spendingDifference";
import { useEffect, useState } from "react";

interface SpendingData {
  today: number;
  yesterday: number;
  difference: number;
}

export default function TabOneScreen() {
  const [spendingData, setSpendingData] = useState<SpendingData | null>(null);
  const [streak, setStreak] = useState<number | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeNotifications();

    const fetchSpendingData = async () => {
      try {
        const result = await difference();
        if (result) {
          setSpendingData(result);
          setStreak(result.streak);
          console.log("Voici les donnée", result.streak);
          console.log(`Différence: ${result.difference}`);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpendingData();
  }, []);

  // Fonction pour formater les montants
  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat("fr-FR").format(amount);
  };

  // Déterminer si la différence est positive ou négative
  const getDifferenceDisplay = () => {
    if (!spendingData) return { amount: 0, isPositive: false };

    const isPositive = spendingData.difference <= 0;
    const absoluteDifference = Math.abs(spendingData.difference);

    return { amount: absoluteDifference, isPositive };
  };

  const { amount: diffAmount, isPositive } = getDifferenceDisplay();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.dateText}>{getDateDuJour()}</Text>

        <TouchableOpacity
          onPress={() => router.push("/spendedList")}
          style={[styles.box, { backgroundColor: Colors.dark.turquoise }]}
        >
          <Text style={styles.amountText}>{<MonthlySpendedAmount />}</Text>
          <Text style={styles.descriptionText}>
            dépenser depuis le début du mois
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content2}>
        <TouchableOpacity
          style={[styles.box2, { backgroundColor: Colors.dark.pink }]}
          onPress={() => router.push("/Eneo_Home")}
        >
          <Image
            source={require("@/assets/images/eneo-logo.svg")}
            style={{ width: 70, height: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box2, { backgroundColor: Colors.dark.yellow }]}
          onPress={() => router.push("/canal_home")}
        >
          <Image
            source={require("@/assets/images/canal-logo.svg")}
            style={{ width: 120, height: 30 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content3}>
        <View style={[styles.box3]}>
          <Text style={{ fontSize: 30, fontFamily: "SpaceGrotesk" }}>
            {streak}
          </Text>
          <Text style={{ fontFamily: "SpaceGrotesk" }}>Jours</Text>
        </View>
        <View
          style={[
            styles.box4,
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            },
          ]}
        >
          <View
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Image
              source={
                isPositive
                  ? require("@/assets/images/up.svg")
                  : require("@/assets/images/down.svg")
              }
              style={{
                width: 50,
                height: 30,
              }}
            />
          </View>
          <View
            style={{
              width: "60%",
              height: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: isPositive ? "green" : "red",
                fontFamily: "SpaceGrotesk",
              }}
            >
              {loading ? "..." : formatAmount(diffAmount)}
            </Text>
            <Text style={{ fontFamily: "SpaceGrotesk" }}>
              par rapport à hier
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={[
            styles.box,
            {
              backgroundColor: Colors.dark.blueColor,
              display: "flex",
              flexDirection: "row",
            },
          ]}
          onPress={() => router.push("/daily_report")}
        >
          <View>
            <Image
              source={require("@/assets/images/money.png")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 25, fontFamily: "SpaceGrotesk" }}>
              Bilan
            </Text>
            <Text style={{ fontSize: 25, fontFamily: "SpaceGrotesk" }}>
              journalier
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    margin: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 300,
    color: Colors.light.text,
    marginBottom: 10,
    alignSelf: "baseline",
    fontFamily: "SpaceGrotesk",
  },
  box: {
    height: 132,
    width: 350,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.dark.borderColor,
    padding: 20,
  },
  amountText: {
    fontFamily: "SpaceGrotesk",
    fontSize: 36,
    // fontWeight: "bold",
    color: "black",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  descriptionText: {
    fontSize: 16,

    textAlign: "center",
    opacity: 0.9,
    alignSelf: "flex-start",
    fontFamily: "SpaceGrotesk",
  },
  content2: {
    display: "flex",
    flexDirection: "row",
    width: 350,
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: Colors.dark.borderColor,
  },
  box2: {
    width: 160,
    height: 132,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  content3: {
    display: "flex",
    flexDirection: "row",
    width: 350,
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: Colors.dark.borderColor,
    marginTop: 25,
  },
  box3: {
    width: 80,
    height: 132,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: Colors.dark.green,
  },
  box4: {
    width: 240,
    height: 132,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: Colors.dark.violet,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    fontFamily: "SpaceGrotesk",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
    fontFamily: "SpaceGrotesk",
  },
  detailAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark.text,
    fontFamily: "SpaceGrotesk",
  },
});
