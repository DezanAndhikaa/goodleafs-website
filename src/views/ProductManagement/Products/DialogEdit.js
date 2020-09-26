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
  const [varname, setVarname] = useState(props.variantname);
  const [prodname, setProdname] = useState(props.productname);
  const [stok, setStok] = useState(props.stock);
  const [cost, setCost] = useState(props.cost);
  const [desc, setDesc] = useState(props.description);
  const [basecolor, setBasecolor] = useState(props.basecolor);
  const [catname, setCatname] = useState(props.categoryname);
  const [available, setAvailable] = useState(props.available);
  const [foto, setFoto] = useState(props.foto);
  const [catoption, setCatoption] = useState(props.catoption);
  const [typefoto, setTypefoto] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [isValid, setIsValid] = useState(true);

  const postAxios = () => {
    var bodyFormData = new FormData();
    let file = new Blob([foto[0]], { type: "image/png" });
    file = foto;
    console.log("Pressed");
    bodyFormData.append("Product.IdProduct", props.idproduct);
    bodyFormData.append("Product.ProductName", prodname);
    bodyFormData.append("Product.VariantName", varname);
    bodyFormData.append("Product.CategoryName", catname);
    bodyFormData.append("Product.Cost", cost);
    bodyFormData.append("Product.BaseColor", basecolor);
    bodyFormData.append("Product.IsAvailable", true);
    bodyFormData.append("Product.Stock", stok);
    bodyFormData.append("Product.Description", desc);
    bodyFormData.append("FileImage", foto);
    console.log(foto);
    console.log(typefoto);
    axios({
      method: "put",
      url: "http://3a78a3e1bf39.ngrok.io/api/Product",
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
    postAxios(prodname, varname, stok, catname, available, foto, typefoto);
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
            <TextField
              id="product-name"
              label="Product Name"
              fullWidth={true}
              defaultValue={props.productname}
              onChange={(e) => {
                setProdname(e.currentTarget.value);
              }}
            />
          </GridItem>

          <GridItem>
            <TextField
              id="product-description"
              label="Product Description"
              multiline
              defaultValue={props.description}
              onChange={(e) => {
                setDesc(e.currentTarget.value);
              }}
              rows={15}
              fullWidth={true}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="variant-name"
              label="Variant Name"
              defaultValue={props.variantname}
              fullWidth={true}
              onChange={(e) => {
                setVarname(e.currentTarget.value);
              }}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="product-stock"
              label="Product Stock"
              defaultValue={props.stock}
              type="number"
              fullWidth={true}
              onChange={(e) => {
                setStok(parseInt(e.currentTarget.value));
              }}
            />
          </GridItem>
          <br />
          <GridItem>
            <TextField
              id="product-cost"
              label="Product Cost"
              defaultValue={props.cost}
              type="number"
              fullWidth={true}
              onChange={(e) => {
                setCost(parseInt(e.currentTarget.value));
              }}
            />
          </GridItem>
          <br />
          <GridItem>
            <InputLabel htmlFor="category-name">Category Name</InputLabel>
            <Select
              fullWidth={true}
              native
              defaultValue={props.catname}
              onClick={console.log(catoption)}
              onChange={(e) => {
                setCatname(e.target.value);
              }}
              label="Category Name"
              inputProps={{
                name: "category-name",
                id: "category-name",
              }}
            >
              {catoption}
            </Select>
          </GridItem>
          <br />
          <GridItem>
            <InputLabel htmlFor="Availability">Set Availability</InputLabel>
            <Select
              fullWidth={true}
              native
              defaultValue={props.available}
              onChange={(e) => {
                setAvailable(e.target.value === "1" ? true : false);
                console.log(e.target.value === "1" ? true : false);
              }}
              label="Set Availability"
              inputProps={{
                name: "availability",
                id: "product-availability",
              }}
            >
              <option value="1">true</option>
              <option value="2">false</option>
            </Select>
          </GridItem>
          <GridItem>
            <InputLabel htmlFor="ColorPicker">Pick Base Color</InputLabel>
            <ColorPicker
              name="base-color"
              defaultValue={"#00000"}
              value={basecolor}
              onChange={(e) => {
                setBasecolor(e);
                console.log(e);
              }}
            />
          </GridItem>
          <br />
          <GridItem>
            <InputLabel>Product Photo</InputLabel>
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
            Change Product Detail{" "}
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
