import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class DialogWin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      category: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleAdd() {
    this.props.onAdd(this.state);
    this.setState({ title: "", content: "", category: "" });
  }

  handleEdit() {
    this.props.onEdit(this.state);
    this.setState({ title: "", content: "", category: "" });
  }

  handleClose() {
    this.props.onClose();
    this.setState({ title: "", content: "", category: "" });
  }

  handleChange(e, type) {
    this.setState({
      [type]: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type === "Edit") {
      this.setState({
        title: nextProps.rowToEdit.title,
        content: nextProps.rowToEdit.content,
        category: nextProps.rowToEdit.category
      });
    }
  }

  render() {
    let dialog = null;
    if (this.props.type === "Add") {
      dialog = (
        <Modal show={this.props.show} onHide={() => this.props.onClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={this.state.title}
                onChange={e => this.handleChange(e, "title")}
                type="text"
                placeholder="Title"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Content</Form.Label>
              <Form.Control
                value={this.state.content}
                onChange={e => this.handleChange(e, "content")}
                type="text"
                placeholder="Content"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={this.state.category}
                onChange={e => this.handleChange(e, "category")}
                type="text"
                placeholder="Category"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.handleAdd()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
    if (this.props.type === "Edit") {
      dialog = (
        <Modal show={this.props.show} onHide={() => this.props.onClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={this.state.title}
                onChange={e => this.handleChange(e, "title")}
                type="text"
                placeholder="title"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Content</Form.Label>
              <Form.Control
                value={this.state.content}
                onChange={e => this.handleChange(e, "content")}
                type="text"
                placeholder="Content"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={this.state.category}
                onChange={e => this.handleChange(e, "category")}
                type="text"
                placeholder="Category"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.handleEdit()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }

    return <React.Fragment>{dialog}</React.Fragment>;
  }
}

export default DialogWin;
