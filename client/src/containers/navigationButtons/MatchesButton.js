import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Button, Badge } from "antd";

class MatchesButton extends Component {
	renderMatchesButton() {
		const { colorTheme, numberOfUnseenMatches } = this.props;

		return (
			<Badge
				count={numberOfUnseenMatches}
				style={{
					backgroundColor: colorTheme.keyText8Color,
					color: colorTheme.text2Color,
					boxShadow: "0 0 0 1px " + colorTheme.keyText8Color,
					fontFamily: "Lucida Grande"
				}}
			>
				<Button
					style={{
						borderColor: colorTheme.matchesButtonColor,
						background: colorTheme.matchesButtonColor,
						color: colorTheme.matchesButtonTextColor,
						fontFamily: "Lucida Grande"
					}}
				>
					<a href="/matches">
						<img
							alt=""
							style={{ width: 32 }}
							src="https://user-images.githubusercontent.com/24757872/40881562-23db47c0-668f-11e8-84a6-29020f352353.png"
						/>
						Matches
					</a>
				</Button>
			</Badge>
		);
	}

	render() {
		return (
			<Col
				md={{ offset: 1 }}
				lg={{ offset: 1 }}
				xl={{ offset: 1 }}
				key="4"
			>
				{this.renderMatchesButton()}
			</Col>
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
		numberOfUnseenMatches: state.matches.numberOfUnseenMatches
	};
}

export default connect(
	mapStateToProps,
	null
)(MatchesButton);
