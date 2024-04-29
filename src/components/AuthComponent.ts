import { NoAuthorizationException } from "../lib/exception/NoAuthorizationException";
import { Component, DTO } from "lakutata";


export class AuthComponent extends Component {
       
    // TODO: Implement AuthComponent

    protected async init(): Promise<void> {
        console.log('auth init')
    }

    //check if user is authenticated
    public static isAuthenticated() {
        //check user is authenticated
        const isAuthenticated = true;//for example:it's true
        if (!isAuthenticated) {
            throw new NoAuthorizationException('Not Authenticated')
        }
    }

    protected destroy(): Promise<void> {
        console.log('auth destroy')
        return Promise.resolve();
    }

}