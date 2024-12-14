/**
 * Sign up request
 * @summary
 * Represents a sign-up request
 */
export class SignUpRequest {
    /**
     * Constructor
     * @param {string} username - The username
     * @param {string} password - The password
     * @param {Array<string>} roles  - The role
     */
    constructor(username, password, roles) {
        this.username = username;
        this.password = password
        this.roles = Array.isArray(roles) ? roles : [roles];
    }
}