<template>
    <div>
        <form @submit.prevent="inviteNewUser">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Email" name="email" v-model="email" class="form-control" />
            </div>
            <button type="invite" class="btn btn-secondary">Invite</button>

        </form>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                email: ''
            };
        },
        methods: {
            async inviteNewUser() {
                let newUser = {
                    email: this.email
                };
                this.$store
                    .dispatch('inviteNewUser', newUser)
                    .then(console.log("successfully invited user ", newUser))
                    .catch(err => console.log(err));
            }
        }
    };
</script>

<style>
    .form-group {
        position: center;
    }
</style>