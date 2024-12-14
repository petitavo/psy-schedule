/**
 * Sign In Response
 * @summary
 * Represents a sign-in response
 */
export class SignInResponse {
    /**
     * Constructor
     * @param {string} id - The user id
     * @param {string} username - The username
     * @param {string} token - The token
     * @param roles
     */
    constructor(id, username, token, roles) {
        this.id = id;
        this.username = username;
        this.token = token;
        this.roles = roles;
    }

}