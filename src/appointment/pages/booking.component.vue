<script>
import { appointmentService } from '../services/appointment.service.js';
import { Appointment } from '../model/appointment.entity.js';
import { FilterMatchMode } from "@primevue/core";
import HeaderContentComponent from "../../public/component/header-content.component.vue";
import { useAuthenticationStore} from "../../iam/services/authentication.store.js";

export default {
  name: "patient-appointment-booking",
  components: {
    HeaderContentComponent,
  },
  data() {
    return {
      appointments: [],
      bookingDialogVisible: false,
      appointmentService: null,
      authStore: null,
      globalFilterValue: '',
      filters: {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        date: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        reason: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        status: {value: null, matchMode: FilterMatchMode.EQUALS},
      },
      loading: false,
      newAppointment: new Appointment({}),
    };
  },
  methods: {
    async fetchAppointments() {
      this.loading = true;
      try {
        if (!this.authStore.isSignedIn) {
          console.error("User is not authenticated");
          return;
        }
        const response = await this.appointmentService.getByPatientId(this.authStore.currentUserId);
        console.log(response.data);

        if (Array.isArray(response.data)) {
          this.appointments = response.data.map(appointment => new Appointment(appointment));
        } else if (response.data) {
          this.appointments = [new Appointment(response.data)];
        } else {
          console.error("The response data is not an array or an object:", response.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        this.loading = false;
      }
    },


  openBookingDialog() {
      if (!this.authStore.isSignedIn) {
        console.error("User is not authenticated");
        this.$router.push({name: 'sign-in'});
        return;
      }
      this.newAppointment = new Appointment({
        patientId: this.authStore.currentUserId,
        psychologistId: Math.floor(Math.random() * 1000) + 1, // Random psychologist ID
        status: 'pending'
      });
      this.bookingDialogVisible = true;
    },

    closeBookingDialog() {
      this.bookingDialogVisible = false;
      this.newAppointment = new Appointment({});
    },

    async bookAppointment() {
      try {
        if (this.appointments.length > 0) {
          alert("You already have an appointment.");
          return;
        }
        await this.appointmentService.create(this.newAppointment);
        await this.fetchAppointments();
        this.closeBookingDialog();
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    },

    async cancelAppointment(appointment) {
      if (confirm("Are you sure you want to cancel this appointment ?"))
      {
        try {
          await this.appointmentService.delete(appointment.id);
          await this.fetchAppointments();
        } catch (error) {
          console.error("Error canceling appointment:", error);
        }
      }
    },

    onGlobalFilterChange(e) {
      this.filters['global'].value = e.target.value;
    },

    clearFilter() {
      this.initFilters();
    },

    initFilters() {
      this.filters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        date: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        reason: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        status: {value: null, matchMode: FilterMatchMode.EQUALS},
      };
      this.globalFilterValue = '';
    },
  },
  created() {
    this.appointmentService = new appointmentService();
    this.authStore = useAuthenticationStore();
    if (this.authStore.isSignedIn) {
      this.fetchAppointments();
    } else {
      console.warn("User is not authenticated. Redirecting to login page.");
      this.$router.push({name: 'sign-in'});
    }
  }
};
</script>

<template>
  <header-content-component></header-content-component>
  <div class="patient-appointment-booking">
    <pv-card class="mb-4">
      <template #title>
        <h1 class="text-3xl font-bold">Book an Appointment</h1>
      </template>
      <template #content>
        <div class="card">
          <pv-toolbar class="mb-4">
            <template #start>
              <div class="p-input-icon-left">
                <i class="pi pi-search"/>
                <pv-input-text v-model="globalFilterValue" placeholder="Search appointments"
                               @input="onGlobalFilterChange"/>
              </div>
            </template>
            <template #end>
              <pv-button label="Book Appointment" icon="pi pi-plus" @click="openBookingDialog"
                         class="p-button-success"/>
            </template>
          </pv-toolbar>

          <pv-data-table
              :value="appointments"
              :paginator="true"
              :rows="10"
              :rows-per-page-options="[5, 10, 15]"
              current-page-report-template="Showing {first} to {last} of {totalRecords} appointments"
              :filters="filters"
              :global-filter-fields="['date', 'reason', 'status']"
              :loading="loading"
          >
            <pv-column field="date" header="Date" :sortable="true">
              <template #body="slotProps">
                {{ new Date(slotProps.data.date).toLocaleString() }}
              </template>
            </pv-column>
            <pv-column field="reason" header="Reason" :sortable="true"></pv-column>
            <pv-column field="status" header="Status" :sortable="true"></pv-column>
            <pv-column headerStyle="width: 8rem">
              <template #body="{ data }">
                <pv-button icon="pi pi-times" class="p-button-rounded p-button-danger"
                           @click="cancelAppointment(data)"/>
              </template>
            </pv-column>
          </pv-data-table>
        </div>

        <pv-dialog v-model:visible="bookingDialogVisible" modal header="Book Appointment">
          <div class="p-fluid">
            <div class="p-field">
              <label for="date">Date</label>
              <pv-calendar id="date" v-model="newAppointment.date" dateFormat="dd/mm/yy" showTime/>
            </div>
            <div class="p-field">
              <label for="reason">Reason</label>
              <pv-input-text id="reason" v-model="newAppointment.reason" required autofocus/>
            </div>
          </div>
          <template #footer>
            <pv-button label="Book" icon="pi pi-check" @click="bookAppointment" autofocus/>
          </template>
        </pv-dialog>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.patient-appointment-booking {
  padding: 20px;
}

.card {
  background: var(--surface-card);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

:deep(.p-column-filter) {
  width: 100%;
}
</style>