<template>
  <div class="my-8">
    <VeeField type="text w-full" :name="name" v-slot="{ field, meta }">
      <div class="input_wrapper w-full" :class="{ error: !meta.valid && meta.touched }">
        <label
          :for="id"
          v-if="label"
          class="label flex! items-center gap-2 capitalize"
        >
          {{ label }}
        </label>

        <client-only>
          <GMapAutocomplete
            :placeholder="placeholder"
            v-bind="field"
            @change="resetValue"
            @place_changed="setPlace"
          />
        </client-only>

        <VeeErrorMessage :name="name" as="div" class="text-error" />
      </div>

      <client-only>
        <GMapMap
          v-if="center"
          :center="center"
          :zoom="5"
          map-type-id="terrain"
          :options="mapOptions"
          style="width: 100%"
          :style="`height: ${height};`"
        >
          <GMapMarker
            :position="center"
            :clickable="true"
            :draggable="true"
            @dragend="openMarker"
          />
        </GMapMap>
      </client-only>

      <VeeErrorMessage
        v-if="!meta.valid && meta.touched"
        name="lat"
        as="div"
        class="text-error"
      />
      <VeeErrorMessage
        v-if="!meta.valid && meta.touched"
        name="lng"
        as="div"
        class="text-error"
      />
    </VeeField>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
const props = defineProps({
  location: {
    required: false,
    type: Object,
  },
  height: {
    required: false,
    default: "200px",
  },
  id: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  label: {
    required: false,
    type: String,
  },
  placeholder: {
    required: true,
    type: String,
  },
});

const mapOptions = {
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
};

const fieldValue = useField(props.name);
const latField = useField("lat");
const lngField = useField("lng");

const center = reactive({
  lat: 21.485811,
  lng: 39.192522,
});

const emit = defineEmits(["setLocation"]);

const updateCenterFromLocation = (location) => {
  if (!location?.lat || !location?.lng) return;
  center.lat = +Number(location.lat).toFixed(7);
  center.lng = +Number(location.lng).toFixed(7);
  latField.setValue(center.lat);
  lngField.setValue(center.lng);
};

watch(
  () => props.location,
  (value) => {
    if (value?.lat && value?.lng) {
      updateCenterFromLocation(value);
      fieldValue.setValue(value?.address ?? fieldValue.value);
    }
  },
  { immediate: true, deep: true }
);

function getGeocode(lat, lng) {
  if (typeof window === "undefined" || typeof google === "undefined") return;
  const geocoder = new google.maps.Geocoder();
  const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === "OK" && results?.[0]) {
      fieldValue.setValue(results[0].formatted_address);
    }
  });
}

function openMarker(place) {
  center.lat = +place.latLng.lat().toFixed(7);
  center.lng = +place.latLng.lng().toFixed(7);
  latField.setValue(center.lat);
  lngField.setValue(center.lng);
  getGeocode(center.lat, center.lng);
  emit("setLocation", { ...center });
}

function setPlace(place) {
  if (place.geometry) {
    center.lat = +place.geometry.location.lat();
    center.lng = +place.geometry.location.lng();
    latField.setValue(center.lat);
    lngField.setValue(center.lng);
  }
  fieldValue.setValue(place.formatted_address);
  emit("setLocation", { ...center });
}

function resetValue(e) {
  if (!e?.target?.value) fieldValue.setValue(null);
}

function getCurrentLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    (place) => {
      center.lat = +place.coords.latitude.toFixed(7);
      center.lng = +place.coords.longitude.toFixed(7);
      latField.setValue(center.lat);
      lngField.setValue(center.lng);
      emit("setLocation", { ...center });
    },
    () => {},
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

onMounted(() => {
  if (props.location?.lat && props.location?.lng) {
    updateCenterFromLocation(props.location);
  } else {
    getCurrentLocation();
  }
});
</script>

