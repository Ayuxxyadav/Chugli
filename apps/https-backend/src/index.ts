import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backendcommon/config";
import { middleware } from "./middleware";
import { signInSchema, signUpSchema, roomSchema } from "@repo/common/zod";
import { prismaClient} from "@repo/db/client";
import bcrypt from "bcrypt";
import cors from "cors"

const app = express();
const port = 3005;
app.use(express.json());

app.use(cors()); 



app.post("/signup", async (req, res) => {
  const parsedData = signUpSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Validation failed",
      details: parsedData.error.issues
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        name: parsedData.data.name,
        password: hashedPassword
      }
    });

    return res.status(201).json({
      userId: user.id
    });

  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        message: "Email already registered"
      });
    }
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = signInSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Invalid input"
    });
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: parsedData.data.email
      }
    });

    if (!user) {
      return res.status(403).json({
        message: "Invalid credential"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(parsedData.data.password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Invalid "
      });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return res.json({ token });

  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during sign in"
    });
  }
});

{/** for creating room */}


app.post("/room" ,middleware,async (req,res) =>{
  const parsedData= roomSchema.safeParse(req.body);
  if(!parsedData.success) {
    res.json({
      message:'Incorrect Input'
    })
    return
  }

  const userId= req.userId;
  if (!userId) {
  return res.status(401).json({
    message: "Unauthorized"
  });
}


try {
   const room = await prismaClient.room.create({
  data:{
    slug:parsedData.data.name,
     adminId: userId
  }
})
res.json({
  roomId: room.id,
  message: "created room successfully"
})
} catch (error) {
   res.status(403).json({
      message: "Romm name should be unique"
   })
}
}) 


{/**history of all chats of a user  */}
app.get("/chats/:slug",middleware, async (req, res) => {
  try {
    const slug = req.params.slug;

    const roomId = String(slug);
    

    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId
      },
      orderBy: {
        id: "asc"
      },
      take: 50
    });

    res.json({
      messages
    });

  } catch (error) {
    console.error("Database Error:", error);

    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while fetching chats."
    });
  }
});

{/** To retrive the Users' Room[] */}
app.get("/allrooms", middleware, async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch rooms where the user is the admin
    const allRooms = await prismaClient.room.findMany({
      where: {
        adminId: userId,
      },
      orderBy: {
        createdAt: "desc", // Naye rooms pehle dikhenge
      },
      take: 50, // Limit to last 50 rooms
    });

    
    if (!allRooms) {
      return res.status(404).json({ message: "No rooms found" });
    }

    res.json({
      allRooms,
    });
  } catch (error) {
    console.error("Fetch Rooms Error:", error);
    res.status(500).json({
      message: "Internal server error while fetching rooms",
    });
  }
});


{/** to retrive the id from entering room name */}
app.get("/room/:slug",middleware, async (req, res) => {
  try {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
      where: { slug }
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    res.json({ room });

  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
