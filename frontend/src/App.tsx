
import { useEffect, useRef, useState } from 'react'
import './App.css'


function App() {
  
  const [msg,setMsg]=useState(['hello from server']);
  const [roomId,setRoomId]=useState("");
  const [joined,setJoined]=useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const inputRef=useRef<HTMLInputElement>(null);

   // Send user message through WebSocket when user click the send button
  function sendMessage(){
    const message=inputRef.current?.value;
    if(!message){
      return;
    }
    wsRef.current?.send(JSON.stringify({
      type:"chat",
      payload:{
        message:message
      }
    }))
    if(inputRef.current){
       inputRef.current.value="";
    }
   
  }

  useEffect(()=>{
    
    //call the backend
    const ws=new WebSocket('ws://localhost:8080');

    //// Handle incoming messages from server
    ws.onmessage=(event)=>{
      setMsg(m=>[...m,event.data]);
    }

    
    //Store WebSocket connection in ref for later use
    wsRef.current=ws;

    //cleanup
    return ()=>{
      ws.close();
    }

  },[])


  //join room function
  function joinRoom(){
    if(!roomId){
      return;
    }
    wsRef.current?.send(JSON.stringify({
      type:"join",
      payload:{
        roomId:roomId
      }
    }))
    setJoined(true);
  };


  return (
    <div className="h-screen bg-black text-white flex flex-col justify-center items-center">

      {!joined ? (
        // Join Room UI
        <div className="flex flex-col gap-4">
          <input
            className="p-2 text-black bg-white"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            onClick={joinRoom}
            className="bg-purple-500 p-2"
          >
            Join Room
          </button>
        </div>
      ) : (
        // Chat UI
        <div className="w-full h-full flex flex-col justify-between">
          <div className="p-4 overflow-y-auto">
            {msg.map((m, index) => (
              <div key={index} className="mb-4">
                <span className="bg-white text-black p-2 rounded">
                  {m}
                </span>
              </div>
            ))}
          </div>

          <div className="flex bg-white">
            <input ref={inputRef} className="flex-1 p-2 text-black" />
            <button onClick={sendMessage} className="bg-purple-400 p-2">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
