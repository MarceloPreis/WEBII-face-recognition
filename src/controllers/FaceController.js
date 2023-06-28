const Controller = require(`./Controller`);
const PersonController = require(`./PersonController`);
const Face = require(`../models/Face`);
const { upload } = require('../models/awsServices');

module.exports = class FaceController extends Controller {
    constructor() {
        super();
        this.model = new Face();
    }

    async facePerson(data) {
        const face = await this.find({ RekognitionId: data })
        return (new PersonController()).find({ id: Number(face.person_id) }) 
    }
} 
