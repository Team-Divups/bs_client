import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine,Area_Chart , Bar_Chart , Radar_Chart ,Line_Area , Table_Chart} from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import axios from 'axios';
import { useEffect,useState } from 'react';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();
  const [totalUsers, setTotalUsers] = useState([]);
  const [sites, setSites] = useState([]);

    useEffect( () =>{
      
        axios.get("http://localhost:3004/review/getSummary").then(
        (response)=>{
          setTotalUsers(response.data);
          console.log(response.data);
        })

    },[])

    useEffect( () =>{
      
      axios.get("http://localhost:3004/site/getSummary").then(
      (response)=>{
        setSites(response.data);
        console.log(response.data);
      })

  },[])
  


  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
      {totalUsers.map((sdata,index)=>{
        return(
          <>
      <div key={sdata.id} className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-90 p-8 pt-9 m-2  bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400 text-3xl">Total Reviwes</p>
              <p className="text-5xl text-cyan-300">{sdata.Total}</p>
            </div>
          </div>
        </div>


        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-90 p-8 pt-9 m-2  bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400 text-3xl">Review Sent</p>
              <p className="text-5xl text-cyan-300">{sdata.Agreed}</p>
            </div>
          </div>
        </div>


        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-90 p-8 pt-9 m-2  bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400 text-3xl">Review response</p>
              <p className="text-5xl text-cyan-300">{sdata.Country}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-90 p-8 pt-9 m-2  bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400 text-3xl">Review response</p>
              <p className="text-5xl text-cyan-300">{sdata.Country}</p>
            </div>
          </div>
        </div>
        </> )
      })}
  
      </div>
      
      
      <div className="flex flex-wrap lg:flex-nowrap justify-center bg-white rounded-2xl w-full bg-no-repeat bg-cover bg-center">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-996 ">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-2xl font-semibold mb-10">Review Overview</p>
        
          </div>
          <div className="md:w-full overflow-auto">
            <Line_Area/>
          </div>
        </div>
        </div>
  

    

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Site Reviewcount</p>
            
          </div>
          <div className="mt-10 w-72 md:w-400">
            {sites.map((item) => (
              <div key={item.siteid} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <div><img src={item.icon} alt="product" className="w-12 h-12" /></div>
                  <div>
                    <p className="text-md font-semibold">{item.sitename}</p>
                    <p className="text-sm text-gray-400">{item.category}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-md">{item.Total}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            

            <p className="text-gray-400 text-sm mt-5">Based on last reviews.</p>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-2">
            <p className="text-xl font-semibold mb-10">Country Overview</p>
        
          </div>
          <div className="md:w-full overflow-auto">
            <Bar_Chart/>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center w-600">
        <div className="md:w-600 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Rating Counts</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>

          <div className="mt-10 w-640">
              <Radar_Chart/>
          </div>

        </div>
        
        <div className="w-900 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between mb-10">
            <p className="text-xl font-semibold">Recent Reviews</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>
        <Table_Chart/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
