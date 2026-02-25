# WebSocket Message Protocol



## 1️⃣ Join a Room

## Used when a user wants to join a specific chat room.

```json
{
  "type": "join",
  "payload": {
    "roomId": "123"
  }
}


Used to send a message to the current room:


{
	"type": "chat",
	"payload": {
		"message": "hi there"
	}
}




Receive Chat Message:



{
	"type": "chat",
	"payload": {
		"message": "hi there"
	}
}