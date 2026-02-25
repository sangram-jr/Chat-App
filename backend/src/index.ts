import {WebSocketServer,WebSocket} from "ws"
const wss=new WebSocketServer({port:8080});

interface User{
    socket:WebSocket,
    room:string
}

const totalSocket:User[] = [];

wss.on('connection',(socket)=>{
    
    socket.on('message',(msg:string)=>{
        //msg that server get from the user, that is string, we need to convert this in a object
        const parseMessage=JSON.parse(msg );

        //when a user wants to join a room
        if(parseMessage.type==="join"){
            totalSocket.push({
                socket,
                room:parseMessage.payload.roomId
            });
        }
        //when a user sends a chat message
        if(parseMessage.type==="chat"){
            //step 1: find the room
            let currentUserRoom=null;
            for(let i=0;i<totalSocket.length;i++){
                if(totalSocket[i]?.socket===socket){
                    currentUserRoom=totalSocket[i]?.room;
                }
            }
            //step 2: Broadcast the message to all users in the same room
            for(let i=0;i<totalSocket.length;i++){
                if(totalSocket[i]?.room===currentUserRoom){
                    totalSocket[i]?.socket.send(parseMessage.payload.message);
                }
            }
        }
    })
})
