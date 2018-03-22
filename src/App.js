import React, { Component } from 'react';
import './App.css';
import CustomTable from './CustomTable.js';
import PropTypes from 'prop-types';
import EmptyRoomsTable from './EmptyRoomsTable.js';
import EmptyRooms from './EmptyRooms.js'

class App extends Component {
  static PropTypes = {
    schedule: PropTypes.object.isRequired,
    empty_schedule: PropTypes.object.isRequired
  }
  render() {
    let day = 0, slot = 0;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Chillzone - IIT Kharagpur</h1>
          <h3>Find a place to chill, NOW!</h3>
        </header>
        <div class="row">
          <div class="col-md-6">
            <EmptyRooms schedule={this.props.empty_schedule} day={day} slot={slot} />
          </div>
          <div class="col-md-6">
            <EmptyRooms schedule={this.props.empty_schedule} day={day} slot={(slot + 1) % 9} />
          </div>
        </div>

        <EmptyRoomsTable schedule={this.props.empty_schedule} />
          {Object.keys(this.props.schedule).map(key => {
            return <CustomTable room={key} schedule={this.props.schedule[key]} />
          })}
      </div>
    );
  }
}

export default App;
