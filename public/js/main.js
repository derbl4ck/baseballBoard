/**
 * @overview Clientside Code
 * @author Lukas 'derbl4ck' Berwanger
 * @copyright (c) derbl4ck
 * @license See LICENSE file
 */

'use strict';

const socket = io();
let vals = [0, 0, 0, 0, 0, 0];

$(function() {
    balls(3, true);
    balls(4, true);
    balls(5, true);
    reload();

    for (let i = 0; i < 3; i++) {
        $(`.ap${i + 1}`).click(function() {
            vals[i]++;
            socket.emit('update', vals);
            reload();
        });

        $(`.am${i + 1}`).click(function() {
            vals[i]--;
            socket.emit('update', vals);
            reload();
        });
    }

    for (let i = 3; i < 6; i++) {
        $(`.display-${i + 1}`).click(function() {
            balls(i);
            socket.emit('update', vals);
            reload();
        });
    }
});

function reload() {
    $('.display-1 > span').html(vals[0]);
    $('.display-2 > span').html(vals[1]);
    $('.display-3 > span').html(vals[2]);

    for (let i = 3; i < 6; i++) {
        $(`.display-${i + 1}`).html('');

        for (let j = 0; j < vals[i]; j++) {
            $(`.display-${i + 1}`).append('<div class="ball"></div>');
        }
    }
}

function balls(t, init) {
    if (!init) {
        if (vals[t] == 3) {
            vals[t] = 0;
        } else {
            vals[t]++;
        }
    }
}

socket.on('update', function(data) {
    vals = data;
    reload();
});