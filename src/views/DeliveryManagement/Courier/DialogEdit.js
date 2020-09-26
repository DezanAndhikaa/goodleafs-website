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
  const [courname, setCourname] = useState(props.couriername);
  const [courphone, setCourphone] = useState(props.courierphonenumber);
  const [courstatus, setCourstatus] = useState(props.courierstatus);
  const [courplate, setCourplate] = useState(props.courierplatenumber);
  const [courarea, setCourArea] = useState(props.courierarea);
  const [isValid, setIsValid] = useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    putAxios(
      props.idcourier,
      courname,
      courphone,
      courstatus,
      courplate,
      courarea
    );
  };

  const putAxios = () => {
    const Courier = {
      IdCourier: props.idcourier,
      CourierName: courname,
      CourierPhoneNumber: courphone,
      CourierStatus: 0,
      CourierPlateNumber: courplate,
      CourierArea: courarea,
    };
    Axios.put(`http://3a78a3e1bf39.ngrok.io/api/Courier`, { Courier })
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
              id="courier-name"
              label="Courier Name"
              ref={textInput}
              defaultValue={props.couriername}
              onChange={(e) => {
                setCourname(e.currentTarget.value);
              }}
              fullWidth={true}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="courier-phone"
              label="Courier Phone Number"
              ref={textInput}
              defaultValue={props.courierphonenumber}
              onChange={(e) => {
                setCourphone(e.currentTarget.value);
              }}
              fullWidth={true}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="courier-plate"
              label="Courier Plate Number"
              defaultValue={props.courierplatenumber}
              ref={textInput}
              onChange={(e) => {
                setCourplate(e.currentTarget.value);
              }}
              fullWidth={true}
            />
          </GridItem>
          <br />
          <GridItem>
            <InputLabel htmlFor="category-name">Courier Area</InputLabel>
            <Select
              fullWidth={true}
              native
              defaultValue={props.courierarea}
              onChange={(e) => {
                setCourArea(e.target.value);
              }}
              label="Courier Area"
              inputProps={{
                name: "courier-area",
                id: "courier-area",
              }}
            >
              <option value="Jakarta Utara">Jakarta Utara</option>
              <option value="Jakarta Timur">Jakarta Timur</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
            </Select>
          </GridItem>
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={handleClick}>
            Change Category Detail
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
