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
import Autocomplete from "@material-ui/lab/Autocomplete";

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
  const [voucher, setVoucher] = useState(props.voucher);
  const [disctype, setDisctype] = useState("");
  const [available, setAvailable] = useState(true);
  const [foto, setFoto] = useState({
    name: "",
    type: "",
  });
  const [typefoto, setTypefoto] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [isValid, setIsValid] = useState(true);
  const [items, setItem] = useState([]);
  const listprod = {
    options: props.products,
    getOptionLabel: (option) => option.productname,
  };

  const postAxios = () => {
    var bodyFormData = new FormData();
    let file = new Blob([foto[0]], { type: "image/png" });
    file = foto;
    console.log("Pressed");
    bodyFormData.append("Discount.IdDiscount", iddisc);
    bodyFormData.append("Discount.DiscountName", discname);
    bodyFormData.append("Discount.DiscountStart", discstart);
    bodyFormData.append("Discount.DiscountEnd", discend);
    bodyFormData.append("Discount.DiscountType", "1");
    bodyFormData.append("Discount.Content", disccontent);
    bodyFormData.append("Discount.Voucher", voucher);
    bodyFormData.append("Discount.Items", items);
    bodyFormData.append("DiscountBanner", foto);
    console.log(foto);
    console.log(typefoto);
    axios({
      method: "put",
      url: "http://3a78a3e1bf39.ngrok.io/api/Discount",
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

  const handleAddItems = (e, value) => {
    let tmp = [];
    let id = [];
    tmp = value;
    tmp.map((data) => {
      id.push(data.idproduct);
    });
    setItem(id);
    console.log(items);
  };

  const handleClick = () => {
    postAxios(
      iddisc,
      discname,
      discstart,
      discend,
      disctype,
      disccontent,
      voucher,
      foto
    );
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
        <CardBody>
          <GridItem>
            <Autocomplete
              id="combo-box-products"
              multiple
              {...listprod}
              style={{ width: 300 }}
              onChange={handleAddItems}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Products"
                  variant="outlined"
                />
              )}
            />
          </GridItem>
          <br />
          <GridItem>
            <TextField
              id="disc-name"
              label="Discount Name"
              defaultValue={discname}
              fullWidth={true}
              onChange={(e) => {
                setDiscname(e.currentTarget.value);
              }}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="discount-start"
              label="Date Time Start"
              type="datetime-local"
              defaultValue={discstart}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setDiscstart(e.currentTarget.value);
              }}
              fullWidth={true}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="discount-end"
              label="Date Time End"
              type="datetime-local"
              className={classes.textField}
              defaultValue={discend}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setDiscend(e.currentTarget.value);
              }}
              fullWidth={true}
            />
          </GridItem>
          <br />
          <GridItem>
            <TextField
              id="disc-content"
              label="Discount content"
              defaultValue={disccontent}
              fullWidth={true}
              onChange={(e) => {
                setDisccontent(e.currentTarget.value);
              }}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="disc-voucher"
              label="Discount Voucher"
              fullWidth={true}
              defaultValue={voucher}
              onChange={(e) => {
                setVoucher(e.currentTarget.value);
              }}
            />
          </GridItem>
          <GridItem>
            <InputLabel>Promo Image</InputLabel>
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
          </GridItem>
        </CardBody>
        <CardFooter>
          <Button color="secondary" onClick={() => handleClick()}>
            {" "}
            Change Promo Detail{" "}
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
