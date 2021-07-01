import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { cartActions } from "../store";

const CartPage = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const productId = params.id;
  const search = new URLSearchParams(location.search);
  const qty = search.get("qty");

  const { cartItems, error } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(cartActions.addToCart({ id: productId, qty }));
    }
  }, []);
  return 3;
};

export default CartPage;
