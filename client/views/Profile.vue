<template>
  <div>
    <div class="card-header text-white bg-secondary">
      <br />
      <UserProfile />
    </div>

  </div>
</template>

<script>
  import UserProfile from "../components/UserProfile.vue";


  export default {
    data() {
      return {
        alldata: "",
      };
    },
    components: {
      UserProfile,
    },
    methods: {



    },
  };
</script>