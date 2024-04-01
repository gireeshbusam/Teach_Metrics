import { filesModel } from "src/app/admin/model/filesModel";

export class candidatesModel {
    accId: number;
    candidateName: string;
    about: string;
    exp: string;
    contact: string;
    address: string;
    postalCode: string;
    emailId: string;
    score: number;
    percentage: string;
    docs: filesModel[];
}