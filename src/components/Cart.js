import React, { useEffect, useState } from "react";
import classes from "./Cart.module.css";
import Cartitem from "../components/UI/Cartitem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const [cartQt, setCartQt] = useState([]);

  useEffect(() => {
    async function fectData() {
      const response = await fetch(
        "https://react-redux-7d230-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("no fetch data");
      }

      const data = await response.json();
      setCartQt(data);
    }
    fectData();
  }, []);
  // cartQt = useSelector((state) => state.cart);
  console.log(cartQt);

  const cartData = cartQt.filter((x) => {
    return x.qt > 0;
  });
  let totalAmount = 0;
  for (let i in cartData) {
    totalAmount = totalAmount + cartData[i].totalAmount;
  }

  const cartHtml = cartData.map((x, i) => {
    return (
      <Cartitem
        name={x.name}
        totalAmount={x.totalAmount}
        qt={x.qt}
        key={i}
      ></Cartitem>
    );
  });

  return (
    <div className={classes.cart}>
      {cartHtml}
      <div className={classes.totalAmount}>
        <h3>total Amount: {totalAmount}</h3>
      </div>
    </div>
  );
};

export default Cart;
