import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import VoteEdit from "./votes/VoteEdit";
import { Layout, Row, Col, Button, Avatar } from "antd";
import LinkedIn from "../profileInformation/LinkedIn";
import Github from "../profileInformation/Github";
import Neurons from "../profileInformation/Neurons";
import Interests from "../profileInformation/Interests";
import Email from "../profileInformation/Email";
import TimeZone from "../profileInformation/TimeZone";

import "./Profile.css";
const { Content } = Layout;

class Profile extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onProfile();
	}

	renderNameAndAge() {
		const { profile } = this.props;
		if (profile.age !== undefined) {
			return profile.name + ", " + profile.age;
		} else {
			return profile.name;
		}
	}

	renderProfile() {
		const { colorTheme, profile } = this.props;
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col span={2} />
					<Col span={22}>
						<Avatar shape="circle" src={profile.imageUrl} />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{ padding: "2px 0px 0px" }}
				>
					<Col span={1} />
					<Col style={{ padding: "10px 0px 0px 18px" }}>
						<h2
							style={{
								color: colorTheme.keyText6Color
							}}
						>
							{this.renderNameAndAge()}
						</h2>
					</Col>
					<Col style={{ padding: "0px 0px 0px 10px" }}>
						<LinkedIn value={profile.linkedInPublicProfileUrl} />
					</Col>
					<Col style={{ padding: "0px 0px 0px 10px" }}>
						<Github value={profile.githubPublicProfileUrl} />
					</Col>
				</Row>
				<Neurons value={profile.payment.neuronsInBillions} />
				<Interests interests={profile.interests} />
				<Email value={profile.email} />
				<TimeZone value={profile.timeZone} />
				<Row
					type="flex"
					justify="start"
					style={{
						padding: "15px 0px 0px" // top right bottom left
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

	render() {
		const { colorTheme, profile } = this.props;
		return (
			<Content
				style={{
					padding: "75px 50px 0px", // top right bottom left
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="start" align="middle">
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
										padding: "25px 0px 0px", // top right bottom left
										color: colorTheme.keyText6Color
									}}
								>
									Votes
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
										padding: "25px 0px 0px", // top right bottom left
										color: colorTheme.keyText6Color
									}}
								>
									Questions
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
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);
	return {
		onProfile: () => {
			colorThemeDispatchers.onProfile();
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
