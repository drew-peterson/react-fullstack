const keys = require('../../config/keys');

module.exports = survey => {
	return `
		<html>
			<body style="background-color: #efefef; padding: 20px;" border-radius: 5px;>
				<div style="text-align: center; background-color: white; border-radius: 5px; width: 50%; margin: 0 auto;">
					<h3>I'd like your input!</h3>
					<p>Please answer the follow question:</p>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.REDIRECT_DOMAIN}/api/surveys/thanks">Yes</a>
					</div>
					<div>
						<a href="${keys.REDIRECT_DOMAIN}/api/surveys/thanks">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
