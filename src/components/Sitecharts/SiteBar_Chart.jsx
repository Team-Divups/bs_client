import React, { useEffect, useState } from 'react'
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer ,Legend , Bar } from 'recharts';
import axios from 'axios';




const SiteBar_Chart = ({siteid}) => {

    const [countryData, setCountryData] = useState([]);

    useEffect( () =>{
      axios.get(`http://localhost:5000/review/getSiteCountryTotal/${siteid.id}`).then(
        (response)=>{
            setCountryData(response.data);
            console.log(response.data);
            console.log(siteid.id);
        })
    },[])
  return (
    <div className='chart'>
        <div className="title">Rating Counts </div>
        <BarChart width={700} height={320} data={countryData}>
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

export default SiteBar_Chart