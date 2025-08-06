import React, { useCallback } from "react";
import { Text } from "@/components/Themed";
import { useReport } from "@/hooks/useReport";
import { useFocusEffect } from "expo-router";

const MonthlySpendedAmount = () => {
  const { reports, loading, error, refetch } = useReport();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  console.log(
    "Debug - reports:",
    reports,
    "loading:",
    loading,
    "error:",
    error
  );

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  if (error) {
    return <Text>Erreur: {error}</Text>;
  }

  // Calcul du montant dépensé
  const calculateMonthlyAmount = () => {
    try {
      if (!reports || reports.length === 0) {
        return "0 FCFA";
      }
      console.log("Je suis le plus bon");

      // CORRECTION: Vérification du type et de la structure des données
      const total = reports["data"].reduce((sum, item) => {
        const amount =
          typeof item === "object" && item !== null ? (item as any).amount : 0;
        console.log(amount);
        return sum + (amount || 0);
      }, 0);

      return `${total.toLocaleString()} FCFA`;
    } catch (error) {
      console.error("Erreur lors du calcul:", error);
      return "Erreur de calcul";
    }
  };

  return <Text>{calculateMonthlyAmount()}</Text>;
};

export default MonthlySpendedAmount;

// import React, { useCallback } from "react";
// import { Text } from "@/components/Themed";
// import { useReport } from "@/hooks/useReport";
// import { useFocusEffect } from "expo-router";

// const MonthlySpendedAmount = () => {
//   const { reports, loading, error, refetch } = useReport();

//   // Recharge les données à chaque focus
//   useFocusEffect(
//     useCallback(() => {
//       let isActive = true;

//       if (isActive) {
//         refetch();
//       }

//       return () => {
//         isActive = false;
//       };
//     }, [refetch])
//   );

//   if (loading) {
//     return <Text>Chargement...</Text>;
//   }

//   if (error) {
//     return <Text>Erreur: {error}</Text>;
//   }

//   // Mémoïsation du calcul
//   const monthlyAmount = React.useMemo(() => {
//     try {
//       if (!reports?.data?.length) {
//         return "0 FCFA";
//       }

//       const total = reports.data.reduce((sum: number, item: any) => {
//         const amount = item?.amount || 0;
//         return sum + amount;
//       }, 0);

//       return `${total.toLocaleString()} FCFA`;
//     } catch (error) {
//       console.error("Erreur de calcul:", error);
//       return "Erreur de calcul";
//     }
//   }, [reports]);

//   return <Text>{monthlyAmount}</Text>;
// };

// export default MonthlySpendedAmount;
