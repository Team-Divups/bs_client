import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "../../components/Header";

import { GridListTile, GridList } from "@material-ui/core";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import {
  AddCircleRounded,
  DeleteOutlineSharp,
  Edit,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

import swal from "sweetalert";

import site from "../../Assets/site.jpg";
import "../viewpage.css";
import "../styles.css";

const ListSites = (props) => {
  const [siteData, setSiteData] = useState([]);
  const [searchdata, setSearchdata] = useState("");
  //  const [subid,setSubid] = useState(props.id);

  //sites list
  useEffect(() => {
    axios.get(`http://localhost:3004/site/${props.id}`).then((response) => {
      setSiteData(response.data);
      console.log(props.id);
    });
  }, [props.id]);

  //search functionality
  const handleChange = (e) => {
    e.preventDefault();
    setSearchdata(e.target.value.toLowerCase());

    if (searchdata.length > 0) {
      setSiteData(
        siteData.filter((val) => {
          return val.sitename.toLowerCase().includes(searchdata);
        })
      );
    }
  };

  //delete a site
  const Delete = (id) => {
    console.log(id);
    swal({
      text: "Are you sure you want to delete ?",
      buttons: true,
      confirmButtonText: "Yes,Delete",
      cancelButtonText: "No,Cancel",
      dangerMode: true,
      icon: "warning",
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(`http://localhost:3004/request/create`, {
            problem: "Delete this site",
            status: "Not started",
            siteId: id,
          })
          .then((response) => {
            swal({
              title: "Done !",
              text: "Request for site removal sent",
              icon: "success",
              timer: 2000,
              button: false,
            });
          });
      } else {
        swal({
          text: "Site details are restored !",
          timer: 2000,
          buttons: false,
        });
      }
    });
  };

  // delete all request
  const DeleteAll = () => {
    swal({
      title: "Are you sure?",
      text: "Use Help Desk to proceed your request",
      icon: "warning",
    });
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Pages" title="Sites" />

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <span className="dataTableTitle">Overview of Sites</span>
          </Grid>

          <Grid item xs={5}>
            <TextField
              style={{ paddingRight: "20px",height:"10px" }}
              placeholder="search"
              type="search"
              onChange={handleChange}
              value={searchdata}
              size="small"
            />

            <span style={{ paddingRight: "20px" }}>
              <Button
                style={{ backgroundColor: "red" }}
                size="small"
                variant="contained"
                endIcon={<DeleteOutlineSharp />}
                onClick={DeleteAll}
              >
                Remove All
              </Button>
            </span>

            <span>
              <Link to="/sites/new">
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<AddCircleRounded />}
                >
                  Create
                </Button>
              </Link>
            </span>
          </Grid>
        </Grid>
        <br/><br/>

        <GridList cols={3}>
          {siteData.map((sdata, index) => {
            return (
              <>
                <GridListTile>
                  <Card
                    sx={{
                      width: 350,
                      paddingTop: 6,
                      marginRight: 5,
                      paddingRight: 5,
                      height: 470,
                      gap: 5,
                    }}
                  >
                    <img
                      className="siteimg"
                      src={sdata.siteimg}
                      alt="site"
                    />

                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={10}>
                          <Typography fontFamily="Mulish">
                            <b>{sdata.sitename}</b>
                          </Typography>
                        </Grid>

                        <Grid item xs={1}>
                          <Link to={`/sites/edit/${sdata.siteid}`}>
                            <Edit fontSize="12" />
                          </Link>
                        </Grid>

                        <Grid item xs={1}>
                          <DeleteIcon
                            fontSize="12"
                            onClick={() => {
                              Delete(sdata.siteid);
                            }}
                          />
                        </Grid>
                      </Grid>

                      <div
                        style={{ height: "160px", paddingTop: "25px" }}
                        className="siteinfo"
                      >
                        {sdata.sitedescription}
                      </div>

                      <Link to={`/sites/${sdata.siteid}`}>
                        <Button
                          variant="outlined"
                          style={{ fontFamily: "Asap" }}
                        >
                          View Site
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </GridListTile>
              </>
            );
          })}
        </GridList>
      </div>
    </>
  );
};

export default ListSites;
