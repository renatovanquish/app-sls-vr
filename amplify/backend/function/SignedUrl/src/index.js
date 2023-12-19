/* Amplify Params - DO NOT EDIT
    API_APIGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
    API_APIGRAPHQL_GRAPHQLAPIIDOUTPUT
    API_APIGRAPHQL_GRAPHQLAPIKEYOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const accessKeyId = 'AKIARCO4DS7FFXIJXY44'
const secretAccessKey = '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'

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const id = event.arguments.id
    const key = event.arguments.key
    const bucket = event.arguments.bucket
    const region = event.arguments.region
    const action = event.arguments.action // createPresignedPost || getObject
    const contentType = event.arguments.contentType

    const AWS = require('aws-sdk')
    var credentials = { accessKeyId, secretAccessKey }
    AWS.config.update({ credentials: credentials, region })
  
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      signatureVersion: 'v4',
    })
  
  
  
    const createPresignedPost = async (Bucket, key, ContentType) => {
      try {
        const params = {
          Bucket,
          Expires: 60 * 30,
          Fields: {
            "Content-Type": ContentType,
            key
          }
        }
        const u = await new Promise((resolve, reject) => {
          s3.createPresignedPost(params, (err, data) => {
            err ? reject(err) : resolve(data)
          })
        })
        return u
      } catch (err) {
        if (err) {
          console.log(err)
        }
      }
    }
  
    const getObject = async (Bucket, Key, ContentType) => {
      try {
        const params = {
          Bucket,
          Expires: 60 * 30,
          Key
        }
        const u = await new Promise((resolve, reject) => {
          s3.getSignedUrl('getObject', params, (err, data) => {
            err ? reject(err) : resolve(data)
          })
        })
        return u
      } catch (err) {
        if (err) {
          console.log(err)
        }
      }
    }

    let data;

    if (action == 'createPresignedPost') {
      data = await createPresignedPost(bucket, key, contentType)
    } else {
      data = await getObject(bucket, key, contentType)
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({ data }),
    };
};
