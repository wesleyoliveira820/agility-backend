const Ws = use('Ws');

Ws.channel('projectRoom:*', 'ProjectRoomController').middleware(['auth']);
