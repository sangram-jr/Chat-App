# WebSocket Message Protocol

## 📤 Messages Client Can Send

### 1️⃣ Join a Room

Used when a user wants to join a specific chat room.

```json
{
  "type": "join",
  "payload": {
    "roomId": "123"
  }
}


Used to send a message to the current room:

```json
{
	"type": "chat",
	"payload": {
		"message": "hi there"
	}
}




Receive Chat Message:


```json
{
	"type": "chat",
	"payload": {
		"message": "hi there"
	}
}