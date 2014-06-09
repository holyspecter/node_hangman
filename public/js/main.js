var socket = io();

$('#character-input').on('change', function (event) {
    var target = event.target;

    socket.emit('game.input.char', $(target).val());
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
