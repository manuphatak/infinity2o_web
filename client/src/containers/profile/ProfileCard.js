import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card } from "antd";
import LinkedIn from "../profileInformation/LinkedIn";
import Github from "../profileInformation/Github";
import Neurons from "../profileInformation/Neurons";
import Interests from "../profileInformation/Interests";
import Email from "../profileInformation/Email";
import TimeZone from "../profileInformation/TimeZone";

import "./profile-card.css";
import dolphin from "../images/dolphin.jpg";

class ProfileCard extends Component {
  renderAge(age, colorThemeText6Color) {
    if (age !== undefined && age !== null) {
      return (
        <Col>
          <h4
            style={{
              color: colorThemeText6Color,
              fontFamily: "Overpass",
              lineHeight: 1,
              marginBottom: 0,
              fontSize: 26
            }}
          >
            {", "}
            {age}
          </h4>
        </Col>
      );
    }
  }

  render() {
    const { colorTheme, profile } = this.props;

    if (profile.imageUrl === undefined || profile.imageUrl === null) {
      profile.imageUrl = dolphin;
    }

    return (
      <Row type="flex" justify="center">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 18 }}
          md={{ span: 14 }}
          lg={{ span: 11 }}
          xl={{ span: 8 }}
        >
          <Card
            bordered="false"
            loading={false}
            style={{
              color: colorTheme.text1Color,
              borderColor: colorTheme.textDot5Color,
              background: colorTheme.textDot5Color
            }}
            bodyStyle={{ padding: "0px" }} // padding around inside border of card
          >
            <Row type="flex" justify="center">
              <div
                style={{
                  width: "100%",
                  height: "130px",
                  backgroundColor: colorTheme.keyText7Color
                }}
              />
              <img
                className="profile-card-img"
                onError={error => {
                  // in case the imageUrl is invalid
                  error.target.onerror = null;
                  error.target.src = dolphin;
                }}
                src={profile.imageUrl}
                alt=""
              />
            </Row>
            <Row
              style={{ padding: "90px 0px 0px 0px" }}
              type="flex"
              justify="center"
              align="middle"
            >
              <Col>
                <h4
                  style={{
                    color: colorTheme.keyText7Color,
                    fontFamily: "Overpass",
                    lineHeight: 1,
                    marginBottom: 0,
                    fontSize: 26
                  }}
                >
                  {profile.name}
                </h4>
              </Col>
              {this.renderAge(profile.age, colorTheme.text6Color)}
              <LinkedIn value={profile.linkedInPublicProfileUrl} />
              <Github value={profile.githubPublicProfileUrl} />
            </Row>
            <Row
              style={{ padding: "0px 0px 0px 20px" }}
              type="flex"
              justify="start"
              align="middle"
            >
              <Col span={24}>
                <Neurons
                  payment={profile.payment}
                  textColor={colorTheme.text3Color}
                />
                <Interests
                  interests={profile.interests}
                  textColor={colorTheme.text3Color}
                />
                <Email
                  email={profile.email}
                  textColor={colorTheme.text3Color}
                />
                <TimeZone
                  timeZone={profile.timeZone}
                  textColor={colorTheme.text3Color}
                />
                <Row type="flex" justify="center">
                  <Col style={{ padding: "20px 0px 60px 0px" }}>
                    <a
                      className="profile-edit-anchor"
                      style={{
                        borderColor: colorTheme.backgroundColor,
                        background: colorTheme.backgroundColor,
                        color: colorTheme.text3Color
                      }}
                      href="/profile/edit"
                    >
                      edit
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
function mapStateToProps(state) {
  return {
    colorTheme: state.colorTheme,
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  null
)(ProfileCard);
