import React, { Component } from "react";
import { Button } from "react-bootstrap";

class CommuteDelete extends Component {
  constructor(props) {
    super(props);
    this.deleteCommute = this.deleteCommute.bind(this);
  }

  deleteCommute(e) {
    var commuteID = e.target.id;
    console.log(`Deleted book that has id: ${commuteID}`);
    this.props.deleteCommute(commuteID); //pass the commute id to Custom (parent)
  }

  render() {
    const commuteID = this.props.commuteID;
    console.log(commuteID);
    return (
      <Button
        variant="outline-light"
        id={commuteID}
        onClick={this.deleteCommute}
      >
        x
      </Button>
    );
  }
}

export default CommuteDelete;
