import {WebSocketServer} from "ws"
const wss=new WebSocketServer({port:8080});

wss.on('connection',(socket)=>{
    console.log("User Connected");

    socket.on('message',(msg)=>{ //to send the message to the server
        console.log(msg.toString());
        //server sent back message to the user
        socket.send(msg.toString());
    })
    
})
