<template>
  <div class="edit-user-profile">
    <h2 class="edit-user-profile-header">Edit your profile</h2>

    <form @submit.prevent="updateUserProfile">
      <div>
        <label> Email address </label>
        <input
          type="email"
          name="email"
          v-model="email"
          v-validate="'required'"
        />
      </div>

      <div>
        <label>Old Password</label>
        <input
          type="password"
          name="old_password"
          id="old_password"
          v-model="old_password"
          v-validate="'required'"
        />
      </div>

      <div>
        <label>New Password</label>
        <input
          type="password"
          name="new_password"
          id="new_password"
          v-model="new_password"
          v-validate="'required'"
        />
      </div>
      <div>
        <label>Confirm new Password</label>
        <input
          type="password"
          name="confirm_new_password"
          id="confirm_new_password"
          v-model="confirm_new_password"
          v-validate="'required'"
        />
      </div>
      <button type="submit" class="btn btn-secondary">Update</button> 
    </form>
  </div>
</template>

 
<script>

// handle event such as routing after the update has been done etc ->
//           this.$store
//          .dispatch('update', profile)
//          .then(() => this.$router.push('/profile'))
//          .catch(err => console.log(err));


export default {
    
}
</script>
