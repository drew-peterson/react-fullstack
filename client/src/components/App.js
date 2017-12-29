import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => {
	return <h2>Dashboard</h2>;
};
const SurveyNew = () => {
	return <h2>SurveyNew</h2>;
};

class App extends Component {
	// preferred location for intial ajax request w/ new react
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					{/*materialize-css wants a parent with this class to give padding...*/}
					<div className="container">
						<Header />
						{/* exact is telling route to match exactly...*/}
						{/* could use <switch> here instead of exact*/}
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route
							exact
							path="/surveys/new"
							component={SurveyNew}
						/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
