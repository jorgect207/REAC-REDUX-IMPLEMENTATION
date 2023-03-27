import React, { Fragment, useEffect, useState, useReducer } from "react";
import Header from "./components/Header";
import Card from "./components/UI/Card";
import Item from "./components/UI/Item";
import Cart from "./components/Cart";
import Notification from "./components/Notification";

import { useDispatch } from "react-redux";
import { cartActions } from "./storage/cart-slice";
import { useSelector } from "react-redux";

// this code could be better if in the data array just let name and price properties to save have less data in the server
export const data = [
  {
    name: "deGods",
    price: 200,
    // qt: 0,
    // totalAmount: 0,
  },
  {
    name: "mindfolk",
    price: 50,
    // qt: 0,
    // totalAmount: 0,
  },
];
let firsRendering = false;

const initialState = { isNotification: "", showNotification: false };
const reducer = (state, action) => {
  if (action.type === "Error") {
    return { ...state, isNotification: "Error" };
  }
  if (action.type === "Success") {
    return { ...state, isNotification: "Success" };
  }
  if (action.type === "show") {
    return { ...state, showNotification: true };
  }
  if (action.type === "dontShow") {
    return { ...state, showNotification: false };
  }
  return initialState;
};

function App() {
  const [showCart, setShowCart] = useState(false);
  // const [isNotification, setIsNotification] = useState();
  // const [showNotification, setShowNotification] = useState();

  const [state, dispatchCart] = useReducer(reducer, initialState);

  let message;

  const dispatch = useDispatch();

  const increaseHandle = (x) => {
    dispatch(cartActions.increaseAmount(x));
  };

  const decreaseHandle = (x) => {
    dispatch(cartActions.decrese(x));
  };

  function handleShowCart() {
    setShowCart((x) => !x);
  }

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    async function senData() {
      const response = await fetch(
        "https://react-redux-7d230-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error("no fetch data");
      }
      dispatchCart({ type: "Success" });

      if (firsRendering === true) {
        firsRendering = false;

        return;
      }
      dispatchCart({ type: "show" });
      //
      // dispatchCart({ type: "Success" });
    }

    senData().catch((error) => {
      dispatchCart({ type: "Error" });
    });

    setTimeout(() => {
      dispatchCart({ type: "dontShow" });
    }, 3000); // set the duration for how long the notification should be visible in milliseconds

    return () => clearTimeout();
  }, [cart]);

  if (state.isNotification === "Error") {
    message = "imposible to fecht data";
  } else if (state.isNotification === "Success") {
    message = "Seending data succesfull";
  }

  const dataToShow = data.map((x, i) => {
    return (
      <Item
        name={x.name}
        price={x.price}
        increase={increaseHandle}
        decrease={decreaseHandle}
        key={i}
        index={i}
      ></Item>
    );
  });

  return (
    <Fragment>
      {state.isNotification && state.showNotification ? (
        <Notification
          status={state.isNotification}
          title={state.isNotification}
          message={message}
        ></Notification>
      ) : (
        ""
      )}
      <Header onChangeCart={handleShowCart}></Header>
      {showCart && <Cart></Cart>}
      <Card>{dataToShow}</Card>
    </Fragment>
  );
}

export default App;
