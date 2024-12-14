<script>


export default {
  name: "toolbar-home" ,
  components: { },

  data(){
    return {
      items: [
        { label: 'sign-in', to: "/home/sign-in", icon: 'pi pi-user' },
        { label: 'sign-up', to: "/home/sign-up", icon: 'pi pi-user-plus' }
      ]
    }

  },

  created() {
    console.log('ToolbarHome created');
  }
}

</script>

<template>

  <div class="toolbar-container z-auto">
    <pv-toolbar class="w-full fixed top-0 left-0 pr-6 pl-6" style="background-color:#8B0000; max-height:80px; width:100%; height:100%">


      <template #start>
        <img src="../../assets/img/psy.png" max-height="55" height="55"/>
      </template>

      <template #end>

        <div class="button-options m-1">
          <router-link v-for="item in items" :key="item.label" :to="item.to">
            <pv-button class="options m-1" :label="item.label">
              <i :class="item.icon"></i> {{ item.label }}
            </pv-button>
          </router-link>
        </div>


      </template>

    </pv-toolbar>
  </div>

</template>

<style scoped>

.button-options {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.button-options .options {
  background-color: #F5F5DC;
  color: #000000;
  font-weight: normal;
  border: solid 2px #CFAE75;
}


.button-options .options:not(:disabled):hover {
  background-color: #CFAE75;
  color: white;
  font-weight: bold;
  border: solid 2px #CFAE75;
}




</style>