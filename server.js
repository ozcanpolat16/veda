const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3005;

// Rate limiting ayarları
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100 // IP başına maksimum istek
});

// Middleware'leri yapılandır
app.use(limiter);
app.use(cors());

// Statik dosyaları serve et
app.use(express.static(path.join(__dirname)));

// Ana rotayı yapılandır
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint'i
// ... diğer kodlar ...

app.get('/api/check-time', (req, res) => {
    const targetDate = new Date('2025-01-18T07:19:00+03:00'); // Türkiye saati 07:16
    const currentDate = new Date();
    
    try {
        res.json({
            showMessage: currentDate >= targetDate,
            currentTime: currentDate.toISOString(),
            remainingTime: targetDate - currentDate
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Sunucu hatası',
            showMessage: false 
        });
    }
});

// ... diğer kodlar ...

// 404 handler
app.use((req, res) => {
    res.status(404).send('Sayfa bulunamadı');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Bir şeyler ters gitti!');
});


// Sunucuyu başlat
app.listen(port, '0.0.0.0', () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});