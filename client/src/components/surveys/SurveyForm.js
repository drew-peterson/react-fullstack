import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import RenderField from './RenderField';
import _ from 'lodash'; // lodash is faster....

import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={RenderField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}
	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.props.onSurveySubmit)}>
				{this.renderFields()}

				<Link className="red btn-flat white-text" to="/surveys">
					Cancel
				</Link>
				<button
					className="teal btn-flat right white-text"
					type="submit"
				>
					Next
					<i className="material-icons right">done</i>
				</button>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	// try to validate emails w/ ,
	errors.recipients = validateEmails(values.recipients || '');

	// required fields....
	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = `${name} is required`;
		}
	});

	return errors; // if empty form is valid!
}

export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false // have to refresh broswer to remove form info...
})(SurveyForm);
