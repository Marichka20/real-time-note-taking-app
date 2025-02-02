import { Server } from "socket.io";

let notesContent = ""; // Store notes globally

export function setupWebSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins (for testing, change in production)
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected with socket ID:", socket.id);

    // Send the current notes to the new user
    socket.emit("load-notes", notesContent);
    console.log("Sent initial notes to client:", notesContent);

    // When a user updates the notes
    socket.on("update-notes", (content) => {
      console.log(`Received update from ${socket.id}:`, content);
      notesContent = content; // Update the global notes content
      console.log("Updated global notes content:", notesContent);
      socket.broadcast.emit("update-notes", content); // Broadcast updates to other clients
    });

    // Log when the client disconnects
    socket.on("disconnect", (reason) => {
      console.log("User disconnected:", socket.id, "Reason:", reason);
    });

    // Log any connection errors
    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });
  });

  return io;
}
