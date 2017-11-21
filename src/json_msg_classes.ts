import {JSONLogin} from "./json_msg_interface";
import {JSONLoginKey} from "./json_msg_interface";
import {JSONLoginKeyElements} from "./json_msg_interface";

const loginDomain: string = "Login";

export class LoginMsg implements JSONLogin{
    Id:number;
    Domain:string = loginDomain;
    Key: JSONLoginKey;

    constructor(Id:number,Name:string, ApplicationId: string, Position: string){
        this.Id = Id;
        let loginMsgKey_class = new LoginMsgKey(Name,ApplicationId,Position);
        this.Key = loginMsgKey_class;
    }
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

