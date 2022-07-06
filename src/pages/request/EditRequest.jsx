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

const EditRequest = () => {
  const [data, setData] = useState([]);
  //const [category, setCategory] = useState();
  const [problem, setProblem] = useState();
  //const [severity_level, setSeverityLevel] = useState();
  //const [site_name, setSite] = useState();

  const { idRequest } = useParams();
  const history = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/request/view/${idRequest}`)
      .then((response) => {
        setData({ ...response.data[0] });
      });
  }, [idRequest]);

  //Edit Request
  const EditRequest = async (idRequest) => {
    await axios
      .put('http://localhost:3001/request/edit', {
        // category: category,
        problem: problem,
        //severityLevel: severity_level,
        //site: site_name,
        idRequest: idRequest,
      })
      .then(() => {
        swal({
          text: 'Request updated successfully',
          icon: 'success',
          timer: 6000,
          buttons: false,
        });
      });
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
              {/* <FormControl>
                <FormLabel required="true" className="label">
                  Category
                </FormLabel>
                <Select
                  style={{
                    paddingBottom: '20px',
                    width: '220%',
                    height: '35px',
                  }}
                  labelId="demo-simple-select-label"
                  name="category"
                  value={data.category}
                  label={data.category}
                  required
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <MenuItem value="subscription">Subscription</MenuItem>
                  <MenuItem value="site">Site</MenuItem>
                  <MenuItem value="payment">Payment</MenuItem>
                  <MenuItem value="billing">Billing</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl> */}

              <TextField
                style={{ paddingBottom: '30px' }}
                name="problem"
                id="outlined-multiline-static"
                //label="Problem"
                multiline
                maxRows={12}
                defaultValue={data.problem}
                onChange={(e) => {
                  setProblem(e.target.value);
                }}
                fullWidth
              />
            </Grid>

            {/* <Grid item xs={6}>
              <FormControl>
                <FormLabel required="true" className="label">
                  Severity Level
                </FormLabel>
                <RadioGroup
                  style={{ paddingBottom: '20px' }}
                  name="severity_level"
                  defaultValue={data.severityLevel}
                  required
                  onChange={(e) => {
                    setSeverityLevel(e.target.value);
                  }}
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
              </FormControl>

              <FormLabel required="true" className="label">
                Site Name
              </FormLabel>
              <RadioGroup
                style={{ paddingBottom: '20px' }}
                name="site_name"
                value={data.site}
                required
                onChange={(e) => {
                  setSite(e.target.value);
                }}
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
              </Grid>*/}
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
