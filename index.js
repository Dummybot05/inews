require('dotenv').config();
const express = require("express")
const bodyParser = require("body-parser")
const NewsAPI = require('newsapi')
const cors = require("cors")
const PORT = process.env.PORT || 3000
const newsapi = new NewsAPI(process.env.API_KEY)
const app = express()

const countries = ["Argentina", "Australia", "Austria", "Belgium", "Brazil", "Bulgaria", "Canada", "China", "Colombia", "Cuba", "Czech Republic", "Egypt", "France", "Germany", "Greece", "Hong Kong", "Hungary", "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Latvia", "Lithuania", "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey", "UAE", "Ukraine", "United Kingdom", "United States", "Venezuela"];
const countryCode = ["ar", "au", "at", "be", "br", "bg", "ca", "cn", "co", "cu", "cz", "eg", "fr", "de", "gr", "hk", "hu", "in", "id", "ie", "il", "it", "jp", "lv", "lt", "my", "mx", "ma", "nl", "nz", "ng", "no", "ph", "pl", "pt", "ro", "ru", "sa", "rs", "sg", "sk", "si", "za", "kr", "se", "ch", "tw", "th", "tr", "ae", "ua", "gb", "us", "ve"];

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.get("/", (req, res) => {
   res.render("home")
})

var a1 = undefined
app.get("/news", async(req, res) => {
   countryD = req.query.id
   await newsapi.v2.topHeadlines({ country: countryD }).then((res) => {
       a1 = res.articles;
   })
   res.render("news", {
        countryNameIs: countryD,
        respond1: a1,
        lister: countries,
        codes: countryCode
   })
})

app.listen(PORT, () => {
  console.log('App Started...')
})
