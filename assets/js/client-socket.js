const socket = io();
var username;
do {
    username = prompt("Enter your name ...");
} while (!username)

socket.emit('user-joined', username);

socket.on('user-connected', (username) => {
    userJoin(username, 'joined');
    // console.log(username);
})

socket.on('user-disconnected', user => {
    userJoin(user, 'left')
})

socket.on('user-list', users => {
    const userList = Object.values(users);
    // console.log(users);
    for (var i = 0; i < userList.length; i++) {
        node(userList[i]);
    }
    var listSize = document.querySelector('.users');
    listSize.textContent = userList.length;
})

socket.on('message', user => {
    appendMsg(user, 'message');
})

function userJoin(username, status) {
    var p = document.createElement('p');
    var div = document.createElement('div');
    div.classList.add("user");
    p.classList.add("message-text");
    p.innerHTML = `${username} ${status}`
    div.appendChild(p);
    var chatBody = document.querySelector('[chatbody]')
    chatBody.appendChild(div)
    chatBody.scrollTop = chatBody.scrollHeight

}
const url = "data:image/jpeg;base64,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"
const sidebar = document.querySelector('.sidebar');
function node(user) {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('user-component');
    const img = document.createElement('img');
    img.src = url;
    parentDiv.appendChild(img);
    const div = document.createElement('div');
    div.classList.add('user-info');
    parentDiv.appendChild(div);
    const h3 = document.createElement('h3');
    div.appendChild(h3);
    const p = document.createElement('p');
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes();
    p.innerHTML = `last seen at ${hours}:${minutes}`
    h3.innerHTML = user;
    div.appendChild(p);
    sidebar.appendChild(parentDiv);

}

const submitBtn = document.querySelector('[submit]');

submitBtn.addEventListener('click', () => {
    const input = document.querySelector('input');
    const typeMsg = input.value
    let data = {
        user: username,
        msg: typeMsg
    }
    // console.log(data);
    if (typeMsg != '') {
        appendMsg(data, 'incomingMsg');
        socket.emit('message', data);
        input.value = "";
    }
}, false)

const chat_cont = document.querySelector('.chat-body');
function appendMsg(data, status) {
    const div = document.createElement('div');
    div.classList.add(status);
    const p = document.createElement('p');
    p.classList.add('message-text');
    p.innerHTML = data.msg;
    div.appendChild(p);
    chat_cont.appendChild(div);
    // console.log(chat_cont)
    chat_cont.scrollTop = chat_cont.scrollHeight

}

