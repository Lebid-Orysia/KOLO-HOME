import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = '9bd6dbf0af3bef9e5ea185ecadb68691'; 

app.post('/api/cities', async (req, res) => {
  const { cityName } = req.body;
  
  try {
    const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: { FindByString: cityName }
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Помилка сервера" });
  }
});
  app.post('/api/warehouses', async (req, res) => {
  const { cityRef } = req.body;
  
  try {
    const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: API_KEY, 
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: { CityRef: cityRef }
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.listen(3001, () => console.log('Сервер працює на http://localhost:3001'));