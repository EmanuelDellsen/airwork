<template>
    <div>
        <div>
            <h2>Search and add a pin</h2>
            <label>
                <gmap-autocomplete @place_changed="setPlace">
                </gmap-autocomplete>
                <button @click="addMarker">Add</button>
            </label>
            <br />

        </div>
        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" @click="center=m.position" />

    </div>



</template>

<script>
    export default {
        name: "GoogleMap",
        data() {
            return {
                center: { lat: 45.508, lng: -73.587 },
                markers: [],
                places: [],
                currentPlace: null
            };
        },
        methods: {
            // receives a place object via the autocomplete component
            setPlace(place) {
                console.log(place)
                this.currentPlace = place;
                console.log(this.currentPlace)
                console.log("line 30")

            },
            addMarker() {
                console.log(this.currentPlace)
                console.log("line 35")


                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng()
                    };
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                    console.log(this.markers)
                    console.log("line 57")
                }


            }
        }
    };
</script>