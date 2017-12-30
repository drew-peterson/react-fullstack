import React from 'react';
import styled from 'styled-components';

import { ThemeProvider } from 'styled-components';

const colors = {
	main: '#393276',
	dark: '#0D083B',
	light: '#837EB1'
};
const Landing = () => {
	const Landing = styled.div`
		text-align: center;
		color: ${props => props.theme.main};
		background-color: ${props => props.theme.dark};
	`;

	return (
		<ThemeProvider theme={colors}>
			<Landing>
				<h1>Emaily!</h1>
				collect feedback from your users
			</Landing>
		</ThemeProvider>
	);
};

export default Landing;
