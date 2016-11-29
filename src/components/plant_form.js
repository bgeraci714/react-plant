import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';



export default class PlantForm extends Component {
  render() {
    const formTitle = (
      <h4> Add a New Plant </h4>
    );

    const formInstance = (
      <div>
        <Panel collapsible defaultExpanded header={formTitle} bsStyle="success" >
          <form>
            <FormGroup>
              <FormControl type="text" value={this.props.nameText} placeholder="Plant Name" onChange={(event) => this.props.handleChange({nameField:event.target.value})}>
              </FormControl>
              <br />
              <FormControl type="text" value={this.props.descText} placeholder="Description" onChange={(event) => this.props.handleChange({descField:event.target.value})}>
              </FormControl>
            </FormGroup>
            <Button type="submit" bsStyle="success" onClick={this.props.handleSubmit}>
              Submit
            </Button>
          </form>
        </Panel>
      </div>
    );
    return (
        formInstance
    );
  }
}

/*
export default class PlantForm extends Component {
  constructor (props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A plant was submitted:' + this.state.value);
    event.preventDefault();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
*/
