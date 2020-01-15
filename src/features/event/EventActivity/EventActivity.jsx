import React, { Fragment } from 'react'
import { Header, Segment } from 'semantic-ui-react'

const EventActivity = () => {
  return (
    <div>
      <Fragment>
        <Header attached='top' content='Recent Activity' />
        <Segment attached>
          <p>Recent Activity</p>
        </Segment>
      </Fragment>
    </div>
  )
}

export default EventActivity;
