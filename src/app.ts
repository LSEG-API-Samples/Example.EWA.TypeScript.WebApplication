import {LoginMsg} from "./json_msg_classes";
import * as $ from "jquery";

let ws:any = null;
let serverurl: string = "";
const protocol: string = "tr_json2";
const loginID: number = 1;
const loginDomain: string = "Login";


function connect(url:string): void{
    ws = new WebSocket(url,protocol);
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onerror = onError;
    ws.onclose = onClose;
}

function onOpen(event:any): void{
    console.log("connected");
    sendLogin();
}

function onMessage(event:any): void {
    console.log(JSON.stringify(event.data));
    $("#messagesPre").html(JSON.stringify(event.data));
}

function onError(event:any): void {
    console.log(JSON.stringify(event.data));
};

function onClose(event:any): void {
    console.log(JSON.stringify(event.data));
};

function sendLogin():void {
    let login = new LoginMsg(loginID,"wasin","777","127.0.0.1");
    ws.send(JSON.stringify(login));
}


$(document).ready(function () {
    $('#btnConnect').click(function () {
        serverurl = `ws://${$('#txtServerurl').val()}/WebSocket`;
        //serverurl = 'ws://' + $('#txtServerurl').val() + '/WebSocket';
        connect(serverurl);
    });
   
});



