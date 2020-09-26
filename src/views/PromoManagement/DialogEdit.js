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
import CardHeader from "components/Card/CardHeader";
import Type1 from "./Type1FormEdit.js";

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
  const [iddisc, setIdDisc] = useState(props.iddiscount);
  const [discname, setDiscname] = useState(props.discountname);
  const [discstart, setDiscstart] = useState(props.discountstart);
  const [discend, setDiscend] = useState(props.discountend);
  const [disccontent, setDisccontent] = useState(props.discountcontent);
  const [disctype, setDisctype] = useState(props.discounttype);
  const [voucher, setVoucher] = useState(props.voucher);
  const [page, setPage] = useState(props.discounttype);
  const [available, setAvailable] = useState(true);
  const [foto, setFoto] = useState({
    name: "",
    type: "",
  });
  const [typefoto, setTypefoto] = useState(null);
  const [products, setProd] = useState(props.products);
  const [open, setOpen] = React.useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChangeType = (e) => {
    setPage(e.target.value);
    setDisctype(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.reloadState();
    setOpen(false);
  };
  return (
    <GridContainer>
      <Card>
        <CardHeader>
          <GridItem>
            <InputLabel htmlFor="disc-type">Discount Type</InputLabel>
            <Select
              fullWidth={true}
              native
              onChange={handleChangeType}
              label="Discount Type"
              defaultValue={props.discounttype}
              onClick={console.log(disctype)}
              inputProps={{
                name: "discount-type",
                id: "discount-type",
              }}
              disabled
            >
              <option aria-label="None" value="" />
              <option value="1">tipe 1</option>
              <option value="2">tipe 2</option>
            </Select>
          </GridItem>
        </CardHeader>
        <CardBody>
          {(() => {
            switch (page) {
              case "1":
                return (
                  <Type1
                    products={products}
                    iddiscount={props.iddiscount}
                    discountname={props.discountname}
                    discountstart={props.discountstart}
                    discountend={props.discountend}
                    discountcontent={props.discountcontent}
                    discountend={props.discountend}
                    discountcontent={props.discountcontent}
                    voucher={props.voucher}
                    onClose={handleClose}
                    reloadState={handleClose}
                  />
                );
              case "2":
                return 2;
              default:
                return "";
            }
          })()}
        </CardBody>
        <CardFooter>
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
