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
import AddCourier from "./AddCourier.js";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditUser from "./DialogEdit.js";
import MuiAlert from "@material-ui/lab/Alert";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import CardFooter from "components/Card/CardFooter.js";
import Pagination from "@material-ui/lab/Pagination";

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
    couriers: [],
    idcourier: "",
    couriername: "",
    courierphonenumber: "",
    courierstatus: null,
    courierplatenumber: "",
    courierarea: "",
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

  handleClickopenDelete = (idcour, courname) => {
    this.setState({
      openDelete: true,
      couriername: courname,
      idcourier: idcour,
    });
  };

  handleCloseDelete = () => {
    this.setState({
      openDelete: false,
    });
    this.refreshState();
  };

  handleClickopenEdit = (
    idcour,
    courname,
    courphone,
    courstatus,
    courplate,
    courarea
  ) => {
    this.setState({
      openEdit: true,
      idcourier: idcour,
      couriername: courname,
      courierphonenumber: courphone,
      courierstatus: courstatus,
      courierplatenumber: courplate,
      courierarea: courarea,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      openEdit: false,
    });
  };
  delAxios = (idcourier) => {
    const Courier = {
      IdCourier: idcourier,
    };
    console.log(idcourier);
    axios
      .delete(`http://3a78a3e1bf39.ngrok.io/api/Courier/${idcourier}`, {
        Courier,
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
  getpagination = () => {
    let total = [];
    axios.get(`http://3a78a3e1bf39.ngrok.io/api/Courier`).then((res) => {
      const temp = res.data;
      total = temp.TotalPagination;
      console.log(total);
      this.setState({
        totPage: total + 1,
      });
    });
  };

  refreshState = (v) => {
    let cour = [];
    axios
      .get(`http://3a78a3e1bf39.ngrok.io/api/Courier?Pagination=` + v)
      .then((res) => {
        res.data.Data.map((data) => {
          const tmp = [
            data.CourierName,
            data.CourierPhoneNumber,
            data.Status,
            data.CourierPlateNumber,
            data.CourierArea,
            <Fab
              color="default"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <a
                htmlFor="edit"
                onClick={() =>
                  this.handleClickopenEdit(
                    data.IdCourier,
                    data.CourierName,
                    data.CourierPhoneNumber,
                    data.Status,
                    data.CourierPlateNumber,
                    data.CourierArea
                  )
                }
              >
                <EditIcon />
              </a>

              <a
                htmlFor="delete"
                onClick={() =>
                  this.handleClickopenDelete(data.IdCourier, data.CourierName)
                }
              >
                <DeleteIcon />
              </a>
            </Fab>,
          ];
          cour.push(tmp);
        });
        console.log(cour);
        this.setState({
          couriers: cour,
        });
      });
  };

  componentDidMount() {
    this.getpagination();
    let cour = [];
    axios.get(`http://3a78a3e1bf39.ngrok.io/api/Courier`).then((res) => {
      res.data.Data.map((data) => {
        const tmp = [
          data.CourierName,
          data.CourierPhoneNumber,
          data.Status,
          data.CourierPlateNumber,
          data.CourierArea,
          <Fab
            color="default"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
          >
            <a
              htmlFor="edit"
              onClick={() =>
                this.handleClickopenEdit(
                  data.IdCourier,
                  data.CourierName,
                  data.CourierPhoneNumber,
                  data.Status,
                  data.CourierPlateNumber,
                  data.CourierArea
                )
              }
            >
              <EditIcon />
            </a>

            <a
              htmlFor="delete"
              onClick={() =>
                this.handleClickopenDelete(data.IdCourier, data.CourierName)
              }
            >
              <DeleteIcon />
            </a>
          </Fab>,
        ];
        cour.push(tmp);
      });
      console.log(cour);
      this.setState({
        couriers: cour,
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
                <h4 className={classes.cardTitleWhite}>Courier Table</h4>
                <p className={classes.cardCategoryWhite}>List of Courier</p>
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
                <Dialog
                  maxWidth={"xs"}
                  fullWidth={true}
                  open={this.state.open}
                  onClose={this.handleClose}
                  TransitionComponent={Transition}
                >
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={this.handleClose}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" className={classes.title}>
                        Add Courier
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <DialogContent style={{}}>
                    <AddCourier
                      margin="10px"
                      refresh={this.handleClose}
                      reloadState={this.refreshState}
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Courier Name",
                    "Courier Phone Number",
                    "Courier Status",
                    "Courier Plate Number",
                    "Courier Area",
                    "Action",
                  ]}
                  tableData={this.state.couriers}
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
              {"Are you sure you want to delete "}
              {this.state.categoryname}
              {" ? "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDelete} color="primary">
                No
              </Button>
              <Button
                onClick={() => this.delAxios(this.state.idcourier)}
                color="primary"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            maxWidth={"xs"}
            fullWidth={true}
            open={this.state.openEdit}
            onClose={() => this.setState({ openEdit: false })}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => this.setState({ openEdit: false })}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Change Category Detail
                </Typography>
              </Toolbar>
            </AppBar>
            <DialogContent style={{ overflow: "hidden" }}>
              <EditUser
                idcourier={this.state.idcourier}
                couriername={this.state.couriername}
                courierphonenumber={this.state.courierphonenumber}
                courierstatus={this.state.courierstatus}
                courierplatenumber={this.state.courierplatenumber}
                courierarea={this.state.courierarea}
                setTutup={() => {
                  this.setState({
                    openEdit: false,
                  });
                }}
                reloadState={this.refreshState}
              />
            </DialogContent>
          </Dialog>
          <Snackbar
            open={this.state.openAlert}
            autoHideDuration={6000}
            onClose={this.handleCloseAlert()}
          >
            <Alert
              onClose={this.handleCloseAlert()}
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
