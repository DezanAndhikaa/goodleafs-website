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
import Snackbar from "@material-ui/core/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";
import axios, { post } from "axios";
import Fab from "@material-ui/core/Fab";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import MuiAlert from "@material-ui/lab/Alert";
import ColorPicker from "material-ui-color-picker";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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

export default function TableList(props) {
  const classes = useStyles();
  const [userid, setUserid] = useState(props.userid);
  const [username, setUsername] = useState(props.name);
  const [useremail, setUseremail] = useState(props.email);
  const [userpassword, setUserPassword] = useState(props.password);
  const [userphone, setUserphone] = useState(props.phone);
  const [userbirthday, setUserbirthday] = useState(props.birthday);
  const [usergender, setUsergender] = useState(props.gender);
  const [useraddress, setUseraddress] = useState(props.address);
  const [userzipcode, setUserzipcode] = useState(props.zipcode);
  const [userhobby, setUserhobby] = useState(props.hobby);
  const [userlastorder, setLastorder] = useState(props.lastorder);
  const [usertotalorder, setTotalorder] = useState(0);
  const [foto, setFoto] = useState({
    name: "",
    type: "",
  });
  const [typefoto, setTypefoto] = useState(null);
  const [catoption, setCatoption] = useState(props.catoption);
  const [open, setOpen] = React.useState(false);
  const [isValid, setIsValid] = useState(true);

  const postAxios = () => {
    var bodyFormData = new FormData();
    let file = new Blob([foto[0]], { type: "image/png" });
    var date = format(new Date(userbirthday), "dd/MM/yyyy");
    var date2 = format(new Date(), "dd/MM/yyyy");
    file = foto;
    console.log("Pressed");
    bodyFormData.append("User.UserId", props.userid);
    bodyFormData.append("User.Name", username);
    bodyFormData.append("User.Email", useremail);
    bodyFormData.append("User.Password", userpassword);
    bodyFormData.append("User.Phone", userphone);
    bodyFormData.append("User.Birthday", date);
    bodyFormData.append("User.Gender", usergender);
    bodyFormData.append("User.Address", useraddress);
    bodyFormData.append("User.ZipCode", userzipcode);
    bodyFormData.append("User.Hobby", userhobby);
    bodyFormData.append("User.LastOrder", date2);
    bodyFormData.append("User.TotalOrder", usertotalorder);
    bodyFormData.append("UserProfile", foto);
    console.log(foto);
    console.log(typefoto);
    axios({
      method: "put",
      url: "http://3a78a3e1bf39.ngrok.io/api/User",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data; boundary=${data._boundary}",
      },
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted + "%");
      },
    })
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

  const handleClick = () => {
    postAxios(
      useremail,
      userpassword,
      userphone,
      userbirthday,
      usergender,
      useraddress,
      userzipcode,
      userhobby,
      userlastorder,
      usertotalorder,
      foto
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.reloadState();
    props.refresh();
    setOpen(false);
  };
  return (
    <GridContainer>
      <Card>
        <CardBody>
          <GridItem>
            <TextField
              id="user-name"
              label="User Name"
              fullWidth={true}
              defaultValue={props.username}
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
            />
          </GridItem>

          <GridItem>
            <TextField
              id="user-email"
              label="User Email"
              defaultValue={props.email}
              onChange={(e) => {
                setUseremail(e.currentTarget.value);
              }}
              fullWidth={true}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="password"
              label="Password"
              defaultValue={props.password}
              fullWidth={true}
              onChange={(e) => {
                setUserPassword(e.currentTarget.value);
              }}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="user-phone"
              label="User Phone Number"
              defaultValue={props.phone}
              fullWidth={true}
              onChange={(e) => {
                setUserphone(e.currentTarget.value);
              }}
            />
          </GridItem>
          <br />
          <GridItem>
            <InputLabel style={{ color: "#AAAAAA" }}>Birthday</InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="birthday"
                label="Your Birthday Here"
                format="dd/MM/yyyy"
                value={userbirthday}
                onChange={(e) => {
                  setUserbirthday(e);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </GridItem>
          <br />
          <GridItem>
            <InputLabel htmlFor="user-gender">Gender</InputLabel>
            <Select
              fullWidth={true}
              native
              defaultValue={props.gender}
              onClick={console.log(catoption)}
              onChange={(e) => {
                setUsergender(e.target.value);
              }}
              label="Gender"
              inputProps={{
                name: "user-gender",
                id: "user-gender",
              }}
            >
              <option value="1">Pria </option>
              <option value="2">Perempuan </option>
            </Select>
          </GridItem>
          <br />

          <GridItem>
            <TextField
              id="user-address"
              label="User Address"
              multiline
              rows={2}
              fullWidth={true}
              defaultValue={props.address}
              onChange={(e) => {
                setUseraddress(e.currentTarget.value);
              }}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="user-zipcode"
              label="User Zipcode"
              defaultValue={props.zipcode}
              fullWidth={true}
              onChange={(e) => {
                setUserzipcode(e.currentTarget.value);
              }}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="user-hobby"
              label="User Hobby"
              defaultValue={props.hobby}
              fullWidth={true}
              onChange={(e) => {
                setUserhobby(e.currentTarget.value);
              }}
            />
          </GridItem>
          <br />
          <GridItem>
            <InputLabel>User Photo</InputLabel>
            <br />
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(e) => {
                  setFoto(e.currentTarget.files[0]);
                }}
              />
              <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
              >
                <AddAPhotoIcon />
              </Fab>
            </label>
            {/* <Button onClick={(e) => {
                            this.fileUpload(this.state.file).then((response) => {
                                console.log(response.data);
                            })
                        }} >UPLOAD</Button> */}
          </GridItem>
        </CardBody>
        <CardFooter>
          <Button color="secondary" onClick={() => handleClick()}>
            {" "}
            Change User Detail{" "}
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={isValid ? "success" : "error"}
            >
              {isValid ? "This is a success message!" : "Error"}
            </Alert>
          </Snackbar>
        </CardFooter>
      </Card>
    </GridContainer>
  );
}
