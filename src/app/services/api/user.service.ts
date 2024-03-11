import { Injectable } from "@angular/core";
import { Constants } from "../../config/constant";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { UserGetRespons } from "../../model/user-get-res";
import { PictureGetResponse } from "../../model/pic-get-res";

@Injectable({
    providedIn: 'root'
})

// export class User {
//     UID: number = 0;
//     fname: string = '';
//     lname: string = '';
//     email: string = '';
//     password: string = '';
//     profile: string = '';
//     type: number = 0;
//     limit_upload: number = 0;
//   }

export class UserService {

    private uid: any;
    // user = Array<User>();
    constructor(private constants: Constants, private http: HttpClient) { }

    setUID(data: any) {
        this.uid = data;
        // localStorage.setItem('uid', JSON.stringify(data));
        
    }

    getUID() {
        // return localStorage.getItem('uid') || '';
        return this.uid;
    }

    public async loginCheck(email: string, password: string) {
        const body = {
            email: email,
            password: password
        }
        const url = this.constants.API_ENDPOINT + 'login';
        const response = await lastValueFrom(
            this.http.post(url, body));
        return response as UserGetRespons[];
    }

    public async addNewUser(fname: string, lname: string, img: string,
        email: string, password: string, options?: any) {
        const url = this.constants.API_ENDPOINT + 'register';
        // console.log(fname);

        const response = await lastValueFrom(
            this.http.post(url, {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                profile: img
            })
        );
        return response as UserGetRespons[];
    }

    public async randomToFight(){
        const url = this.constants.API_ENDPOINT + 'collection/random';
        const response = await lastValueFrom(this.http.get(url));
        return response as PictureGetResponse[]; //tripgetresponse is model
    }

    public async updatePoint(id : any, point : number){
        const url = this.constants.API_ENDPOINT + 'collection/update';
        const response = await lastValueFrom(
            this.http.put(url, {
                PID : id,
                point : point
            })
        );
        return response as PictureGetResponse;
    }

    public async getAllPics(){
        const url = this.constants.API_ENDPOINT + 'collection';
        const response = await lastValueFrom(this.http.get(url));
        return response as PictureGetResponse[];
    }
}