const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.get('/',(req,res)=>{
    res.send("server is running:");
});

let patientData = {};
let lastUpdatedTime = null;

// Receive data
app.post('/data', (req, res) => {
    try {
        patientData = req.body;
        lastUpdatedTime = Date.now();
        res.send("Data received");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Send data
app.get('/data', (req, res) => {
    let alert = "✅ Normal";

    if (lastUpdatedTime) {
        let diff = (Date.now() - lastUpdatedTime) / 1000;
        if (diff > 10) {
            alert = "⚠️ Missed Checkup!";
        }
    }

    if (patientData.heartRate && patientData.heartRate > 100) {
        alert = "⚠️ High Heart Rate!";
    }

    if (patientData.temperature && patientData.temperature > 38) {
        alert = "⚠️ High Temperature!";
    }

    res.json({ ...patientData, alert });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
const PORT =process.env.PORT ||3000;

app.listen(PORT, () => {
    console.log("Server running on port${PORT}");
});
