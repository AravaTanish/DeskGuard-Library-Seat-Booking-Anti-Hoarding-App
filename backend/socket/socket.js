import computerEvents from "./computer.events.js";
// import sessionEvents from "./session.events.js";

export default function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    computerEvents(socket);
    // sessionEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}
