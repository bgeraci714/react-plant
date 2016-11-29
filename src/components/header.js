import React, {Component} from 'react';
import { Jumbotron } from 'react-bootstrap';

// component is a basic unit of content
export default class Header extends Component {
  render () {
    return (
      <div>
        <Jumbotron className="Jumbo-header AlignTextCenter">
          <h1> Plant API </h1>
          <br />
          <h4> A page built to interact with the Plant API built using Ruby on Rails. </h4>
        </Jumbotron>
      </div>
    );
  }
}
