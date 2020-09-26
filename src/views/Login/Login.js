import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Axios from "axios";
import DB from "tiny-idb.js";
import GridContainer from "components/Grid/GridContainer.js";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useScrollTrigger } from "@material-ui/core";
import UniqueString from "unique-string/unique-string.js";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Codingin.id
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [isLogged, setIsLogged] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isValid, setIsValid] = React.useState(true);

  var setUsername = async (name) => {
    const db = await DB.openDB("session", 1);

    // create a transaction and grab the menu store
    const menuStore = await DB.transaction(
      db,
      ["logged"],
      "readwrite"
    ).getStore("logged");

    // add the data, and grab the updated meals
    const newUserLogged = await DB.addObjectData(menuStore, {
      // set an unique ID
      userid: user,
    });
  };
  async function setUpDatabase() {
    "use strict";

    // create a DB with the name MenuDatabase and version 1
    // we're returning because the IndexedDB database object
    // will be resolved by the createDB promise
    return await DB.createDB("session", 1, [
      // list of object stores to create after the DB is created
      {
        // name of first object store
        name: "logged",

        // keyOptions of the object store
        config: { keyPath: "userid" },
      },
    ]);
  }

  const getUsername = async () => {
    await setUpDatabase();

    // open the database & grab the database object
    let db = await DB.openDB("session", 1);

    // create a transaction on the db
    // and retrieve the object store
    const menuStore = await DB.transaction(
      db, // transaction on our DB
      ["logged"], // object stores we want to transact on
      "readwrite" // transaction mode
    ).getStore("logged"); // retrieve the store we want

    // grab all meals from the menuStore
    let allUser = await DB.getAllObjectData(menuStore);

    // update the state with the grabbed data
    return allUser;
  };

  const postAxios = () => {
    console.log("Pressed");
    Axios.post(`http://3a78a3e1bf39.ngrok.io/api/Admin/login`, {
      username: user,
      password: pass,
    })
      .then((data) => {
        setUsername(user);
        setIsValid(true);
        setOpen(true);
      })
      .catch(() => {
        setIsValid(false);
        setOpen(true);
      });
  };
  const getUser = () => {
    let user = [];
    getUsername().then((result) => {
      console.log(result.length);
      if (result.length === 1) {
        user.push(result);
        setIsLogged(true);
        console.log(result);
      } else {
        user = null;
        setIsLogged(false);
        console.log("tidak");
      }
    });
    console.log(isLogged);
  };

  const redirect = () => {
    switch (isLogged) {
      case true:
        return <Redirect to="/admin" />;
      default:
        return console.log("false gan");
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      getUser();
      return;
    }
    getUser();
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {getUser()}
      {redirect()}

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={isValid ? "success" : "error"}>
            {isValid
              ? "This is a success message!"
              : "Username / Password incorrect !"}
          </Alert>
        </Snackbar>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => {
            setUser(e.target.value);
            console.log(user);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            postAxios(user, pass);
          }}
          className={classes.submit}
        >
          Sign In
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
