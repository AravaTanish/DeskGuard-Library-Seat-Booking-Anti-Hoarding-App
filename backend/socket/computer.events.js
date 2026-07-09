export default function computerEvents(socket) {
  socket.on("join-computer", (computerId) => {
    socket.join(computerId);
    console.log(`Computer ${computerId} joined`);
  });
}
