const TeleBot = require("node-telegram-bot-api");
const axios = require("axios");
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.get('/',(req,res) => {
  res.send("Hello World!!");
})
const port = process.env.PORT_BASE;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const token = "6776721493:AAEAUkFG8Xvbl-DZuH_T3sOZqtLq62_8vlA";

const bot = new TeleBot(token, { polling: true });

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;
    try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=8c77d4df2adadc3a5cd9317d4662e24b`
        );
        const data = response.data;
        const weather = data.weather[0].description;
        const temperature = data.main.temp - 273.15;
        const city = data.name;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;

        bot.sendMessage(chatId, message);
      } catch (error) {
        bot.sendMessage(chatId, "City doesn't exist.");
    }
});