import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
//import Container from "react-bootstrap/Container";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      category: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleClear.bind(this);
  }

  handleChange(e, type) {
    this.setState({ [type]: e.target.value });
  }

  handleClear() {
    this.setState({ from: "", to: "", category: "" });
    //console.log(this.state);
    this.props.onClear();
  }

  render() {
    let categories = this.props.rows.map(r => r.category);
    //categories = new Set(categories);
    categories = Array.from(new Set(categories));
    //console.log(categories);
    //console.log(categories);
    return (
      <Row style={{ paddingLeft: 50 }}>
        <h5 align="center" margin="3">
          From:
        </h5>
        <Col className="text-center">
          <Form.Group controlId="from">
            <Form.Control
              value={this.state.from}
              onChange={e => this.handleChange(e, "from")}
              type="date"
              placeholder="From"
            />
          </Form.Group>
        </Col>
        <h5 align="center" margin="3">
          To:
        </h5>
        <Col className="text-center">
          <Form.Group controlId="from">
            <Form.Control
              value={this.state.to}
              onChange={e => this.handleChange(e, "to")}
              type="date"
              placeholder="To"
            />
          </Form.Group>
        </Col>
        <h5 align="center" margin="3">
          Category:
        </h5>
        <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              name="category"
              onChange={e => this.handleChange(e, "category")}
            >
              <option></option>
              {categories.map(c => (
                <option>{c}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Button
            variant="primary"
            onClick={() => this.props.onFilter(this.state)}
          >
            Filter
          </Button>{" "}
          <Button variant="danger" onClick={() => this.handleClear()}>
            Clear
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Navbar;
