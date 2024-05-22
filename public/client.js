const socket = io();

const formUser= document.querySelector('#formUser');
const inputUser = document.querySelector('#inputUser');
const messages = document.querySelector('#messages');
const formMessage = document.querySelector('#formMessage');
const inputMessage = document.querySelector('#inputMessage');
const userContianer = document.querySelector('#userContainer');
const diceBtn = document.querySelector('#diceBtn')
const chatContainer = document.querySelector('#chatContainer')

let myUser;
let diceRoll
let numberOfRolls = 0
let sumOfRolls = 0

diceBtn.addEventListener('click', function(){
    diceRoll = Math.floor(Math.random()*6+1)
    numberOfRolls++
    sumOfRolls = sumOfRolls + diceRoll
    socket.emit('chatMessage', {user: myUser, message: `${diceRoll}, total sum is ${sumOfRolls} with ${numberOfRolls} tries`});
        inputMessage.value = '';
})

formUser.addEventListener('submit', function(e) {
    e.preventDefault();
    myUser = inputUser.value;
    userContianer.innerHTML = '<h2>Välkommen ' + myUser + '</h2>';
    document.getElementById('user').style.display = 'none';
    document.getElementById('message').style.display = 'block';
    diceBtn.style.display = 'block ';
    chatContainer.style.display = 'block';
});

formMessage.addEventListener('submit', function(e) {
    e.preventDefault();
    if (inputMessage.value) {
        socket.emit('chatMessage', {user: myUser, message: inputMessage.value});
        inputMessage.value = '';
    }
});

socket.on('newChatMessage', function(msg) {
    let item = document.createElement('li');
    item.textContent = msg.user + ': ' + msg.message;
    messages.appendChild(item);
});