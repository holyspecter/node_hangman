"use strict";

var socket = io();

$(function () {
    console.log(state);
    $.each(state, function () {
        $('#char-' + this.index).val(this.char);
    });
});

$('#character-input').on('input', function (event) {
    var target = event.target,
        char = $(target).val();

    if (char) {
        socket.emit('game.input.char', $(target).val());
    }
});

socket.on('game.input.right_char', function (eventData) {
    $.each(eventData.occurrences, function (key, element) {
        $('#char-' + element).val(eventData.char).addClass('right-character');
    });
    $('#character-input').val('');
    $('#check-message').parent().addClass('has-success'); // todo make this shit work
    $('#check-message').text("You're right, asshole!");
});

socket.on('game.input.wrong_char', function (eventData) {
    $('#character-input').val('');
    $('#check-message').parent().addClass('has-error');
    $('#check-message').text("You're wrong! Die, motherfucker!");
});

socket.on('game.win', function (eventData) {
    alert("You're win this time");
});

socket.on('game.defeat', function (eventData) {
    alert("Haha! You're hanged!");
});
