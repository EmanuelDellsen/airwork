<template>
    <div>
        <div class="card-header text-white bg-secondary">
        <h4>Your profile</h4>
            <router-link to="/edituserprofile">Edit</router-link>

        </div>
    <div id="profile-info" >
        <div :key="name" v-for="(value, name) in object">
            {{ name }}: {{ value }}
            </div>
        </div>

    </div>
    
</template>

<script>

// change this to dynamic like forename='' and do ->
// -> this.forename= value from a get request of logged in user
export default {
    data() {
        return {
            object: {
            forename: "Emanuel",
            surname: "Dellsén",
            telephone_nr: "123123123",
            email: "admin@admin.se"
        }
    } 
    }
}
</script>