# Project Name
Real-Time Chat Application using Node

## Description
This project is designed to demonstrate how to create a simple chat server and client that communicate in real-time over the network using Node.js.

## Instructions

Running the Server
Open a terminal window.
Navigate to the directory containing the server code (server.js).
Run the following command: node server.js
The server will start listening on port 3000, and you should see a message indicating that the server is running on the respective port no.

Running the Client
Open another terminal window.
Navigate to the directory containing the client code (client.js).
Run the following command: node client.js
The client will connect to the server running on localhost:3000.
Follow the prompts in the terminal to enter your name and start sending messages to the chatroom.

## Architecture and Concurrency

The chat application consists of a server and multiple clients communicating over TCP/IP sockets. Here's a brief overview of the architecture and how concurrency is handled:

Server:
The server is responsible for listening for incoming client connections and managing the communication between clients.
Concurrency is handled using event-driven programming. Each new client connection is handled in a separate event handler, allowing the server to handle multiple clients concurrently without blocking.
When a message is received from a client, the server broadcasts the message to all connected clients except the sender.

Client:
The client connects to the server and allows users to send messages to the chatroom.
Concurrency is handled asynchronously using event listeners. The client can both send messages to the server and receive messages from other clients simultaneously.

## Assumptions and Design Choices

During development, the following assumptions and design choices were made:
Single Server Instance: The application assumes a single server instance running on localhost:3000. Multiple server instances are not supported.

Text-Based Interface: The client application uses a text-based interface for simplicity. No graphical user interface (GUI) is provided.

Error Handling: Basic error handling is implemented to handle socket errors and client disconnects.

Limited Scalability: While the application supports multiple clients, it may not scale well for a large number of concurrent connections due to its single-threaded nature.
