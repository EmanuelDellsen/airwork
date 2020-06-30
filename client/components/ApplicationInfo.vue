<template>
    <div class="application-info" v-show="value">
        <h2>Type of work: </h2>
        <h2>Money you will receive: </h2>
        <h2>Date of work: </h2>
        <h2>Time of work: </h2>
        <h2>Description of the job: </h2>
    </div>
</template>

<script>
    export default {
        name: 'application-info',
        props: {
            value: {
                required: true
            }
        },
        methods: {
            close() {
                this.$emit("input", !this.value);
                console.log("reached close in appInfo")
            }
        }
    };
</script>