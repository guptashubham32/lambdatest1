exports.handler = async (event) => {
    console.log("Hello World from AWS Lambda!");

    return {
        statusCode: 200,
        body: JSON.stringify('Shubham is playing.')
    };
};
