import { getAllReport } from "../store/slices/reportSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";

export const useReport = () => {
  const dispatch = useDispatch<AppDispatch>(); // Ajout des parenthèses

  // Renommage pour éviter le conflit avec l'action importée
  const { reports, loading, error } = useSelector(
    (state: RootState) => state.report
  );

  useEffect(() => {
    dispatch(getAllReport()); // Appel de l'action avec parenthèses
  }, [dispatch]);

  const getMonthlySpended = async () => {
    try {
      const results = await dispatch(getAllReport()).unwrap();
      return results;
    } catch (error) {
      console.error(
        "Nous rencontrons une erreur lors de la récuperation des bilans",
        error
      );
      throw error;
    }
  };

  return {
    reports,
    loading,
    error,
  };
};
