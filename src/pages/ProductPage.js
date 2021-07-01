import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
// import products from "../utils/products";
import axiosInstance from "../utils/axios-instance";
import { useEffect, useState } from "react";

const ProductPage = (props) => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  //const product = products.find((p) => p._id === params.id);
  useEffect(() => {
    axiosInstance.get("/api/product/" + params.id).then(({ data }) => {
      setProduct(data);
    });
  }, [params.id]);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3} style={{ fontSize: "100%" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color="#f8e825"
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item
                className={`text-center ${
                  product.countInStock <= 0 ? "cursor-not" : null
                }`}
              >
                <Button
                  type="button"
                  disabled={product.countInStock > 0 ? false : true}
                  className="btn-block"
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
