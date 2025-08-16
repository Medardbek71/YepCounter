import databaseService from "@/services/DatabaseService";

// Fonction pour vérifier si une date correspond à un jour spécifique
const checkDate = (timestamp: number, targetDate: Date): boolean => {
  const date = new Date(timestamp);
  const target = new Date(targetDate);

  return (
    date.getDate() === target.getDate() &&
    date.getMonth() === target.getMonth() &&
    date.getFullYear() === target.getFullYear()
  );
};

// Fonction pour obtenir la date précédente
const getPreviousDay = (date: Date): Date => {
  const prevDay = new Date(date);
  prevDay.setDate(date.getDate() - 1);
  return prevDay;
};

// Fonction pour vérifier si une date a des dépenses
const hasExpensesOnDate = (reports: any[], targetDate: Date): boolean => {
  return reports.some((report: any) =>
    checkDate(report.created_at, targetDate)
  );
};

// Fonction pour calculer le streak
const calculateStreak = (reports: any[]): number => {
  const today = new Date();
  let currentDate = new Date(today);
  let streak = 0;

  // Vérifier aujourd'hui en premier
  if (!hasExpensesOnDate(reports, currentDate)) {
    // Si aujourd'hui n'a pas de dépenses, streak = 0
    return 0;
  }

  // Compter les jours consécutifs avec des dépenses
  while (hasExpensesOnDate(reports, currentDate)) {
    streak++;
    currentDate = getPreviousDay(currentDate);

    // Protection contre les boucles infinies (limite à 365 jours)
    if (streak > 365) {
      break;
    }
  }

  return streak;
};

export const difference = async (): Promise<{
  today: number;
  yesterday: number;
  difference: number;
  streak: number;
} | null> => {
  const TODAY = new Date();
  const YESTERDAY = new Date();
  YESTERDAY.setDate(TODAY.getDate() - 1);

  try {
    const data = await databaseService.getAllReport();

    // Calculer le total d'aujourd'hui
    const getTotalToday = (): number => {
      const todayReports = data.data.filter((report: any) =>
        checkDate(report.created_at, TODAY)
      );

      return todayReports.reduce((acc: number, report: any) => {
        return acc + (report.amount || 0);
      }, 0);
    };

    // Calculer le total d'hier
    const getTotalYesterday = (): number => {
      const yesterdayReports = data.data.filter((report: any) =>
        checkDate(report.created_at, YESTERDAY)
      );

      return yesterdayReports.reduce((acc: number, report: any) => {
        return acc + (report.amount || 0);
      }, 0);
    };

    const todayTotal = getTotalToday();
    const yesterdayTotal = getTotalYesterday();
    const diff = todayTotal - yesterdayTotal;

    // Calculer le streak
    const currentStreak = calculateStreak(data.data);

    // console.log(`Dépenses d'aujourd'hui: ${todayTotal}`);
    // console.log(`Dépenses d'hier: ${yesterdayTotal}`);
    // console.log(`Différence: ${diff}`);
    // console.log(`Streak actuel: ${currentStreak} jours`);

    return {
      today: todayTotal,
      yesterday: yesterdayTotal,
      difference: diff,
      streak: currentStreak,
    };
  } catch (error) {
    console.error("Erreur lors du calcul des dépenses:", error);
    return null;
  }
};
