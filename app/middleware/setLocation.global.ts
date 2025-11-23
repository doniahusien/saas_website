

export default defineNuxtRouteMiddleware(async (to, from) => {



    const userData: any = useCookie('userData')

    const userLocation: any = useCookie('userLocation')


    if (!userData.value) {

        if (process.client) {

            let coords = {
                lat: 0,
                lng: 0
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((place) => {
                    coords.lat = place.coords.latitude
                    coords.lng = place.coords.longitude
                    userLocation.value = coords
                });

            }

        }

    }


})
