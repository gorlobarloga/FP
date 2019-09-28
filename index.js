const exp = require('express');
const PORT = process.env.PORT || 3000;
const app = exp();
app.listen(PORT, () => {
    console.log('Server has been stared')
})
