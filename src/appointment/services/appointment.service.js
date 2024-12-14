import http from "../../shared/services/http-common.js";

export class appointmentService {
    /**
     * API endpoint for appointment
     * @type {string}
     */
    resourceEndpoint = '/appointments';

    /**
     * Get appointment by patient id
     * @param {string|number} id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getByPatientId(id) {
        return http.get(`${this.resourceEndpoint}/patient/${id}`);
    }

    /**
     * Get appointment by psychologist id
     * @param {string|number} id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getByPsychologistId(id) {
        return http.get(`${this.resourceEndpoint}/psychologist/${id}`);
    }

    /**
     * Updates a appointment by id
     * @param id
     * @param data
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    update(id, data) {
        return http.put(`${this.resourceEndpoint}/${id}`, data);
    }

    /**
     * Creates a new appointment
     * @param {Object} data
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @method create
     */
    create(data) {
        return http.post(this.resourceEndpoint, data);
    }

    /**
     * Deletes a appointment by id
     * @param {string|number} id
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @method delete
     */
    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Get all appointments
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @method getAll
     */
    getAll() {
        return http.get(this.resourceEndpoint);
    }
}