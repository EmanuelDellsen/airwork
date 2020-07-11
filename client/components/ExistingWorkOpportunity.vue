<template>
    <div>
        HELLO
    </div>
</template>


<script>
    export default {
        name: "ExistingWorkOpportunity",
        props: {
            marker: {
                markerInfo: {
                    type: String,
                },
                location: {
                    type: Object,
                },
                newMarker: {
                    type: Boolean
                }
            },
        },
    }

</script>