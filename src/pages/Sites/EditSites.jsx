import React from "react";
import Header from "../../components/Header";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  Button,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

import "../styles.css";
import swal from "sweetalert";

const EditSites = (props) => {
  const { siteid } = useParams();

  const initialValues = {
    sitename: "",
    sitedescription: "",
    category: "",
    webURL: "",
    cname: "",
    cemail: "",
    location: "",
    siteimg: "",
    siteid: siteid,
  };

  const [values, setValues] = useState(initialValues);

  const [FormErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const history = useNavigate();

  //site info
  useEffect(() => {
    axios.get(`http://localhost:3004/site/view/${siteid}`).then((response) => {
      setValues({ ...response.data[0] });
    });
  }, [siteid]);

  //updating values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //handle image
  const handleImage = (e) => {
    setValues({ ...values, siteimg: e.target.files[0] });
  };

  //validation
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.sitename) {
      errors.sitename = "Name is required!";
    } else if (values.sitename.length < 4) {
      errors.sitename = "Name must be more than 4 characters";
    } else if (values.sitename.length > 30) {
      errors.sitename = "Name cannot exceed 30 characters";
    }

    if (!values.sitedescription.length > 500) {
      errors.sitedescription = "Description is too long";
    }

    if (!values.cemail) {
      errors.cemail = "Email is required!";
    } else if (!regex.test(values.cemail)) {
      errors.cemail = "This is not a valid email format!";
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
    if (Object.keys(FormErrors).length === 0 && isSubmit) {
      EditSite();
    }
  }, [FormErrors]);

  //Add site
  const EditSite = async () => {
    await axios
      .put("http://localhost:3004/site/edit", values, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        console.log("success");
        swal({
          text: "Site Updated successfully",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
      });

    history(-1);
  };

  //disabling button
  const enable = values.sitename && values.category && values.cemail;

  return (
    <>
      <div className="formPage">
        <div style={{ textAlign: "center", paddingTop: "10px" }}>
          {" "}
          <Header title="Edit Site" />
        </div>

        <div className="FormContainer">
          <form onSubmit={handleSubmit}>
            <div className="formTitle">Basic Details</div>

            <FormLabel required="true" className="label">
              Site Name
            </FormLabel>
            <TextField
              style={{ paddingBottom: "30px" }}
              name="sitename"
              fullWidth
              value={values.sitename}
              onChange={handleChange}
              error={FormErrors.sitename}
              helperText={FormErrors.sitename}
            />

            <FormLabel required="true" className="label">
              Category
            </FormLabel>
            <TextField
              style={{ paddingBottom: "30px" }}
              name="category"
              fullWidth
              value={values.category}
              onChange={handleChange}
            />

            <FormLabel className="label">Site Location</FormLabel>
            <TextField
              style={{ paddingBottom: "30px" }}
              name="location"
              fullWidth
              value={values.location}
              onChange={handleChange}
              error={FormErrors.location}
              helperText={FormErrors.location}
            />

            <div className="formTitle">Short Description and Facts</div>

            <FormLabel className="label">Description</FormLabel>
            <TextField
              style={{ paddingBottom: "30px" }}
              name="sitedescription"
              variant="outlined"
              fullWidth
              multiline
              value={values.sitedescription}
              onChange={handleChange}
            />

            <div className="formTitle">Contact Details</div>

            <FormLabel className="label">Contact Person Name</FormLabel>
            <TextField
              style={{ paddingBottom: "30px" }}
              fullWidth
              name="cname"
              value={values.cname}
              onChange={handleChange}
            />

            <FormLabel required="true" className="label">
              Contact Email
            </FormLabel>
            <TextField
              style={{ paddingBottom: "30px" }}
              fullWidth
              name="cemail"
              value={values.cemail}
              onChange={handleChange}
              error={FormErrors.cemail}
              helperText={FormErrors.cemail}
            />

            <FormLabel className="label">Website Link</FormLabel>
            <TextField
              style={{ paddingBottom: "30px" }}
              fullWidth
              name="webURL"
              value={values.webURL}
              onChange={handleChange}
            />

            <div>
              <FormLabel className="label">
                Site Profile Picture : <DriveFolderUploadIcon />
              </FormLabel>
              <input
                style={{ paddingTop: "15px", paddingBottom: "15px" }}
                type="file"
                name="siteimg"
                onChange={handleImage}
              />
            </div>

            <div style={{ paddingTop: "50px" }}>
              <span style={{ paddingLeft: "40%" }}>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  disabled={!enable}
                >
                  Save Changes
                </Button>
              </span>

              <span style={{ paddingLeft: "10%" }} onClick={() => history(-1)}>
                <Button variant="contained" color="secondary">
                  <ArrowBackIosNewIcon fontSize="small" />
                  Back
                </Button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSites;
