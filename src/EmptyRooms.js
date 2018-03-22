import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { DayNames, Slots } from './Constants.js';
import chunk from 'lodash.chunk';

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

    let day = this.props.day, slot = this.props.slot;

    console.log("Day and slot: " + day + ', ' + slot)

    if(!(day >= 0 && day < 5 && slot >= 0 && slot < 9)) {
      return (
        <h3>
          That day/slot ({day}/{slot}) combination is invalid. 0 &lt;= Day &lt; 5 and 0 &lt;= Slot &lt; 9
        </h3>
      )
    }

    let schedule = this.props.schedule[day][slot];
    let schedule_chunked = chunk(schedule, 4);

    return (
      <div>
        <h3>
          Empty Rooms on {this.DayNames[day]} from {this.Slots[slot]}
        </h3>
        <Table striped bordered condensed hover>
          <tbody>
            {schedule_chunked.map((val) => (
              <tr>
                {val.map((room) => (
                  <td>
                    {room}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
   )
  }
}

export default EmptyRooms;

