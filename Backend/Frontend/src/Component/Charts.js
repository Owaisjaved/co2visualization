import { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

export const Charts = () => {
  console.log("componentMounted");
  const [co2lvl,setCo2lvl]= useState({
      green:[],
      yellow:[], 
      red:[]
  })
  // const [co2green, setCo2Green] = useState([]);
  // const [co2yellow, setCo2Yellow] = useState([]);
  // const [co2red, setCo2Red] = useState([]);

  const getData = async () => {
    let fd = await axios.get("http://localhost:4500/api/Data/");
    console.log(fd.data);
    //Filtering Data regarding three categories
    let green = fd.data.number.filter((item) => item.value <= 1000);
    // setCo2Green(green);
    let yellow = fd.data.number.filter(
      (item) => item.value >= 1000 && item.value <= 2000
    );
    // setCo2Yellow(yellow);
    let red = fd.data.number.filter((item) => item.value > 2000);
    // setCo2Red(red);
    console.log("green", green);
    console.log("yellow", yellow);
    console.log("red", red);
    setCo2lvl({
      green:green,
      yellow:yellow,
      red:red
    })
  };


 
  //Avergae Calculate
  let greenAVG = co2lvl.green.reduce((a, b) => a + b.value, 0);
 
  let yellowAVG = co2lvl.yellow.reduce((a, b) => a + b.value, 0);
  
  let redAVG = co2lvl.red.reduce((a, b) => a + b.value, 0);
 
  // Functions
  let intervalID ;
  const ResumeData = () =>{
    alert('Data Resumed')
    intervalID =  setInterval(() => {
      console.log('STILL RUNNING')
      getData()
    }, 10000);
    
  }
  const StopData = () =>{
    alert('Data Stopped')
    clearInterval(intervalID)
    console.log(intervalID)
    axios.post('http://localhost:4500/api/Data/stopData')
    
    
  }

  const ClearData = () =>{
    alert('Data will be cleared after next new entry')
    axios.post('http://localhost:4500/api/Data/clearData')
   
  }

  // Chart Work
  //  Chart1
  let stateGreen = {
    series: [
      {
        name: "CO2 Green",
        data: co2lvl.green.map((item) => item.value),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["green"],
        },
      },
      stroke: {
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5],
      },
      title: {
        text: "CO2 Emission Level GREEN",
        align: "Center",
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: co2lvl.green.map((item) => item.time),
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  };
  let stateYellow = {
    series: [
      {
        name: "CO2 Yellow",
        data: co2lvl.yellow.map((item) => item.value),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#FEB019"],
        },
      },
      stroke: {
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5],
      },
      title: {
        text: "CO2 Emission Level YELLOW",
        align: "Center",
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: co2lvl.yellow.map((item) => item.time),
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  };
  let stateRed = {
    series: [
      {
        name: "CO2 Red",
        data: co2lvl.red.map((item) => item.value),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["red"],
        },
      },
      stroke: {
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5],
      },
      title: {
        text: "CO2 Emission Level RED",
        align: "Center",
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: co2lvl.red.map((item) => item.time),
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  };
  let state = {
    series: [
      {
        name: "CO2 Red",
        data: co2lvl.red.map((item) => item.value),
      },
      {
        name: "CO2 Green",
        data: co2lvl.green.map((item) => item.value),
      },
      {
        name: "CO2 Yellow",
        data: co2lvl.yellow.map((item) => item.value),
        // data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["red", "green", "#FEB019"],
        },
      },
      stroke: {
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5],
      },
      title: {
        text: "CO2 Emission Level",
        align: "Center",
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: co2lvl.red.map((item) => item.time),
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " (Value)";
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  };

  // Chart2
  let PieChart = {
    series: [
      Math.round(redAVG / co2lvl.red.length),
      Math.round(greenAVG / co2lvl.green.length),
      Math.round(yellowAVG / co2lvl.yellow.length),
      
    ],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      title: {
        text: "Average CO2 Emission",
        align: "Center",
      },
      // fill: {
      //   colors: ["#00E396", "#FEB019", "#FF1A1A"],
      // },
      style: {
        colors: ["#F44336", "#E91E63", "#9C27B0"],
      },
      labels: ["CO2 Red", "CO2 Green", "CO2 Yellow"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  // Chart 3
  let Stacked = {
    series: [
      {
        name: "RED",
        data: co2lvl.red.map((item) => item.value),
      },
      {
        name: "GREEN",
        data: co2lvl.green.map((item) => item.value),
      },
      {
        name: "YELLOW",
        data: co2lvl.yellow.map((item) => item.value),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
        // colors:["red","green","yellow"],
        fill: {
          colors: ["#00E396", "#FEB019", "#FF1A1A"],
        },
        style: {
          colors: ["#F44336", "#E91E63", "#9C27B0"],
        },
      },  
      title: {
        text: "CO2 Emission Stacked %",
        align: "Center",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: co2lvl.red.map((item) => item.time),
      },
      

      fill: {
        opacity: 1,
      },
      legend: {
        position: "right",
        offsetX: 0,
        offsetY: 50,
      },
    },
  };

  // Chart Work
  useEffect(() => {
    getData()
    clearInterval(intervalID)
      }, []);
  return (
    <div className="Container">
      <div className="buttons">
        <div>
        <button onClick={()=>ResumeData()}>Resume</button>
        </div>
        <div>

        <button onClick={()=>StopData()}>Stop</button>
        </div>
        <div>

        <button onClick={()=>ClearData()}>Clear</button>
        </div>
      </div>
      <div className="IndividualChart">
        <div>
          <ReactApexChart
            options={stateGreen.options}
            series={stateGreen.series}
            type="line"
            height={350}
            width={650}
          />
        </div>
        <div>
          <ReactApexChart
            options={stateYellow.options}
            series={stateYellow.series}
            type="line"
            height={350}
            width={650}
          />
        </div>
        <div>
          <ReactApexChart
            options={stateRed.options}
            series={stateRed.series}
            type="line"
            height={350}
            width={650}
          />
        </div>
      </div>
      <div className="OverallChart">
        <div>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="line"
            height={350}
            width={650}
          />
        </div>
        <div>
          <ReactApexChart
            options={PieChart.options}
            series={PieChart.series}
            type="pie"
            width={650}
          />
        </div>
        <div>
          <ReactApexChart
            options={Stacked.options}
            series={Stacked.series}
            type="bar"
            height={350}
            width={850}
          />
        </div>
      </div>
    </div>
  );
};
