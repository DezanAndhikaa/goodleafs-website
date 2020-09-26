import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import AddCategories from "./AddDelivery.js";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditUser from "./DialogEditCategories.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [openDelete, setopenDelete] = React.useState(false);

  const handleClickopenDelete = () => {
    setopenDelete(true);
  };

  const handleCloseDelete = () => {
    setopenDelete(false);
  };
  const [openEdit, setopenEdit] = React.useState(false);

  const handleClickopenEdit = () => {
    setopenEdit(true);
  };

  const handleCloseEdit = () => {
    setopenEdit(false);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Categories Table</h4>
            <p className={classes.cardCategoryWhite}>List of Categories</p>
            <Fab
              style={{ position: "relative", float: "right" }}
              color="default"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
              onClick={handleClickOpen}
            >
              <AddCircle />
            </Fab>
            <Dialog
              maxWidth={"xs"}
              fullWidth={true}
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>

                  <Typography variant="h6" className={classes.title}>
                    Add Category
                  </Typography>
                </Toolbar>
              </AppBar>
              <DialogContent style={{ overflow: "hidden" }}>
                <AddCategories margin="10px" />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Category Name", "Promo Code", "Action", ""]}
              tableData={[
                [
                  "Dakota Rice",
                  "Niger",
                  "Oud-Turnhout",
                  <DeleteIcon onClick={handleClickopenDelete} />,
                  <EditIcon onClick={handleClickopenEdit} />,
                ],
                [
                  "Minerva Hooper",
                  "Curaçao",
                  "Sinaai-Waas",
                  <DeleteIcon />,
                  <EditIcon />,
                ],
                [
                  "Sage Rodriguez",
                  "Netherlands",
                  "Baileux",
                  <DeleteIcon />,
                  <EditIcon />,
                ],
                [
                  "Philip Chaney",
                  "Korea, South",
                  "Overland Park",
                  <DeleteIcon />,
                  <EditIcon />,
                ],
                [
                  "Doris Greene",
                  "Malawi",
                  "Feldkirchen in Kärnten",
                  <DeleteIcon />,
                  <EditIcon />,
                ],
                [
                  "Mason Porter",
                  "Chile",
                  "Gloucester",
                  <DeleteIcon />,
                  <EditIcon />,
                ],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>

      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are You Sure You Want To Delete This ? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You Really Sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            No
          </Button>
          <Button onClick={handleCloseDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth={"xs"}
        fullWidth={true}
        open={openEdit}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseEdit}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit User
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent style={{ overflow: "hidden" }}>
          <EditUser />
        </DialogContent>
      </Dialog>
    </GridContainer>
  );
}
