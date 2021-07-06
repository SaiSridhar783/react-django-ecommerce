import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.prevenDefault();
    if (keyword) {
      history.push("/?keyword=" + keyword);
    } else {
      history.push(history.location.pathname);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex" style={{ width: "38%" }}>
      <Form.Control
        type="text"
        name="search"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5 w-75"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="mx-2 p-2 w-25">
        Submit
      </Button>
    </Form>
  );
};

export default SearchBox;
