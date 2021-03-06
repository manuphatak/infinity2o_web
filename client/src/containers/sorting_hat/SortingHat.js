import React, { Component } from "react";
import { connect } from "react-redux";
import * as sortingHatActionCreators from "../../actions/sorting_hat/sortingHat";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as askActionCreators from "../../actions/sorting_hat/ask";
import { bindActionCreators } from "redux";
import { Layout, Row, Col } from "antd";
import InputVote from "./InputVote";
import Ask from "./Ask";
import "./sorting-hat.css";
import { Helmet } from "react-helmet";

const { Content } = Layout;

class SortingHat extends Component {
  componentDidMount() {
    // run once before first render()
    const { loggedInState } = this.props;
    if (loggedInState === "not_logged_in") {
      // push user to landing page
      this.props.history.push("/");
    } else {
      this.props.onSortingHat();
      this.props.fetchUserSortingHatAsks(this.props.auth.mongoDBUserId);
    }
  }

  render() {
    const { colorTheme, history, windowWidth } = this.props;

    let h2FontSize = 32;
    let h3FontSize = 24;
    let buttonFontSize = 24;
    if (windowWidth < 768) {
      h2FontSize = 22;
      h3FontSize = 18;
      buttonFontSize = 18;
    }
    return (
      <Content
        style={{
          padding: "120px 0px 0px 0px",
          background: colorTheme.backgroundColor
        }}
      >
        <Helmet>
          <title>Sorting Hat</title>
        </Helmet>
        <Ask />
        <Row type="flex" justify="center" align="middle">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 20 }}
            md={{ span: 24 }}
            lg={{ span: 15 }}
            xl={{ span: 10 }}
          >
            <h2
              style={{
                color: colorTheme.text2Color,
                marginBottom: 0,
                lineHeight: 1,
                fontSize: h2FontSize,
                fontFamily: "Overpass",
                textAlign: "center"
              }}
            >
              Help the Sorting Hat find you matches by
            </h2>
          </Col>
          <Col style={{ padding: "0px 0px 0px 10px" }}>
            <button
              className="sorting-hat-button"
              style={{
                borderColor: colorTheme.keyText8Color,
                background: colorTheme.keyText8Color,
                color: colorTheme.text2Color,
                fontSize: buttonFontSize
              }}
              onClick={e => this.props.openAskModal()}
            >
              asking a question
            </button>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col
            xs={{ span: 19 }}
            sm={{ span: 19 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            style={{
              padding: "30px 0px 40px"
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: colorTheme.text4Color,
                marginBottom: 0,
                lineHeight: 1,
                fontSize: h3FontSize,
                fontFamily: "Overpass"
              }}
            >
              Or voting on questions that matter to you:
            </h3>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 16 }}
            md={{ span: 20 }}
            lg={{ span: 18 }}
            xl={{ span: 15 }}
          >
            <InputVote history={history} />
          </Col>
        </Row>
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInState: state.auth.loggedInState,
    colorTheme: state.colorTheme,
    auth: state.auth,
    windowWidth: state.customHeader.windowWidth
  };
}

function mapDispatchToProps(dispatch) {
  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );

  const sortingHatDispatchers = bindActionCreators(
    sortingHatActionCreators,
    dispatch
  );

  const askDispatchers = bindActionCreators(askActionCreators, dispatch);

  return {
    onSortingHat: () => {
      colorThemeDispatchers.onSortingHat();
    },
    fetchUserSortingHatAsks: mongoDBUserId => {
      sortingHatDispatchers.fetchUserSortingHatAsks(mongoDBUserId);
    },
    openAskModal: () => {
      askDispatchers.openAskModal();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortingHat);
