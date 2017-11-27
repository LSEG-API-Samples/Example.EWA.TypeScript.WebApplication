import { LoginMsg } from "./json_msg_classes";
import { ItemRequestMsg } from "./json_msg_classes";
import { ItemCloseRequestMsg } from "./json_msg_classes";
import { LoginCloseRequestMsg } from "./json_msg_classes";

import * as $ from "jquery";

let ws: any = null;
let serverurl: string = "";
const protocol: string = "tr_json2";
const loginID: number = 1;
const loginDomain: string = "Login";
let itemID: number = 0;

function connect(url: string): void {
  ws = new WebSocket(url, protocol);
  ws.onopen = onOpen;
  ws.onmessage = onMessage;
  ws.onerror = onError;
  ws.onclose = onClose;
}

function onOpen(event: any): void {
  console.log("connected");

  $("#btnConnect").html("Connected");
}

function onMessage(event: any): void {
  console.log(JSON.stringify(event.data));
  //$("#inMessage").html(JSON.stringify(event.data));

  let incomingdata = JSON.parse(event.data.toString());

  //Iterate each JSON message and send it to market_price_app.js
  for (let index = 0; index < incomingdata.length; index++) {
    $("#inMessagePre").html(JSON.stringify(incomingdata[index], undefined, 2));
    if (incomingdata[index].Type === "Ping") {
      //If incoming message is PING (server ping)

      //$('#messagesPre').html(`Recieve Ping:</br> ${JSON.stringify(data, undefined, 2)}`); //Server Ping
      // $('#messagesPre').html('Recieve Ping:</br>' + JSON.stringify(data, undefined, 2)); //Server Ping
      sendPong();
    }
  }
}

function onError(event: any): void {
  console.log(JSON.stringify(event.data));
}

function onClose(event: any): void {
  console.log(JSON.stringify(event.data));
}

function sendLogin(username: string): void {
  let login: LoginMsg = new LoginMsg(loginID, username, "777", "127.0.0.1");
  ws.send(JSON.stringify(login));
  $("#outMessagePre").html(JSON.stringify(login));
}

function sendPong(): void {
  let pong: any = { Type: "Pong" };
  ws.send(JSON.stringify(pong));
  $("#outMessagePre").html(JSON.stringify(pong));
}

//Send Item Request message to ADS WebSocket
function sendItemrequest(service: string, itemname: string): void {
  if (itemID === 0) {
    itemID = loginID + 1;
  } else {
    itemID += 1;
  }

  let itemrequest: ItemRequestMsg = new ItemRequestMsg(
    itemID,
    itemname,
    service
  );

  ws.send(JSON.stringify(itemrequest));
  $("#outMessagePre").html(JSON.stringify(itemrequest));
}

function sendItemCloserequest(): void {
  let closeitemrequestMsg: any = new ItemCloseRequestMsg(itemID);

  ws.send(JSON.stringify(closeitemrequestMsg));
  $("#outMessagePre").html(JSON.stringify(closeitemrequestMsg));
}

function sendCloseLoginrequest(): void {
  let logincloserequestmsg: any = new LoginCloseRequestMsg(loginID);

  ws.send(JSON.stringify(logincloserequestmsg));
  $("#outMessagePre").html(JSON.stringify(logincloserequestmsg));

  ws.close();
}

$(document).ready(function() {
  $("#btnConnect").click(function() {
    serverurl = `ws://${$("#txtServerurl").val()}/WebSocket`;
    //serverurl = 'ws://' + $('#txtServerurl').val() + '/WebSocket';
    connect(serverurl);
  });

  $("#btnLogin").click(function() {
    let username: any = $("#txtUsername").val();
    sendLogin(username);
  });

  $("#btnSubscribe").click(function() {
    let servicename: any = $("#txtServiceName").val();
    let itemname: any = $("#txtItemName").val();
    sendItemrequest(servicename, itemname);
  });

  $("#btnUnSubscribe").click(function() {
    sendItemCloserequest();
  });

  $("#btnLogout").click(function() {
    sendCloseLoginrequest();
  });
});
