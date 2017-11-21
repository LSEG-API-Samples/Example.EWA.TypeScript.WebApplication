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