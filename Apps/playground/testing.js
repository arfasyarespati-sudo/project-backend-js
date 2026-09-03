const users = [
   { id: 1, name: 'Arfa', age: 19},
   { id: 2, name: 'Qal', age: 20},
   { id: 3, name: 'Habibi', age: 18}
]

const nameList = users.map(user => user.name)
console.log(nameList)