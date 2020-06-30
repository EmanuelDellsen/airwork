<template>
    
    <div>
        <button v-text="close"></button>
        <ApplicationInfo/>
        <button class="apply-button" v-text="Apply"></button>

    </div>
</template>

<script>

import ApplicationInfo from './ApplicationInfo.vue'

export default {
    components: {
        ApplicationInfo
    }
}
</script>