import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
constructor(private http: HttpClient){}
    analyseLeaf(webcamImage:any){
        let url ="https://plant.id/api/v3/health_assessment?details=description,treatment,classification,cause&full_disease_list=true";
        let headers = {
          "Api-Key":"PYcED8lbT2xAZZhNENkaykkbwHNG3sSIdCuyahVslADNR3d2Bb",
          "Content-Type":"application/json"
        }
        let body ={
          "images": [
              webcamImage
          ],
          "latitude": 49.207,
          "longitude": 16.608,
          "similar_images": true
      }
      
      
     return this.http.post(url,body,{headers})
    }
}