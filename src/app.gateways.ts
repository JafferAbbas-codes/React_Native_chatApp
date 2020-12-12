import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket, Server } from "socket.io";

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("AppGateway");
  private chatArray = [];
  afterInit(server: any) {
    this.logger.log("Initilized !", server);
  }
  handleDisconnect(client: Socket) {
    this.logger.log("Client " + client.id + " Disconnected !");
    console.log("check array now", this.chatArray);
    // let temp = this.chatArray.filter((value) => value.clientId !== client.id);
    let room = this.chatArray.filter((value) => value.clientId != client.id);
    console.log("view room===>?", room);
    // // client.leave(room.id)
    // this.chatArray = temp;
    // console.log("check chat Array", this.chatArray);
  }

  handleConnection(client: Socket) {
    console.log("view client id", client.id);
    console.log("view client id------yahoo", client.id);
    // this.server.emit("fetchClients", client.id);
  }

  @SubscribeMessage("JoinRoom")
  handleRoomJoin(client: Socket, data: any): void {
    // console.log("data.sender", data.sender._id);
    // console.log("data.receiver", data.receiver._id);
    // let str= data.sender._id+data.receiver._id;
    // console.log("creating room id",str)
    console.log("data.roomId",data)
    client.join(data.roomId);
    let temp = this.chatArray.filter((value) => value.clientId !== client.id);
    let chat = {
      id: data,
      clientId: client.id,
    };
    this.chatArray = temp;
    this.chatArray.push(chat);
    console.log("chat array here view noe", this.chatArray);
  }

  @SubscribeMessage("msgToServer")
  handleMessage(client: Socket, data: any): void {
    console.log("check this now brother", data);
    let temp = this.chatArray.filter((value) => value.id == data[1]);
    // this.server.to(client.id).emit("msgToClient", data[0]);
    // console.log("check temp now", temp);
    console.log("client",client.id)
    this.server.to(data.roomId).emit("msgToClient", data);
    // for (var key in temp) {
    //   console.log("chec=====>", temp[key], temp[key].clientId, client.id);
    //   this.server.to(temp[key].clientId).emit("msgToClient", data[0]);
    // }
  }

  @SubscribeMessage("SendMsgToRoom")
  handleJoinRoom(client: Socket, data: any[]): void {
    this.server
      .to(data[0])
      .emit("receiveServerMsg", data[1], data[2], data[3], data[4]);
  }

  @SubscribeMessage("ReceiveCall")
  handleReceiveCall(client: Socket, data: any): void {
    console.log("check receive call now", data, client.id);
    client.join(data.appointmentId);
    this.server.to(data.appointmentId).emit("attendCall", data);
  }

  @SubscribeMessage("LeaveCall")
  handleLeaveCall(client: Socket, data: any): void {
    console.log("check leave call now", data);
    client.leave(data);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    this.server.emit("leftRoom", room);
  }
}
