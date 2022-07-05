import React,{useState} from 'react'
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));



export default function MailForReviews() {


  const classes = useStyles();
    const [email, setEmail] = useState([]);
    const [message, setMessage] = useState('');
    const [subid, setSubid] = useState(1);


    //This is to senet individual mails
    const createMail = () => {
        axios.post("http://localhost:3001/mail",{
          email: email,
          review:message,
          subid:subid,
          
        }).then(()=>
        console.log("Succefully Created"),
        //setData([...data, {b_name: name,reviewID: reviewID,email: email,country: country,status: status,date : date}])
        );
    
      };

  return (
    <div><Container component="main" maxWidth="xs" className="review-container">
    <div className={classes.paper}>
    <Typography component="h1" variant="h5">
      Send Mails
    </Typography>

    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
      
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(event)=>{setEmail(event.target.value)}}
            placeholder="Enter recipient email"
            
          />
        </Grid>

       


        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            multiline
            maxRows={5}
            name="Review"
            label="Custom Message"
            id="Review"
            autoComplete="Your Review"
            onChange={(event)=>{setMessage(event.target.value)}}
            placeholder="Enter customized message"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        style={{background: "#84fae4"  }}
        className={classes.submit}
        onClick={()=>createMail()}
      >
        Send Review request
      </Button>
      
    </form>

    </div>
    </Container></div>
  )
}
