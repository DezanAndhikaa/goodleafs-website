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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Create";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiAlert from "@material-ui/lab/Alert";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import CardFooter from "components/Card/CardFooter.js";
import { format } from "date-fns";

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
    orders: [],
    idorder: "",
    idcour: "",
    inPage: 0,
    onPage: 0,
    totPage: "",
    openAlert: false,
    isValid: true,
  };

  openAlert = () => {
    this.setState({ openAlert: true });
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClickopenDelete = (idcat, catname) => {
    this.setState({
      openDelete: true,
      categoryname: catname,
      idorder: idcat,
    });
  };

  handleCloseDelete = () => {
    this.setState({
      openDelete: false,
    });
    this.refreshState();
  };

  handleClickopenEdit = (idcat, catname) => {
    this.setState({
      openEdit: true,
      idorder: idcat,
      idcour: catname,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      openEdit: false,
    });
  };

  CancelOrder = (idorder) => {
    axios
      .put(`http://3a78a3e1bf39.ngrok.io/api/Order/status`, {
        IdOrder: idorder,
        StatusOrder: 4,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({ isValid: true, openAlert: true });
      })
      .catch(() => {
        this.setState({ isValid: false, openAlert: true });
      });
  };

  delAxios = (idorder, idcourier) => {
    if (idcourier !== null) {
      axios
        .put(`http://3a78a3e1bf39.ngrok.io/api/Order/status`, {
          IdOrder: idorder,
          StatusOrder: 2,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.setState({ isValid: true, openAlert: true });
        })
        .catch(() => {
          this.setState({ isValid: false, openAlert: true });
        });
    } else {
      this.setState({ isValid: false, openAlert: true });
    }
  };

  getpagination = () => {
    let total = [];
    axios
      .get(`http://3a78a3e1bf39.ngrok.io/api/Order?StatusOrder=1`)
      .then((res) => {
        const temp = res.data;
        total = temp.TotalPagination;
        console.log(total);
        this.setState({
          totPage: total + 1,
        });
      });
  };

  refreshState = () => {
    let catname = [];
    axios
      .get(`http://3a78a3e1bf39.ngrok.io/api/Order?StatusOrder=1`)
      .then((res) => {
        res.data.map((data) => {
          let prodname = "";
          let totalprod = 0;
          let list = [];
          let tgl = [
            <div>{format(new Date(data.TanggalOrder), "dd/MM/yyyy")}</div>,
            format(new Date(data.TanggalOrder), "HH.mm"),
          ];
          data.ListProducts.map((val) => {
            const listtemp = (
              <div>{[val.ProductName + " = " + val.TotalProducts]}</div>
            );
            list.push(listtemp);
          });
          const tmp = [
            data.EmailUser,
            tgl,
            list,
            data.NamaCourier,
            <Fab
              color="default"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <Button
                htmlFor="edit"
                onClick={() =>
                  this.handleClickopenEdit(data.IdOrder, data.IdCourier)
                }
              >
                {" "}
                CHANGE STATUS{" "}
              </Button>
            </Fab>,
          ];
          catname.push(tmp);
        });
        console.log(catname);
        this.setState({
          orders: catname,
        });
      });
  };

  componentDidMount() {
    this.getpagination();
    let catname = [];
    axios
      .get(`http://3a78a3e1bf39.ngrok.io/api/Order?StatusOrder=1`)
      .then((res) => {
        res.data.map((data) => {
          let prodname = "";
          let totalprod = 0;
          let list = [];
          let tgl = [
            <div>{format(new Date(data.TanggalOrder), "dd/MM/yyyy")}</div>,
            format(new Date(data.TanggalOrder), "HH.mm"),
          ];
          data.ListProducts.map((val) => {
            const listtemp = (
              <div>{[val.ProductName + " = " + val.TotalProducts]}</div>
            );
            list.push(listtemp);
          });
          const tmp = [
            data.EmailUser,
            tgl,
            list,
            data.NamaCourier,
            <Fab
              color="default"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <Button
                htmlFor="edit"
                onClick={() =>
                  this.handleClickopenEdit(data.IdOrder, data.IdCourier)
                }
              >
                {" "}
                CHANGE STATUS{" "}
              </Button>
            </Fab>,
          ];
          catname.push(tmp);
        });
        console.log(catname);
        this.setState({
          orders: catname,
        });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Orders Table</h4>
                <p className={classes.cardCategoryWhite}>List of Orders</p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Email User",
                    "Tanggal Order",
                    "List Products",
                    "Courier Assigned",
                    "Action",
                  ]}
                  tableData={this.state.orders}
                />
              </CardBody>

              <CardFooter>
                <Pagination
                  count={this.state.totPage}
                  page={this.state.onPage}
                  onChange={(e, value) => {
                    this.setState({
                      onPage: value,
                      inPage: value - 1,
                    });
                    this.refreshState(value - 1);
                  }}
                />
              </CardFooter>
            </Card>
          </GridItem>

          <Dialog
            open={this.state.openDelete}
            TransitionComponent={Transition}
            onClose={this.handleCloseDelete}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Are you sure you want to cancel "}
              {this.state.idorder}
              {" ? "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to cancel the order?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDelete} color="primary">
                No
              </Button>
              <Button
                onClick={() => this.CancelOrder(this.state.idorder)}
                color="primary"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.openEdit}
            TransitionComponent={Transition}
            onClose={this.handleCloseEdit}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Are you sure you want to accept "}
              {this.state.idorder}
              {" ? "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to accept the order?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseEdit} color="primary">
                No
              </Button>
              <Button
                onClick={() =>
                  this.delAxios(this.state.idorder, this.state.idcour)
                }
                color="primary"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={this.state.openAlert}
            autoHideDuration={6000}
            onClose={this.handleCloseAlert}
          >
            <Alert
              onClose={this.handleCloseAlert}
              severity={this.state.isValid ? "success" : "error"}
            >
              {this.state.isValid ? "This is a success message!" : "Error !"}
            </Alert>
          </Snackbar>
        </GridContainer>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TableList);
