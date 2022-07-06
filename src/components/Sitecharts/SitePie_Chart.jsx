import axios from 'axios';
import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';




const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042' , '#4527a0'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  

const SitePie_Chart = ({siteid}) => {



    const [ratingData, setRatingData] = useState([]);

    useEffect( () =>{
      axios.get(`http://localhost:3004/review/getSiteReviewsTotal/${siteid.id}`).then(
        (response)=>{
            setRatingData(response.data);
            console.log(response.data);
            console.log(siteid.id);
        })
    },[])




  return (
    <div>
         <PieChart width={300} height={400}>
          <Pie
            data={ratingData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label
            outerRadius={120}
            fill="#8884d8"
            dataKey="Total"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
    </div>
  )
}

export default SitePie_Chart