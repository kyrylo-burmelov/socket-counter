const rooms = ["ROOM_1", "ROOM_2", "ROOM_3"];
const counterMap = new Map(rooms.map(roomId => [roomId, 0]));

const getCurrentRoomId = socket => rooms.find(roomId => socket.rooms.has(roomId));

export default io => {
  io.on("connection", socket => {
    socket.emit("UPDATE_ROOMS", rooms);

    socket.on("JOIN_ROOM", roomId => {
      const prevRoomId = getCurrentRoomId(socket)

      if (roomId === prevRoomId) {
        return;
      }
      if (prevRoomId) {
        socket.leave(prevRoomId);
      }

      socket.join(roomId);
      const counterValue = counterMap.get(roomId);
      io.to(socket.id).emit("JOIN_ROOM_DONE", { counterValue, roomId });

    });

    socket.on("INCREASE_COUNTER", () => {
      const currentRoomId = getCurrentRoomId(socket);
      const value = counterMap.get(currentRoomId);
      const newValue = value + 1;
      counterMap.set(currentRoomId, newValue);
      io.to(currentRoomId).emit("UPDATE_COUNTER", newValue);
    });
  });
};
