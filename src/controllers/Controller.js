const DB = require('../models/DynamoDB');
const Database = new DB();

module.exports = class Controller { 
    constructor() {}

    async save(data) {
        data = this.model.serialize(data);
        if (data.id)
            return this.update(data);
        
        return this.create(data);
    }

    async create(data) {
        return Database.create(this.model.tableName, data);
    }

    async find(data) {
        return Database.findOne(this.model.tableName, data)
    }

    update(data) {
    }

    delete(data) {
    }

    list() {
        return Database.list(this.model.tableName);
    }
}
