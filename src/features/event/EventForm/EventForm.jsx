import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';
import TextArea from '../../../app/common/form/TextArea';
import DateInput from '../../../app/common/form/DateInput';

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.find(e => e.id === eventId);
  }

  return {
    initialValues: event
  };
};

const mapDispatchToProps = {
  createEvent,
  updateEvent
};

const categories = [
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'The category is required' }),
  description: composeValidators(
    isRequired({ message: 'Description is required' }),
    hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
});

class EventForm extends Component {
  onFormSubmit = values => {
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoUrl: '/assets/user.png',
        hostedBy: 'Me'
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  render() {
    const { history, initialValues, invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                component={TextInput}
                placeholder='Give your event a name'
              />
              <Field
                name='category'
                component={SelectInput}
                options={categories}
                placeholder='What is your event about?'
              />
              <Field
                name='description'
                component={TextArea}
                rows={3}
                placeholder='About your event'
              />
              <Header sub color='teal' content='Event Location Details' />
              <Field
                name='city'
                component={TextInput}
                placeholder='Event City'
              />
              <Field
                name='venue'
                component={TextInput}
                placeholder='Event Venue'
              />
              <Field
                name='date'
                component={DateInput}
                dateFormat='dd LLL yyyy h:mm a'
                showTimeSelect
                timeFormat='HH mm'
                placeholder='Event Date'
              />
              <Button disabled={invalid || submitting || pristine} positive type='submit'>
                Submit
              </Button>
              <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push('/events')
                }
                type='button'
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'eventForm', validate })(EventForm));
