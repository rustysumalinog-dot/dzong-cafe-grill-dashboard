export const branch = {
  name: "Dzong Cafe & Grill",
  location: "Lubang Island",
  code: "DZG-LUB-001",
  address: "Tilik, Lubang, Occidental Mindoro",
  manager: "Rusty Sumalinog",
  openedAt: "2023-08-14",
  seatingCapacity: 48,
  hours: "7:00 AM – 10:00 PM",
};

export const todayKPIs = {
  sales: 64280,
  salesDeltaPct: 14.2,
  transactions: 187,
  transactionsDeltaPct: 8.1,
  avgTicket: 344,
  avgTicketDeltaPct: 5.6,
  laborCostPct: 23.8,
  laborCostDeltaPct: -2.1,
};

export const weekSales = [
  { day: "Mon", sales: 38400, transactions: 118 },
  { day: "Tue", sales: 41200, transactions: 124 },
  { day: "Wed", sales: 49600, transactions: 152 },
  { day: "Thu", sales: 53800, transactions: 168 },
  { day: "Fri", sales: 71200, transactions: 214 },
  { day: "Sat", sales: 88900, transactions: 268 },
  { day: "Sun", sales: 64280, transactions: 187 },
];

export const hourlyTraffic = [
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
];

export const topItems = [
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
];

export const inventory = [
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
];

export const nextFerry = {
  date: "2026-05-22",
  daysAway: 2,
  port: "Tilik Port",
  vessel: "M/V Lubang Express",
  cutoffOrder: "2026-05-21 12:00 PM",
};

export const staff = [
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
];

export const reviews = [
  { id: 1, source: "Google", author: "Maria L.", rating: 5, text: "Ang sarap ng Inasal! Plus yung Spanish Latte nila, panalo. Sulit ang dayo galing Tilik!", date: "2026-05-19", responded: true, sentiment: "positive" },
  { id: 2, source: "Facebook", author: "Tourist John", rating: 4, text: "Found this gem after the island tour — fresh tuna steak from Lubang itself. Cozy spot, great barako coffee.", date: "2026-05-18", responded: true, sentiment: "positive" },
  { id: 3, source: "Google", author: "Anonymous", rating: 2, text: "Ubos na yung mango cheesecake nung 3PM pa lang. Sayang, yun pa naman ang gusto kong matikman.", date: "2026-05-18", responded: false, sentiment: "negative" },
  { id: 4, source: "Google", author: "Kuya Ed", rating: 5, text: "Lagi akong umaattend dito tuwing umaga para sa Barako. Alam na ng barista ang order ko — solid service.", date: "2026-05-17", responded: true, sentiment: "positive" },
  { id: 5, source: "Facebook", author: "Liza M.", rating: 3, text: "Masarap ang BBQ skewers pero medyo mainit sa loob, sana mas malakas yung aircon.", date: "2026-05-16", responded: false, sentiment: "neutral" },
  { id: 6, source: "Google", author: "Dennis R.", rating: 5, text: "Best cafe sa Lubang! Hindi na kami kailangan umuwi pa ng Manila para makakain ng decent grilled liempo at quality coffee.", date: "2026-05-15", responded: true, sentiment: "positive" },
  { id: 7, source: "TripAdvisor", author: "Backpacker Sam", rating: 4, text: "Stopped by after a beach day. Friendly local staff, the tuna steak is the must-try. Will visit again next trip.", date: "2026-05-14", responded: true, sentiment: "positive" },
];

export const reviewStats = {
  average: 4.2,
  total: 184,
  thisWeek: 14,
  responseRate: 81,
  bySource: [
    { source: "Google", count: 112, avg: 4.3 },
    { source: "Facebook", count: 54, avg: 4.1 },
    { source: "TripAdvisor", count: 18, avg: 4.0 },
  ],
};
