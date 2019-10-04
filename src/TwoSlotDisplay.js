import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmptyRooms from './EmptyRooms.js';
import { HourSlotMap, Slots, DayNames, Complexes, Floors } from './Constants.js';
import { getNextSlot } from './Utilities.js';

class TwoSlotDisplay extends Component {
  constructor(props) {
    super(props)
    let day = 0, slot = 0, today = props.date, complex = "Any", floor = "Any";

    day = today.getDay() - 1;
    slot = HourSlotMap[today.getHours()];

    if (slot === undefined) {
      let hour = today.getHours();
      slot = 0;
      if (hour >= 18) {
        day = (day + 1) % 9;
      }
    }

    this.state = this.Build(day, slot, complex, floor);
  }

  Build(day, slot, complex, floor) {
    return { day, slot, complex, floor }
  }

  static propTypes = {
    schedule: PropTypes.array.isRequired,
    date: PropTypes.object.isRequired
  }

  render() {
    let next = getNextSlot(this.state.day, this.state.slot);
    return (
      <div className="container">
        <h3>
          Choose the slot that you want to chill at:
        </h3>
        <div className="row">
          <div className="col-md-12">
            <select value={this.state.day} onChange={(event) => {
              let newDay = parseInt(event.target.value, 10)
              this.setState(this.Build(newDay, this.state.slot, this.state.complex, this.state.floor));
            }}>
              {DayNames.map((val, ind) => (
                <option value={ind}>
                  {val}
                </option>
              ))}
            </select>
            <select value={this.state.slot} onChange={(event) => {
              let newSlot = parseInt(event.target.value, 10);
              this.setState(this.Build(this.state.day, newSlot, this.state.complex, this.state.floor));
            }}>
              {Slots.map((val, ind) => (
                <option value={ind}>
                  {val}
                </option>
              ))}
            </select>
            <select value={this.state.complex} onChange={(event) => {
              let newComplex = event.target.value
              this.setState(this.Build(this.state.day, this.state.slot, newComplex, this.state.floor))
            }}>
              {Object.keys(Complexes).map((val)=>(
                <option value={val}>
                  {val}
                </option>
              ))}
            </select>
            <select value={this.state.floor} onChange={(event) => {
              let newFloor = event.target.value
              this.setState(this.Build(this.state.day, this.state.slot, this.state.complex, newFloor))
            }}>
              {Object.keys(Floors).map((val)=>(
                <option value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <i>
              Rooms in BOLD are free for the next slot as well
            </i>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <EmptyRooms schedule={this.props.schedule}
                        day={this.state.day}
                        slot={this.state.slot}
                        complex={this.state.complex}
                        floor={this.state.floor}
                        show_common_next={true} />
          </div>
          <div className="col-md-6">
            <EmptyRooms schedule={this.props.schedule}
                        day={next.day}
                        slot={next.slot}
                        complex={this.state.complex}
                        floor={this.state.floor}
                        show_common_next={true} />
          </div>
        </div>
      </div>
    )
  }
}

export default TwoSlotDisplay;
