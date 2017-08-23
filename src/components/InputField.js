import React from 'react';

export default class InputField extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      onLetterInput: props.onLetterInput
    };
  }

  onLetterInput = (event) => {
    this.props.onLetterInput(event.target.value);
    // this.setState({latter: event.target.value});
  }

  render() {
    return <input type='text' maxLength='1' onChange={this.onLetterInput} />
  }
}
