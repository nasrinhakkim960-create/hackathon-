function sendData() {
    const data = {
        temperature: (36 + Math.random() * 3).toFixed(2),
        heartRate: Math.floor(60 + Math.random() * 60)
    };

    fetch('hackathon-production-3952.up.railway.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    console.log("Sent:", data);
}

setInterval(sendData, 5000);
