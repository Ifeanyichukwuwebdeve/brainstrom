let io

const origin = process.env.SOCKET_ORIGIN

module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: origin,
        methods: ["GET", "POST"]
      }
    })
    return io
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!')
    }
    return io
  }
}