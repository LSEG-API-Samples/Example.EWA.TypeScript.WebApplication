//|-----------------------------------------------------------------------------
//|            This source code is provided under the Apache 2.0 license      --
//|  and is provided AS IS with no warranty or guarantee of fit for purpose.  --
//|                See the project's LICENSE.md for details.                  --
//|           Copyright Refinitiv 2017.       All rights reserved.            --
//|-----------------------------------------------------------------------------

import { JSONLogin } from "./json_msg_interface";
import { JSONLoginKey } from "./json_msg_interface";
import { JSONLoginKeyElements } from "./json_msg_interface";

import { JSONItemRequestMsg } from "./json_msg_interface";
import { JSONItemRequestKey } from "./json_msg_interface";

import { JSONClose } from "./json_msg_interface";

export { LoginMsg };
export { ItemRequestMsg };
export {CloseMsg};

const loginDomain: string = "Login";

class LoginMsg implements JSONLogin {
  ID: number;
  Domain: string = loginDomain;
  Key: JSONLoginKey;

  constructor(
    ID: number,
    Name: string,
    ApplicationId: string,
    Position: string
  ) {
    this.ID = ID;
    let loginMsgKey_class = new LoginMsgKey(Name, ApplicationId, Position);
    this.Key = loginMsgKey_class;
  }
}

class LoginKeyElements implements JSONLoginKeyElements {
  ApplicationId: string;
  Position: string;
  constructor(ApplicationId: string, Position: string) {
    this.ApplicationId = ApplicationId;
    this.Position = Position;
  }
}

class LoginMsgKey implements JSONLoginKey {
  Name: string;
  Elements: JSONLoginKeyElements;
  constructor(Name: string, ApplicationId: string, Position: string) {
    this.Name = Name;
    let loginKeyElements_class = new LoginKeyElements(ApplicationId, Position);
    this.Elements = loginKeyElements_class;
  }
}

class ItemRequestMsg implements JSONItemRequestMsg {
  ID: number;
  Key: JSONItemRequestKey;
  constructor(ID: number, Name: string, Service: string) {
    this.ID = ID;
    let itemrequestKey_class = new ItemRequestMsgKey(Name, Service);
    this.Key = itemrequestKey_class;
  }
}

class ItemRequestMsgKey implements JSONItemRequestKey {
  Name: string;
  Service?: string;

  constructor(Name: string, Service?: string) {
    this.Name = Name;
    if (Service !==''){
      this.Service = Service;
    }
    
  }
}


class CloseMsg implements JSONClose{
  Domain?: string;
  ID: number;
  Type: string;

  constructor(ID: number, Domain?: string) {
    this.ID = ID;
    this.Domain = Domain;
    this.Type = "Close";
  }

}
