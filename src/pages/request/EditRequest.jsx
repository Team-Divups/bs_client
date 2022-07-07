import React from 'react';
import Header from '../../components/Header';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  TextField,
} from '@material-ui/core';
import { Select, MenuItem } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import swal from 'sweetalert';
import { setPlaceHolder } from '@syncfusion/ej2/dropdowns';

const EditRequest = () => {
  const [disable, setDisable] = useState(false);

  const { idRequest } = useParams();
  const history = useNavigate();

  const initialValues = {
    category: '',
    problem: '',
    severity_level: '',
    site_name: '',
    date: new Date(),
    status: '',
    userId: '',
    last_updated: new Date(),
    idRequest: idRequest,
  };

  const [data, setData] = useState(initialValues);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/request/view/${idRequest}`)
      .then((response) => {
        setData({ ...response.data[0] });
      });
  }, [idRequest]);

  //Edit Request
  const EditRequest = async (idRequest) => {
    await axios.put('http://localhost:3001/request/edit', data).then(() => {
      swal({
        text: 'Request updated successfully',
        icon: 'success',
        timer: 6000,
        buttons: false,
      });
    });
    history(-1);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleDisable = (data) => {
    if (data == 'completed') {
      return true;
    }
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Edit Request" />

        <form
          onSubmit={() => {
            EditRequest(idRequest);
          }}
        >
          <Grid container spacing={2} columnSpacing={5}>
            <Grid item xs={6}>
              <div className="infodesc">
                <div style={{ fontSize: '13px', lineHeight: '2.4' }}>
                  <p style={{ fontSize: '18px' }}>
                    <span style={{ fontSize: '18px', color: 'black' }}>
                      <b>Problem Category : </b>{' '}
                    </span>
                    {data.category}
                  </p>
                  <p style={{ fontSize: '18px' }}>
                    <span style={{ color: 'black' }}>
                      <b>Site Name : </b>{' '}
                    </span>
                    {data.site_name}
                  </p>

                  <p style={{ fontSize: '18px' }}>
                    <span style={{ color: 'black' }}>
                      <b>Severity_Level : </b>{' '}
                    </span>
                    {data.severity_level}
                  </p>
                  <p style={{ fontSize: '18px' }}>
                    <span style={{ color: 'black' }}>
                      <b>Status : </b>{' '}
                    </span>
                    {data.status}
                  </p>
                </div>
              </div>
              <FormLabel required="true" className="label">
                Problem
              </FormLabel>
              <br />

              {!handleDisable(data.status) ? (
                <TextField
                  style={{ paddingBottom: '30px' }}
                  variant="outlined"
                  fullWidth
                  multiline={true}
                  name="problem"
                  defaultValue={data.problem}
                  onChange={handleChange}
                />
              ) : (
                <p style={{ fontSize: '18px' }}>
                  {/* <span style={{ color: 'black' }}>
                      <b>Status : </b>{' '}
                    </span> */}
                  {data.problem}
                </p>
              )}
            </Grid>
          </Grid>

          <div style={{ paddingTop: '50px' }}>
            <span style={{ paddingLeft: '60%' }}>
              <Button variant="contained" color="info" type="submit">
                Save
              </Button>
            </span>

            <span
              style={{ paddingLeft: '10%' }}
              onClick={() => history('/help')}
            >
              <Button variant="contained" color="secondary">
                <ArrowBackIosNewIcon fontSize="small" />
                Back
              </Button>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditRequest;
