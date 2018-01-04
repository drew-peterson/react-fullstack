import React from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

const Card = styled.div`
	margin-top: 15px;
	opacity: 0;
	transition: 500ms all ease-in-out;

	${({ status }) => {
		switch (status) {
			case 'entering':
				return { opacity: 0, transform: 'translateX(50%)' };
			case 'entered':
				return { opacity: 1, transform: 'translateX(0)' };
			case 'exiting':
				return { opacity: 0, transform: 'translateX(-50%)' };
			default:
				return;
		}
	}};
`;

export default props => {
	// have to pass all props to transition...
	// status is the state of hte transition passed to card
	return (
		<Transition
			{...props}
			timeout={{
				enter: 0,
				exit: 500
			}}
		>
			{status => (
				<Card className="card" status={status}>
					{props.children}
				</Card>
			)}
		</Transition>
	);
};
