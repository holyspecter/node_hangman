import React from 'react';
import Cell from './Cell';
import InputField from './InputField';

export default class Game extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      word: ['w', 'o', 'r', 'd'],
      currentState: ['', '', '', ''],
      failsCount: 0
    };
  }

  onLetterInput = (value) => {
    // console.log(value);
    if (this.state.word.indexOf(value) !== -1) {
      let indexes = [];

      this.state.word.map((e, i) => {
        if (e === value) {
          indexes.push(i);
        }
      });

      console.log(indexes);

      const { currentState } = this.state;
      indexes.map((key) => {
        currentState[key] = value;
      });

      this.setState({currentState});
    } else {
      let failsCount = this.state.failsCount;
      failsCount++;

      this.setState({failsCount});
    }
    console.log(this.state);
  }

  render() {
    return (<div>
      <div>
        <InputField onLetterInput={this.onLetterInput} />
      </div>
      <div>
        {this.state.currentState.map(
          (latter, index) => <Cell key={index} letter={latter} index={index}/>
        )}
      </div>
    </div>);
  }
}
