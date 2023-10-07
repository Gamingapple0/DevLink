import React, { Component } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';

// DropdownMenu component for selecting options
export default class DropdownMenu extends Component {
  // Handle the dropdown selection change
  handleChange = (e, { value }) => {
    const { setOption } = this.props;
    setOption(value); // Call the prop function to set the title
  };

  render() {
    const { title } = this.props;

    // Define dropdown options
    const options = [
      { key: 1, text: 'Title', value: 'Title' },
      { key: 2, text: 'Skills', value: 'Skills' },
    ];

    return (
      <Grid columns={1}> {/* Use 1 column grid */}
        <Grid.Column>
          <Dropdown
            onChange={this.handleChange}
            options={options}
            placeholder='Choose an option'
            selection
            value={title} // Set the value to the title prop
          />
        </Grid.Column>
      </Grid>
    );
  }
}
