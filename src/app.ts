import { LoginMsg } from "./json_msg_classes";
import { ItemRequestMsg } from "./json_msg_classes";
import { CloseMsg } from "./json_msg_classes";


import * as $ from "jquery";

let ws: any = null;
let serverurl: string = "";
const protocol: string = "tr_json2";
const loginID: number = 1;
const loginDomain: string = "Login";
let itemID: number = 0;

// ------------------------------------------ WebSocket Code ---------------------------------------

//Initiate WebSocket connection
function connect(url: string): void {
  ws = new WebSocket(url, protocol);
  ws.onopen = onOpen;
  ws.onmessage = onMessage;
  ws.onerror = onError;
  ws.onclose = onClose;
}

//indicates that the connection is ready to send and receive data
function onOpen(event: any): void {
  console.log("connected");

  $("#btnConnect").html("Connected");
}

//An event listener to be called when a message is received from the server
function onMessage(event: any): void {
  console.log(JSON.stringify(event.data));

  let incomingdata = JSON.parse(event.data.toString());

  //Iterate each JSON message and send it to market_price_app.js
  for (let index = 0; index < incomingdata.length; index++) {
    $("#inMessagePre").html(JSON.stringify(incomingdata[index], undefined, 2));
    //If incoming message is PING (server ping)
    if (incomingdata[index].Type === "Ping") {
      sendPong();
    }
  }
}

//An event listener to be called when an error occurs. This is a simple event named "error".
function onError(event: any): void {
  console.log(JSON.stringify(event.data));
  $("#inMessagePre").html(JSON.stringify(event.data, undefined, 2));
}

//An event listener to be called when the WebSocket connection's readyState changes to CLOSED.
function onClose(event: any): void {
  console.log(JSON.stringify(event.data));
  $("#inMessagePre").html(JSON.stringify(event.data, undefined, 2));
}

//----------------------------------- Application Logic Code ------------------------

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

//Create the Login JSON message from LoginMsg class and send it to ADS WebSocket
function sendLogin(username: string): void {
  let login: LoginMsg = new LoginMsg(loginID, username, "777", "127.0.0.1");
  ws.send(JSON.stringify(login));
  $("#outMessagePre").html(JSON.stringify(login));
}

//Create the client PONG message  and send it to ADS WebSocket
function sendPong(): void {
  let pong: any = { Type: "Pong" };
  ws.send(JSON.stringify(pong));
  $("#outMessagePre").html(JSON.stringify(pong));
}

//Create the Item Request JSON message from ItemRequestMsg class and send it to ADS WebSocket
function sendItemrequest(service: string, itemname: string): void {
  //set Item ID value
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

//Create the Item Close Request JSON message from ItemCloseRequestMsg class and send it to ADS WebSocket
function sendItemCloserequest(): void {
  //let closeitemrequestMsg: ItemCloseRequestMsg = new ItemCloseRequestMsg(itemID);

  
  let closeitemrequestMsg: CloseMsg = new CloseMsg(itemID);

  ws.send(JSON.stringify(closeitemrequestMsg));
  $("#outMessagePre").html(JSON.stringify(closeitemrequestMsg));
}

//Create the Login Close Request JSON message from LoginCloseRequestMsg class and send it to ADS WebSocket
function sendCloseLoginrequest(): void {
  //let logincloserequestmsg: LoginCloseRequestMsg = new LoginCloseRequestMsg(loginID);

  
  let logincloserequestmsg: CloseMsg = new CloseMsg(loginID,loginDomain);

  ws.send(JSON.stringify(logincloserequestmsg));
  $("#outMessagePre").html(JSON.stringify(logincloserequestmsg));

  ws.close();
  $("#btnConnect").html("Connect");
}

