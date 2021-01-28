//|-----------------------------------------------------------------------------
//|            This source code is provided under the Apache 2.0 license      --
//|  and is provided AS IS with no warranty or guarantee of fit for purpose.  --
//|                See the project's LICENSE.md for details.                  --
//|           Copyright Refinitiv 2017.       All rights reserved.            --
//|-----------------------------------------------------------------------------

import { LoginMsg } from "./json_msg_classes";
import { ItemRequestMsg } from "./json_msg_classes";
import { CloseMsg } from "./json_msg_classes";

let ws: any = null;

const protocol: string = "tr_json2";
const loginID: number = 1;
const loginDomain: string = "Login";
let itemID: number = 0;
let itemname:string = "";

let btnConnect: any;
let inMessagePre: any;
let outMessagePre: any;
let btnLogin: any;
let btnLogout: any;
let btnSubscribe: any;
let btnUnSubscribe: any;

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

  //$("#btnConnect").html("Connected");

  btnConnect.innerHTML = "Connected";
}

//An event listener to be called when a message is received from the server
function onMessage(event: any): void {
  //console.log(JSON.stringify(event.data));

  let incomingdata = JSON.parse(event.data.toString());

  //Iterate each JSON message and send it to market_price_app.js
  let data:any = null;
  for (let index = 0; index < incomingdata.length; index++) {
    data = incomingdata[index];
    //console.log(`incoming msgtype is ${data.Type} domain is ${data.Domain} itemname = ${itemname}`);
    if(data.Type === 'Refresh' && data.Key.Name === itemname){
      //Push subscription item name and ID to selection box
      pushIDstoDropDownMenu(data.Key.Name, data.ID);
    }
    display(inMessagePre,JSON.stringify(incomingdata[index], undefined, 2));
    //If incoming message is PING (server ping)
    if (incomingdata[index].Type === "Ping") {
      sendPong();
    }
  }
}

//An event listener to be called when an error occurs. This is a simple event named "error".
function onError(event: any): void {
  console.log(JSON.stringify(event.data));
  
  display(inMessagePre,JSON.stringify(event.data, undefined, 2));
}

//An event listener to be called when the WebSocket connection's readyState changes to CLOSED.
function onClose(event: any): void {
  console.log(JSON.stringify(event.data));
  
  display(inMessagePre,"WebSocket Connection Closed");
}

//----------------------------------- Application Logic Code ------------------------

window.onload = () => {
  btnConnect = document.getElementById("btnConnect");
  outMessagePre = document.getElementById("outMessagePre");
  inMessagePre  = document.getElementById("inMessagePre");
  btnLogin = document.getElementById("btnLogin");
  btnLogout = document.getElementById("btnLogout");
  btnSubscribe = document.getElementById("btnSubscribe");
  btnUnSubscribe = document.getElementById("btnUnSubscribe");

  btnConnect.addEventListener("click", function() {
    let txtServerurl:any = document.getElementById("txtServerurl");
    let serverurl: string = "";
    serverurl = `ws://${txtServerurl.value}/WebSocket`;
    connect(serverurl);
  });

  btnLogin.addEventListener("click", function() {
    let txtUsername:any = document.getElementById("txtUsername");
    sendLogin(txtUsername.value);
  });

  btnLogout.addEventListener("click", function() {
    sendCloseLoginrequest();
  });

  btnSubscribe.addEventListener("click", function() {
    let txtServiceName:any = document.getElementById("txtServiceName");
    let txtItemName:any = document.getElementById("txtItemName");
    itemname = txtItemName.value;
    sendItemrequest(txtServiceName.value, itemname);
  });

  btnUnSubscribe.addEventListener("click", function() {
    //get Selected ID to unsubscribe
    let cb:any = document.getElementById("listenerCombo");
    if(cb.selectedIndex === -1){ //If user does not select any ID, alert user
      window.alert("Select ID first");
      return;
    }
    //get unsubscribe ID from HTML select element
    let unsubID:number = parseInt(cb.options[cb.selectedIndex].value);
    //Unsubscribe 
    sendItemCloserequest(unsubID);

    //remove unsubscribe ID from HTML select element
    cb.removeChild(cb.options[cb.selectedIndex]);
  });


};

//display string value in selected element
function display(el:any, msg:string): void{
  el.innerHTML = msg;
}


//Create the Login JSON message from LoginMsg class and send it to Real-Time Advanced Distribution Server WebSocket
function sendLogin(username: string): void {
  let login: LoginMsg = new LoginMsg(loginID, username, "777", "127.0.0.1");
  ws.send(JSON.stringify(login));
  display(outMessagePre,JSON.stringify(login));
}

//Create the client PONG message  and send it to Real-Time Advanced Distribution Server WebSocket
function sendPong(): void {
  let pong: any = { Type: "Pong" };
  ws.send(JSON.stringify(pong));
  display(outMessagePre,JSON.stringify(pong));
}

//Create the Item Request JSON message from ItemRequestMsg class and send it to Real-Time Advanced Distribution Server WebSocket
function sendItemrequest(service: string, item_name: string): void {
  //set Item ID value
  if (itemID === 0) {
    itemID = loginID + 1;
  } else {
    itemID += 1;
  }

  let itemrequest: ItemRequestMsg = new ItemRequestMsg(
    itemID,
    item_name,
    service
  );

  ws.send(JSON.stringify(itemrequest));
  display(outMessagePre,JSON.stringify(itemrequest));

  //pushIDstoDropDownMenu(item_name, itemID);
}


//Create the Item Close Request JSON message from ItemCloseRequestMsg class and send it to Real-Time Advanced Distribution Server WebSocket
function sendItemCloserequest(unsubID:number): void {
  //let closeitemrequestMsg: ItemCloseRequestMsg = new ItemCloseRequestMsg(itemID);

  let closeitemrequestMsg: CloseMsg = new CloseMsg(unsubID);

  ws.send(JSON.stringify(closeitemrequestMsg));
  display(outMessagePre,JSON.stringify(closeitemrequestMsg));
}

//Create the Login Close Request JSON message from LoginCloseRequestMsg class and send it to Real-Time Advanced Distribution Server WebSocket
function sendCloseLoginrequest(): void {

  let logincloserequestmsg: CloseMsg = new CloseMsg(loginID, loginDomain);

  ws.send(JSON.stringify(logincloserequestmsg));
  display(outMessagePre,JSON.stringify(logincloserequestmsg));

  ws.close();
  btnConnect.innerHTML = "Connect";
}

function pushIDstoDropDownMenu(itemname:string, id:number):void {

  let cb:any = document.getElementById("listenerCombo");
  let opt:any = document.createElement("option");
  opt.value = id;
  opt.text = `${itemname} ID ${id}`;
  cb.options.add(opt);
}

