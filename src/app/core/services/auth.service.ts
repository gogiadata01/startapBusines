import {Injectable, inject, signal}  from "@angular/core"
import { Auth, confirmPasswordReset, createUserWithEmailAndPassword, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailAndPassword, signOut, updatePassword, updateProfile, user } from "@angular/fire/auth"
import { Observable, from } from "rxjs"
import { IUser } from "../models/common.model"
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    firebaseAuth = inject(Auth)
    router = inject(Router)
    users$ = user(this.firebaseAuth)
     actionCodeSettings = {
        url :"http://localhost:4200/Password-recovery"
    }
    
    CurrentUserSign = signal<IUser | null | undefined>(undefined)
    register(email:string,username:string,password:string,role:string):Observable<void>{
        const promise = createUserWithEmailAndPassword(this.firebaseAuth,email,password
            ).then(response => updateProfile(response.user, {displayName:username,photoURL:role}))
            return from(promise)
            
    }
    login(email:string,password:string): Observable<void>{
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password).then(() =>{})
            return from(promise)
    }
    logout():Observable<void>{
        const promise = signOut(this.firebaseAuth);
        return from(promise)
    }
    // ResetPassword(email):Observable<void>{
    //     const promise = sendPasswordResetEmail()
    // }
    ResetPassword(email:string):Observable<void> {
        const promise = sendPasswordResetEmail(this.firebaseAuth,email,this.actionCodeSettings)
        return from(promise)

    }
    passwordreset(password:string,oobCode:string):Observable<void>{
        const promise = confirmPasswordReset(this.firebaseAuth,oobCode,password)
        return from(promise)
        this.router.navigateByUrl('/')
        
    }
    // sendoobd(email:string){
    //     return this.pos
    // }
}