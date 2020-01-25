import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Firebase from "firebase";
import firebaseConfig from "./config";

import DialogWin from "./components/dialog";
import TableNotes from "./components/table";
import Navbar from "./components/navbar";

class App extends Component {
  constructor(props) {
    super(props);

    Firebase.initializeApp(firebaseConfig);

    this.state = {
      rows: [],
      counter: 0,
      showDialog: false,
      type: "",
      selectedRowID: null,
      filtered: false,
      filter: { from: "", to: "", category: "" }
    };

    this.handleShowDialog = this.handleShowDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChoice(id) {
    this.setState({ selectedRowID: id });
  }

  handleShowDialog(type) {
    if (type === "Edit" && this.state.selectedRowID === null) {
      console.log("Select row to Edit");
    } else {
      this.setState({ showDialog: true, type: type });
    }
  }

  handleCloseDialog() {
    this.setState({ showDialog: false, type: "", selectedRowID: null });
  }

  handleAdd(row) {
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, "0");
    var mm = String(now.getMonth() + 1).padStart(2, "0");
    var yyyy = now.getFullYear();
    now = yyyy + "-" + mm + "-" + dd;

    const rows = [...this.state.rows];
    rows.push({
      id: this.state.counter,
      date: now,
      title: row.title,
      content: row.content,
      category: row.category
    });
    this.setState({ rows, counter: (this.state.counter += 1) });
    this.handleCloseDialog();
  }

  handleEdit(row) {
    if (this.state.selectedRowID === null) {
      console.log("Select row to Edit");
    } else {
      let rows = [...this.state.rows];
      rows.forEach(r => {
        if (r.id === this.state.selectedRowID) {
          r.title = row.title;
          r.content = row.content;
          r.category = row.category;
        }
      });
      this.setState({ rows: rows, selectedRowID: null });
      this.handleCloseDialog();
    }
  }

  handleDeleteRow(selectedRow) {
    if (this.state.selectedRowID !== null) {
      const rows = this.state.rows.filter(r => r.id !== selectedRow);
      this.setState({ rows: rows, selectedRowID: null });
    } else {
      console.log("Select row to delete");
    }
  }

  writeUserData = () => {
    Firebase.database()
      .ref("/")
      .set(this.state);
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  handleFilter(filter) {
    this.setState({ filter, filtered: true });
  }

  handleClear() {
    this.setState({
      filtered: false,
      filter: { from: "", to: "", category: "" }
    });
  }

  render() {
    let rows = [...this.state.rows]; //filtering data if filter applied
    if (this.state.filtered === true) {
      const filter = { ...this.state.filter };

      if (filter.from !== "" && filter.to === "") {
        rows = rows.filter(r => toDateObj(r.date) >= toDateObj(filter.from));
      } else if (filter.from === "" && filter.to !== "") {
        rows = rows.filter(r => toDateObj(r.date) <= toDateObj(filter.to));
      } else if (filter.from !== "" && filter.to !== "") {
        rows = rows.filter(
          r =>
            toDateObj(r.date) >= toDateObj(filter.from) &&
            toDateObj(r.date) <= toDateObj(filter.to)
        );
      }

      if (filter.category !== "") {
        rows = rows.filter(r => r.category === filter.category);
      }
    }
    return (
      <Container className="border">
        <h1 className="text-center">Notebook</h1>
        <p></p>
        <Navbar
          rows={this.state.rows}
          onFilter={this.handleFilter}
          onClear={this.handleClear}
        />

        <div className="table-wrapper-scroll-y scrollbar">
          <TableNotes
            pagination
            rows={rows}
            onChoice={this.handleChoice}
            selectedRowID={this.state.selectedRowID}
            onDouble={this.handleShowDialog}
          />
        </div>

        <Row className="center-block">
          <Col className="text-center">
            <Button
              variant="primary"
              onClick={e => this.handleShowDialog("Add")}
            >
              Add Note
            </Button>
          </Col>
          <Col className="text-center">
            <Button
              variant="secondary"
              onClick={e => this.handleShowDialog("Edit")}
            >
              Edit Note
            </Button>
          </Col>
          <Col className="text-center">
            <Button
              variant="danger"
              onClick={e => this.handleDeleteRow(this.state.selectedRowID)}
            >
              Delete Note
            </Button>
          </Col>
        </Row>

        <DialogWin
          type={this.state.type}
          show={this.state.showDialog}
          onShow={this.handleShowDialog}
          onClose={this.handleCloseDialog}
          onAdd={this.handleAdd}
          onEdit={this.handleEdit}
          rowToEdit={rows.filter(r => r.id === this.state.selectedRowID)[0]}
        />
        <p></p>
      </Container>
    );
  }
}

function toDateObj(dateStr) {
  const obj = new Date(dateStr);
  return obj;
}

export default App;
