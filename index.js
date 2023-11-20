const { SecretsManager } = require("@aws-sdk/client-secrets-manager");

// The AWS SDK automatically picks the region where the Lambda function is deployed.
const secretsManager = new SecretsManager();

// Initialize AWS Secrets Manager
exports.handler = async (event) => {
    // Parse the event body
    const requestBody = JSON.parse(event.body);

    // Retrieve secrets using the 'server' value from the request body
    // const dbSecrets = await getSecret(requestBody.server);

    // Construct and return the response
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            userId: requestBody.userId,
            tenantId: requestBody.tenantId,
            templateId: requestBody.templateId,
            startDate: requestBody.startDate,
            endDate: requestBody.endDate,
            dbName: "Shubham",
        }),
    };

    console.log(response);
    return response;
};

async function getSecret(secretName) {
    try {
        const data = await secretsManager.getSecretValue({ SecretId: secretName });
        if ('SecretString' in data) {
            return JSON.parse(data.SecretString);
        } else {
            let buff = Buffer.from(data.SecretBinary, 'base64');
            return JSON.parse(buff.toString('ascii'));
        }
    } catch (error) {
        console.error(`Error retrieving secret ${secretName}:`, error);
        throw error;
    }
}
