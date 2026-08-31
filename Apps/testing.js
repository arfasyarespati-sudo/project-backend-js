const prices = [4, 8, 15, 16, 23, 42];

let discountPrice = prices.map((n) => {
   return n * 0.5;
})

console.log(discountPrice)