import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

// Налаштування
const API_KEY = process.env.NP_API_KEY;
const BOT_TOKEN = process.env.VITE_BOT_TOKEN;
const CHAT_ID = process.env.VITE_CHAT_ID;
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://kolo-home.onrender.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Роут для міст
app.post('/api/cities', async (req, res) => {
  const { cityName } = req.body;
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
  const result = await response.json();
  res.json({ success: result.success, data: result.data }); 
});

// Роут для відділень
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


app.post('/api/orders', async (req, res) => {
  const { name, phone, city, address, payment, cart } = req.body;

  const cartText = cart.map(item => `${item.title} (${item.quantity} шт.) - ${item.price * item.quantity} UAH`).join('\n');
  const message = `📦 **Нове замовлення!**\n\n👤 Клієнт: ${name}\n📞 Телефон: ${phone}\n📍 Місто: ${city}\n🏢 Адреса: ${address}\n💳 Оплата: ${payment}\n\n🛒 Товари:\n${cartText}`;

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;
    await fetch(url);
    
    res.status(200).json({ success: true, message: "Замовлення оформлено!" });
  } catch (error) {
    console.error("Помилка Telegram:", error);
    res.status(500).json({ success: false, message: "Не вдалося відправити замовлення" });
  }
});

app.listen(PORT, () => console.log(`Сервер працює на порту ${PORT}`));