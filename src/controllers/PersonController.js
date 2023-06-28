const Controller = require(`./Controller`);
const Person = require(`../models/Person`);
const { upload } = require('../models/awsServices');

module.exports = class PersonController extends Controller { 
    constructor() {
        super();
        this.model = new Person();
    }

    save(data) {
        const files = data?.files
        super.save(data).then(() => {
            if (files) {
                const params = {
                    index: `sample/${data.id}`,
                    metadata: { 'person_id': `${data.id}` }
                }

                upload(files, params)
            };
        });

        return data;
    }
} 
