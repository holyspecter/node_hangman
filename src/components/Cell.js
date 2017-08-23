import React from 'react';

export default class Cell extends React.Component
{
  constructor(props) {
    console.log(props);
    super(props);

    this.state = {
      letter: props.letter,
      index: props.index
    };
  }

  render() {
    return <input type='text' maxLength='1' value={this.props.letter} />
  }
}
