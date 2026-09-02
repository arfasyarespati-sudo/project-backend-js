const storeName = 'TechHub Store'
let openStatus = 'Open'

const storeConfig = { //object literal (non-initialization)
    currency: 'IDR',
    PPN: 0.11,
}

const inventory = [ //arrays with object inside
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

const calculateTax = (amount) => amount * storeConfig.taxRate;
const applyDiscount = (price, code) => {
  if (code === "TECH10") {
    return price * 0.9
  } 
  return price;
}

const availableStock = inventory.filter((product) => product.stock > 0)       //grab item ready stock
const getProductId = (id) => inventory.find((product) => (product.id === id)) //search item from id

const catalogSum = inventory.map(({ name, price, stock }) => { 
  const status = stock > 0 ? `unit: ${stock}` : `empty`;
  return `${name} - ${formatCurrency(price)} (${status})`
})

const newProduct = { 
  id: 'P6', 
  name: 'Headset Stand', 
  price: 120000, 
  stock: 15, 
  category: "Accessories"
};

const updatedInventory = {
  ...storeConfig,
  lastUpdated: "2026-08-28"
}

function processOrder({ orderId, customer, items, discountCode }) {
  const orderDetails = items.map((itemId) => getProductId(itemId)).filter(Boolean)
  const subtotal = orderDetails.reduce((accumulator, item) => accumulator + item.price, 0);

  const subtotalAfterDiscount = applyDiscount(subtotal, discountCode);
  const tax = calculateTax(subtotalAfterDiscount);
  const grandTotal = subtotalAfterDiscount + tax;

  console.log(`\n========================================`);
  console.log(`INVOICE: ${orderId} | CUSTOMER: ${customer}`);
  console.log(`Status Toko: ${openStatus} (${storeName})`);
  console.log(`----------------------------------------`);
  
  // .forEach(): Render baris item belanja
  orderDetails.forEach(({ name, price }, index) => {
    console.log(`${index + 1}. ${name} -> ${formatCurrency(price)}`);
  });

  console.log(`----------------------------------------`);
  console.log(`Subtotal       : ${formatCurrency(subtotal)}`);
  if (discountCode) {
    console.log(`Diskon (${discountCode}): -${formatCurrency(subtotal - subtotalAfterDiscount)}`);
  }
  console.log(`PPN (11%)      : ${formatCurrency(tax)}`);
  console.log(`Grand Total    : ${formatCurrency(grandTotal)}`);
  console.log(`========================================\n`);

  return grandTotal;
}

console.log("\n=== DAFTAR KATALOG ===");
catalogSum.forEach((item) => console.log(`* ${item}`));

// Memproses semua transaksi dan menghitung total omset toko
let totalRevenue = 0;

for (const order of customerOrders) {
  const orderTotal = processOrder(order);
  totalRevenue += orderTotal;
}

console.log(`TOTAL PENDAPATAN HARIAN: ${formatCurrency(totalRevenue)}`);