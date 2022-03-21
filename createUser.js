const AWS = require('aws-sdk')
AWS.config.update({
  region: 'ap-southeast-1',
});
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.createUser = async (event) => {
  console.log("event : ", event);

  let params = {
    TableName: 'User',
    Item: {
      username: event.body.username,
      name: event.body.name,
      lastname: event.body.lastname
    },
    ReturnValues: "ALL_OLD"
  }

  return await new Promise(async (resolver) => {
    documentClient.put((params), function (err, data) {
      if (err) {
        resolver(err)
      }
      else {
        resolver(data)
      }
    });
  })
};
