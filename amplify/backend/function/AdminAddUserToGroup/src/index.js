/* Amplify Params - DO NOT EDIT
	AUTH_AUTHCOGNITO_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
    AUTH_AUTHCOGNITO_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const UserPoolId = process.env.AUTH_AUTHCOGNITO_USERPOOLID;
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.REGION,
});

exports.handler = async (event, context, callback) => {

    // console.log("event: " + JSON.stringify(event, null, 2))
    // console.log("context: " + JSON.stringify(context, null, 2));

    if (!event) {
        callback(null, 'Necessário informar os parametros.');
    }

    const username = event.arguments.username
    const groups = event.arguments.groups

    if (!username) {
        callback(null, 'Necessário informar o username.')
    }

    if (!groups) {
        callback(null, 'Necessário informar o grupo.')
    }

    const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })

    const groupsArray = JSON.parse(groups)

    groupsArray.map(async (g) => {
        const params = {
            UserPoolId: UserPoolId,
            Username: username,
            GroupName: g,
        };
        await cognito.adminAddUserToGroup(params, function (err, data) {
            if (err) {
                console.log('err', err, err.stack);
            } else {
                console.log('data', data);
            }
        });
    })

    callback(null, {})
    return {}
};
