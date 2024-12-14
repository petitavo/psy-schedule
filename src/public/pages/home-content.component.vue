<script>
import ToolbarHome from "../component/toolbar-home.component.vue";

export default {
  name: "home-content",
  components: {ToolbarHome},
  created() {
    console.log('HomeContent created');
  }
}
</script>

<template>
  <toolbar-home></toolbar-home>
  <div class="home-content" >
    <div class="information-content">
      <div style="width: 80%">
        <h1>Psy Schedule</h1>
        <p>This is an application for patients and psychologists. Patients can book appointments, while psychologists manage requests, accept or decline appointments, and keep their schedules updated.</p>
      </div>
    </div>
    <div class="image-home">
      <img src="../../assets/img/psy.png" height="600" width="600"/>
    </div>
  </div>
</template>

<style scoped>
.home-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 80%;
  width: 100%;
}

.information-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 50%;
}

.image-home {
  height: 100%;
  width: 40%;
}

h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
}

p {
  font-size: 1.2em;
  margin-top: 0;
}

</style>

