var ws = null;
var url = "ws://172.20.33.11:17000/WebSocket";
var protocol = "tr_json2";
var loginID = 1;
var loginDomain = "Login";
var LoginKeyElements = /** @class */ (function () {
    function LoginKeyElements(ApplicationId, Position) {
        this.ApplicationId = ApplicationId;
        this.Position = Position;
    }
    return LoginKeyElements;
}());
var LoginMsgKey = /** @class */ (function () {
    function LoginMsgKey(Name, ApplicationId, Position) {
        this.Name = Name;
        var loginKeyElements_class = new LoginKeyElements(ApplicationId, Position);
    }
    return LoginMsgKey;
}());
var LoginMsg = /** @class */ (function () {
    function LoginMsg(Id, Name, ApplicationId, Position) {
        this.Domain = loginDomain;
        this.Id = Id;
        var loginMsgKey_class = new LoginMsgKey(Name, ApplicationId, Position);
        this.Key = loginMsgKey_class;
    }
    return LoginMsg;
}());
function connect() {
    ws = new WebSocket(url, protocol);
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onerror = onError;
    ws.onclose = onClose;
}
function onOpen(event) {
    console.log("connected");
    sendLogin();
}
function onMessage(event) {
    console.log(JSON.stringify(event.data));
}
function onError(event) {
    console.log(JSON.stringify(event.data));
}
;
function onClose(event) {
    console.log(JSON.stringify(event.data));
}
;
function sendLogin() {
    var login = new LoginMsg(loginID, "wasin", "777", "127.0.0.1");
    ws.send(JSON.stringify(login));
}
window.onload = function () {
    console.log("onLoad");
    connect();
};
