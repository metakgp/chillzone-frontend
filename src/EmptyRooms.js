import React, { Component } from 'react';
import GenerateEmptyRoomsTR from './GenerateEmptyRoomsTR.js';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { DayNames, Slots } from './Constants.js';

class EmptyRooms extends Component {
  constructor() {
    super()
    this.DayNames = DayNames;
    this.Slots = Slots;
  }

  static propTypes = {
    schedule: PropTypes.object.isRequired,
    day: PropTypes.number.isRequired,
    slot: PropTypes.number.isRequired
  }

  render() {
    return (
      <div>
        <h3>
          Empty Rooms at {this.DayNames[this.props.day]} from {this.Slots[this.props.slot]}
        </h3>
      </div>
   )
  }
}

export default EmptyRooms;
