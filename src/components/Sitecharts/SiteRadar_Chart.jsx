import React, { useEffect, useState } from 'react'
//import "./chart.scss"
//import  { PureComponent } from 'react';
import { RadarChart, PolarRadiusAxis, Radar, PolarAngleAxis,Legend ,PolarGrid} from 'recharts';
import axios from 'axios';
import { jsPDF } from "jspdf";
import Button from '@mui/material/Button';
import ReactToPrint from 'react-to-print';



const SiteRadar_Chart = () => {

    const [ratingData, setRatingData] = useState([]);

    useEffect( () =>{
      axios.get("http://localhost:3001/getRatingTotal").then(
        (response)=>{
            setRatingData(response.data);
            console.log(response.data);
        })
    },[])


     const downloadPDF= () => {
        var doc = new jsPDF();
        doc.html(document.querySelector("#rchart"),{
            callback: function (pdf) {
                pdf.save('Rating.pdf');
            }
        });
    };
      
  return (
    <div style={{height: 350 , justifyContent: 'start' , paddingTop:40}} id="rchart" className='rchart'

    >
        <RadarChart outerRadius={140} width={415} height={350} data={ratingData} >
          <PolarGrid />
          <PolarAngleAxis dataKey="rating" />
          <PolarRadiusAxis angle={30}  />
          <Radar name="Ratings" dataKey="Total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
        <div style={{marginLeft:410 , marginTop:30}}>
        

        </div>
      
    </div>
  )
}

export default SiteRadar_Chart