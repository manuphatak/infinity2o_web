import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActionCreators from '../actions/auth';
import { bindActionCreators } from 'redux';

import CustomHeader from './CustomHeader';
import Landing from './Landing';
import Tour from './help/Tour';
import Profile from './profile/Profile';
import ProfileEdit from './profile/edit/ProfileEdit';
import SortingHat from './sorting_hat/SortingHat';
import Ask from './sorting_hat/Ask';
import Matches from './matches/Matches';
import Conversations from './conversations/Conversations';

import { Layout, Row, Col } from 'antd';

const { Footer } = Layout;

class App extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.initializeApp();
	}

	renderFooter() {
		const { colorTheme } = this.props;

		if (colorTheme.activeSection === 'conversations') {
			return;
		} else {
			return (
				<Footer
					style={{
						textAlign: 'center',
						background: this.props.colorTheme.backgroundColor,
						color: this.props.colorTheme.text7Color
					}}
				>
					<Row type="flex" justify="center">
						<Col
							sm={{ span: 12 }}
							md={{ span: 10 }}
							lg={{ span: 8 }}
							xl={{ span: 6 }}
						>
							<p
								style={{
									color: this.props.colorTheme.text6Color
								}}
							>
								Feedback? askinfinity2o@gmail.com
							</p>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<p>Infinity2o © 2018 -> ∞</p>
						</Col>
					</Row>
				</Footer>
			);
		}
	}

	render() {
		//console.log('this.props inside App', this.props);
		return (
			<BrowserRouter>
				<Layout style={styles.layout}>
					<CustomHeader />
					<Route exact={true} path="/" component={Landing} />
					<Route exact={true} path="/tour" component={Tour} />
					<Route exact={true} path="/profile" component={Profile} />
					<Route
						exact={true}
						path="/profile/edit"
						component={ProfileEdit}
					/>
					<Route
						exact={true}
						path="/sorting_hat"
						component={SortingHat}
					/>
					<Route
						exact={true}
						path="/sorting_hat/ask"
						component={Ask}
					/>
					<Route exact={true} path="/matches" component={Matches} />
					<Route
						exact={true}
						path="/conversations"
						component={Conversations}
					/>
					{this.renderFooter()}
				</Layout>
			</BrowserRouter>
		);
	}

	componentDidMount() {
		// run once after first render()
		//console.log('componentDidMount this.props = ', this.props);
	}
}

var styles = {
	layout: {
		height: '100vh'
	}
};

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		auth: state.auth,
		profile: state.profile,
		mongoDBUserId: state.auth.mongoDBUserId
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const authDispatchers = bindActionCreators(authActionCreators, dispatch);

	return {
		initializeApp: () => {
			authDispatchers.initializeApp();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
