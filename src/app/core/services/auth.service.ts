import {Injectable, inject}  from "@angular/core"
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user } from "@angular/fire/auth"
import { Observable, from } from "rxjs"
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    firebaseAuth = inject(Auth)
    register(emial:string,username:string,password:string):Observable<void>{
        const promise = createUserWithEmailAndPassword(this.firebaseAuth,emial,password
            ).then(response => updateProfile(response.user, {displayName:username}));
            return from(promise)
            
    }
    login(email:string,password:string): Observable<void>{
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password).then(() =>{})
            return from(promise)
    }
}