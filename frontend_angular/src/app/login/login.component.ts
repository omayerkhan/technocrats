import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
    'selector':  'app-login',
    'templateUrl': './login.component.html',
    'styleUrls': ['./login.component.scss']
})
 
export class LoginComponent implements OnInit{
    @Output() loggedIn = new EventEmitter<string>();
    phoneNumber: string ='';
    verificationCode: string = '';
    confirmationResult: any;
    recaptchaVerifier: any;
    constructor(private afAuth: AngularFireAuth){}
    ngOnInit() {
       if (!firebase.apps.length) {
        const yourFirebaseConfig = {
          apiKey: "AIzaSyCkzoGGXc8NXuerTPD40uNlBLUp7eBVayU",
          authDomain: "plantdisease-17e2d.firebaseapp.com",
          projectId: "plantdisease-17e2d",
          storageBucket: "plantdisease-17e2d.appspot.com",
          messagingSenderId: "162451718880",
          appId: "1:162451718880:web:ee916c31ab1f941cb14685",
          measurementId: "G-T527LKZPMD"
        };
        firebase.initializeApp(yourFirebaseConfig);
      }
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {'size': 'invisible'});
      this.recaptchaVerifier.render();
    }
    sendLoginCode() {
        firebase.auth().signInWithPhoneNumber(this.phoneNumber,this.recaptchaVerifier).then((result:any)=>{
          this.confirmationResult = result;
        })
        
      }
    
      verifyLoginCode() {
        if (!this.confirmationResult) {
          console.error("Please send OTP first.");
          return;
        }
        
        this.confirmationResult.confirm(this.verificationCode)
          .then((userCredential:any) => {
            console.log("Successfully signed in:", userCredential.user);
            localStorage.setItem('accessToken',userCredential.user._delegate.accessToken);
            localStorage.setItem('user',userCredential.user._delegate.phoneNumber);
            this.loggedIn.emit('success');
          })
          .catch((error:any) => {
            console.error("Error verifying OTP:", error);
          });
      }

}