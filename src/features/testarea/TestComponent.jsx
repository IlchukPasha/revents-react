import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAsync, decrementAsync } from './testActions';
import { Button } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions';

const mapStateToProps = state => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName
});

// actions
const mapDispatchToProps = {
  incrementAsync,
  decrementAsync,
  openModal
};

class TestComponent extends Component {
  render() {
    const {
      data,
      incrementAsync,
      decrementAsync,
      openModal,
      loading,
      buttonName
    } = this.props;
    return (
      <div>
        <h1>Test component</h1>
        <h3>{data}</h3>
        <Button
          name='increment'
          loading={buttonName === 'increment' && loading}
          onClick={(e) => incrementAsync(e.target.name)}
          positive
          content='Increment'
        />
        <Button
          name='decrement'
          loading={buttonName === 'decrement' && loading}
          onClick={(e) => decrementAsync(e.target.name)}
          negative
          content='Decrement'
        />
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
