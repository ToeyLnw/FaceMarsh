import { Injectable } from "@angular/core";
import { Constants } from "../../config/constant";
import { HttpClient } from "@angular/common/http";
import { Observable, lastValueFrom } from "rxjs";
import { UserGetRespons } from "../../model/user-get-res";
import { PictureGetResponse } from "../../model/pic-get-res";
import { HistoryGetResponse } from "../../model/history-get-res";


@Injectable({
    providedIn: 'root'
})


export class UserService {
    constructor(private http: HttpClient, private constants: Constants) { }

    private uid: any;

    // setUID(data: any) {
    //     this.uid = data;
    //     // localStorage.setItem('uid', JSON.stringify(data));

    // }

    // getUID() {
    //     // return localStorage.getItem('uid') || '';
    //     return this.uid;
    // }

    async getUserProfile(id: number) {
        const url = this.constants.API_ENDPOINT + 'login/'+id;
        try {
            const response = await lastValueFrom(this.http.get(url));
            return response as UserGetRespons[];
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
            throw error; // ส่ง error ออกไปให้ caller จัดการต่อ
        }
    }

    async getShow(id: number) {
        const url = this.constants.API_ENDPOINT + 'collection/' + id;
        try {
            const response = await lastValueFrom(this.http.get(url));
            return response as PictureGetResponse[];
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
            throw error; // ส่ง error ออกไปให้ caller จัดการต่อ
        }
    }

    async getHistory(id: number) {
        const url = this.constants.API_ENDPOINT + 'collection/show/' + id;
        try {
            const response = await lastValueFrom(this.http.get(url));
            return response as HistoryGetResponse[];
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
            throw error; // ส่ง error ออกไปให้ caller จัดการต่อ
        }
    }

    public async updatePointHistory(id: any, point: number) {
        const url = this.constants.API_ENDPOINT + 'history';
        await lastValueFrom(
            this.http.post(url, {
                PID: id,
                point: point
            })
        );
    }


    public async loginCheck(email: string, password: string) {
        const body = {
          email: email,
          password: password
        };
        const url = this.constants.API_ENDPOINT + 'login';
        const response = await lastValueFrom(this.http.post(url, body)) as UserGetRespons[];
    
        // Assuming response contains user data upon successful login
        if (response && response.length > 0) {
          // Store user data in local storage
          localStorage.setItem('currentUser', JSON.stringify(response[0]));
        }
        return response;
      }

      //2 ways to get data from storage
      getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
      }
    //   getCurrentUser(): UserGetRespons | null {
    //     const userData = localStorage.getItem('currentUser');
    //     if (userData) {
    //       return JSON.parse(userData);
    //     }
    //     return null;
    //   }

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

    public async uploadFile(img :File) {
        const url = this.constants.API_ENDPOINT + 'upload';
        try{
        const formData = new FormData();
        formData.append('file', img);
        const response = await lastValueFrom(
            this.http.post(url, formData)
        );
        return response;
        }catch (error) {
      console.error('Error naa', error);
      throw error; // Handle error as needed
    }
    }

    public async addNewPic(owner: number, fname: string, lname: string, img: string, description: string) {
        // point will always start at 1000
        let point = 1000;
        // (`madeBy`, `fname`, `lname`, `image`, `description`, `point`) 

        const body = {
            madeBy: owner,
            fname: fname,
            lname: lname,
            image: img,
            description: description,
            point: point
        };
        const url = this.constants.API_ENDPOINT + 'collection/insert';
        const response = await lastValueFrom(this.http.post(url, body));
        return response as UserGetRespons[];
      }

    public async randomToFight() {
        const url = this.constants.API_ENDPOINT + 'collection/random';
        const response = await lastValueFrom(this.http.get(url));
        return response as PictureGetResponse[]; //tripgetresponse is model
    }

    public async updatePoint(id: any, point: number) {
        const url = this.constants.API_ENDPOINT + 'collection/update';
        const response = await lastValueFrom(
            this.http.put(url, {
                PID: id,
                point: point
            })
        );
        return response as PictureGetResponse;
    }

    public async getAllPics() {
        const url = this.constants.API_ENDPOINT + 'collection/top';
        const response = await lastValueFrom(this.http.get(url));
        
        return response as PictureGetResponse[];
    }
}

//unused method maybe?
// public async loginCheck(email: string, password: string) {
//     const body = {
//         email: email,
//         password: password
//     }
//     const url = this.constants.API_ENDPOINT + 'login';
//     const response = await lastValueFrom(
//         this.http.post(url, body));
//     return response as UserGetRespons[];
// }

//update user
//   async updateUserProfile(userProfile: UserProfile): Promise<void> {
//     try {
//       // Step 1: Update data in the backend via API
//       const updateResponse = await lastValueFrom(this.http.put<UserProfile>(`${this.constants.API_ENDPOINT}/user-profile`, userProfile));
      
//       // Step 2: Update local storage after successful backend update
//       if (updateResponse) {
//         localStorage.setItem('userProfile', JSON.stringify(updateResponse));
//       }
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//       throw error; // Handle error as needed
//     }
//   }

