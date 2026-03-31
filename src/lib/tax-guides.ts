export interface TaxGuide {
  country: string;
  code: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  ranges: { regime: string; range: string }[];
}

export const TAX_GUIDES: TaxGuide[] = [
  {
    country: "Brazil",
    code: "BR",
    flag: "\ud83c\udde7\ud83c\uddf7",
    currency: "BRL",
    currencySymbol: "R$",
    ranges: [
      { regime: "MEI", range: "1-5%" },
      { regime: "Simples Nacional", range: "6-20%" },
      { regime: "Lucro Presumido", range: "13-17%" },
    ],
  },
  {
    country: "United States",
    code: "US",
    flag: "\ud83c\uddfa\ud83c\uddf8",
    currency: "USD",
    currencySymbol: "$",
    ranges: [
      { regime: "Self-employment tax", range: "15.3%" },
      { regime: "Federal + State income", range: "15-30%" },
    ],
  },
  {
    country: "United Kingdom",
    code: "GB",
    flag: "\ud83c\uddec\ud83c\udde7",
    currency: "GBP",
    currencySymbol: "\u00a3",
    ranges: [
      { regime: "Small business", range: "14-20%" },
      { regime: "VAT (if registered)", range: "20%" },
    ],
  },
  {
    country: "Germany",
    code: "DE",
    flag: "\ud83c\udde9\ud83c\uddea",
    currency: "EUR",
    currencySymbol: "\u20ac",
    ranges: [
      { regime: "Kleinunternehmer (small)", range: "0%" },
      { regime: "Standard + USt", range: "14-19%" },
    ],
  },
  {
    country: "France",
    code: "FR",
    flag: "\ud83c\uddeb\ud83c\uddf7",
    currency: "EUR",
    currencySymbol: "\u20ac",
    ranges: [
      { regime: "Micro-entrepreneur", range: "12-22%" },
      { regime: "Standard", range: "23-25%" },
    ],
  },
  {
    country: "India",
    code: "IN",
    flag: "\ud83c\uddee\ud83c\uddf3",
    currency: "INR",
    currencySymbol: "\u20b9",
    ranges: [
      { regime: "Presumptive (44ADA)", range: "6-8%" },
      { regime: "GST", range: "18%" },
    ],
  },
  {
    country: "Mexico",
    code: "MX",
    flag: "\ud83c\uddf2\ud83c\uddfd",
    currency: "MXN",
    currencySymbol: "$",
    ranges: [
      { regime: "RESICO", range: "1-2.5%" },
      { regime: "General regime", range: "30% ISR" },
    ],
  },
  {
    country: "Colombia",
    code: "CO",
    flag: "\ud83c\udde8\ud83c\uddf4",
    currency: "COP",
    currencySymbol: "$",
    ranges: [
      { regime: "Simplified (RST)", range: "1.2-5.9%" },
      { regime: "General", range: "7-14.5%" },
    ],
  },
  {
    country: "Australia",
    code: "AU",
    flag: "\ud83c\udde6\ud83c\uddfa",
    currency: "AUD",
    currencySymbol: "A$",
    ranges: [
      { regime: "GST", range: "10%" },
      { regime: "Income tax", range: "19-45%" },
    ],
  },
  {
    country: "Canada",
    code: "CA",
    flag: "\ud83c\udde8\ud83c\udde6",
    currency: "CAD",
    currencySymbol: "C$",
    ranges: [
      { regime: "GST/HST", range: "5-15%" },
      { regime: "Income tax", range: "15-33%" },
    ],
  },
  {
    country: "Portugal",
    code: "PT",
    flag: "\ud83c\uddf5\ud83c\uddf9",
    currency: "EUR",
    currencySymbol: "\u20ac",
    ranges: [
      { regime: "Simplified regime", range: "14-28%" },
      { regime: "IVA", range: "23%" },
    ],
  },
  {
    country: "Spain",
    code: "ES",
    flag: "\ud83c\uddea\ud83c\uddf8",
    currency: "EUR",
    currencySymbol: "\u20ac",
    ranges: [
      { regime: "Autonomo", range: "7-15% IRPF" },
      { regime: "IVA", range: "21%" },
    ],
  },
  {
    country: "Argentina",
    code: "AR",
    flag: "\ud83c\udde6\ud83c\uddf7",
    currency: "ARS",
    currencySymbol: "$",
    ranges: [
      { regime: "Monotributo", range: "1-5%" },
      { regime: "General", range: "21% IVA + 35% Ganancias" },
    ],
  },
  {
    country: "Israel",
    code: "IL",
    flag: "\ud83c\uddee\ud83c\uddf1",
    currency: "ILS",
    currencySymbol: "\u20aa",
    ranges: [
      { regime: "Exempt dealer", range: "0% VAT" },
      { regime: "Licensed dealer", range: "17% VAT" },
      { regime: "Income tax", range: "10-50%" },
    ],
  },
  {
    country: "Japan",
    code: "JP",
    flag: "\ud83c\uddef\ud83c\uddf5",
    currency: "JPY",
    currencySymbol: "\u00a5",
    ranges: [
      { regime: "Consumption tax", range: "10%" },
      { regime: "Income tax", range: "5-45%" },
    ],
  },
  {
    country: "South Korea",
    code: "KR",
    flag: "\ud83c\uddf0\ud83c\uddf7",
    currency: "KRW",
    currencySymbol: "\u20a9",
    ranges: [
      { regime: "VAT", range: "10%" },
      { regime: "Income tax", range: "6-45%" },
    ],
  },
  {
    country: "Nigeria",
    code: "NG",
    flag: "\ud83c\uddf3\ud83c\uddec",
    currency: "NGN",
    currencySymbol: "\u20a6",
    ranges: [
      { regime: "VAT", range: "7.5%" },
      { regime: "Company tax", range: "0-30%" },
    ],
  },
  {
    country: "South Africa",
    code: "ZA",
    flag: "\ud83c\uddff\ud83c\udde6",
    currency: "ZAR",
    currencySymbol: "R",
    ranges: [
      { regime: "Turnover tax (micro)", range: "0-3%" },
      { regime: "VAT (if >R1M)", range: "15%" },
    ],
  },
  {
    country: "Indonesia",
    code: "ID",
    flag: "\ud83c\uddee\ud83c\udde9",
    currency: "IDR",
    currencySymbol: "Rp",
    ranges: [
      { regime: "UMKM (SME)", range: "0.5%" },
      { regime: "Standard", range: "11% VAT" },
    ],
  },
  {
    country: "UAE",
    code: "AE",
    flag: "\ud83c\udde6\ud83c\uddea",
    currency: "AED",
    currencySymbol: "AED",
    ranges: [
      { regime: "VAT", range: "5%" },
      { regime: "Corporate tax (>375K AED)", range: "9%" },
    ],
  },
];

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "\u20ac", name: "Euro" },
  { code: "GBP", symbol: "\u00a3", name: "British Pound" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "MXN", symbol: "$", name: "Mexican Peso" },
  { code: "COP", symbol: "$", name: "Colombian Peso" },
  { code: "ARS", symbol: "$", name: "Argentine Peso" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "INR", symbol: "\u20b9", name: "Indian Rupee" },
  { code: "JPY", symbol: "\u00a5", name: "Japanese Yen" },
  { code: "KRW", symbol: "\u20a9", name: "South Korean Won" },
  { code: "ILS", symbol: "\u20aa", name: "Israeli Shekel" },
  { code: "NGN", symbol: "\u20a6", name: "Nigerian Naira" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  { code: "AED", symbol: "AED", name: "UAE Dirham" },
];

export function getTaxGuideByCode(code: string): TaxGuide | undefined {
  return TAX_GUIDES.find((g) => g.code === code);
}
