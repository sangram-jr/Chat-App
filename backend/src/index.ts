import {WebSocketServer,WebSocket} from "ws"
const wss=new WebSocketServer({port:8080});

let userCount=0;
const totalSocket:WebSocket[] = [];

wss.on('connection',(socket)=>{
    totalSocket.push(socket);
    userCount+=1;
    console.log("User Connected: " + userCount);

    socket.on('message',(msg)=>{ //to send the message to the server
        console.log(msg.toString());

        //server sent back message to the user(client)
        //every user can see the msg
        for(let i=0;i<totalSocket.length;i++){
            const s=totalSocket[i];
            if(s){
                s.send(msg.toString() + ": send from server");
            }
            
        }
        
    })
    
})
