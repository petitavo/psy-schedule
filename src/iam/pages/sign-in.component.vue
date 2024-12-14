<script>
import {SignInRequest} from "../model/sign-in.request.js";
import {useAuthenticationStore} from "../services/authentication.store.js";
import ToolbarHome from "../../public/component/toolbar-home.component.vue";

export default {
  name: 'sign-in',
  components: {ToolbarHome},
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    }
  }
}

</script>

<template>
  <toolbar-home></toolbar-home>
  <div>
    <h3>Sign In</h3>
  </div>
  <p class="p-fluid mb-5">Please enter the required information to sign in.</p>
  <div>
    <form @submit.prevent="onSignIn">
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
        <div class="p-field mt-5">
          <pv-button type="submit">Sign In</pv-button>
          <router-link to="/home">
            <pv-button class="ml-2">Home</pv-button>
          </router-link>
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