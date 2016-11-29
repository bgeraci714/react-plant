import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap';

// component is a basic unit of content
class Plant extends Component {
  render(){
    return (
          <ListGroupItem className="AlignTextLeft" key={this.props.id}> <strong> {this.props.name}</strong>: {this.props.description} </ListGroupItem>


    )
  }
}

export default Plant;
