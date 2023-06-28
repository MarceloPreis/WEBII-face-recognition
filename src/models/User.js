const Model = require('./Model');

module.exports = class User extends Model {
    constructor(data) {
        super();

        if (data){
            this.id = data.id;
            this.login = data.login;
            this.password = data.password;
        }
        this.tableName = 'user';
    }
}