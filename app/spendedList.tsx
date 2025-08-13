import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import databaseService from "@/services/DatabaseService";

const spendedList = () => {
  const [reports, setReport] = useState<any>([]);
  useEffect(() => {
    const getReport = async () => {
      try {
        const reports = await databaseService.getAllReport();
        // console.log("voici les resultats de la requete", reports.data);
        setReport(reports.data);
        // console.log(reports);
      } catch (error) {
        console.error(
          "nous ne parvenons pas a recuperer la liste des report nous rencontrons cette erreur",
          error
        );
      }
    };
    getReport();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontFamily: "SpaceGrotesk" }}>
        Liste des dépense pour ce mois
      </Text>
      {reports.reverse().map((report: any) => (
        <View style={styles.report} key={report.id_dailyReport}>
          <Text style={{ fontFamily: "SpaceGrotesk" }}>{report.reason}</Text>
          <Text style={{ fontFamily: "SpaceGrotesk" }}> - {report.amount}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default spendedList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
  report: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});
