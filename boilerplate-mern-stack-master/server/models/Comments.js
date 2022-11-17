const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId : {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }


}, { timestamps: true })


const Comments = mongoose.model('Comments', commentsSchema);

module.exports = { Comments }