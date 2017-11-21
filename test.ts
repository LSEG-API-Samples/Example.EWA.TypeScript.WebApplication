let ws:any = null;
let url: string = "ws://172.20.33.11:17000/WebSocket";
const protocol: string = "tr_json2";
const loginID: number = 1;
const loginDomain: string = "Login";

interface JSONLogin {
    Id:number;
    Domain:string;
    Key: JSONLoginKey;
}

interface JSONLoginKey{
    Elements: JSONLoginKeyElements;
    Name: string;
}

interface JSONLoginKeyElements{
    ApplicationId: string;
    Position: string;
}

class LoginKeyElements implements JSONLoginKeyElements{
    ApplicationId: string;
    Position: string;
    constructor(ApplicationId: string, Position: string){
        this.ApplicationId = ApplicationId;
        this.Position = Position;
    }

}

class LoginMsgKey implements JSONLoginKey{
    Name: string;
    Elements: JSONLoginKeyElements;
    constructor(Name:string, ApplicationId: string, Position: string){
        this.Name = Name;
        let loginKeyElements_class = new LoginKeyElements(ApplicationId,Position);
    }
}

class LoginMsg implements JSONLogin{
    Id:number;
    Domain:string = loginDomain;
    Key: JSONLoginKey;

    constructor(Id:number,Name:string, ApplicationId: string, Position: string){
        this.Id = Id;
        let loginMsgKey_class = new LoginMsgKey(Name,ApplicationId,Position);
        this.Key = loginMsgKey_class;
    }
}


function connect(): void{
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

window.onload = function(){
    console.log("onLoad");
    connect();
   
};



