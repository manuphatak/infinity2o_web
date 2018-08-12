import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import DayDropdown from "./DayDropdown";
import { Row, Col } from "antd";
import daysOfWeek from "./daysOfWeek";

class InputSchedule extends Component {
  renderDaysOfWeekDropdowns() {
    return _.map(daysOfWeek, day => {
      return (
        <Col span={3} key={day.label}>
          <DayDropdown day={day} />
        </Col>
      );
    });
  }

  render() {
    const { colorTheme } = this.props;

    return (
      <div>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={24}>
            <Row type="flex" justify="start" align="middle">
              <Col span={24}>
                <h3
                  style={{
                    color: colorTheme.text4Color
                  }}
                >
                  When am I free to video chat for my class?
                </h3>
              </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={24}>
                {this.renderDaysOfWeekDropdowns()}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    colorTheme: state.colorTheme
  };
}

export default connect(mapStateToProps, null)(InputSchedule);
