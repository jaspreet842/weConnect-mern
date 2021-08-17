import Mongoose from "mongoose";

const appSchema = Mongoose.Schema({
    channelName: String,
    conversation: [
        {
            message: String,
            timestamp: String,
            user: String,
            userImage: String
        }
    ]
});

export default Mongoose.model('conversation', appSchema);