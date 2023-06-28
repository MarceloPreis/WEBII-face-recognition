const Controller = require(`./Controller`)
const User = require(`../models/User`);
const { QueryCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const DB = require('../models/DynamoDB');
const Database = new DB();

module.exports = class UserController extends Controller {
    constructor() {
        super();
        this.model = new User();
    }

    async userExists(data) {
        const command = new ScanCommand({
            TableName: this.model.tableName,
            FilterExpression:
                "login = :login AND password = :password",
            ExpressionAttributeValues: {
                ":login": data.login,
                ":password": data.password,
            },
            ProjectionExpression: "login, password, id",
        });

        const response = await Database.execute(command);
        if (response.Count == 1)
            return new User(response.Items[0]);
        
        return false;
    }
} 
