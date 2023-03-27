import Button from "./UI/Button";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";

const Header = (props) => {
  const Cart = useSelector((state) => state.cart);
  let numberOfItemCart = 0;
  for (let i in Cart) {
    numberOfItemCart = numberOfItemCart + Cart[i].qt;
  }

  const cartButton = () => {
    props.onChangeCart();
  };

  return (
    <div className={classes.headerMain}>
      <div className={classes.headerInside}>
        <h2>STORE</h2>
      </div>
      <div className={classes.headerInside}></div>
      <div className={classes.headerInside}>
        <Button onClick={cartButton}>
          <span>Your Cart</span>
          <span className={classes.badge}>{numberOfItemCart}</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
