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
import FinishedOrder from "./SubOrder/FinishedOrder.js";
import DeliveryStatus from "./SubOrder/DeliveryStatus.js";
import AssignCourier from "./SubOrder/AssignCourier.js";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import ConfirmOrder from "./SubOrder/ConfirmOrder.js";
import ConfirmArrived from "./SubOrder/ConfirmArrived.js";

const useStyles = makeStyles(styles);

export default function Icons() {
  const classes = useStyles();
  const [page, setPage] = React.useState("confirm");

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
              <ToggleButton value="confirm" aria-label="Categories">
                CONFIRM ORDER
              </ToggleButton>
              <ToggleButton value="assign" aria-label="Products">
                ASSIGN COURIER
              </ToggleButton>
              <ToggleButton value="delivery" aria-label="Deal Of The Day">
                DELIVERY STATUS
              </ToggleButton>
              <ToggleButton value="arrived" aria-label="Deal Of The Day">
                CONFIRM ARRIVED
              </ToggleButton>
              <ToggleButton value="finished" aria-label="Deal Of The Day">
                FINISHED ORDER
              </ToggleButton>
            </ToggleButtonGroup>
          </CardHeader>
          <CardBody color="primary">
            {(() => {
              switch (page) {
                case "confirm":
                  return <ConfirmOrder />;
                case "assign":
                  return <AssignCourier />;
                case "delivery":
                  return <DeliveryStatus />;
                case "arrived":
                  return <ConfirmArrived />;
                case "finished":
                  return <FinishedOrder />;
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
