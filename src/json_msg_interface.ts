export interface JSONLogin {
    Id:number;
    Domain:string;
    Key: JSONLoginKey;
}

export interface JSONLoginKey{
    Elements: JSONLoginKeyElements;
    Name: string;
}

export interface JSONLoginKeyElements{
    ApplicationId: string;
    Position: string;
}

export interface JSONItemRequestMsg {
    Id: number;
    Key: JSONItemRequestKey;
}

export interface JSONItemRequestKey {
    Name: string;
    Service: string;
}

export interface JSONItemClose {
    Id: number;
    Type: string;
}

export interface JSONLoginClose {
    Domain: string;
    Id: number;
    Type: string;
}
