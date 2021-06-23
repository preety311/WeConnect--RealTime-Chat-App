const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInp=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');
var audio=new Audio('note.mp3');
const append= (message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();
    }
}

const name=prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined' ,name=>{
    append(`${name} joined the chat`,'left');
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message= messageInp.value;
    append( `You: ${messageInp.value}`,'right');
    socket.emit('send',message);
    messageInp.value='';
})

socket.on('recieve' ,data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left',name=>{
    append(`${name} left the chat`,`left`);
})