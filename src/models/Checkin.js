const Model = require('./Model');

module.exports = class Checkin extends Model {
    constructor(data) {
        super();
        this.id = data?.id;
        this.person_id = data?.person_id;
        this.file = data?.file;
        this.tableName = 'checkin';
    }

}