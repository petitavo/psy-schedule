import { defineStore } from "pinia";
import { AuthenticationService } from "./authentication.service.js";
import { SignInResponse } from "../model/sign-in.response.js";
import { SignUpResponse } from "../model/sign-up.response.js";
import http from "../../shared/services/http-common.js";

const authenticationService = new AuthenticationService();

/**
 * Authentication Store
 * @summary
 * Represents the authentication store
 */
export const useAuthenticationStore = defineStore({
    id: 'authentication',
    state: () => ({ signedIn: false, userId: 0, username: '', roles: [] }),
    getters: {
        /**
         * Is signed in
         * @param state - The state of the store
         * @returns {boolean} - True if signed in, false otherwise
         */
        isSignedIn: (state) => state.signedIn,
        /**
         * Current user id
         * @param state - The state of the store
         * @returns {number} - The current user id
         */
        currentUserId: (state) => state.userId,
        /**
         * Current username
         * @param state - The state of the store
         * @returns {string} - The current username
         */
        currentUsername: (state) => state.username,
        /**
         * Current token
         * @returns {string} - The current token
         */
        currentToken: () => localStorage.getItem('token'),

        currentRole: (state) => state.roles
    },
    actions: {
        /**
         * Sign in
         * @summary
         * This method calls the sign-in API.
         * @param signInRequest {SignInRequest} - The sign-in request
         * @param router - The router
         */
        async signIn(signInRequest, router) {
            try {
                const response = await authenticationService.signIn(signInRequest);
                const roles = response.data.roles.map(role => role.name);
                let signInResponse = new SignInResponse(response.data.id, response.data.username, response.data.token, roles);
                this.signedIn = true;
                this.userId = signInResponse.id;
                this.username = signInResponse.username;
                this.roles = signInResponse.roles;
                localStorage.setItem('token', signInResponse.token);
                http.defaults.headers.common['Authorization'] = `Bearer ${signInResponse.token}`;
                console.log(signInResponse);
                //
                if (signInResponse.roles.includes("PATIENT")) {
                    router.push({name: 'booking'});
                } else if (signInResponse.roles.includes("PSYCHOLOGIST")) {
                    router.push({name: 'psychologist'});
                }
            } catch (error) {
                console.log(error);
                router.push({name: 'sign-in'});
            }
        },
        /**
         * Sign up
         * @summary
         * This method calls the sign-up API.
         * @param signUpRequest {SignUpRequest} - The sign-up request
         * @param router - The router
         */
        async signUp(signUpRequest, router) {
            try {
                const response = await authenticationService.signUp(signUpRequest);
                let signUpResponse = new SignUpResponse(response.data.message);
                router.push({name: 'sign-in'});
            } catch (error) {
                console.log(error);
                router.push({name: 'sign-up'});
            }
        },
        /**
         * Sign out
         * @summary
         * This method signs out the user.
         * It clears the token and redirects to the sign-in page.
         * It also sets the signedIn flag to false.
         * @param router - The router
         */
        async signOut(router) {
            this.signedIn = false;
            this.userId = 0;
            this.username = '';
            this.roles = [];
            localStorage.removeItem('token');
            delete http.defaults.headers.common['Authorization'];
            router.push({name: 'sign-in'});
        }
    }
});

