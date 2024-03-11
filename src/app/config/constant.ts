import { Injectable } from '@angular/core';

//class นี้สามารถ Inject หรือนำไปใช้ใน class อื่น ๆ ได้
@Injectable({
  providedIn: 'root',
})
export class Constants {
  //ค่าตัวใหญ่ทั้งหมดให้คิดว่าเป็นค่า constants
  public readonly API_ENDPOINT: string = 'http://localhost:3000/';
  //พอรันพนเซิฟเวอร์แล้วไม่สามารถใช้ http ธรรมดาได้ ให้ใช้ https แล้วมาแก้ตรงนี้
  // public readonly API_ENDPOINT: string = 'http://cslab.msu.ac.th/tripbooking';

}