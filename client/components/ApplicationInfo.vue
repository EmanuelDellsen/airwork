<template>
    <div class="application-info">
        <h2>Type of work: </h2>
        <h2>Money you will receive: </h2>
        <h2>Date of work: </h2>
        <h2>Time of work: </h2>
        <h2>Description of the job: </h2>
        <button @click="toast"> hello</button>
    </div>
</template>

<script>
    export default {
        name: 'application-info',

        methods: {
            toast() {
                console.log("reached close in appInfo")
            }
        },

    };
</script>