import { Exception } from "lakutata";

export class NoAuthorizationException extends Exception {
    public errno: string | number = 'E_NO_AUTHORIZATION'
}
