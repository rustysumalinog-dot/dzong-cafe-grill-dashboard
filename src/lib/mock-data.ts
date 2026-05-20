export type BranchCode = "LUB" | "ELN" | "COR";

export type Status = "ok" | "low" | "critical";
export type StaffStatus = "in" | "late" | "off";
export type Sentiment = "positive" | "neutral" | "negative";

export interface Branch {
  code: BranchCode;
  name: string;
  location: string;
  shortLocation: string;
  fullCode: string;
  address: string;
  manager: string;
  openedAt: string;
  seatingCapacity: number;
  hours: string;
}

export interface DayKPIs {
  sales: number;
  salesDeltaPct: number;
  transactions: number;
  transactionsDeltaPct: number;
  avgTicket: number;
  avgTicketDeltaPct: number;
  laborCostPct: number;
  laborCostDeltaPct: number;
}

export interface FerryInfo {
  date: string;
  daysAway: number;
  port: string;
  vessel: string;
  cutoffOrder: string;
}

export interface InventoryItem {
  sku: string;
  name: string;
  unit: string;
  onHand: number;
  par: number;
  status: Status;
  lastDelivery: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  status: StaffStatus;
  hourlyRate: number;
}

export interface Review {
  id: number;
  source: "Google" | "Facebook" | "TripAdvisor";
  author: string;
  rating: number;
  text: string;
  date: string;
  responded: boolean;
  sentiment: Sentiment;
}

export interface TopItem {
  name: string;
  sold: number;
  revenue: number;
  category: string;
}

export interface BranchData {
  branch: Branch;
  todayKPIs: DayKPIs;
  weekSales: { day: string; sales: number; transactions: number }[];
  hourlyTraffic: { hour: string; customers: number }[];
  topItems: TopItem[];
  inventory: InventoryItem[];
  nextFerry: FerryInfo;
  staff: StaffMember[];
  reviews: Review[];
  reviewStats: {
    average: number;
    total: number;
    thisWeek: number;
    responseRate: number;
    bySource: { source: string; count: number; avg: number }[];
  };
}

const lubang: BranchData = {
  branch: {
    code: "LUB",
    name: "Dzong Cafe & Grill",
    location: "Lubang Island",
    shortLocation: "Lubang",
    fullCode: "DZG-LUB-001",
    address: "Tilik, Lubang, Occidental Mindoro",
    manager: "Rusty Sumalinog",
    openedAt: "2023-08-14",
    seatingCapacity: 48,
    hours: "7:00 AM – 10:00 PM",
  },
  todayKPIs: {
    sales: 64280,
    salesDeltaPct: 14.2,
    transactions: 187,
    transactionsDeltaPct: 8.1,
    avgTicket: 344,
    avgTicketDeltaPct: 5.6,
    laborCostPct: 23.8,
    laborCostDeltaPct: -2.1,
  },
  weekSales: [
    { day: "Mon", sales: 38400, transactions: 118 },
    { day: "Tue", sales: 41200, transactions: 124 },
    { day: "Wed", sales: 49600, transactions: 152 },
    { day: "Thu", sales: 53800, transactions: 168 },
    { day: "Fri", sales: 71200, transactions: 214 },
    { day: "Sat", sales: 88900, transactions: 268 },
    { day: "Sun", sales: 64280, transactions: 187 },
  ],
  hourlyTraffic: [
    { hour: "7AM", customers: 14 },
    { hour: "8AM", customers: 22 },
    { hour: "9AM", customers: 18 },
    { hour: "10AM", customers: 11 },
    { hour: "11AM", customers: 19 },
    { hour: "12PM", customers: 34 },
    { hour: "1PM", customers: 28 },
    { hour: "2PM", customers: 14 },
    { hour: "3PM", customers: 16 },
    { hour: "4PM", customers: 21 },
    { hour: "5PM", customers: 26 },
    { hour: "6PM", customers: 38 },
    { hour: "7PM", customers: 42 },
    { hour: "8PM", customers: 31 },
    { hour: "9PM", customers: 18 },
  ],
  topItems: [
    { name: "Grilled Chicken Inasal Plate", sold: 42, revenue: 10080, category: "Grill" },
    { name: "Pork BBQ Skewers (3 pcs)", sold: 58, revenue: 8700, category: "Grill" },
    { name: "Grilled Liempo w/ Rice", sold: 36, revenue: 9000, category: "Grill" },
    { name: "Lubang Tuna Steak", sold: 24, revenue: 8400, category: "Grill" },
    { name: "Sisig Rice Bowl", sold: 31, revenue: 6510, category: "Rice Meal" },
    { name: "Iced Spanish Latte", sold: 67, revenue: 8040, category: "Coffee" },
    { name: "Hot Brewed Barako", sold: 54, revenue: 5400, category: "Coffee" },
    { name: "Calamansi Iced Tea", sold: 48, revenue: 3360, category: "Beverage" },
    { name: "Mango Cheesecake Slice", sold: 29, revenue: 4350, category: "Dessert" },
    { name: "Banana Bread Loaf", sold: 22, revenue: 2200, category: "Pastry" },
  ],
  inventory: [
    { sku: "GRL-001", name: "Chicken (whole, marinated)", unit: "kg", onHand: 18, par: 30, status: "low", lastDelivery: "2026-05-18" },
    { sku: "GRL-002", name: "Pork Belly (Liempo)", unit: "kg", onHand: 14, par: 22, status: "low", lastDelivery: "2026-05-18" },
    { sku: "GRL-003", name: "Tuna Steak (Lubang catch)", unit: "kg", onHand: 8, par: 12, status: "low", lastDelivery: "2026-05-19" },
    { sku: "GRL-004", name: "BBQ Pork Cubes", unit: "kg", onHand: 24, par: 20, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "COF-005", name: "Barako Coffee Beans", unit: "kg", onHand: 6, par: 8, status: "low", lastDelivery: "2026-05-15" },
    { sku: "COF-006", name: "Espresso Beans (Arabica blend)", unit: "kg", onHand: 11, par: 10, status: "ok", lastDelivery: "2026-05-17" },
    { sku: "DRY-007", name: "Rice (uncooked)", unit: "kg", onHand: 96, par: 100, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "DRY-008", name: "Charcoal (grill)", unit: "kg", onHand: 38, par: 60, status: "low", lastDelivery: "2026-05-14" },
    { sku: "DAI-009", name: "Fresh Milk", unit: "L", onHand: 4, par: 18, status: "critical", lastDelivery: "2026-05-15" },
    { sku: "DAI-010", name: "Condensed Milk", unit: "cans", onHand: 22, par: 24, status: "ok", lastDelivery: "2026-05-17" },
    { sku: "PAS-011", name: "Banana Bread (frozen dough)", unit: "loaves", onHand: 6, par: 16, status: "critical", lastDelivery: "2026-05-13" },
    { sku: "PAS-012", name: "Mango Cheesecake (whole)", unit: "pcs", onHand: 3, par: 8, status: "critical", lastDelivery: "2026-05-14" },
    { sku: "FRU-013", name: "Calamansi (fresh)", unit: "kg", onHand: 9, par: 10, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "FRU-014", name: "Mango (ripe)", unit: "kg", onHand: 7, par: 8, status: "ok", lastDelivery: "2026-05-19" },
  ],
  nextFerry: {
    date: "2026-05-22",
    daysAway: 2,
    port: "Tilik Port",
    vessel: "M/V Lubang Express",
    cutoffOrder: "2026-05-21 12:00 PM",
  },
  staff: [
    { id: "E-101", name: "Rusty Sumalinog", role: "Branch Manager", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 180 },
    { id: "E-102", name: "Marites Cruz", role: "Asst. Manager", shift: "Mid (11AM-8PM)", status: "in", hourlyRate: 140 },
    { id: "E-103", name: "Jong Aquino", role: "Head Grill Cook", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 130 },
    { id: "E-104", name: "Lyka Reyes", role: "Head Barista", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 115 },
    { id: "E-105", name: "Boboy Mendoza", role: "Grill Cook", shift: "Mid (11AM-8PM)", status: "in", hourlyRate: 105 },
    { id: "E-106", name: "Anna de Leon", role: "Barista", shift: "Mid (11AM-8PM)", status: "in", hourlyRate: 95 },
    { id: "E-107", name: "Carlo Tan", role: "Server", shift: "Close (1PM-10PM)", status: "in", hourlyRate: 90 },
    { id: "E-108", name: "Jenny Villar", role: "Cashier", shift: "Close (1PM-10PM)", status: "late", hourlyRate: 95 },
    { id: "E-109", name: "Mark Santos", role: "Grill Cook", shift: "Close (1PM-10PM)", status: "in", hourlyRate: 105 },
    { id: "E-110", name: "Rose Pascual", role: "Server", shift: "Off", status: "off", hourlyRate: 90 },
  ],
  reviews: [
    { id: 1, source: "Google", author: "Maria L.", rating: 5, text: "Ang sarap ng Inasal! Plus yung Spanish Latte nila, panalo. Sulit ang dayo galing Tilik!", date: "2026-05-19", responded: true, sentiment: "positive" },
    { id: 2, source: "Facebook", author: "Tourist John", rating: 4, text: "Found this gem after the island tour — fresh tuna steak from Lubang itself. Cozy spot, great barako coffee.", date: "2026-05-18", responded: true, sentiment: "positive" },
    { id: 3, source: "Google", author: "Anonymous", rating: 2, text: "Ubos na yung mango cheesecake nung 3PM pa lang. Sayang, yun pa naman ang gusto kong matikman.", date: "2026-05-18", responded: false, sentiment: "negative" },
    { id: 4, source: "Google", author: "Kuya Ed", rating: 5, text: "Lagi akong umaattend dito tuwing umaga para sa Barako. Alam na ng barista ang order ko — solid service.", date: "2026-05-17", responded: true, sentiment: "positive" },
    { id: 5, source: "Facebook", author: "Liza M.", rating: 3, text: "Masarap ang BBQ skewers pero medyo mainit sa loob, sana mas malakas yung aircon.", date: "2026-05-16", responded: false, sentiment: "neutral" },
    { id: 6, source: "Google", author: "Dennis R.", rating: 5, text: "Best cafe sa Lubang! Hindi na kami kailangan umuwi pa ng Manila para makakain ng decent grilled liempo at quality coffee.", date: "2026-05-15", responded: true, sentiment: "positive" },
    { id: 7, source: "TripAdvisor", author: "Backpacker Sam", rating: 4, text: "Stopped by after a beach day. Friendly local staff, the tuna steak is the must-try. Will visit again next trip.", date: "2026-05-14", responded: true, sentiment: "positive" },
  ],
  reviewStats: {
    average: 4.2,
    total: 184,
    thisWeek: 14,
    responseRate: 81,
    bySource: [
      { source: "Google", count: 112, avg: 4.3 },
      { source: "Facebook", count: 54, avg: 4.1 },
      { source: "TripAdvisor", count: 18, avg: 4.0 },
    ],
  },
};

const elNido: BranchData = {
  branch: {
    code: "ELN",
    name: "Dzong Cafe & Grill",
    location: "El Nido, Palawan",
    shortLocation: "El Nido",
    fullCode: "DZG-ELN-002",
    address: "Calle Hama, Brgy. Buena Suerte, El Nido, Palawan",
    manager: "Crisanto Villaflor",
    openedAt: "2024-02-09",
    seatingCapacity: 72,
    hours: "6:30 AM – 11:00 PM",
  },
  todayKPIs: {
    sales: 142800,
    salesDeltaPct: 22.7,
    transactions: 384,
    transactionsDeltaPct: 18.2,
    avgTicket: 372,
    avgTicketDeltaPct: 3.8,
    laborCostPct: 19.6,
    laborCostDeltaPct: -3.4,
  },
  weekSales: [
    { day: "Mon", sales: 92400, transactions: 248 },
    { day: "Tue", sales: 88100, transactions: 234 },
    { day: "Wed", sales: 104600, transactions: 281 },
    { day: "Thu", sales: 118300, transactions: 312 },
    { day: "Fri", sales: 156400, transactions: 418 },
    { day: "Sat", sales: 178200, transactions: 471 },
    { day: "Sun", sales: 142800, transactions: 384 },
  ],
  hourlyTraffic: [
    { hour: "7AM", customers: 28 },
    { hour: "8AM", customers: 42 },
    { hour: "9AM", customers: 36 },
    { hour: "10AM", customers: 24 },
    { hour: "11AM", customers: 31 },
    { hour: "12PM", customers: 58 },
    { hour: "1PM", customers: 52 },
    { hour: "2PM", customers: 26 },
    { hour: "3PM", customers: 22 },
    { hour: "4PM", customers: 34 },
    { hour: "5PM", customers: 41 },
    { hour: "6PM", customers: 62 },
    { hour: "7PM", customers: 71 },
    { hour: "8PM", customers: 58 },
    { hour: "9PM", customers: 38 },
    { hour: "10PM", customers: 24 },
  ],
  topItems: [
    { name: "Island Seafood Platter", sold: 64, revenue: 25600, category: "Grill" },
    { name: "Grilled Lapu-Lapu w/ Rice", sold: 52, revenue: 18200, category: "Grill" },
    { name: "Pork BBQ Skewers (3 pcs)", sold: 108, revenue: 16200, category: "Grill" },
    { name: "Adobo Squid", sold: 38, revenue: 11400, category: "Rice Meal" },
    { name: "Beach Burger Combo", sold: 76, revenue: 15200, category: "Burger" },
    { name: "Iced Spanish Latte", sold: 142, revenue: 17040, category: "Coffee" },
    { name: "Mango Smoothie Bowl", sold: 89, revenue: 13350, category: "Beverage" },
    { name: "Coconut Cold Brew", sold: 96, revenue: 11520, category: "Coffee" },
    { name: "Halo-Halo Especial", sold: 67, revenue: 8040, category: "Dessert" },
    { name: "Banana Bread Loaf", sold: 41, revenue: 4100, category: "Pastry" },
  ],
  inventory: [
    { sku: "GRL-001", name: "Chicken (whole, marinated)", unit: "kg", onHand: 64, par: 80, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "GRL-002", name: "Pork Belly (Liempo)", unit: "kg", onHand: 42, par: 50, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "GRL-003", name: "Lapu-Lapu (whole)", unit: "kg", onHand: 18, par: 30, status: "low", lastDelivery: "2026-05-19" },
    { sku: "GRL-004", name: "Squid (cleaned)", unit: "kg", onHand: 22, par: 25, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "GRL-005", name: "Shrimp (large)", unit: "kg", onHand: 14, par: 20, status: "low", lastDelivery: "2026-05-18" },
    { sku: "COF-006", name: "Espresso Beans (Arabica)", unit: "kg", onHand: 32, par: 30, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "COF-007", name: "Coconut Milk (fresh)", unit: "L", onHand: 18, par: 24, status: "low", lastDelivery: "2026-05-19" },
    { sku: "DRY-008", name: "Rice (uncooked)", unit: "kg", onHand: 220, par: 200, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "DAI-009", name: "Fresh Milk", unit: "L", onHand: 38, par: 40, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "FRU-010", name: "Mango (ripe)", unit: "kg", onHand: 24, par: 30, status: "low", lastDelivery: "2026-05-19" },
    { sku: "FRU-011", name: "Calamansi (fresh)", unit: "kg", onHand: 18, par: 20, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "PAS-012", name: "Banana Bread (frozen dough)", unit: "loaves", onHand: 24, par: 28, status: "ok", lastDelivery: "2026-05-18" },
  ],
  nextFerry: {
    date: "2026-05-21",
    daysAway: 1,
    port: "Lio Tourism Estate",
    vessel: "M/V Palawan Princess",
    cutoffOrder: "2026-05-20 6:00 PM",
  },
  staff: [
    { id: "E-201", name: "Crisanto Villaflor", role: "Branch Manager", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 200 },
    { id: "E-202", name: "Bea Lim", role: "Asst. Manager", shift: "Close (1PM-10PM)", status: "in", hourlyRate: 155 },
    { id: "E-203", name: "Migs Tolentino", role: "Head Grill Cook", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 145 },
    { id: "E-204", name: "Trisha Domingo", role: "Head Barista", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 125 },
    { id: "E-205", name: "Mon Estrada", role: "Grill Cook", shift: "Mid (11AM-8PM)", status: "in", hourlyRate: 115 },
    { id: "E-206", name: "Kara Yulo", role: "Grill Cook", shift: "Close (1PM-10PM)", status: "in", hourlyRate: 115 },
    { id: "E-207", name: "JP Olivar", role: "Barista", shift: "Mid (11AM-8PM)", status: "in", hourlyRate: 100 },
    { id: "E-208", name: "Issa Cordero", role: "Barista", shift: "Close (1PM-10PM)", status: "in", hourlyRate: 100 },
    { id: "E-209", name: "Vince Salas", role: "Server", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 95 },
    { id: "E-210", name: "Hannah Bautista", role: "Server", shift: "Mid (11AM-8PM)", status: "late", hourlyRate: 95 },
    { id: "E-211", name: "Joaquin Reyes", role: "Server", shift: "Close (1PM-10PM)", status: "in", hourlyRate: 95 },
    { id: "E-212", name: "Lara Pineda", role: "Cashier", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 100 },
    { id: "E-213", name: "Diego Ramos", role: "Cashier", shift: "Close (1PM-10PM)", status: "in", hourlyRate: 100 },
    { id: "E-214", name: "Pia Soriano", role: "Server", shift: "Off", status: "off", hourlyRate: 95 },
  ],
  reviews: [
    { id: 1, source: "TripAdvisor", author: "Aussie Backpacker", rating: 5, text: "Found this on day 2 of our El Nido trip — went back every morning for the coconut cold brew and the island seafood platter. Genuinely the best meal of the trip.", date: "2026-05-19", responded: true, sentiment: "positive" },
    { id: 2, source: "Google", author: "Carla M.", rating: 5, text: "Ang ganda ng ambience, parang sa Bali. Sulit ang prices considering the location. Try the grilled lapu-lapu!", date: "2026-05-19", responded: true, sentiment: "positive" },
    { id: 3, source: "Facebook", author: "Resort Manager - Lio", rating: 5, text: "We send our guests here regularly. Consistent quality, clean kitchen, hospitable staff. Galing, Dzong team!", date: "2026-05-18", responded: true, sentiment: "positive" },
    { id: 4, source: "Google", author: "K-Dramaholic", rating: 3, text: "Crowded sa dinner time, hindi nakakuha ng table for 45 mins. Maganda ang food pero mag-reserve na lang next time.", date: "2026-05-18", responded: false, sentiment: "neutral" },
    { id: 5, source: "TripAdvisor", author: "Solo Diver", rating: 5, text: "Perfect post-dive recovery food. Big portions, great coffee, fast wifi. The owner-manager came out to chat — appreciated the personal touch.", date: "2026-05-17", responded: true, sentiment: "positive" },
    { id: 6, source: "Google", author: "Bryan P.", rating: 4, text: "Slightly pricier than expected but the quality matches. The halo-halo is massive — sharable for 2.", date: "2026-05-16", responded: true, sentiment: "positive" },
    { id: 7, source: "Facebook", author: "Honeymoon Couple", rating: 5, text: "Came here for our anniversary dinner — staff surprised us with a peach mango pie with a candle. Maliit na gesture, malaking impact. Salamat!", date: "2026-05-15", responded: true, sentiment: "positive" },
    { id: 8, source: "Google", author: "Tito Boy", rating: 2, text: "Mahaba ang pila pero okay naman ang food. Dapat dagdagan ang staff sa weekend.", date: "2026-05-14", responded: false, sentiment: "negative" },
  ],
  reviewStats: {
    average: 4.5,
    total: 612,
    thisWeek: 38,
    responseRate: 88,
    bySource: [
      { source: "Google", count: 312, avg: 4.5 },
      { source: "Facebook", count: 184, avg: 4.4 },
      { source: "TripAdvisor", count: 116, avg: 4.7 },
    ],
  },
};

const coron: BranchData = {
  branch: {
    code: "COR",
    name: "Dzong Cafe & Grill",
    location: "Coron, Palawan",
    shortLocation: "Coron",
    fullCode: "DZG-COR-003",
    address: "Lualhati Park area, Coron Town, Palawan",
    manager: "Aileen Macaraeg",
    openedAt: "2024-11-22",
    seatingCapacity: 56,
    hours: "7:00 AM – 10:30 PM",
  },
  todayKPIs: {
    sales: 88640,
    salesDeltaPct: -3.8,
    transactions: 248,
    transactionsDeltaPct: 1.2,
    avgTicket: 357,
    avgTicketDeltaPct: -5.0,
    laborCostPct: 26.4,
    laborCostDeltaPct: 4.1,
  },
  weekSales: [
    { day: "Mon", sales: 58200, transactions: 168 },
    { day: "Tue", sales: 62400, transactions: 178 },
    { day: "Wed", sales: 71800, transactions: 204 },
    { day: "Thu", sales: 74600, transactions: 214 },
    { day: "Fri", sales: 96400, transactions: 278 },
    { day: "Sat", sales: 112200, transactions: 318 },
    { day: "Sun", sales: 88640, transactions: 248 },
  ],
  hourlyTraffic: [
    { hour: "7AM", customers: 18 },
    { hour: "8AM", customers: 28 },
    { hour: "9AM", customers: 24 },
    { hour: "10AM", customers: 14 },
    { hour: "11AM", customers: 22 },
    { hour: "12PM", customers: 41 },
    { hour: "1PM", customers: 38 },
    { hour: "2PM", customers: 18 },
    { hour: "3PM", customers: 16 },
    { hour: "4PM", customers: 24 },
    { hour: "5PM", customers: 31 },
    { hour: "6PM", customers: 48 },
    { hour: "7PM", customers: 52 },
    { hour: "8PM", customers: 38 },
    { hour: "9PM", customers: 24 },
  ],
  topItems: [
    { name: "Coron Island Tuna Belly", sold: 38, revenue: 15200, category: "Grill" },
    { name: "Grilled Liempo w/ Rice", sold: 52, revenue: 13000, category: "Grill" },
    { name: "Pork BBQ Skewers (3 pcs)", sold: 72, revenue: 10800, category: "Grill" },
    { name: "Grilled Squid Platter", sold: 28, revenue: 9800, category: "Grill" },
    { name: "Sisig Rice Bowl", sold: 44, revenue: 9240, category: "Rice Meal" },
    { name: "Iced Spanish Latte", sold: 88, revenue: 10560, category: "Coffee" },
    { name: "Calamansi Iced Tea", sold: 76, revenue: 5320, category: "Beverage" },
    { name: "Hot Brewed Barako", sold: 64, revenue: 6400, category: "Coffee" },
    { name: "Halo-Halo Especial", sold: 42, revenue: 5040, category: "Dessert" },
    { name: "Mango Cheesecake Slice", sold: 38, revenue: 5700, category: "Dessert" },
  ],
  inventory: [
    { sku: "GRL-001", name: "Chicken (whole, marinated)", unit: "kg", onHand: 32, par: 40, status: "low", lastDelivery: "2026-05-18" },
    { sku: "GRL-002", name: "Pork Belly (Liempo)", unit: "kg", onHand: 24, par: 32, status: "low", lastDelivery: "2026-05-18" },
    { sku: "GRL-003", name: "Tuna Belly (Coron catch)", unit: "kg", onHand: 12, par: 22, status: "low", lastDelivery: "2026-05-19" },
    { sku: "GRL-004", name: "Squid (cleaned)", unit: "kg", onHand: 16, par: 18, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "GRL-005", name: "BBQ Pork Cubes", unit: "kg", onHand: 28, par: 28, status: "ok", lastDelivery: "2026-05-18" },
    { sku: "COF-006", name: "Espresso Beans (Arabica)", unit: "kg", onHand: 14, par: 18, status: "low", lastDelivery: "2026-05-15" },
    { sku: "COF-007", name: "Barako Coffee Beans", unit: "kg", onHand: 8, par: 12, status: "low", lastDelivery: "2026-05-15" },
    { sku: "DRY-008", name: "Rice (uncooked)", unit: "kg", onHand: 132, par: 140, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "DRY-009", name: "Charcoal (grill)", unit: "kg", onHand: 22, par: 50, status: "critical", lastDelivery: "2026-05-12" },
    { sku: "DAI-010", name: "Fresh Milk", unit: "L", onHand: 18, par: 28, status: "low", lastDelivery: "2026-05-18" },
    { sku: "DAI-011", name: "Cream Cheese", unit: "kg", onHand: 1, par: 6, status: "critical", lastDelivery: "2026-05-13" },
    { sku: "FRU-012", name: "Calamansi (fresh)", unit: "kg", onHand: 12, par: 14, status: "ok", lastDelivery: "2026-05-19" },
    { sku: "FRU-013", name: "Mango (ripe)", unit: "kg", onHand: 9, par: 16, status: "low", lastDelivery: "2026-05-19" },
  ],
  nextFerry: {
    date: "2026-05-21",
    daysAway: 1,
    port: "Coron Port",
    vessel: "M/V Atienza Shipping",
    cutoffOrder: "2026-05-20 8:00 PM",
  },
  staff: [
    { id: "E-301", name: "Aileen Macaraeg", role: "Branch Manager", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 185 },
    { id: "E-302", name: "Onyx Dimagiba", role: "Asst. Manager", shift: "Close (1PM-10PM)", status: "in", hourlyRate: 145 },
    { id: "E-303", name: "Berto Calingasan", role: "Head Grill Cook", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 135 },
    { id: "E-304", name: "Faye Mendoza", role: "Head Barista", shift: "Open (7AM-4PM)", status: "late", hourlyRate: 120 },
    { id: "E-305", name: "Renz Caballero", role: "Grill Cook", shift: "Mid (11AM-8PM)", status: "in", hourlyRate: 110 },
    { id: "E-306", name: "Maica Robles", role: "Barista", shift: "Mid (11AM-8PM)", status: "in", hourlyRate: 95 },
    { id: "E-307", name: "Toby Yulo", role: "Server", shift: "Mid (11AM-8PM)", status: "in", hourlyRate: 90 },
    { id: "E-308", name: "Ria Esquivel", role: "Cashier", shift: "Open (7AM-4PM)", status: "in", hourlyRate: 95 },
    { id: "E-309", name: "Kevin Tan", role: "Server", shift: "Close (1PM-10PM)", status: "in", hourlyRate: 90 },
    { id: "E-310", name: "Beth Aragon", role: "Grill Cook", shift: "Close (1PM-10PM)", status: "in", hourlyRate: 110 },
    { id: "E-311", name: "Paolo Cervantes", role: "Server", shift: "Off", status: "off", hourlyRate: 90 },
    { id: "E-312", name: "Liza Marasigan", role: "Server", shift: "Off", status: "off", hourlyRate: 90 },
  ],
  reviews: [
    { id: 1, source: "TripAdvisor", author: "Dive Instructor", rating: 4, text: "Solid post-wreck-dive meal. Tuna belly is incredible — freshness you can taste. Service a bit slow when busy.", date: "2026-05-19", responded: true, sentiment: "positive" },
    { id: 2, source: "Google", author: "Coron Local", rating: 5, text: "Proud na may ganitong cafe sa Coron! Suporta lagi.", date: "2026-05-19", responded: true, sentiment: "positive" },
    { id: 3, source: "Google", author: "Anonymous", rating: 2, text: "Ubos ang cream cheese kaya wala silang cheesecake. Inis ako kasi from El Nido pa kami para subukan.", date: "2026-05-18", responded: false, sentiment: "negative" },
    { id: 4, source: "Facebook", author: "Ivan R.", rating: 4, text: "Good vibes, decent coffee, generous portions. Wifi is fast — naka-work ako half a day dito.", date: "2026-05-17", responded: true, sentiment: "positive" },
    { id: 5, source: "Google", author: "Marky D.", rating: 3, text: "Aircon was struggling sa 12-2pm rush. Food saved it. Try harder on the cooling.", date: "2026-05-16", responded: false, sentiment: "neutral" },
    { id: 6, source: "TripAdvisor", author: "EU Traveler", rating: 5, text: "Better than expected for a town like Coron. Owner cares about quality, you can tell.", date: "2026-05-15", responded: true, sentiment: "positive" },
  ],
  reviewStats: {
    average: 3.9,
    total: 96,
    thisWeek: 12,
    responseRate: 67,
    bySource: [
      { source: "Google", count: 58, avg: 4.0 },
      { source: "Facebook", count: 24, avg: 3.7 },
      { source: "TripAdvisor", count: 14, avg: 4.1 },
    ],
  },
};

export const branches: Record<BranchCode, BranchData> = {
  LUB: lubang,
  ELN: elNido,
  COR: coron,
};

export const branchList: Branch[] = [lubang.branch, elNido.branch, coron.branch];

export function getBranchData(code: BranchCode): BranchData {
  return branches[code];
}

export const defaultBranchCode: BranchCode = "LUB";
