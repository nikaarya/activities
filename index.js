import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get("/", async (req, res) => {

  try {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    console.log(response);
    res.render("index.ejs", {
        drinkName: response.data.drinks.strDrink,
        alcOrNot: response.data.drinks.strAlcoholic,
    });
  } catch (error) {
    console.error(error);
  }

res.render("index.ejs");
});

/*  app.post("/submit", async (req, res) => {
     try {
        const response = await axios.post('www.thecocktaildb.com/api/json/v1/1/random.php');
        console.log(response);
        const result = response.data;
        res.render("index.ejs", {
            //coctailTitle: "Here is your randomly generated coctail:",
            drinkName: data.strDrink,
            //category: response.data.strCategory,
            //alcoholicOrNot: response.data.strAlcoholic,
        });
      } catch (error) {
        res.status(404).send(error.message);
        console.error(error);
      } 
});  */

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});