import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './testActions';
import { Button } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions';

const mapStateToProps = state => ({
  data: state.test.data
});

// actions
const mapDispatchToProps = {
  incrementCounter,
  decrementCounter,
  openModal
};

class TestComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter, openModal } = this.props;
    return (
      <div>
        <h1>Test component</h1>
        <h3>{data}</h3>
        <Button onClick={incrementCounter} positive content='Increment' />
        <Button onClick={decrementCounter} negative content='Decrement' />
        <Button
          onClick={() => openModal('TestModal', { data: 'data' })}
          color='teal'
          content='Open Modal'
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
