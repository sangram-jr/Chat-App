
import { useEffect, useRef, useState } from 'react'
import './App.css'


function App() {
  
  const [msg,setMsg]=useState(['hello']);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef=useRef<HTMLInputElement>(null);

   // Send chat message through WebSocket
  function sendMessege(){
    const message=inputRef.current?.value;
    wsRef.current?.send(JSON.stringify({
      type:"chat",
      payload:{
        message:message
      }
    }))
  }

  useEffect(()=>{
    
    //call the backend
    const ws=new WebSocket('ws://localhost:8080');

    //// Handle incoming messages from server
    ws.onmessage=(event)=>{
      setMsg(m=>[...m,event.data]);
    }

    // When connection opens, send join room message
    ws.onopen=()=>{
      ws.send(JSON.stringify({ //we need to convert this to string
        type:"join",
        payload:{
          roomId:"red"
        }
      }))
    }

    //Store WebSocket connection in ref for later use
    wsRef.current=ws;

    //cleanup
    return ()=>{
      ws.close();
    }

  },[])

  return (
    <div className='h-screen bg-black flex flex-col justify-between'>
      {/*message display section*/}
      <div className='text-amber-50'>
        {
          msg.map((m)=><div className='m-8'>
            <span className='bg-white p-4 rounded text-black'>
              {m}
            </span>
            
          </div>)
        }
      </div>
      {/*input and send button section*/}
      <div className='w-full bg-white flex'>
        <input ref={inputRef} className="flex-1 p-2"></input>
        <button onClick={sendMessege} className='bg-purple-400 p2 cursor-pointer'>Send</button>
      </div>
    </div>
  )
}

export default App
