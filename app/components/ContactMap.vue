<template>
  <div
    v-if="locations"
    class="w-full h-80 rounded-md lg:h-170"
  >
    <client-only>
      <template v-if="locations[0]">
        <GMapMap
          :center="locations[0]"
          :zoom="14"
          map-type-id="terrain"
          :options="mapOptions"
          style="width: 100%; height: 100%"
        >
          <GMapMarker
            v-for="(location, index) in locations"
            :key="index"
            :position="location"
            :clickable="false"
            :draggable="false"
            class="h-full"
          />
        </GMapMap>
      </template>

      <div v-else class="flex items-center justify-center h-full bg-gray-50 rounded-md text-sm text-gray-600">
        <div class="text-center">
          <p>No location available</p>
          <button
            @click="getCurrentLocation"
            :disabled="loadingLocation"
            class="mt-2 inline-flex items-center px-3 py-1.5 bg-primary text-white rounded-md text-sm disabled:opacity-60"
          >
            <span v-if="!loadingLocation">Use my location</span>
            <span v-else>Locating...</span>
          </button>
        </div>
      </div>
    </client-only>
  </div>
</template>


<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  locations: {
    type: Array as PropType<Array<{ lat: number; lng: number }>>,
    required: true,
  },
});

const center = reactive({
  lat: 21.485811,
  lng: 39.192522,
});

const loadingLocation = ref(false)

const emit = defineEmits(["setLocation"]);

function getCurrentLocation() {
  if (!navigator.geolocation) return
  loadingLocation.value = true
  navigator.geolocation.getCurrentPosition(
    (place) => {
      center.lat = +place.coords.latitude.toFixed(7)
      center.lng = +place.coords.longitude.toFixed(7)
      emit('setLocation', center)
      loadingLocation.value = false
    },
    (err) => {
      console.warn('geolocation error', err)
      loadingLocation.value = false
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
}

const styles = [
  { elementType: "geometry", stylers: [{ color: "#f6f6f4" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#7c7c7c " }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7c7c7c" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7c7c7c" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#7c7c7c" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },

  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#E8EDEB" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#E8EDEB " }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#ffffff " }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff " }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#ffffff " }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#f6f6f4 " }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

const mapOptions = reactive({
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  styles,
});

onMounted(() => {
  getCurrentLocation();
});
</script>
<style>
.vue-map-container{
  height: 100%;
}
</style>