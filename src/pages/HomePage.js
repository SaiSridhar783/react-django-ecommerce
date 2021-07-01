import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
//import products from "../utils/products";

import axiosInstance from "../utils/axios-instance";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/products/").then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, idx) => (
          <Col sm={12} md={6} lg={4} xl={3} key={idx}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
