import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
//import { decode } from 'jsonwebtoken'
import * as auth0 from 'auth0-js';
import { localStorageValues } from './LocalStorageValue';
import { util } from './util';
import { JwtPayload } from './jwtPayload';
import {  urlForServer } from '../util/config';

(window as any).global = window
@Injectable({
    providedIn:'root'
})

export class AuthService{

    auth = new auth0.WebAuth({
        clientID: urlForServer.authClientID ,
        domain: urlForServer.authDomain,
        responseType: urlForServer.authResponseType,
        redirectUri: urlForServer.authRedirectUri,
       // audience: environment.auth.audience,
        scope: urlForServer.authScope
    })

    // Store authentication data
  expiresAt: number;
  userProfile: any;
  accessToken: string;
  authenticated: boolean;
  isUser: boolean;
  isEmployer: boolean;

  constructor(public router: Router , public utilInstance: util) { }

  public login() {
      console.log("trying to login")
    this.auth.authorize();
  }


  public handleLoginCallback(): void {
      
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.log(`Error: ${err.error}`);
      }
      this.router.navigate(['/']); // Redirect the user after the session is set up.
    });
  }

  getAccessToken() {
    this.auth.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      }
    });
  }

  // Use access token to retrieve user's profile and set session
  getUserInfo(authResult) {
    this.auth.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this.setSession(authResult, profile);
      }
    });
  }

  // Save authentication data and update login status subject
  private setSession(authResult, profile): void {
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.authenticated = true;
    
    localStorage.setItem(localStorageValues.idToken, authResult.idToken)
    localStorage.setItem(localStorageValues.expiryTime, this.expiresAt.toString())
    localStorage.setItem(localStorageValues.nickname, profile.nickname)
    localStorage.setItem(localStorageValues.picture, profile.picture)
    localStorage.setItem(localStorageValues.accessToken, authResult.accessToken)
    
    localStorage.setItem(localStorageValues.userId, authResult.idTokenPayload.sub)
    this.utilInstance.link = '';
    this.utilInstance.idToken = authResult.idToken
    this.utilInstance.picture =  profile.picture

    
  }

  // Log out of Auth0 session
  // Ensure that returnTo URL is specified in Auth0
  // Application settings for Allowed Logout URLs
  public logout(): void {
    this.auth.logout({
      returnTo: "http://localhost:4200",
      clientID: urlForServer.authClientID,
    });
  }

  // Checks whether the expiry time for the user's Access Token has passed and that user is signed in locally.
  get isLoggedIn(): boolean {
    return Date.now() < this.expiresAt && this.authenticated;
  }



}