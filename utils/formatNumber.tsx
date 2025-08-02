/**
 * Options de formatage pour les nombres
 */
export interface FormatNumberOptions {
  /** Nombre de décimales à afficher (défaut: 2) */
  decimals?: number;
  /** Séparateur des milliers (défaut: ' ') */
  thousandsSeparator?: string;
  /** Séparateur décimal (défaut: ',') */
  decimalSeparator?: string;
  /** Préfixe à ajouter (ex: '€', '$') */
  prefix?: string;
  /** Suffixe à ajouter (ex: '%', '€') */
  suffix?: string;
  /** Forcer l'affichage des décimales même si elles sont à 0 */
  forceDecimals?: boolean;
  /** Locale pour le formatage automatique */
  locale?: string;
}

/**
 * Formate un nombre selon les options spécifiées
 * @param value - Le nombre à formater
 * @param options - Les options de formatage
 * @returns Le nombre formaté en string
 */
export function formatNumber(
  value: number | string | null | undefined,
  options: FormatNumberOptions = {}
): string {
  // Valeurs par défaut
  const {
    decimals = 2,
    thousandsSeparator = " ",
    decimalSeparator = ",",
    prefix = "",
    suffix = "",
    forceDecimals = false,
    locale,
  } = options;

  // Gestion des valeurs nulles/undefined
  if (value === null || value === undefined || value === "") {
    return "0";
  }

  // Conversion en nombre
  const num = typeof value === "string" ? parseFloat(value) : value;

  // Vérification si c'est un nombre valide
  if (isNaN(num)) {
    return "0";
  }

  // Si une locale est spécifiée, utiliser Intl.NumberFormat
  if (locale) {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: forceDecimals ? decimals : 0,
      maximumFractionDigits: decimals,
    });
    return `${prefix}${formatter.format(num)}${suffix}`;
  }

  // Formatage manuel
  let formattedNumber = num.toFixed(decimals);

  // Si on ne force pas les décimales, supprimer les zéros inutiles
  if (!forceDecimals) {
    formattedNumber = parseFloat(formattedNumber).toString();
  }

  // Séparer la partie entière et décimale
  const parts = formattedNumber.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1];

  // Ajouter le séparateur des milliers
  integerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator
  );

  // Reconstituer le nombre
  let result = integerPart;
  if (decimalPart && (forceDecimals || parseFloat(`0.${decimalPart}`) > 0)) {
    result += decimalSeparator + decimalPart;
  }

  return `${prefix}${result}${suffix}`;
}

/**
 * Formate un nombre en devise (Euro par défaut)
 */
export function formatCurrency(
  value: number | string | null | undefined,
  currency: string = "€",
  decimals: number = 2
): string {
  return formatNumber(value, {
    decimals,
    suffix: ` ${currency}`,
    forceDecimals: true,
  });
}

/**
 * Formate un nombre en pourcentage
 */
export function formatPercentage(
  value: number | string | null | undefined,
  decimals: number = 1
): string {
  const num = typeof value === "string" ? parseFloat(value) : value || 0;
  return formatNumber(num, {
    decimals,
    suffix: "%",
  });
}

/**
 * Formate un nombre compact (1K, 1M, 1B)
 */
export function formatCompact(
  value: number | string | null | undefined,
  decimals: number = 1
): string {
  const num = typeof value === "string" ? parseFloat(value) : value || 0;

  const absNum = Math.abs(num);

  if (absNum >= 1_000_000_000) {
    return formatNumber(num / 1_000_000_000, { decimals, suffix: "B" });
  } else if (absNum >= 1_000_000) {
    return formatNumber(num / 1_000_000, { decimals, suffix: "M" });
  } else if (absNum >= 1_000) {
    return formatNumber(num / 1_000, { decimals, suffix: "K" });
  }

  return formatNumber(num, { decimals: 0 });
}

/**
 * Formate un nombre selon les standards français
 */
export function formatNumberFR(
  value: number | string | null | undefined,
  decimals: number = 2
): string {
  return formatNumber(value, {
    decimals,
    thousandsSeparator: " ",
    decimalSeparator: ",",
    locale: "fr-FR",
  });
}

/**
 * Formate un nombre selon les standards anglais/américains
 */
export function formatNumberEN(
  value: number | string | null | undefined,
  decimals: number = 2
): string {
  return formatNumber(value, {
    decimals,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    locale: "en-US",
  });
}
