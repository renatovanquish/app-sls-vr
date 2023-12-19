
/* Amplify Params - DO NOT EDIT
    AUTH_AUTHCOGNITO_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const UserPoolId = process.env.AUTH_AUTHCOGNITO_USERPOOLID;

const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.REGION,
});

function generateCode(q) {
    const ALPHABET = '0123456789'
    const ID_LENGTH = q
    let rtn = ''
    for (let i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
    }
    return rtn
}


exports.handler = async (event, context, callback) => {

    // console.log("event: " + JSON.stringify(event, null, 2))
    // console.log("context: " + JSON.stringify(context, null, 2));

    if (!event) {
        callback(null, 'Necessário informar o nome e um email ou número de celular. 1');
    }

    const id = event.arguments.id
    const name = event.arguments.name
    const email = event.arguments.email
    const phone = event.arguments.phone
    const messageAction = event.arguments.messageAction ? event.arguments.messageAction : ''
    const passwordLength = event.arguments.passwordLength ? event.arguments.passwordLength : 8
    const resendTempPass = event.arguments.resendTempPass ? true : false
    const confirmSignUp = event.arguments.confirmSignUp ? true : false

    const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })

    if (id && confirmSignUp) {
        var paramsConfirmSignUp = {
            UserPoolId,
            Username: id,
        }

        let resultConfirmSignUp = await cognito
            .adminConfirmSignUp(paramsConfirmSignUp)
            .promise()
            .catch((err) => {
                console.log(err)
            })

        await cognito
            .adminUpdateUserAttributes({
                UserPoolId,
                Username: id,
                UserAttributes: [
                    { Name: 'email_verified', Value: 'true' },
                    { Name: 'phone_number_verified', Value: 'true' },
                ],
            })
            .promise()
            .catch((err) => {
                console.log(err, err.stack)
                error = true
            })

        callback(null, resultConfirmSignUp)
        return resultConfirmSignUp
    }


    if (!name || (!email && !phone)) {
        callback(null, 'Necessário informar o nome e um email ou número de celular. 2')
    }

    const DesiredDeliveryMediums = []

    /**
   * CHECK IF USER EXISTS
   */
    if (!resendTempPass && email) {
        var paramsGetUserEmail = {
            UserPoolId,
            Username: email.toLowerCase(),
        }

        let resultGetUserEmail = await cognito
            .adminGetUser(paramsGetUserEmail)
            .promise()
            .catch((err) => { })

        if (!id && resultGetUserEmail && resultGetUserEmail.Username) {
            callback(null, { id: resultGetUserEmail.Username })
            return { id: resultGetUserEmail.Username }
        }

        if (id && resultGetUserEmail && resultGetUserEmail.Username) {
            let paramsUpdateUserEmail = {
                UserPoolId,
                Username: email.toLowerCase(),
                UserAttributes: [
                    { Name: 'name', Value: name },
                    { Name: 'email_verified', Value: 'false' },
                    { Name: 'phone_number_verified', Value: 'false' },
                ],
            }
            if (email) {
                paramsUpdateUserEmail.UserAttributes.push({ Name: 'email', Value: `${email}` })
            }
            if (phone) {
                paramsUpdateUserEmail.UserAttributes.push({ Name: 'phone_number', Value: `${phone}` })
            }

            let resultUpdateUser = await cognito
                .adminUpdateUserAttributes(paramsUpdateUserEmail)
                .promise()
                .catch((err) => {
                    console.log(err, err.stack)
                    error = true
                })

            callback(null, resultUpdateUser)
            return resultUpdateUser
        }

        DesiredDeliveryMediums.push('EMAIL')
    }

    if (!resendTempPass && phone) {
        var paramsGetUserPhone = {
            UserPoolId,
            Username: phone,
        }

        let resultGetUserPhone = await cognito
            .adminGetUser(paramsGetUserPhone)
            .promise()
            .catch((err) => { })

        if (!id && resultGetUserPhone && resultGetUserPhone.Username) {
            callback(null, { id: resultGetUserPhone.Username })
            return { id: resultGetUserPhone.Username }
        }

        if (id && resultGetUserPhone && resultGetUserPhone.Username) {
            let paramsUpdateUserPhone = {
                UserPoolId,
                Username: phone,
                UserAttributes: [
                    { Name: 'name', Value: name },
                    { Name: 'email_verified', Value: 'false' },
                    { Name: 'phone_number_verified', Value: 'false' },
                ],
            }
            if (email) {
                paramsUpdateUserPhone.UserAttributes.push({ Name: 'email', Value: `${email}` })
            }
            if (phone) {
                paramsUpdateUserPhone.UserAttributes.push({ Name: 'phone_number', Value: `${phone}` })
            }

            let resultUpdateUser = await cognito
                .adminUpdateUserAttributes(paramsUpdateUserPhone)
                .promise()
                .catch((err) => {
                    console.log(err, err.stack)
                    error = true
                })

            callback(null, resultUpdateUser)
            return resultUpdateUser
        }

        DesiredDeliveryMediums.push('SMS')
    }

    /**
     * CREATE USER
     */
    const password = generateCode(passwordLength ? passwordLength : 8)

    let params = {
        UserPoolId,
        Username: `${email ? email : phone}`,
        DesiredDeliveryMediums,
        ForceAliasCreation: false,
        TemporaryPassword: `${password}`,
        UserAttributes: [
            { Name: 'name', Value: name },
            { Name: 'email_verified', Value: 'false' },
            { Name: 'phone_number_verified', Value: 'false' },
        ],
    }

    if (messageAction) {
        params.MessageAction = messageAction
    } // SUPPRESS | RESEND

    if (email) {
        params.UserAttributes.push({ Name: 'email', Value: `${email}` })
    }
    if (phone) {
        params.UserAttributes.push({ Name: 'phone_number', Value: `${phone}` })
    }

    console.log('Sending params to cognito: ' + JSON.stringify(params, null, 2))

    let error = false

    let resultCreateUser = await cognito
        .adminCreateUser(params)
        .promise()
        .catch((err) => {
            console.log(err, err.stack)
            error = true
        })

    if (!error && resultCreateUser && resultCreateUser.User && resultCreateUser.User.Username) {
        callback(null, { id: resultCreateUser.User.Username })
        return { id: resultCreateUser.User.Username }
    }

    if (!error) {
        console.log(resultCreateUser)
        return resultCreateUser
    }
}