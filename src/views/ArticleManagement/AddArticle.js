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
  const [varname, setVarname] = useState("");
  const [articletitle, setArticletitle] = useState("");
  const [articleauthor, setArticleauthor] = useState("P e k a");
  const [articlebody, setArticlebody] = useState("");
  const [articledate, setArticledate] = useState("");
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
    var date = format(new Date(), "dd/MM/yyyy");
    let file = new Blob([foto[0]], { type: "image/png" });
    file = foto;
    console.log("Pressed");
    bodyFormData.append("Article.ArticleTitle", articletitle);
    bodyFormData.append("Article.ArticleAuthor", articleauthor);
    bodyFormData.append("Article.ArticleBody", articlebody);
    bodyFormData.append("Article.ArticleDate", date);
    bodyFormData.append("ArticleBanner", foto);
    console.log(foto);
    console.log(typefoto);
    axios({
      method: "post",
      url: "http://3a78a3e1bf39.ngrok.io/api/Article",
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
    postAxios(articletitle, articleauthor, articlebody, articledate, foto);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.refresh();
    setOpen(false);
  };
  return (
    <GridContainer>
      <Card>
        <CardBody>
          <GridItem>
            <TextField
              id="article-title"
              label="Article Title"
              fullWidth={true}
              onChange={(e) => {
                setArticletitle(e.currentTarget.value);
              }}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="article-body"
              label="Article Body"
              multiline
              rows={10}
              fullWidth={true}
              onChange={(e) => {
                setArticlebody(e.currentTarget.value);
              }}
            />
          </GridItem>
          <br />
          <GridItem>
            <InputLabel>Article Banner Image</InputLabel>
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
            Add Article{" "}
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
