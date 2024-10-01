import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, take } from "rxjs";
import { User } from "../shared/models/User";
import { IUserLogin } from "../shared/interfaces/IUserLogin";
import { USER_LOGIN_URL } from "../shared/constants/urls";

const USER_KEY = 'User';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userSubject = new BehaviorSubject<User>(this.getUserLocalStorage());

    set setUser(value: User) {
        this.userSubject.next(value);
    }

    get getUser(): Observable<User> {
        return this.userSubject.asObservable();
    }

    private getUserLocalStorage(): User {
        const userJson = localStorage.getItem(USER_KEY);
        if(userJson) return JSON.parse(userJson) as User;
        return new User();
    }

    constructor(
        private _http: HttpClient,
    ) {}

    setUserLocalStorage(user: User) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    
    login(userLogin: IUserLogin): Observable<User> {
        return this._http
        .post<User>(USER_LOGIN_URL, userLogin)
        .pipe(take(1));
    }

    logout(): void {
        this.userSubject.next(new User);
        localStorage.removeItem(USER_KEY);
    }

    isLoggedIn(): boolean {
        return !!this.getUserLocalStorage();
    }    
}