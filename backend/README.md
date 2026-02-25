what user can send

join a room:
{
   "type": "join",
   "payload": {
     "roomId": "123"
   }
}
send message:
{
	"type": "chat",
	"payload": {
		"message": "hi there"
	}
}




What the server can send/User recieves

message:
{
	"type": "chat",
	"payload": {
		"message": "hi there"
	}
}