const express = require("express");
const cors = require('cors')
const path = require('path');
const port = 4500;

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Route Import
const route = require('./Apis/Charts')

//Route Middleware
app.use('/api/Data',route)
app.use(express.static(path.join(__dirname, '../Frontend/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/',(req,res)=>{
  res.send('I am Live')
})

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
