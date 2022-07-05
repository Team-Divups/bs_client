import React, { useRef, useState } from 'react';
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';



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


const Text_Editor = () => {
  const [value, setValue] = useState('');
  const editorRef = useRef(null);

  const classes = useStyles();
  const [email, setEmail] = useState([]);
  const [message, setMessage] = useState('');
  const [subid, setSubid] = useState(1);
  const log = () => {
    if (editorRef.current) {
      setValue(editorRef.current.getContent());
      console.log(editorRef.current.getContent());
    }
  };


  //This is to senet individual mails
  const createMail = () => {
    if (editorRef.current) {
      setValue(editorRef.current.getContent());
      console.log(editorRef.current.getContent());
    }
    axios.post("http://localhost:3001/mail",{
      email: email,
      review:value,
      subid:subid,
      
    }).then(()=>
    console.log("Succefully Created"),
    //setData([...data, {b_name: name,reviewID: reviewID,email: email,country: country,status: status,date : date}])
    );

  };
  return (
    <div>

<Container component="main" maxWidth="xs" className="review-container">
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
            <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>This is the initial content of the editor.</p>"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
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
        </Container>
     
       <button onClick={log}>Log editor content</button>
    </div>
  )
}

export default Text_Editor