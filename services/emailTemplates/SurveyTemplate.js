const keys = require('../../config/keys');

module.exports = survey => {
	return `
		<html>
			<body>
				<div style="text-align: center">
					<h3>I'd like your input!</h3>
					<p>Please answer the follow question:</p>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.REDIRECT_DOMAIN}/api/surveys/${survey.id}/yes">Yes</a>
					</div>
					<div>
						<a href="${keys.REDIRECT_DOMAIN}/api/surveys/${survey.id}/no">No</a>
					</div>
					<div>
						<a href="https://google.com">google test</a>
					</div>
					<div>
						<a href="http://localhost:3000/api/surveys/${survey.id}/no">test local</a>
					</div>
				</div>
			</body>
		</html>
	`;
};

