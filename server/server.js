import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from 'pusher';
import mongoData from "./mongoData.js";

// app config
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
    appId: "1251749",
    key: "c26bcddebb2bf667aed3",
    secret: "d45ddae8636771fce294",
    cluster: "ap2",
    useTLS: true
});

//middlewares
app.use(cors())
app.use(express.json());

//db config
const mongoURI = 'mongodb+srv://admin:Q64r0h95qzeb1bj0@cluster0.k1vh1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('DB Connected');
    const changeStream = mongoose.connection.collection('conversations').watch()
    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            pusher.trigger('channels', 'newChannel', {
                'change': change
            });
        } else if (change.operationType === 'update') {
            pusher.trigger('conversation', 'newMessage', {
                'change': change
            });
        } else {
            console.log('Error trigerrering Pusher');
        }
    });
})


//api routes
app.get('/', (req, res) => res.status(200).send("Hello World"));

app.post('/new/channel', (req, res) => {
    const dbData = req.body;
    mongoData.create(dbData, (err, data) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(201).send(data);
    });
})

app.post('/new/message', (req, res) => {
    const id = req.query.id;
    const newMessage = req.body;
    mongoData.update(
        { _id: id },
        { $push: { conversation: newMessage } },
        (err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).send(data);
        }
    )
})

app.get('/get/channelList', (req, res) => {
    mongoData.find((err, data) => {
        if (err)
            res.status(500).send(err);
        else {
            let channels = [];

            data.map((channelData) => {
                const channelInfo = {
                    id: channelData._id,
                    name: channelData.channelName
                }
                channels.push(channelInfo)
            })
            res.status(200).send(channels)
        }
    })
})

app.get('/get/conversation', (req, res) => {
    const id = req.query.id

    mongoData.find({ _id: id }, (err, data) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data);
    })
})

//listen
app.listen(port, () => console.log(`listening on localhost:${port}`));