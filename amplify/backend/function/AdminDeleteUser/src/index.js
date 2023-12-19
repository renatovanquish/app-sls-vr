/* Amplify Params - DO NOT EDIT
	AUTH_AUTHCOGNITO_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
    AUTH_AUTHCOGNITO_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const UserPoolId = process.env.AUTH_AUTHCOGNITO_USERPOOLID;
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.REGION,
});

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const id = event.arguments.id
    const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })

    if (id) {
        let result = await cognito
            .adminDeleteUser({
                UserPoolId,
                Username: id,
            })
            .promise()
            .catch((err) => {
                console.log(err)
            })

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify('Id not found'),
        };
    }
};
