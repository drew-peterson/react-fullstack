import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		console.log('key: ', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
		console.log('process: ', process.env);
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				amount={500} // 5 dollars in USD
				token={this.props.handleToken}
				stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
			>
				<button className="btn">Add Credits</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);
