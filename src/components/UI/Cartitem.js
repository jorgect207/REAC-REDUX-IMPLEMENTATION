import React from "react";
import classes from "./Item.module.css";

const Cartitem = (props) => {
  return (
    <div className={classes.item}>
      <div className={classes.subitems}>
        <h3>Name</h3>
        <h4>{props.name}</h4>
      </div>
      <div className={classes.subitems}>
        <h3>Amount</h3>
        <h3>
          x{props.qt} {props.totalAmount}
        </h3>
      </div>
    </div>
  );
};
export default Cartitem;
