import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "@material-ui/core/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";
import Axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  appBar: {
    position: "relative",
  },
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let textInput = React.createRef();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(styles);

export default function DialogEdit(props) {
  const classes = useStyles();
  const [pass, setPass] = useState(props.password);
  const [open, setOpen] = React.useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleClick = () => {
    putAxios(props.username, pass);
  };

  const putAxios = (username, password) => {
    const Admin = {
      Username: username,
      Password: password,
    };
    Axios.put(`http://3a78a3e1bf39.ngrok.io/api/Admin`, { Admin })
      .then((data) => {
        setIsValid(true);
        setOpen(true);
        props.reloadState(0);
      })
      .catch(() => {
        setIsValid(false);
        setOpen(true);
        props.reloadState(0);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    props.setTutup();
  };

  return (
    <GridContainer>
      <Card>
        <CardBody>
          <GridItem>
            <TextField
              id="username"
              label="Username"
              disabled
              value={props.username}
              fullWidth={true}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              ref={textInput}
              defaultValue={props.password}
              autoComplete="current-password"
              onChange={(e) => {
                setPass(e.currentTarget.value);
              }}
              fullWidth={true}
            />
          </GridItem>
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={handleClick}>
            Change Password
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={isValid ? "success" : "error"}
            >
              {isValid ? "This is a success message!" : "Error !"}
            </Alert>
          </Snackbar>
        </CardFooter>
      </Card>
    </GridContainer>
  );
}
