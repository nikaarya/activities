import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get('https://bored-api.appbrewery.com/random');
        console.log(response);
        const result = response.data;
        res.render("index.ejs", {data: result});
      } catch (error) {
        console.error(error);
      }
});

 app.post("/", async (req, res) => {
    try {
        let activityType = req.body.type;
        let activityParticipants = req.body.participants;
        const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${activityType}&participants=${activityParticipants}`);
        console.log(response);
        const result = response.data;
        res.render("index.ejs", {data: result[Math.floor(Math.random() * result.length)]
        });
    } catch (error) {
        console.error("Failed to make request", error.message);
        res.render("index.ejs", {
            error: "No activities that match your criteria",
        });
    }
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});