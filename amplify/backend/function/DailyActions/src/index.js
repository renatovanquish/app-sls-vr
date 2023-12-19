/* Amplify Params - DO NOT EDIT
    API_APIGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
    API_APIGRAPHQL_GRAPHQLAPIIDOUTPUT
    API_APIGRAPHQL_GRAPHQLAPIKEYOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const host = 'wezen.vanquish.com.br'
const port = 465
const user = 'noreply@siteinteligente.com'
const pass = '95$zaDt1'

const fs = require('fs');
const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
const nodemailer = require('nodemailer')

exports.handler = async (event) => {

    const dateObj = new Date();
    const month = parseInt(dateObj.getUTCMonth()) + 1 < 10 ? `0${parseInt(dateObj.getUTCMonth()) + 1}` : dateObj.getUTCMonth() + 1;
    const day = parseInt(dateObj.getUTCDate()) < 10 ? `0${parseInt(dateObj.getUTCDate())}` : dateObj.getUTCDate();
    const birthDay = `${month}-${day}`

    const getConfig = gql`query MyQuery { getConfig(id: "DEFAULT") { birthDayMessage birthDaySubject birthDayEnable }}`
    const getConfigResult = await axios({
        url: process.env.API_APIGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT,
        method: 'post',
        headers: {
            'x-api-key': process.env.API_APIGRAPHQL_GRAPHQLAPIKEYOUTPUT
        },
        data: {
            query: print(getConfig),
        }
    });
    const { birthDayEnable, birthDaySubject, birthDayMessage } = getConfigResult.data.data.getConfig

    const total = 0
    if (birthDayEnable) {
        const transporter = nodemailer.createTransport({
            port,
            host,
            auth: { user, pass },
            secure: true,
        })

        const listUsersByBirthDay = gql`query MyQuery { listUsersByBirthDay(birthDay: "${birthDay}") { items { user { email }}}}`
        const listUsersByBirthDayResult = await axios({
            url: process.env.API_APIGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT,
            method: 'post',
            headers: {
                'x-api-key': process.env.API_APIGRAPHQL_GRAPHQLAPIKEYOUTPUT
            },
            data: {
                query: print(listUsersByBirthDay),
            }
        });
        const usersByBirthDay = listUsersByBirthDayResult.data.data.listUsersByBirthDay.items

        const all = usersByBirthDay.map(async (item) => {
            const email = item.user.email
            if (email) {
                let info = await transporter.sendMail({
                    from: `${user}`,
                    to: `${email}`,
                    subject: birthDaySubject ? birthDaySubject : 'Feliz aniversário',
                    html: birthDayMessage,
                })
                total++
            }
        })

        const combine = Promise.all(all)
        await combine
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ total }),
    };
};
