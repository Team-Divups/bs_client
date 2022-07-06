import React from 'react';
import Header from '../../components/Header';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
} from '@material-ui/core';
import { Select, MenuItem } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import swal from 'sweetalert';
import { date } from 'yup';

const initialValues = {
  category: '',
  problem: '',
  severity_level: 3,
  site_name: 3,
  date: new Date(),
};

const AddRequest = () => {
  const [values, setValues] = useState(initialValues);
  const [FormErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const history = useNavigate();

  //validation
  const validate = (values) => {
    const errors = {};
    //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //const pasregex = /[a-zA-Z]/;

    if (!values.category) {
      errors.category = 'category is required!';
    }

    if (!values.problem) {
      errors.problem = 'Problem is required!';
    }

    if (!values.severity_level) {
      errors.severity_level = 'Severity level is required';
    }

    if (!values.site_name) {
      errors.site_name = 'Site name is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(values));
    setIsSubmit(true);
  };

  //Changing upon errors
  useEffect(() => {
    console.log(FormErrors);
    if (Object.keys(FormErrors).length === 0 && isSubmit) {
      AddReq();
    }
  }, [FormErrors]);

  //updating values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const convertdate = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  //Add user
  const AddReq = async () => {
    console.log(values);
    await axios.post('http://localhost:3001/request/new', values).then(() => {
      console.log('success');
      setValues(initialValues);
      swal({
        text: 'Request added successfully',
        icon: 'success',
        timer: 2000,
        buttons: false,
      });
    });
  };

  //disabling button
  const enable =
    values.category &&
    values.problem &&
    values.severity_level &&
    values.site_name &&
    values.date;
  return (
    <div>
      {' '}
      <>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header title="Add New Request" />

          <div className="bottom">
            {/* left side with image*/}

            <div className="right">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} columnSpacing={5}>
                  <Grid item xs={6}>
                    <FormControl>
                      <FormLabel required="true" className="label">
                        Category
                      </FormLabel>
                      <Select
                        style={{
                          width: '220%',
                          height: '35px',
                          textAlign: 'center',
                        }}
                        id="demo-simple-select"
                        name="category"
                        value={values.category}
                        required
                        onChange={handleChange}
                      >
                        <MenuItem value="subscription">Subscription </MenuItem>

                        <MenuItem value="site">Site </MenuItem>
                        <MenuItem value="payment">Payment </MenuItem>
                        <MenuItem value="billing">Billing </MenuItem>
                        <MenuItem value="other">Other </MenuItem>
                      </Select>
                    </FormControl>
                    {/* <FormLabel required="true" className="label">
                      Problem
                    </FormLabel> */}
                    <TextField
                      style={{ paddingBottom: '30px' }}
                      name="problem"
                      id="outlined-multiline-static"
                      label="Problem"
                      multiline
                      maxRows={12}
                      value={values.problem}
                      onChange={handleChange}
                      fullWidth
                      error={FormErrors.problem}
                      helperText={FormErrors.problem}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormLabel required="true" className="label">
                      Severity Level
                    </FormLabel>
                    <RadioGroup
                      style={{ paddingBottom: '20px' }}
                      name="severity_level"
                      row
                      value={values.severity_level}
                      required
                      onChange={handleChange}
                      error={FormErrors.severity_level}
                      helperText={FormErrors.severity_level}
                    >
                      <FormControlLabel
                        value="minor"
                        control={<Radio color="success" />}
                        label="Minor"
                      />
                      <FormControlLabel
                        value="major"
                        control={<Radio color="success" />}
                        label="Major"
                      />
                      <FormControlLabel
                        value="critical"
                        control={<Radio color="success" />}
                        label="Critical"
                      />
                    </RadioGroup>
                    <FormLabel required="true" className="label">
                      Site Name
                    </FormLabel>
                    <RadioGroup
                      style={{ paddingBottom: '20px' }}
                      name="site_name"
                      row
                      value={values.site_name}
                      required
                      onChange={handleChange}
                      error={FormErrors.site_name}
                      helperText={FormErrors.site_name}
                    >
                      <FormControlLabel
                        value="hotel"
                        control={<Radio color="success" />}
                        label="Hotel"
                      />
                      <FormControlLabel
                        value="villa"
                        control={<Radio color="success" />}
                        label="Villa"
                      />
                      <FormControlLabel
                        value="cabana"
                        control={<Radio color="success" />}
                        label="Cabana"
                      />
                    </RadioGroup>

                    <div>
                      <FormLabel
                        className="label"
                        style={{ paddingTop: '20px' }}
                      >
                        Request created Date
                      </FormLabel>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          style={{ paddingBottom: '15px', paddingTop: '15px' }}
                          format="MMM/dd/yyyy"
                          name="addedDate"
                          value={values.date}
                          onChange={(date) => {
                            handleChange(convertdate('date', date));
                          }}
                        ></KeyboardDatePicker>
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                </Grid>

                <div style={{ paddingTop: '50px' }}>
                  <span style={{ paddingLeft: '60%' }}>
                    <Button
                      variant="contained"
                      color="info"
                      type="submit"
                      disabled={!enable}
                    >
                      Save
                    </Button>
                  </span>

                  <span
                    style={{ paddingLeft: '10%' }}
                    onClick={() => history(-1)}
                  >
                    <Button variant="contained" color="secondary">
                      <ArrowBackIosNewIcon fontSize="small" />
                      Back
                    </Button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <Editor /> */}
      </>
    </div>
  );
};

export default AddRequest;
