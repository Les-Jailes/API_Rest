const mongoose = require('mongoose');
const exampleSchema = mongoose.Schema(
    {
        example: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Example = mongoose.model('Example', exampleSchema);

module.exports = Example;