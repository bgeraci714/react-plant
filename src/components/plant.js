import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

// component is a basic unit of content
class Plant extends Component {
  render(){
    //console.log(this.props.id);
    return (
          <ListGroupItem
            className="AlignTextLeft"
            key={this.props.id}>
              <Button
                bsStyle="danger" bsSize="xsmall" onClick={this.props.handleDelete(this.props.id)}>
                X
              </Button>
              <strong> {this.props.name}</strong>: {this.props.description}
          </ListGroupItem>
    );
  }
}

export default Plant;
