import { NoAuthorizationException } from "../lib/exception/NoAuthorizationException";

export class AuthComponent {

    // TODO: Implement AuthComponent


    //check if user is authenticated
    public static isAuthenticated() {
        //check user is authenticated
        const isAuthenticated = false;//for example:it's true
        if (!isAuthenticated) {
            throw new NoAuthorizationException('Not Authenticated')    
        }        
    }
}