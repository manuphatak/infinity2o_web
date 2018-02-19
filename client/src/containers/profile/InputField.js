import React, { Component } from 'react';
import * as profileActionCreators from '../../actions/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';

class InputField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		};
	}

	onChangeName = e => {
		this.props.onChangeName(e.target.value);
		this.setState({ name: e.target.value });
		console.log('e.target.value = ', e.target.value);
	};

	renderValue(profile) {
		if (profile.newName === undefined) {
			return profile.name;
		} else {
			return profile.newName;
		}
	}

	render() {
		console.log('InputField this.props = ', this.props);
		const { colorTheme, label, width, profile } = this.props;

		const { name } = this.state;
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col md={{ span: 5 }}>
						<h3
							style={{
								color: colorTheme.keyText5Color
							}}
						>
							{label}
						</h3>
					</Col>
					<Col md={{ span: 18, offset: 1 }}>
						<Input
							value={this.renderValue(profile)}
							onChange={this.onChangeName}
							// onFocus={input.onFocus}
							style={{
								width: width,
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text3Color
							}}
						/>
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
		colorTheme: state.colorTheme,
		profile: state.profile
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);

	return {
		saveProfile: values => {
			profileDispatchers.saveProfile(values);
		},
		onChangeName: newName => {
			profileDispatchers.onChangeName(newName);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
