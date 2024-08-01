const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let players = {};

wss.on('connection', ws => {
    ws.on('message', message => {
        const data = JSON.parse(message);
        if (data.type === 'update') {
            players[data.id] = data;
            broadcast(JSON.stringify({ type: 'update', players }));
        }
    });

    ws.on('close', () => {
        // Handle player disconnection
    });
});

function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

console.log('WebSocket server is running on ws://localhost:8080');
