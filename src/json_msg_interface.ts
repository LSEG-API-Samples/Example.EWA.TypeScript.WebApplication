//Interface for Login domain JSON message
export interface JSONLogin {
    Id:number;
    Domain:string;
    Key: JSONLoginKey;
}

//Interface for Login domain's Key attribute JSON message
export interface JSONLoginKey{
    Elements: JSONLoginKeyElements;
    Name: string;
}

//Interface for Login domain's Key's Elements attribute JSON message
export interface JSONLoginKeyElements{
    ApplicationId: string;
    Position: string;
}

//Interface for Market Price domain item request JSON message
export interface JSONItemRequestMsg {
    Id: number;
    Key: JSONItemRequestKey;
}

//Interface for Market Price domain item request's key attribute JSON message
export interface JSONItemRequestKey {
    Name: string;
    Service: string;
}

//Interface for close JSON message
export interface JSONClose {
    Domain?: string;
    Id: number;
    Type: string;
}
