class ProjectRoomController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;

    console.log(socket.id);
  }
}

module.exports = ProjectRoomController;
