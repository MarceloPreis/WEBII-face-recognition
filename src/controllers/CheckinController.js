const Controller = require(`./Controller`);
const FaceController = require(`./FaceController`);
const Checkin = require(`../models/Checkin`);
const { upload, rekognitionFindMatch } = require('../models/awsServices');
const { response } = require('express');

module.exports = class CheckinController extends Controller {
    constructor() {
        super();
        this.model = new Checkin();
    }

    async findMatch(file) {
        const match = await rekognitionFindMatch(file);
        const person = await (new FaceController()).facePerson(match.Face.FaceId)
        return { face: match.Face, person: person };
    }


} 
