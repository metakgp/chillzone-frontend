import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmptyRooms from './EmptyRooms.js';
import { HourSlotMap, Slots, DayNames } from './Constants.js';

class TwoSlotDisplay extends Component {
  constructor(props) {
    super(props)
    let day = 0, slot = 0, today = props.date;

    day = today.getDay() - 1;
    slot = HourSlotMap[today.getHours()];

    if (slot === undefined) {
      let hour = today.getHours();
      slot = 0;
      if (hour >= 18) {
        day = (day + 1) % 9;
      }
    }

    this.state = this.Build(day, slot);
  }

  getNextDay(day, slot) {
    day = parseInt(day, 10)
    slot = parseInt(slot, 10)
    return (day + Math.floor((slot + 1) / 9)) % 5;
  }

  getNextSlot(slot) {
    slot = parseInt(slot, 10)
    return (slot + 1) % 9;
  }

  Build(day, slot) {
    day = parseInt(day, 10) % 5
    slot = parseInt(slot, 10) % 9
    return { day, slot }
  }

  static propTypes = {
    schedule: PropTypes.array.isRequired,
    date: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="container">
        <h3>
          Choose the slot that you want to chill at:
        </h3>
        <div className="row">
          <div className="col-md-12">
            <select value={this.state.day} onChange={(event) => {
              this.setState(this.Build(event.target.value, this.state.slot));
            }}>
              {DayNames.map((val, ind) => (
                <option value={ind}>
                  {val}
                </option>
              ))}
            </select>
            <select value={this.state.slot} onChange={(event) => {
              this.setState(this.Build(this.state.day, event.target.value));
            }}>
              {Slots.map((val, ind) => (
                <option value={ind}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <EmptyRooms schedule={this.props.schedule}
                        day={this.state.day}
                        slot={this.state.slot} />
          </div>
          <div className="col-md-6">
            <EmptyRooms schedule={this.props.schedule}
                        day={this.getNextDay(this.state.day, this.state.slot)}
                        slot={this.getNextSlot(this.state.slot)} />
          </div>
        </div>
      </div>
    )

  }
}

export default TwoSlotDisplay;
