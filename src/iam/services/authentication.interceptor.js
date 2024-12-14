import { useAuthenticationStore} from "./authentication.store.js";

/**
 * Interceptor to add authentication token to the request header
 * @summary
 * This interceptor is used to add the authentication token to the request header.
 * @param config - Axios request configuration
 * @returns {*}
 */
export const authenticationInterceptor = (config) => {
    const authenticationStore = useAuthenticationStore();
    const token = authenticationStore.currentToken;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};

