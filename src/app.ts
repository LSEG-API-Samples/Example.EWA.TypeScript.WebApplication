import { LoginMsg } from "./json_msg_classes";
import * as $ from "jquery";

let ws: any = null;
let serverurl: string = "";
const protocol: string = "tr_json2";
const loginID: number = 1;
const loginDomain: string = "Login";


function connect(url: string): void {
    ws = new WebSocket(url, protocol);
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onerror = onError;
    ws.onclose = onClose;
}

function onOpen(event: any): void {
    console.log("connected");


    $('#btnConnect').html("Connected");
}

function onMessage(event: any): void {
    console.log(JSON.stringify(event.data));
    //$("#inMessage").html(JSON.stringify(event.data));

    let incomingdata = JSON.parse(event.data.toString());

    //Iterate each JSON message and send it to market_price_app.js
    for (let index = 0; index < incomingdata.length; index++) {
        $("#inMessagePre").html(JSON.stringify(incomingdata[index], undefined, 2));
        if (incomingdata[index].Type === 'Ping') { //If incoming message is PING (server ping)

            //$('#messagesPre').html(`Recieve Ping:</br> ${JSON.stringify(data, undefined, 2)}`); //Server Ping
           // $('#messagesPre').html('Recieve Ping:</br>' + JSON.stringify(data, undefined, 2)); //Server Ping
            sendPong();
        }
    }
}

function onError(event: any): void {
    console.log(JSON.stringify(event.data));
};

function onClose(event: any): void {
    console.log(JSON.stringify(event.data));
};

function sendLogin(username: string): void {
    let login: LoginMsg = new LoginMsg(loginID, username, "777", "127.0.0.1");
    ws.send(JSON.stringify(login));
    $("#outMessagePre").html(JSON.stringify(login));
}

function sendPong(): void {
    let pong = {Type: "Pong"};
    ws.send(JSON.stringify(pong));
    $("#outMessagePre").html(JSON.stringify(pong));
}


$(document).ready(function () {
    $('#btnConnect').click(function () {
        serverurl = `ws://${$('#txtServerurl').val()}/WebSocket`;
        //serverurl = 'ws://' + $('#txtServerurl').val() + '/WebSocket';
        connect(serverurl);
    });

    $('#btnLogin').click(function () {
        let username: any = $('#txtUsername').val();
        sendLogin(username);
    });

});



