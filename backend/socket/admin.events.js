export default function adminEvents(socket) {
  socket.on("join-admin", (email) => {
    socket.join(email);
    console.log(`Admin ${email} joined`);
  });
}