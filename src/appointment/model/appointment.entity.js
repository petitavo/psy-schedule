export class Appointment{
    constructor({
                    id= 0,
                    date = '',
                    reason = '',
                    status = '',
                    psychologistId = 0,
                    patientId = 0
                }={}) {
        this.id = id;
        this.date = date;
        this.reason = reason;
        this.status = status;
        this.psychologistId = psychologistId;
        this.patientId = patientId;
    }
}