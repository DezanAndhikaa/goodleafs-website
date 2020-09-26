import React, { Component } from "react";
import ReactDOM from "react-dom";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Fab from "@material-ui/core/Fab";
import AddCircle from "@material-ui/icons/AddCircle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Create";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import Axios from "axios";
import Products from "./Products/Products";

const styles = (theme) => ({
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
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class TableList extends Component {
  state = {
    open: false,
    openDelete: false,
    openEdit: false,
    products: [],
    items: [],
    deal: [],
    productname: "",
    idproduct: "",
    openAlert: false,
    isValid: true,
  };

  listprod = {
    options: this.state.products,
    getOptionLabel: (option) => option.productname,
  };

  handleAddItems = (e, value) => {
    let tmp = [];
    let id = [];
    let full = [];
    tmp = value;
    //check value length
    if (value.length < 11) {
      tmp.map((data) => {
        id.push(data.idproduct);
        full.push(data);
      });
      this.setState({
        items: id,
        deal: full,
      });
    } else {
      this.setState({
        isValid: false,
        openAlert: true,
      });
    }
  };

  getProduct = () => {
    let prod = [];
    Axios.get(`http://3a78a3e1bf39.ngrok.io/api/Product/all`).then((res) => {
      res.data.map((data) => {
        const tmp = {
          productname: data.ProductName,
          idproduct: data.IdProduct,
        };
        prod.push(tmp);
      });
      this.setState({
        products: prod,
      });
    });
  };

  getDeal = () => {
    let prod = [];
    Axios.get(`http://3a78a3e1bf39.ngrok.io/api/Product/DealDay`).then(
      (res) => {
        res.data.map((data) => {
          const tmp = {
            productname: data.ProductName,
            idproduct: data.IdProduct,
          };
          prod.push(tmp);
        });
        this.setState({
          deal: prod,
        });
      }
    );
  };

  openAlert = () => {
    this.setState({ openAlert: true });
  };

  handleClick = () => {
    this.postAxios(this.state.items);
  };

  postAxios = (items) => {
    Axios.put(`http://3a78a3e1bf39.ngrok.io/api/Product/DealDay`, {
      IdProducts: items,
    })
      .then((data) => {
        this.setState({
          isValid: true,
          openAlert: true,
        });
      })
      .catch(() => {
        this.setState({
          isValid: false,
          openAlert: true,
        });
      });
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      openAlert: false,
    });
  };
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      openAlert: false,
    });
  };

  refreshState = () => {
    this.getProduct();
    this.getDeal();
  };

  componentDidMount() {
    this.getProduct();
    this.getDeal();
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Deals of the Day</h4>
                <Fab
                  style={{ position: "relative", float: "right" }}
                  color="default"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                  onClick={this.handleClickOpen}
                >
                  <AddCircle />
                </Fab>
              </CardHeader>
              <CardBody>
                <GridItem>
                  <Autocomplete
                    id="combo-box-products"
                    multiple
                    options={this.state.products}
                    value={this.state.deal}
                    getOptionSelected={(option, value) =>
                      option.idproduct === value.idproduct
                    }
                    getOptionLabel={(option) => option.productname}
                    style={{ width: 300 }}
                    onChange={this.handleAddItems}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Add Products"
                        variant="outlined"
                      />
                    )}
                  />
                </GridItem>
                <br></br>
                <GridItem>
                  <Button color="secondary" onClick={this.handleClick}>
                    {" "}
                    Add Promo{" "}
                  </Button>
                </GridItem>
              </CardBody>
            </Card>
          </GridItem>
          <Snackbar
            open={this.state.openAlert}
            autoHideDuration={6000}
            onClose={this.handleCloseAlert}
          >
            <Alert
              onClose={this.handleCloseAlert}
              severity={this.state.isValid ? "success" : "error"}
            >
              {this.state.isValid ? "This is a success message!" : "Error"}
            </Alert>
          </Snackbar>
        </GridContainer>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TableList);
