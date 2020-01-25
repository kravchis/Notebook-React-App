import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class TableNotes extends Component {
  render() {
    const { rows } = this.props;
    return (
      <div>
        <Table className="table">
          <thead className="thead-dark">
            <tr>
              {/* <th scope="col">ID</th> */}
              <th scope="col">DATE</th>
              <th scope="col">TITLE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr
                key={row.id}
                className={
                  this.props.selectedRowID === row.id ? "table-primary" : ""
                }
                onClick={() => this.props.onChoice(row.id)}
                onDoubleClick={() => this.props.onDouble("Edit")}
              >
                <td>{row.date}</td>
                <td>{row.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TableNotes;
