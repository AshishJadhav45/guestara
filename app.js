const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
