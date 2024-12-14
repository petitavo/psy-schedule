<script>
import { appointmentService } from '../services/appointment.service.js';
import { Appointment } from '../model/appointment.entity.js';
import { FilterMatchMode } from "@primevue/core";
import HeaderContentComponent from "../../public/component/header-content.component.vue";
import { useAuthenticationStore} from "../../iam/services/authentication.store.js";

export default {
  name: "psychologist-appointment-management",
  components: {
    HeaderContentComponent,
  },
  data() {
    return {
      appointments: [],
      appointmentService: null,
      authStore: null,
      globalFilterValue: '',
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        reason: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      loading: false,
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
        const response = await this.appointmentService.getAll();
        this.appointments = response.data.map(appointment => new Appointment(appointment));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        this.loading = false;
      }
    },

    async acceptAppointment(appointment) {
      if (confirm(`Are you sure you want to accept this appointment?`)) {
        try {
          const updatedAppointment = {
            ...appointment,
            psychologistId: this.authStore.currentUserId,
            status: 'accepted',
          };
          console.log("Updated Appointment Data: ", updatedAppointment);

          await this.appointmentService.update(appointment.id, updatedAppointment);
          await this.fetchAppointments();
        } catch (error) {
          console.error("Error accepting appointment:", error);
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
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        reason: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
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
      this.$router.push({ name: 'sign-in' });
    }
  }
};
</script>

<template>
  <header-content-component></header-content-component>
  <div class="psychologist-appointment-management">
    <pv-card class="mb-4">
      <template #title>
        <h1 class="text-3xl font-bold">Manage Appointments</h1>
      </template>
      <template #content>
        <div class="card">
          <pv-toolbar class="mb-4">
            <template #start>
              <div class="p-input-icon-left">
                <i class="pi pi-search" />
                <pv-input-text v-model="globalFilterValue" placeholder="Search appointments" @input="onGlobalFilterChange" />
              </div>
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
                <pv-button v-if="data.status === 'pending'" icon="pi pi-check" class="p-button-rounded p-button-success" @click="acceptAppointment(data)" />
              </template>
            </pv-column>
          </pv-data-table>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.psychologist-appointment-management {
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