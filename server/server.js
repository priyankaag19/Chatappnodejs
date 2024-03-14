const net = require('net');

class Server {
    constructor() {
        this.PORT = 3000;
        this.clients = [];
        this.server = net.createServer();
    }

    startServer() {
        this.server.on('connection', (socket) => {
            console.log('New client connected');

            this.clients.push(socket);

            socket.on('data', (data) => {
                const message = data.toString().trim();
                console.log(`Received message: ${message}`);

                // Broadcast message to all clients except the sender
                this.clients.forEach((client) => {
                    if (client !== socket && !client.destroyed) {
                        client.write(`${message}\n`);
                    }
                });
            });

            socket.on('end', () => {
                console.log('Client disconnected');
                this.removeClient(socket);
            });

            socket.on('error', (err) => {
                console.error('Socket error:', err);
                this.removeClient(socket);
            });
        });

        this.server.on('error', (err) => {
            console.error('Server error:', err);
        });

        this.server.listen(this.PORT, () => {
            console.log(`Server listening on port ${this.PORT}`);
        });
    }

    removeClient(socket) {
        const index = this.clients.indexOf(socket);
        if (index !== -1) {
            this.clients.splice(index, 1);
        }
    }

    stopServer() {
        this.server.close(() => {
            console.log('Server stopped');
        });
    }
}

const ServerInstance = new Server();
ServerInstance.startServer();

process.on('SIGINT', () => {
    console.log('Shutting down server.....');
    ServerInstance.stopServer();
});


