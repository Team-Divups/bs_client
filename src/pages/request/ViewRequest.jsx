import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
} from '@mui/material';

import Header from '../../components/Header';

import '../viewpage.css';
import { Edit } from '@mui/icons-material';

const ViewRequest = () => {
  const { idRequest } = useParams();

  const [Data, setData] = useState([]);

  //Request info
  useEffect(() => {
    axios
      .get(`http://localhost:3001/request/view/${idRequest}`)
      .then((response) => {
        setData({ ...response.data[0] });
      });
  }, [idRequest]);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Request Overview" />

        <Card>
          <CardContent>
            <Grid container spacing={2} columnSpacing={8}>
              <Grid item xs={6}>
                <Box className="content">
                  <Typography fontFamily="Asap">
                    <b style={{ paddingRight: '220px' }}>
                      Help Request Information
                    </b>
                    <Link to={`/help/edit/${Data.idRequest}`}>
                      <Edit sx={{ fontSize: 25 }} />
                    </Link>
                  </Typography>

                  <Divider
                    orientation="horizontal"
                    style={{ paddingTop: '15px', width: '75%' }}
                  />

                  <div className="infodesc">
                    <div style={{ fontSize: '13px', lineHeight: '2.4' }}>
                      <p style={{ fontSize: '18px' }}>
                        <span style={{ fontSize: '18px', color: 'black' }}>
                          <b>Problem Category : </b>{' '}
                        </span>
                        {Data.category}
                      </p>
                      <p style={{ fontSize: '18px' }}>
                        <span style={{ color: 'black' }}>
                          <b>Site Name : </b>{' '}
                        </span>
                        {Data.site_name}
                      </p>
                      <p style={{ fontSize: '18px' }}>
                        <span style={{ color: 'black' }}>
                          <b>Problem : </b>{' '}
                        </span>
                        {Data.problem}
                      </p>
                      <p style={{ fontSize: '18px' }}>
                        <span style={{ color: 'black' }}>
                          <b>Severity_Level : </b>{' '}
                        </span>
                        {Data.severity_level}
                      </p>
                      <p style={{ fontSize: '18px' }}>
                        <span style={{ color: 'black' }}>
                          <b>Status : </b>{' '}
                        </span>
                        {Data.status}
                      </p>
                    </div>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ViewRequest;
