import { filesModel } from "./filesModel";

export class userProfilesModel {
    accId: number;
    emailId: string;
    name: string;
    contact: string;
    exp: string;
    docs: filesModel[];
}