import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Session from "session.js";
import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import DB, { openDB } from "tiny-idb";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [isLogged, setIsLogged] = React.useState(true);
  const [username, setUsername] = React.useState([]);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  async function setUpDatabase() {
    "use strict";

    // create a DB with the name MenuDatabase and version 1
    // we're returning because the IndexedDB database object
    // will be resolved by the createDB promise
    return await DB.createDB("session", 1, [
      // list of object stores to create after the DB is created
      {
        // name of first object store
        name: "logged",

        // keyOptions of the object store
        config: { keyPath: "userid" },
      },
    ]);
  }

  const getUsername = async () => {
    await setUpDatabase();

    // open the database & grab the database object
    let db = await DB.openDB("session", 1);

    // create a transaction on the db
    // and retrieve the object store
    const menuStore = await DB.transaction(
      db, // transaction on our DB
      ["logged"], // object stores we want to transact on
      "readwrite" // transaction mode
    ).getStore("logged"); // retrieve the store we want

    // grab all meals from the menuStore
    let allUser = await DB.getAllObjectData(menuStore);

    // update the state with the grabbed data
    return allUser;
  };

  const getUser = () => {
    let user = [];
    getUsername().then((result) => {
      if (result.length === 1) {
        result.map((data) => {
          user.push(data.userid);
        });
        setIsLogged(true);
      } else {
        user.slice(0);
        setIsLogged(false);
        console.log("tidak");
      }
      setUsername(user);
      Session.setName(user);
    });
    switch (isLogged) {
      case false:
        return <Redirect to="/login" />;
      default:
        return null;
    }
  };

  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      {getUser()}
      <Sidebar
        routes={routes}
        logoText={"Good Leafs"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          username={username}
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
