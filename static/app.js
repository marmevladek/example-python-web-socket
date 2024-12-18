const socket = io('http://127.0.0.1:5000');

// Функция, чтобы подключиться
function connect() {
    socket.connect();
    setConnected(true);
    console.log('Connected');
}

// Функция, чтобы отключиться
function disconnect() {
    socket.disconnect();
    setConnected(false);
    console.log("Disconnected");
}

// Функция для отправки имени
function sendName() {
    socket.emit('hello', { name: $("#name").val() });
}



// Обработчик ответа от сервера
socket.on('greetings', (data) => {
    showGreeting(data.message);
});

// Устанавливаем соединение
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

// Отображаем полученное приветствие
function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

// Привязка событий к кнопкам
$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#send").click(() => sendName());
});