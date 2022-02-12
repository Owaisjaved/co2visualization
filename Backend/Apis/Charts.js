var express = require("express");
const moment = require('moment')
const router = express.Router();

let arr= []
let nIntervId;

// Function For generating Number
const NumberGenerator = () =>{
  let randomNumber = Math.round(Math.random() * (3500 - 400) + 400);
  console.log(randomNumber)
  arr.push(
    {
      value: randomNumber,
      time:moment().format('LTS')
    }
  )
  clearInterval(nIntervId)
}

//Main API
router.get("/", (req, res) => {
  clearInterval(nIntervId)
    nIntervId = setInterval(() => {
      NumberGenerator()
      console.log('arr',arr)
    }, 10000);
  res.status(200).send({
    number: arr
  })
});

// Api To Stop Data
router.post('/stopData',(req,res)=>{
    clearInterval(nIntervId);
    res.status(200).send({
      msg:'Data Stopped'
    })
})


//Api to clear Data
router.post('/clearData',(req,res)=>{
    arr = []
    res.status(200).send({
        msg:'Data Clear'
      })
})

module.exports = router;