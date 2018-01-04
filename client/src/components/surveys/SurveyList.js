import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Card from './Card';
import { TransitionGroup } from 'react-transition-group';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		const { surveys, deleteSurvey } = this.props;

		if (!surveys) {
			return <div>loading.....</div>;
		}
		return _.chain(surveys)
			.map(survey => {
				return (
					<Card key={survey._id}>
						<div className="card-content">
							<span className="card-title">{survey.title}</span>
							<p>{survey.body}</p>
							<p>{survey._id}</p>
							<p className="right">
								Sent on:
								{new Date(survey.dateSent).toLocaleDateString()}
							</p>
						</div>
						<div className="card-action">
							<a>Yes: {survey.yes}</a>
							<a>No: {survey.no}</a>
							<button
								className="btn btn-flat white-text red right"
								onClick={() => deleteSurvey(survey._id)}
							>
								Delete
							</button>
						</div>
					</Card>
				);
			})
			.reverse()
			.value();
	}

	render() {
		// for lists of transitions wrap in transition group....
		return <TransitionGroup>{this.renderSurveys()}</TransitionGroup>;
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(mapStateToProps, actions)(SurveyList);
