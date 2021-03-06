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
import Type1 from "./Type1FormAdd.js";

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
  const [iddisc, setIdDisc] = useState("");
  const [discname, setDiscname] = useState("");
  const [discstart, setDiscstart] = useState("");
  const [discend, setDiscend] = useState("");
  const [disccontent, setDisccontent] = useState("");
  const [disctype, setDisctype] = useState("");
  const [page, setPage] = useState("");
  const [available, setAvailable] = useState(true);
  const [foto, setFoto] = useState({
    name: "",
    type: "",
  });
  const [typefoto, setTypefoto] = useState(null);
  const [products, setProd] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isValid, setIsValid] = useState(true);

  const getProduct = () => {
    let prod = [];
    axios.get(`http://3a78a3e1bf39.ngrok.io/api/Product/all`).then((res) => {
      res.data.map((data) => {
        const tmp = {
          productname: data.ProductName,
          idproduct: data.IdProduct,
        };
        prod.push(tmp);
      });
      setProd(prod);
      console.log(prod);
    });
  };
  const postAxios = () => {
    var bodyFormData = new FormData();
    let file = new Blob([foto[0]], { type: "image/png" });
    file = foto;
    console.log("Pressed");
    bodyFormData.append("Discount.DiscountName", discname);
    bodyFormData.append("Discount.DiscountStart", discstart);
    bodyFormData.append("Discount.DiscountEnd", discend);
    bodyFormData.append("Discount.DiscountType", disctype);
    bodyFormData.append("Discount.Content", disccontent);
    bodyFormData.append("DiscountBanner", foto);
    console.log(foto);
    console.log(typefoto);
    axios({
      method: "post",
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
  const handleChangeType = (e) => {
    getProduct();
    setPage(e.target.value);
    setDisctype(e.target.value);
  };

  const handleClick = () => {
    postAxios(discname, discstart, discend, disctype, disccontent, foto);
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
              inputProps={{
                name: "discount-type",
                id: "discount-type",
              }}
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
