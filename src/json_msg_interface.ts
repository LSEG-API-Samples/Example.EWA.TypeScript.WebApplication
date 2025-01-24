//|-----------------------------------------------------------------------------
//|            This source code is provided under the Apache 2.0 license      --
//|  and is provided AS IS with no warranty or guarantee of fit for purpose.  --
//|                See the project's LICENSE.md for details.                  --
//|           Copyright LSEG 2017.       All rights reserved.                 --
//|-----------------------------------------------------------------------------

//Interface for Login domain JSON message
export interface JSONLogin {
    ID:number;
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
    ID: number;
    Key: JSONItemRequestKey;
}

//Interface for Market Price domain item request's key attribute JSON message, service name is an optional 
export interface JSONItemRequestKey {
    Name: string;
    Service?: string;
}

//Interface for close JSON message
export interface JSONClose {
    Domain?: string;
    ID: number;
    Type: string;
}
