<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";
import ToolbarHome from "../../public/component/toolbar-home.component.vue";

export default {
  name: "sign-up",
  components: {ToolbarHome},
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      username: "",
      password: "",
      role: ""
    };
  },
  methods: {
    onSignUp() {
      let signUpRequest = new SignUpRequest(this.username, this.password, [this.role]);
      this.authenticationStore.signUp(signUpRequest, this.$router);
    }

  }
}
</script>

<template>
  <toolbar-home></toolbar-home>
  <div>
    <h3>Sign Up</h3>
  </div>
  <p class="p-fluid mb-5">Please enter the required information to sign up.</p>
  <div>
    <form @submit.prevent="onSignUp">
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="username">Username</label>
            <pv-input-text id="username" v-model="username" :class="{'p-invalid': !username }"/>
            <small v-if="!username" class="p-invalid">Username is required.</small>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="password">Password</label>
            <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password }" type="password"/>
            <small v-if="!password" class="p-invalid">Password is required.</small>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="role">Role</label>
            <pv-dropdown id="role" v-model="role" :options="['PATIENT', 'PSYCHOLOGIST']"/>
            <small v-if="!role" class="p-invalid">Role is required.</small>
          </pv-float-label>
        <div class="p-field mt-5">
          <pv-button type="submit">Sign Up</pv-button>
          <router-link to="/home">
            <pv-button class="ml-2">Home</pv-button>
          </router-link>
        </div>
      </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.ml-2 {
  margin-left: 0.5rem;
}
</style>