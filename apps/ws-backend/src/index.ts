import { WebSocketServer, WebSocket } from 'ws';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backendcommon/config"
import { prismaClient } from "@repo/db/client"


const wss = new WebSocketServer({ port: 8080 });


interface User {
  userId: string,
  ws: WebSocket,
  rooms: (string | number)[]
}

const users: User[] = [];

function checkUser(token: string): string | null {
  const decoded = jwt.verify(token, JWT_SECRET)

  if (typeof decoded == "string") {
    return null;
  }
  if (!decoded || !decoded.userId) {
    return null;
  }
  return decoded.userId;
}

wss.on('connection', function connection(ws, request) {

  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  const userId = checkUser(token)

  if (userId == null) {
    ws.close();
    return;
  }


  users.push({
    userId,
    rooms: [],
    ws
  })


  ws.on('message', async function message(data) {

    const parsedData = JSON.parse(data as unknown as string) //// type casting {type : "join_room ", room_id:1}

    if (parsedData.type === "join_room") {
      const user = users.find(x => x.ws === ws); /// add roomId in rooms field
      user?.rooms.push(parsedData.roomId)
    }

    if (parsedData.type === "leave_room") {
      const user = users.find(x => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter(x => x == parsedData.room) // to filter or remove roomid from rooms Table 
    }
    if (parsedData.type === "chat") {
      const roomId = String(parsedData.roomId)
      const message = parsedData.message;
      const userIdString = String(userId);

      await prismaClient.chat.create({
        data: {
          roomId,                       //pub sub quoe quoue use hoga idhr we use singleton for state management
          message,
          userId: userIdString
        }
      })

      users.forEach(user => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId
          }))
        }
      })
    }
  });

  ws.send("pong")

});