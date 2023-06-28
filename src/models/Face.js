const Model = require('./Model');

module.exports = class Face extends Model {
    constructor(data) {
        super();
        this.RekognitionId = data?.RekognitionId;
        this.person_id = data?.person_id;
        this.tableName = 'face-reko-app';
    }

    attributes() {
        return ['RekognitionId', 'person_id'];
    }
}