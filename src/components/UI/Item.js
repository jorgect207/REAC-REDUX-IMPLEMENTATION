import React from "react";
import classes from "./Item.module.css";

const Item = (props) => {
  function increaseHandler() {
    props.increase(props.index);
  }

  function decreaseHandler() {
    props.decrease(props.index);
  }

  return (
    <div className={classes.item}>
      <div className={classes.subitems}>
        <h3>Name</h3>
        <h4>{props.name}</h4>
      </div>
      <div
        className={classes.subitems}
        style={{ borderLeft: "none", borderRight: "none" }}
      >
        <h3>Price</h3>
        <div>{props.price}</div>
      </div>
      <div className={classes.subitems}>
        <h3>Amount</h3>
        <div>
          <button onClick={increaseHandler}>+</button>

          <button onClick={decreaseHandler}>-</button>
        </div>
      </div>
    </div>
  );
};

export default Item;
