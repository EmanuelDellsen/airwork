<template>
    <div class="profile-content">
        <div class="image-content">
            <img class="profile-picture" :src="`${user.picture}`">

        </div>
        <div class="profile-info">
            <div>
                {{user.given_name}}
            </div>
            <div>
                {{user.family_name}}
            </div>
            <div>
                {{user.email}}
            </div>
        </div>
    </div>



</template>

<script>

    //import api from "../services/api";


    export default {
        data() {
            return {
                loggedInUser: {}
            }
        },
        mounted: function () {
            //this.getUserInfo();
        },
        computed: {
            user: {
                get() {
                    return this.$store.state.user;
                }
            }
        },
        methods: {
            /*getUserInfo() {
                api.getUserInfo(this.$store.state.access_token).then(res => {
                    console.log(res)
                    let user = res;
                    this.$store.dispatch("setUser", user);
                }).catch(err => {
                    console.log(err, "getuserinfo error")
                })



            }*/
        }
    }
</script>
<style>
    .image-content {
        text-align: right;
        float: right;
        width: 75%;

    }

    .profile-picture {
        width: 30%;
        height: 30%;

    }

    .profile-info {
        width: 25%;
    }
</style>