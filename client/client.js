const net = require('net');
const readline = require('readline');

class Client {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.socket = new net.Socket();
        this.HOST = 'localhost';
        this.PORT = 3000;
    }

    connectToServer() {
        this.socket.connect(this.PORT, this.HOST, () => {
            console.log('Connected to server');

            this.rl.question('Enter your name: ', (name) => {
                console.log(`Welcome, ${name}!`);

                this.rl.setPrompt(`${name}: `);
                this.rl.prompt();

                this.rl.on('line', (input) => {
                    this.socket.write(input);
                    this.rl.prompt();
                });
            });
        });

        this.socket.on('data', (data) => {
            console.log(data.toString().trim());
        });

        this.socket.on('end', () => {
            console.log('Disconnected from server');
            this.rl.close();
        });

        this.socket.on('error', (err) => {
            console.error('Socket error:', err);
            this.rl.close();
        });
    }

    disconnectFromServer() {
        this.socket.end();

    }
}

const ClientInstance = new Client();
ClientInstance.connectToServer();

process.on('SIGINT', () => {
    console.log('Disconnecting from server...');
    ClientInstance.disconnectFromServer();
});


