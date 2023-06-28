const Model = require('./Model');

module.exports = class Person extends Model {
    constructor(data) {
        super();
        this.id = data?.id;
        this.name = data?.name;
        this.birthate = data?.birthDate;
        this.tableName = 'person';
    }

    attributes() {
        return ['id', 'name', 'birthDate']
    }
}