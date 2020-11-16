<template>
    <div class="card-mx-auto">
        <div class="card-body ">
            <form @submit.prevent="loginUser">
                <div class="form-group">
                    <input class="form-control" type="email" v-model="userEmail" placeholder="Email" />
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" v-model="userPassword" placeholder="Password" />
                </div>
                <button type="submit" class="btn btn-secondary"
                    @click="loginUser(userEmail, userPassword)">Login</button>
            </form>

        </div>
    </div>



</template>

<script>
    //import api from "../services/api";

    export default {
        data() {
            return {
                userEmail: "",

                userPassword: ""
            }
        },
        methods: {
            loginUser(userEmail, userPassword) {
                console.log(userEmail, userPassword);
                let userToLogin = {
                    email: this.userEmail,
                    password: this.userPassword
                };
                this.$store.dispatch('loginUser', userToLogin)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err.message))
            },
        }
    }
</script>
<style>
    .form-group {
        margin: 2%;
        width: fit-content;
    }

    .btn.btn-secondary {
        background-color: #66809b;
        color: #ffffff !important;
    }
</style>