import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store";
import { useLocation } from "react-router";

const HomePage = () => {
  const { products, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);

  let keyword = query.get("search") || "";

  useEffect(() => {
    dispatch(productActions.fetchProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : products.length > 0 ? (
          products.map((product, idx) => (
            <Col sm={12} md={6} lg={4} xl={3} key={idx}>
              <Product product={product} />
            </Col>
          ))
        ) : (
          <Loader />
        )}
      </Row>
    </div>
  );
};

export default HomePage;
