const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient, GetCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const uuid = require("uuid-int");
const generator = uuid(0);


module.exports = class Controller { 
    constructor() {
    }

    async create(tableName, data) {
        data.id = generator.uuid();
        const command = new PutCommand({
            TableName: tableName,
            Item: data
        });

        const response = await docClient.send(command);
        return response;
    }

    async findOne(tableName, data) {
        const command = new GetCommand({
            TableName: tableName,
            Key: data
        });

        const response = await docClient.send(command);
        return response.Item || false;
    }

    async list(tableName) {  
        const command = new ScanCommand({
            TableName: tableName,
        });

        const response = await docClient.send(command);
        return response.Items;
    }

    async execute(command) {
        const response = await docClient.send(command);
        return response;
    }

}