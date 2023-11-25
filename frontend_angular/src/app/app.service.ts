import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
constructor(private http: HttpClient){}
    analyseLeaf(webcamImage:any){
        let url ="https://plant.id/api/v3/health_assessment?details=description,treatment,classification,cause&full_disease_list=true";
        let headers = {
          "Api-Key":"bnRhD346py6pSDk4RgPv3OWuxdSTIZzwc8PkqZfDIzMW7Opqq4",
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
    detectLabels(image:any){
    const apikey = "AIzaSyC6N0BG9mXWBr8NYAqTzaDlZHN-7AVQB00"
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${apikey}`;
    const body = {
      requests: [
        {
          image: {
            content: image.split('base64,')[1]
          },
          features: [
            {
              maxResults: 4,
              type: "LABEL_DETECTION"
            },
          ]
        }
      ]
    }
    let headers = {
      "Content-Type":"application/json"
    }
    return this.http.post(url,body,{headers});
    }
    changeLanguage(diseases:any,lang:any,name:string){
      let body :any
      if(name == 'name'){
        body ={
          "q": [diseases.name,diseases.details?.description],
          "target": lang
        }
      } else if(name == 'biological'){
        body={
          "q":diseases.details.treatment?.biological,
          "target":lang   
        }
      } else if(name == 'chemical'){
        body={
          "q":diseases.details.treatment?.chemical,
          "target":lang   
        }

      }else if(name == 'prevention'){
        body={
          "q":diseases.details.treatment?.prevention,
          "target":lang   
        }

      }
     
      let url = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyC6N0BG9mXWBr8NYAqTzaDlZHN-7AVQB00";
      return this.http.post(url,body);
    }

    textToSpeech(data:any,language:string){
      let body={
        "input":{
          "text": data
        },
        "voice":{
          "languageCode": language == 'en' ? "en-gb" : 'hi-IN',
          
          "ssmlGender":"FEMALE"
        },
        "audioConfig":{
          "audioEncoding":"MP3"
        }
       }
       return this.http.post('https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyC6N0BG9mXWBr8NYAqTzaDlZHN-7AVQB00',body);
    }
}