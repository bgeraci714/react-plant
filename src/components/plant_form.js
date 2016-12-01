import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';



export default class PlantForm extends Component {
  render() {
    return (
      <div>
        <Panel collapsible defaultExpanded header="Add a New Plant" bsStyle="success" >
          <form>
            <FormGroup>
              <FormControl
                type="text"
                value={this.props.nameText}
                placeholder="Plant Name"
                onChange={(event) => this.props.handleChange({nameField:event.target.value})}>
              </FormControl>
              <br />
              <FormControl
                type="text"
                value={this.props.descText}
                placeholder="Description"
                onChange={(event) => this.props.handleChange({descField:event.target.value})}>
              </FormControl>
            </FormGroup>
            <Button
              type="submit" bsStyle="success" onClick={this.props.handleSubmit}>
              Submit
            </Button>
          </form>
        </Panel>
      </div>
    );
  }
}
