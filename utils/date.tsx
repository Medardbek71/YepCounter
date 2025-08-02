/**
 * Utilitaires pour la gestion des dates
 * Format français avec jours et mois en français
 */

// Tableaux des noms en français
const JOURS_SEMAINE = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

const MOIS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

/**
 * Formate la date du jour au format "Mercredi le 17 Juillet 2025"
 * @returns {string} La date formatée en français
 */
export const getDateDuJour = (): string => {
  const today = new Date();

  const jourSemaine = JOURS_SEMAINE[today.getDay()];
  const jour = today.getDate();
  const mois = MOIS[today.getMonth()];
  const annee = today.getFullYear();

  return `${jourSemaine} le ${jour} ${mois} ${annee}`;
};

/**
 * Formate une date spécifique au format "Mercredi le 17 Juillet 2025"
 * @param {Date} date - La date à formater
 * @returns {string} La date formatée en français
 */
export const formatDateFrancais = (date: Date): string => {
  const jourSemaine = JOURS_SEMAINE[date.getDay()];
  const jour = date.getDate();
  const mois = MOIS[date.getMonth()];
  const annee = date.getFullYear();

  return `${jourSemaine} le ${jour} ${mois} ${annee}`;
};

/**
 * Formate la date du jour au format court "17 Juillet 2025"
 * @returns {string} La date formatée sans le jour de la semaine
 */
export const getDateDuJourCourt = (): string => {
  const today = new Date();

  const jour = today.getDate();
  const mois = MOIS[today.getMonth()];
  const annee = today.getFullYear();

  return `${jour} ${mois} ${annee}`;
};

/**
 * Formate une date au format court "17 Juillet 2025"
 * @param {Date} date - La date à formater
 * @returns {string} La date formatée sans le jour de la semaine
 */
export const formatDateCourtFrancais = (date: Date): string => {
  const jour = date.getDate();
  const mois = MOIS[date.getMonth()];
  const annee = date.getFullYear();

  return `${jour} ${mois} ${annee}`;
};

/**
 * Obtient le jour de la semaine en français
 * @param {Date} date - La date (optionnelle, par défaut aujourd'hui)
 * @returns {string} Le jour de la semaine en français
 */
export const getJourSemaine = (date: Date = new Date()): string => {
  return JOURS_SEMAINE[date.getDay()];
};

/**
 * Obtient le mois en français
 * @param {Date} date - La date (optionnelle, par défaut aujourd'hui)
 * @returns {string} Le mois en français
 */
export const getMoisFrancais = (date: Date = new Date()): string => {
  return MOIS[date.getMonth()];
};

/**
 * Formate la date et l'heure au format français complet
 * @param {Date} date - La date à formater (optionnelle, par défaut aujourd'hui)
 * @returns {string} La date et l'heure formatées "Mercredi le 17 Juillet 2025 à 14:30"
 */
export const formatDateHeureFrancais = (date: Date = new Date()): string => {
  const dateFormatee = formatDateFrancais(date);
  const heures = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${dateFormatee} à ${heures}:${minutes}`;
};

/**
 * Vérifie si une date est aujourd'hui
 * @param {Date} date - La date à vérifier
 * @returns {boolean} True si c'est aujourd'hui
 */
export const estAujourdhui = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Calcule la différence en jours entre deux dates
 * @param {Date} date1 - Première date
 * @param {Date} date2 - Deuxième date (optionnelle, par défaut aujourd'hui)
 * @returns {number} Nombre de jours de différence
 */
export const differenceEnJours = (
  date1: Date,
  date2: Date = new Date()
): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Formate une date relative (il y a X jours, aujourd'hui, demain)
 * @param {Date} date - La date à formater
 * @returns {string} La date relative en français
 */
export const formatDateRelative = (date: Date): string => {
  const today = new Date();
  const diffJours = Math.floor(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffJours === 0) {
    return "Aujourd'hui";
  } else if (diffJours === 1) {
    return "Hier";
  } else if (diffJours === -1) {
    return "Demain";
  } else if (diffJours > 1) {
    return `Il y a ${diffJours} jours`;
  } else {
    return `Dans ${Math.abs(diffJours)} jours`;
  }
};

/**
 * Parse une chaîne de date ISO et la formate en français
 * @param {string} dateString - Chaîne de date ISO (ex: "2025-07-17T10:30:00Z")
 * @returns {string} Date formatée en français
 */
export const parseEtFormateDateISO = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Date invalide");
    }
    return formatDateFrancais(date);
  } catch (error) {
    console.error("Erreur lors du parsing de la date:", error);
    return "Date invalide";
  }
};

// Types utiles pour TypeScript
export type FormatDate = "complet" | "court" | "avec-heure" | "relatif";

/**
 * Fonction universelle de formatage de date
 * @param {Date} date - La date à formater
 * @param {FormatDate} format - Le type de format désiré
 * @returns {string} La date formatée selon le format choisi
 */
export const formaterDate = (
  date: Date,
  format: FormatDate = "complet"
): string => {
  switch (format) {
    case "complet":
      return formatDateFrancais(date);
    case "court":
      return formatDateCourtFrancais(date);
    case "avec-heure":
      return formatDateHeureFrancais(date);
    case "relatif":
      return formatDateRelative(date);
    default:
      return formatDateFrancais(date);
  }
};

// Export par défaut de la fonction principale
export default getDateDuJour;
