import { JSONLogin } from "./json_msg_interface";
import { JSONLoginKey } from "./json_msg_interface";
import { JSONLoginKeyElements } from "./json_msg_interface";

import { JSONItemRequestMsg } from "./json_msg_interface";
import { JSONItemRequestKey } from "./json_msg_interface";
import { JSONItemClose } from "./json_msg_interface";
import { JSONLoginClose } from "./json_msg_interface";

export { LoginMsg };
export { ItemRequestMsg };
export { ItemCloseRequestMsg };
export {LoginCloseRequestMsg};

const loginDomain: string = "Login";

class LoginMsg implements JSONLogin {
  Id: number;
  Domain: string = loginDomain;
  Key: JSONLoginKey;

  constructor(
    Id: number,
    Name: string,
    ApplicationId: string,
    Position: string
  ) {
    this.Id = Id;
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
  Id: number;
  Key: JSONItemRequestKey;
  constructor(Id: number, Name: string, Service: string) {
    this.Id = Id;
    let itemrequestKey_class = new ItemRequestMsgKey(Name, Service);
    this.Key = itemrequestKey_class;
  }
}

class ItemRequestMsgKey implements JSONItemRequestKey {
  Name: string;
  Service: string;

  constructor(Name: string, Service: string) {
    this.Name = Name;
    this.Service = Service;
  }
}

class ItemCloseRequestMsg implements JSONItemClose {
  Id: number;
  Type: string;
  constructor(Id: number) {
    this.Id = Id;
    this.Type = "Close";
  }
}

class LoginCloseRequestMsg implements JSONLoginClose {
  Domain: string;
  Id: number;
  Type: string;
  constructor(Id: number) {
    this.Id = Id;
    this.Domain = loginDomain;
    this.Type = "Close";
  }
}
