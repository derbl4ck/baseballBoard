/**
 * @overview Package entry point
 * @author Lukas 'derbl4ck' Berwanger
 * @copyright (c) derbl4ck
 * @license See LICENSE file
 */

'use strict';

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let port = process.env.PORT || 3030;
let users = 0;
let vals = [0, 0, 0, 0, 0, 0];

server.listen(port, () => {
    console.log('Baseball Board listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    users++;
    console.log(`[Info] socket ${socket.id} connected (current Users: ${users})`);
    socket.emit('update', vals);

    socket.on('update', function(data) {
        vals = data;
        io.emit('update', vals);
    });

    socket.on('disconnect', (reason) => {
        users--;
        console.log(`[Info] socket ${socket.id} disconnected. Reason: ${reason} (current Users: ${users})`);
    });
});