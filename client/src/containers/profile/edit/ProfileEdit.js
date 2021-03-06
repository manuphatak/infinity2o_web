import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../../actions/colorTheme";
import * as profileActionCreators from "../../../actions/profile/profile";
import { bindActionCreators } from "redux";
import InputField from "./InputField";
import InputAge from "./InputAge";
import InputInterests from "./interests/InputInterests";
import InputSchedule from "./availability/InputSchedule";
import InputTimeZone from "./timeZone/InputTimeZone";
import { Layout, Row, Col, Icon } from "antd";
import "./ProfileEdit.css";

const { Content } = Layout;

class ProfileEdit extends Component {
  componentDidMount() {
    // run once before first render()
    this.props.onProfile();
  }

  isSaveDisabled(profile) {
    if (
      profile.hasNameError ||
      profile.hasAgeError ||
      profile.hasInterestsError ||
      profile.hasTimeZoneError ||
      profile.hasEmailError ||
      profile.hasLinkedInPublicProfileUrlError ||
      profile.hasGithubPublicProfileUrlError ||
      profile.hasAvailabilityError
    ) {
      // save should be disabled
      document.documentElement.style.setProperty(
        `--cursor-state`,
        "not-allowed"
      );
      return true;
    } else {
      document.documentElement.style.setProperty(`--cursor-state`, "pointer");
      return false;
    }
  }

  renderSaveIcon(saveState) {
    if (saveState === "save_start") {
      return <Icon type="loading" />;
    } else if (saveState === "save_done") {
      return;
    } else if (saveState === "save_error") {
      return <Icon type="warning" />;
    }
  }

  render() {
    const {
      colorTheme,
      saveProfile,
      profile,
      history,
      onChangeName,
      onChangeEmail,
      onChangeLinkedInPublicProfileUrl,
      onChangeGithubPublicProfileUrl
    } = this.props;
    return (
      <Content
        style={{
          padding: "120px 0px 0px", // top left&right bottom
          background: colorTheme.backgroundColor
        }}
      >
        <Row type="flex" justify="start" align="middle">
          <Col
            xs={{ offset: 3, span: 21 }}
            sm={{ offset: 2, span: 22 }}
            md={{ offset: 2, span: 22 }}
            lg={{ offset: 4, span: 20 }}
            xl={{ offset: 5, span: 19 }}
          >
            <Row>
              <InputField
                value={profile.name}
                label="Name:"
                errorMessage="Cool name! But we need 1 to 30 valid letters"
                hasError={profile.hasNameError}
                onChange={onChangeName}
              />
            </Row>
            <Row
              style={{
                height: "26px"
              }}
            />
            <Row>
              <InputField
                value={profile.email}
                label="E-mail:"
                errorMessage="Invalid e-mail format"
                hasError={profile.hasEmailError}
                onChange={onChangeEmail}
              />
            </Row>
            <Row
              style={{
                height: "26px"
              }}
            />
            <Row>
              <InputAge label="Age:" />
            </Row>
            <Row
              style={{
                height: "15px"
              }}
            />
            <Row>
              <InputInterests />
            </Row>
            <Row
              style={{
                height: "15px"
              }}
            />
            <Row>
              <InputField
                value={profile.linkedInPublicProfileUrl}
                label="LinkedIn:"
                errorMessage="Invalid LinkedIn link. Needs to start with http:// or https://"
                hasError={profile.hasLinkedInPublicProfileUrlError}
                onChange={onChangeLinkedInPublicProfileUrl}
              />
            </Row>
            <Row
              style={{
                padding: "15px 0px 0px 0px"
              }}
            />
            <Row>
              <InputField
                value={profile.githubPublicProfileUrl}
                label="Github:"
                errorMessage="Invalid github link. Needs to start with http:// or https://"
                hasError={profile.hasGithubPublicProfileUrlError}
                onChange={onChangeGithubPublicProfileUrl}
              />
            </Row>
            <Row
              type="flex"
              justify="start"
              align="middle"
              style={{
                padding: "15px 0px 0px 0px"
              }}
            />
            <Row>
              <InputTimeZone />
            </Row>
            <Row
              type="flex"
              justify="start"
              align="middle"
              style={{
                padding: "15px 0px 0px 0px"
              }}
            />
            <Row>
              <InputSchedule />
            </Row>
            <Row
              type="flex"
              justify="start"
              align="middle"
              style={{
                padding: "15px 0px 0px 0px"
              }}
            />
            <Row
              type="flex"
              justify="start"
              style={{
                padding: "15px 0px 0px 0px"
              }}
            >
              <Col>
                <button
                  className="profile-edit-button"
                  style={{
                    borderColor: colorTheme.key,
                    background: colorTheme.key,
                    color: colorTheme.text1Color
                  }}
                  disabled={this.isSaveDisabled(profile)}
                  onClick={() => saveProfile(profile, history)}
                >
                  Save {this.renderSaveIcon(profile.save)}
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    colorTheme: state.colorTheme,
    profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
  const profileDispatchers = bindActionCreators(
    profileActionCreators,
    dispatch
  );
  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );

  return {
    onProfile: () => {
      colorThemeDispatchers.onProfile();
    },
    saveProfile: (profile, history) => {
      profileDispatchers.saveProfile(profile, history);
    },
    onChangeName: name => {
      profileDispatchers.onChangeName(name);
    },
    onChangeEmail: email => {
      profileDispatchers.onChangeEmail(email);
    },
    onChangeLinkedInPublicProfileUrl: linkedInPublicProfileUrl => {
      profileDispatchers.onChangeLinkedInPublicProfileUrl(
        linkedInPublicProfileUrl
      );
    },
    onChangeGithubPublicProfileUrl: githubPublicProfileUrl => {
      profileDispatchers.onChangeGithubPublicProfileUrl(githubPublicProfileUrl);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEdit);
