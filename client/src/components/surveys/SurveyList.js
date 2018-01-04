import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SurveyListCard from './SurveyListCard';
import { TransitionGroup } from 'react-transition-group';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		const { surveys } = this.props;

		if (!surveys) {
			return <div>loading.....</div>;
		}
		return _.chain(surveys)
			.map(survey => {
				return (
					<SurveyListCard
						key={survey._id}
						survey={survey}
						{...this.props}
					/>
				);
			})
			.reverse()
			.value();
	}

	render() {
		// for lists of transitions wrap in transition group....
		return (
			<TransitionGroup className="row">
				{this.renderSurveys()}
			</TransitionGroup>
		);
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(mapStateToProps, actions)(SurveyList);
