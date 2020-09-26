/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { display } from "@material-ui/system";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@material-ui/core/Button";
import Delivery from "views/DeliveryManagement/Delivery/Delivery.js";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Courier from "views/DeliveryManagement/Courier/Courier.js";
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";

const useStyles = makeStyles(styles);

export default function Icons() {
  const classes = useStyles();
  const [page, setPage] = React.useState("Delivery");

  const handlePage = (event, newPage) => {
    setPage(newPage);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <ToggleButtonGroup
              value={page}
              exclusive
              onChange={handlePage}
              aria-label="Which Page"
              id="paging"
            >
              <ToggleButton value="delivery" aria-label="Delivery">
                DELIVERY
              </ToggleButton>
              <ToggleButton value="courier" aria-label="Courier">
                COURIER
              </ToggleButton>
            </ToggleButtonGroup>
          </CardHeader>
          <CardBody color="primary">
            {(() => {
              switch (page) {
                case "delivery":
                  return <Delivery />;
                case "courier":
                  return <Courier />;
                default:
                  return null;
              }
            })()}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
