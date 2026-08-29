const storeName = 'TechHub Store'
let openStatus = 'open'

const storeConfig = {
    currency: 'IDR',
    PPN: 0.11,
}

const inventory = [
  { id: "P1", name: "Mechanical Keyboard", price: 850000, stock: 12, category: "Peripheral" },
  { id: "P2", name: "Gaming Mouse", price: 450000, stock: 5, category: "Peripheral" },
  { id: "P3", name: "Monitor 24 inch", price: 1750000, stock: 0, category: "Display" },
  { id: "P4", name: "USB-C Hub", price: 250000, stock: 20, category: "Accessories" },
  { id: "P5", name: "Desk Mat", price: 150000, stock: 8, category: "Accessories" },
];

const customerOrders = [
  { orderId: "ORD-001", customer: "Arfa", items: ["P1", "P4"], discountCode: "TECH10" },
  { orderId: "ORD-002", customer: "Budi", items: ["P2", "P5"], discountCode: null },
];

function formatCurrency(amount){
    return `${storeConfig.currency} ${amount.toLocaleString("id-ID")}`
}