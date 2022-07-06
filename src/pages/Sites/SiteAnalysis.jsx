import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState} from 'react';
import { useParams,Link} from 'react-router-dom';
import {Card, CardContent, CardMedia, Typography,Grid,Box,Button,Divider,Rating} from '@mui/material';

import Header from '../../components/Header';
import '../viewpage.css';

import { Edit} from '@mui/icons-material';
import { pink, yellow } from '@mui/material/colors';

import site from '../../Assets/site.jpg';
import sitesm from '../../Assets/site.png';
import user from '../../Assets/user.png';


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';
import Doughnut from '../../components/Charts/Pie';
import { Bar_Chart, Line_Area, SiteBar_Chart, SitePie_Chart } from '../../components';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));







const SiteAnalysis =()=> {
  const [siteData,setSiteData]=useState([]);
  const [average,setAverage]=useState([]);
  const id = useParams().siteid;


  useEffect( () =>{
    axios.get(`http://localhost:3004/review/getSiteReviews/ ${id}`).then(
        (response)=>{
            setSiteData(response.data);
            console.log(response.data);
        })
},[])

useEffect( () =>{
  axios.get(`http://localhost:3004/review/getAverage/ ${id}`).then(
      (response)=>{
        setAverage(response.data);
          console.log(response.data);
      })
},[])
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10  rounded-3xl">
        <Header title="View Sites"/>

          <Card>
              <CardMedia
                component="img"
                className='cardHeaderImage'
                image={site}
                alt="site"/>
          </Card>
          
          
            <Card>
            <CardContent>

                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={1}>
                           <img src={sitesm} alt="profile" className='profileimg'/>
                        </Grid>

                        <Grid item xs={8}>
                          <Box height="100%" mt={0.5} lineHeight={1}>
                            <Typography variant='h5' fontFamily='Mulish'><b>Mahaweli Green </b></Typography>
                            <Typography className='category'>Resort</Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={2}>
                            <a href="WWW.site.com" target='_blank'>
                              <Button variant='outlined' style={{fontFamily:'Asap'}}>View Website</Button>
                            </a>
                        </Grid>

                        <Grid item xs={1}>
                          <Link to='/sites/mail'>
                            <Button style={{fontFamily:'Asap',backgroundColor:'#84fae4',color:'white'}}>Mail</Button>
                          </Link> 
                        </Grid>


                      </Grid>

                      <Grid container spacing={2} columnSpacing={8}>

                        <Grid item xs={6} >
                          <Box className='content'>
                            <Typography fontFamily='Asap'><b style={{paddingRight:'320px'}}>Site profile</b>
                          </Typography>
             
                            <Divider orientation='horizontal' style={{paddingTop:'15px',width:'75%'}}/>

                            <div className='infodesc'>
                              <p style={{paddingBottom:'25px',paddingTop:'15px'}}>This is a great site</p>
                              <div>

                               
                                {average.map((sdata,index)=>{
                                   return(<> 
                                      <Rating value={sdata.Total}  readOnly size="large" precision={0.05} />
                                     <p style={{paddingBottom:'5px',paddingTop:'1px', fontSize:'20px'}}><b> Average Ratings :- {sdata.Total} </b></p>
                                     <div>
                                     <p style={{paddingBottom:'5px',paddingTop:'1px', fontSize:'20px'}}><b> Overall Mood </b></p>
                                        {sdata.Average >= 0.700 ? (
                                          <Button
                                            variant="contained"
                                            style={{ backgroundColor: "#90EE90" }}
                                            size="small"
                                          >
                                            😀
                                          </Button>
                                        ) : sdata.Average >= 0.400 ? (
                                          <Button
                                            variant="contained"
                                            style={{ backgroundColor: "#FFFFE0" }}
                                            size="small"
                                          >
                                            😑
                                          </Button>
                                        ) : (
                                          <Button
                                            variant="contained"
                                            style={{ backgroundColor: "#ffcccb" }}
                                            size="small"
                                          >
                                            😡
                                          </Button>
                                        )}
                                      </div>
                                     
                                      </>)
                                  })}
                               
                              </div>
                            </div>
                            
                          </Box>
                        </Grid>

                    
                      </Grid>
                      
                      <Box style={{paddingLeft:'10px'}}>
                        <Typography fontFamily='Asap' ><b>Site Individual Analysis</b></Typography><br/><br/>
                        <div className="md:w-full overflow-auto">
                       
                      




                        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Country</StyledTableCell>
                        <StyledTableCell align="right">Review</StyledTableCell>
                        <StyledTableCell align="right">Mood</StyledTableCell>
                        <StyledTableCell align="right">Ratings</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {siteData.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.fname}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.email}</StyledTableCell>
                          <StyledTableCell align="right">{row.country}</StyledTableCell>
                          <StyledTableCell align="right">{row.review}</StyledTableCell>
                          <StyledTableCell align="right">
                          <div>
                              {row.mood === 1 ? (
                                <Button
                                  variant="contained"
                                  style={{ backgroundColor: "#90EE90" }}
                                  size="small"
                                >
                                  😀
                                </Button>
                              ) : row.mood === 0 ? (
                                <Button
                                  variant="contained"
                                  style={{ backgroundColor: "#FFFFE0" }}
                                  size="small"
                                >
                                  😑
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  style={{ backgroundColor: "#ffcccb" }}
                                  size="small"
                                >
                                  😡
                                </Button>
                              )}
                            </div>
                              
                          </StyledTableCell>
                          <StyledTableCell align="right">
                          {new Array(row.rating).fill(null).map(() => (
                              <StarIcon sx={{ color: yellow[500] }}/>
                          ))}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                </div>
               </Box>

              </CardContent>
            </Card>


          

       


        <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Site Reviewcount</p>
            
          </div>
          <div className="mt-10 w-72 md:w-370">
           
          <div  className="flex justify-between mt-4">
                <div className="flex gap-4">
                  
                  <SitePie_Chart siteid={{id}}/>
                </div>
                <p className="text-gray-400 text-md"></p>
              </div>
 
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            

            <p className="text-gray-400 text-sm mt-5">Based on last reviews.</p>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-126 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-2">
            <p className="text-xl font-semibold mb-10">Country Overview</p>
        
          </div>
          <div className="md:w-full overflow-auto">
          <SiteBar_Chart siteid={{id}}/>
          </div>
        </div>
      </div>


            
  
         </div>
  )
}

export default SiteAnalysis;


