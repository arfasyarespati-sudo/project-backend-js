const express = require('express');
const PORT = 3000;
const app = express();

app.post('/', (req, res) => {
    res.send('POST request called')
})

app.listen(PORT, function(err) {
    if (err) {
        console.log(err);
        console.log(`Listening on PORT ${PORT}`)
    }
})