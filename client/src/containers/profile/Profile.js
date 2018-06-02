import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as authActionCreators from "../../actions/auth";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import Options from "../payment/Options";
import DisplayField from "./DisplayField";
import DisplayLinkField from "./DisplayLinkField";
import VoteEdit from "./votes/VoteEdit";
import { Layout, Row, Col, Button, Avatar, Icon } from "antd";
import "./Profile.css";
const { Content } = Layout;

class Profile extends Component {
  componentWillMount() {
    // run once before first render()
    this.props.fetchUserProfile();
    this.props.onProfile();
  }
  renderNameAndAge() {
    const { profile } = this.props;
    console.log("profile.age = ", profile.age);
    if (profile.age !== undefined) {
      return profile.name + ", " + profile.age;
    } else {
      return profile.name;
    }
  }
  renderProfile() {
    const { colorTheme, profile } = this.props;
    let neuronsInBillions = profile.payment.neuronsInBillions;
    if (neuronsInBillions !== undefined) {
      neuronsInBillions = neuronsInBillions.toFixed(1);
    }
    return (
      <div>
        <Row type="flex" justify="start" align="middle">
          <Col>
            <h2
              style={{
                color: colorTheme.keyText6Color
              }}
            >
              {this.renderNameAndAge()}
            </h2>
          </Col>
        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col
            span={24}
            style={{
              padding: "10px 100px 0px" // top left&right bottom
            }}
          >
            <Avatar shape="circle" src={profile.imageUrl} />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{
            padding: "0% 0% 0%" // top left&right bottom
          }}
        >
          <Col span={1}>
            <img
              alt="Neurons: "
              style={{ width: "35px" }}
              src="https://user-images.githubusercontent.com/24757872/40867763-8f2df248-65cc-11e8-892f-3e22b4032b4a.png"
            />
          </Col>
          <Col span={23}>
            <DisplayField label="Neurons: " value={neuronsInBillions} />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{
            padding: "5px 0% 0%" // top left&right bottom
          }}
        >
          <Col span={1}>
            <img
              alt="Interests: "
              style={{ width: "35px" }}
              src="https://user-images.githubusercontent.com/24757872/40868785-206477b0-65d6-11e8-9d7a-5482bcd504c3.png"
            />
          </Col>
          <Col span={23}>
            <DisplayField label="Interest(s): " value={profile.interests} />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{
            padding: "5px 0% 0%" // top left&right bottom
          }}
        >
          <Col span={1}>
            <Icon
              alt="LinkedIn: "
              style={{ fontSize: "35px" }}
              type="linkedin"
            />
          </Col>
          <Col span={23}>
            <DisplayLinkField
              label="LinkedIn: "
              value={profile.linkedInPublicProfileUrl}
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{
            padding: "5px 0% 0%" // top left&right bottom
          }}
        >
          <Col span={24}>
            <DisplayLinkField
              label="Github: "
              value={profile.githubPublicProfileUrl}
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{
            padding: "0% 0% 0%" // top left&right bottom
          }}
        >
          <Col span={1}>
            <img
              alt="Email: "
              style={{ width: "35px" }}
              src="https://user-images.githubusercontent.com/24757872/40867452-d7a6feaa-65c9-11e8-849f-9d144103b0c3.png"
            />
          </Col>
          <Col span={23}>
            <DisplayField label="E-mail: " value={profile.email} />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{
            padding: "5px 0% 0%" // top left&right bottom
          }}
        >
          <Col span={24}>
            <DisplayField label="Time Zone: " value={profile.timeZone[1]} />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{
            padding: "5px 0% 0%" // top left&right bottom
          }}
        >
          <Col span={24}>
            <DisplayField label="Availability: " value={profile.availability} />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="start"
          style={{
            padding: "5px 0% 0%" // top left&right bottom
          }}
        >
          <Col>
            <Button
              style={{
                borderColor: colorTheme.text7Color,
                background: colorTheme.text7Color,
                color: colorTheme.text3Color
              }}
            >
              <a href="/profile/edit">Edit</a>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  renderQuestions(asks, colorTheme) {
    if (asks != null) {
      const newest8Questions = asks.questions.slice(-8).reverse();
      return _.map(newest8Questions, (question, key) => {
        return (
          <Row key={key}>
            <Col span={24}>
              <h3
                style={{
                  color: colorTheme.text6Color
                }}
              >
                {question.question}
              </h3>
            </Col>
          </Row>
        );
      });
    }
  }

  renderPurchaseNeurons() {
    const { colorTheme } = this.props;
    return (
      <div
        style={{
          padding: "25px 0px 0px" // top left&right bottom
        }}
      >
        <Row type="flex" justify="start" align="middle">
          <Col
            sm={{ span: 0 }}
            md={{ span: 0 }}
            lg={{ span: 0 }}
            xl={{ span: 0 }}
          />
          <Col
            sm={{ span: 24 }}
            md={{ span: 19 }}
            lg={{ span: 19 }}
            xl={{ span: 19 }}
          >
            <h2
              style={{
                color: colorTheme.keyText6Color
              }}
            >
              Purchase Neurons:
            </h2>
          </Col>
          <Col
            sm={{ span: 0 }}
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 5 }}
          />
        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col>
            <Options />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { colorTheme, profile } = this.props;
    return (
      <Content
        style={{
          padding: "75px 50px 0px", // top left&right bottom
          background: colorTheme.backgroundColor
        }}
      >
        <Row type="flex" justify="start" align="middle">
          <Col
            sm={{ span: 0 }}
            md={{ span: 0 }}
            lg={{ span: 0 }}
            xl={{ span: 0 }}
          />
          <Col
            sm={{ span: 24 }}
            md={{ span: 19 }}
            lg={{ span: 19 }}
            xl={{ span: 19 }}
          >
            {this.renderProfile()}
            <Row>
              <Col>
                <h2
                  style={{
                    padding: "25px 0% 0%", // top left&right bottom
                    color: colorTheme.keyText6Color
                  }}
                >
                  Oldest Votes
                </h2>
              </Col>
            </Row>
            <Row type="flex" justify="start" align="middle">
              <Col span={24}>
                <VoteEdit />
              </Col>
            </Row>
            <Row>
              <Col>
                <h2
                  style={{
                    padding: "25px 0% 0%", // top left&right bottom
                    color: colorTheme.keyText6Color
                  }}
                >
                  Oldest Questions
                </h2>
              </Col>
            </Row>
            {this.renderQuestions(profile.asks, colorTheme)}
          </Col>
          <Col
            sm={{ span: 0 }}
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 5 }}
          />
        </Row>
      </Content>
    );
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    colorTheme: state.colorTheme,
    profile: state.profile
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const authDispatchers = bindActionCreators(authActionCreators, dispatch);
  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );
  return {
    fetchUserProfile: () => {
      authDispatchers.fetchUserProfile();
    },
    onProfile: () => {
      colorThemeDispatchers.onProfile();
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
