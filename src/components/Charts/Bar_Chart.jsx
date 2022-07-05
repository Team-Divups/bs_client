import React, { useEffect, useState } from 'react'
//import "./chart.scss"
//import  { PureComponent } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer ,Legend , Bar } from 'recharts';
import axios from 'axios';




const Bar_Chart = () => {

    const [countryData, setCountryData] = useState([]);

    useEffect( () =>{
      axios.get("http://localhost:5000/review/getCountryTotal").then(
        (response)=>{
            setCountryData(response.data);
            console.log(response.data);
        })
    },[])
  return (
    <div className='chart'>
        <div className="title">Rating Counts</div>
        <BarChart width={730} height={320} data={countryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#8884d8" />
        </BarChart>
    </div>
  )
}

export default Bar_Chart