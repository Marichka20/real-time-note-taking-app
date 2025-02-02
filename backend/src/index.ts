import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import jwt from "jsonwebtoken";
import { users, validateUser } from "./database"; // Import users and validation function

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 5000;
const JWT_SECRET = "your-secret-key";

app.use(cors());
app.use(express.json());

// Login endpoint
app.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  if (!validateUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({ message: "Login successful", token });
});

// Token validation endpoint
app.post(
  "/validate-token",
  async (req: Request, res: Response): Promise<any> => {
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
      return res.status(200).json({ valid: true, username: decoded.username });
    } catch (error) {
      return res
        .status(401)
        .json({ valid: false, message: "Invalid or expired token" });
    }
  }
);

// WebSocket logic
let notesContent = "";

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("load-notes", notesContent);
  console.log("Sent initial notes:", notesContent);

  socket.on("update-notes", (content) => {
    console.log(`Received update from ${socket.id}:`, content);
    notesContent = content;
    socket.broadcast.emit("update-notes", content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
