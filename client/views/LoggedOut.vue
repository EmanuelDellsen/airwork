<template>
    <div class="introduction">
        <h3 class="introduction-title">
            AirWork

        </h3>
        <p class="info-text">
            This is what we do at AirWork etc..
        </p>
        <div>
            <button class="login-button" @click="authenticate('google')">auth Google</button>
        </div>
    </div>


</template>

<script>
    import api from "../services/api";

    export default {
        data() {
            return {
                authResponse: ""

            };
        },
        methods: {
            authenticate(provider) {

                this.$auth.authenticate(provider).then(res => {
                    console.log(res, "res in profile")
                    this.authResponse = res.data;
                    this.$store.dispatch("setAuthSuccess", this.authResponse.access_token);
                    this.getUserInfo();
                    this.$router.push('/');

                }).catch(err => {
                    console.log(err.message, "err in profile")
                })
                console.log(this.authResponse, "authresponse")
                /*this.$store.dispatch('authenticateUser', provider).then(() =>
                */
            },
            getUserInfo() {
                api.getUserInfo(this.$store.state.access_token).then(res => {
                    console.log(res)
                    let user = res;
                    this.$store.dispatch("setUser", user);
                }).catch(err => {
                    console.log(err, "getuserinfo error")
                })



            }
        }
    };
</script>
<style>
    .introduction {
        text-align: center;
    }

    .introduction-title {
        font-family: 'Raleway', sans-serif;
        font-size: 37px;
        text-align: center;
    }

    .info-text {
        font-family: 'Raleway', sans-serif;
        font-size: 27px;
        text-align: center;

    }

    .login-button {
        position: absolute;
    }
</style>