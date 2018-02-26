import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as indexActionCreators from '../../actions/index';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as askActionCreators from '../../actions/ask';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Button, Input } from 'antd';
const { Content } = Layout;

class Ask extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.fetchUserProfile();
		this.props.onTrainAI();
	}

	onChangeQuestion = e => {
		//console.log('e.target.value = ', e.target.value);
		this.props.onChangeQuestion(e.target.value);
	};

	renderAnswerInputs() {
		const { colorTheme } = this.props;

		return (
			<Row
				type="flex"
				justify="start"
				align="middle"
				style={{
					padding: '3% 0% 0%' // top left&right bottom
				}}
			>
				<Col md={{ span: 3 }}>
					<h3
						style={{
							color: colorTheme.keyText5Color
						}}
					>
						Answer 1:
					</h3>
				</Col>
				<Col md={{ span: 6, offset: 1 }}>
					<Input
						onChange={this.onChangeName}
						style={{
							width: 180,
							borderColor: colorTheme.text7Color,
							background: colorTheme.text7Color,
							color: colorTheme.text3Color
						}}
					/>
				</Col>
				<Col md={{ span: 2, offset: 1 }}>
					<h5
						style={{
							color: colorTheme.text4Color
						}}
					>
						20
					</h5>
				</Col>
			</Row>
		);
	}

	render() {
		//console.log('this.props in Ask.js', this.props);
		const { colorTheme } = this.props;
		return (
			<Content
				style={{
					padding: '100px 50px 50px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '0% 0% 0%' // top left&right bottom
					}}
				>
					<Col md={{ span: 3 }}>
						<h3
							style={{
								color: colorTheme.keyText5Color
							}}
						>
							Question:
						</h3>
					</Col>
					<Col md={{ span: 10, offset: 1 }}>
						<Input
							onChange={this.onChangeQuestion}
							style={{
								width: 300,
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text3Color
							}}
						/>
					</Col>
					<Col md={{ span: 2, offset: 1 }}>
						<h5
							style={{
								color: colorTheme.text4Color
							}}
						>
							100
						</h5>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col md={{ span: 1, offset: 4 }}>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text2Color
							}}
						>
							Add possible answer
						</Button>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text1Color
							}}
						>
							Ask!
						</Button>
					</Col>
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
		colorTheme: state.colorTheme
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const indexDispatchers = bindActionCreators(indexActionCreators, dispatch);

	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	const askDispatchers = bindActionCreators(askActionCreators, dispatch);

	return {
		fetchUserProfile: () => {
			indexDispatchers.fetchUserProfile();
		},
		onTrainAI: () => {
			colorThemeDispatchers.onTrainAI();
		},
		onChangeQuestion: e => {
			askDispatchers.onChangeQuestion(e);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Ask);
