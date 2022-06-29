import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  Divider,
  Rating,
} from "@mui/material";

import Header from "../../components/Header";
import "../viewpage.css";

import { Edit } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";

import site from "../../Assets/site.jpg";
import sitesm from "../../Assets/site.png";
import user from "../../Assets/user.png";
import { LineChart } from "../../components";

const SiteAnalysis = () => {
  const { siteid } = useParams();

  const [siteData, setSiteData] = useState([]);
  const [siteUser, setSiteUser] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rate, setRate] = useState(0);

  //site rating
  useEffect(() => {
    axios
      .get(`http://localhost:3004/site/rating/${siteid}`)
      .then((response) => {
        setRate({ ...response.data[0] });
        console.log(rate);
      });
  }, [siteid]);

  //site info
  useEffect(() => {
    axios.get(`http://localhost:3004/site/view/${siteid}`).then((response) => {
      setSiteData(response.data);
    });
  }, [siteid]);

  /*site user info
  useEffect(() => {
    axios.get(`http://localhost:3004/site/user/${siteid}`).then((response) => {
      setSiteUser(response.data);
    });
  }, [siteid]);*/

  //site reviews info
  useEffect(() => {
    axios
      .get(`http://localhost:3004/site/reviews/${siteid}`)
      .then((response) => {
        setReviews(response.data);
      });
  }, [siteid]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="View Sites" />

      <Card>
        <CardMedia
          component="img"
          className="cardHeaderImage"
          image={site}
          alt="site"
        />
      </Card>

      {siteData.map((val) => (
        <Card>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={1}>
                <img src={sitesm} alt="profile" className="profileimg" />
              </Grid>

              <Grid item xs={8}>
                <Box height="100%" mt={0.5} lineHeight={1}>
                  <Typography variant="h5" fontFamily="Mulish">
                    <b>{val.sitename}</b>
                  </Typography>
                  <Typography className="category">{val.category}</Typography>
                </Box>
              </Grid>

              <Grid item xs={2}>
                <a href={val.webURL} target="_blank">
                  <Button variant="outlined" style={{ fontFamily: "Asap" }}>
                    View Website
                  </Button>
                </a>
              </Grid>

              <Grid item xs={1}>
                <Link to="/sites/mail">
                  <Button
                    style={{
                      fontFamily: "Asap",
                      backgroundColor: "#84fae4",
                      color: "blue",
                    }}
                  >
                    Mail
                  </Button>
                </Link>
              </Grid>
            </Grid>

            <Rating value={rate.rate} readOnly size="large" precision={0.5} />

            <Grid container spacing={2} columnSpacing={15}>
              <Grid item xs={5}>
                <Box className="content">
                  <Typography fontFamily="Asap">
                    <b style={{ paddingRight: "320px" }}>Site profile</b>
                    <Link to={`/sites/edit/${val.siteid}`}>
                      <Edit sx={{ fontSize: 15 }} />
                    </Link>
                  </Typography>

                  <Divider
                    orientation="horizontal"
                    style={{ paddingTop: "15px", width: "95%" }}
                  />

                  <div className="infodesc">
                    <p style={{ paddingBottom: "10px" }}>
                      Location : {val.location}
                    </p>
                    <p>Email : {val.cemail}</p>
                    <p style={{ paddingBottom: "25px", paddingTop: "25px" }}>
                      {val.sitedescription}
                    </p>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={7}>
                <Box className="content">
                  <Typography fontFamily="Asap">
                    <b>Top Reviews</b>
                  </Typography>
                  <Divider
                    orientation="horizontal"
                    style={{ paddingTop: "15px", width: "75%" }}
                  />
                  <br />

                  {reviews.map((tdata, index) => {
                    return (
                      <>
                        <Grid
                          container
                          spacing={3}
                          style={{ paddingTop: "10px" }}
                        >
                          <Grid item xs={2}>
                            <img src={user} alt="userimg" className="userimg" />
                          </Grid>

                          <Grid item xs={8}>
                            <span className="userinfo">
                              <b>{tdata.content}</b>
                              <br />
                              <p style={{ color: "grey" }}>
                                Rating :{" "}
                                <Rating
                                  value={tdata.rating}
                                  readOnly
                                  size="small"
                                />
                              </p>
                            </span>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>

            <Box style={{ paddingLeft: "10px" }}>
              <Grid container spacing={2}>
                <Grid iteam xs={10}>
                  <Typography sx={{ paddingLeft: "13px", fontFamily: "Asap" }}>
                    <b>Site Individual Analysis</b>
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Link to={`/sites/analysis/${val.siteid}`}>
                    <Button variant="outlined" style={{ fontFamily: "Asap" }}>
                      View More
                    </Button>
                  </Link>
                </Grid>
              </Grid>

              <br />
              <br />
              <div className="md:w-full overflow-auto">
                <LineChart />
              </div>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SiteAnalysis;
