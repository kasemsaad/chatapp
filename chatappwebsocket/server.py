from simple_websocket_server import WebSocketServer, WebSocket
import json
def readmessage(message):
    messagecon = json.loads(message)
    return messagecon
def prepmassege(originmessage):
        messagetosend = {"color":"black"}
        if originmessage["type"] == "login":
            messagetosend = f"{originmessage['username']} connected\n"
            messagetosend['color'] = "green"
        else:
            messagetosend['content'] = f"{originmessage['username']}:{originmessage['body']}"
        messagetosend = json.dumps(messagetosend)
        return messagetosend
class Server(WebSocket):
    clients = []
    @classmethod
    def bcast(cls,message):
        for clint in cls.clients:
            clint.send(message)

        # Server.bcast(messagetosend)

    # def __init__(self,server,sock,address):
    #     super().__init__(server,sock,address)
    def handle(self):
        print(f"message recevid:{self.data},{type(self.data)}")
        msgcontent = readmessage(self.data)
        self.username = msgcontent['username']
        msg_to_send = prepmassege(msgcontent)
        Server.bcast(msg_to_send)
    def connected(self):
        # print(f"client connected {self}")
        Server.clients.append(self)
        print(f"no clients connected ={len(Server.clients)}")

    def handelclose(self):
        msg = {"content": f"{self.username} has been disconnected\n",
               "color": "red"}
        Server.clients.remove(self)
        messagetosend = json.dumps(msg)
        Server.send_to_all(messagetosend)


if __name__ == "__main__":
    print("started server")
    server = WebSocketServer("", 8000, Server)
    server.serve_forever()