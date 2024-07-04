const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve socket.io.js from node_modules
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'node_modules/socket.io/client-dist/socket.io.js'));
});

// Handle socket connection
io.on('connection', (socket) => {
  console.log('Client connected');
  // Emit dummy data for testing purposes
  setInterval(() => {
    socket.emit('lightning', {
      strikes: [
        { latitude: 34.0522, longitude: -118.2437 },
        { latitude: 40.7128, longitude: -74.0060 }
      ]
    });
  }, 10000);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
