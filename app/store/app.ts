import { defineStore } from 'pinia'
import { useNuxtApp } from '#app';
export const useAppStore = defineStore("app", {
    state: () => ({
        settings: null,
        notifications: [] as any[],
        notificationsLoading: false,
        favourites: [],
        favLoading:false
    }),

     actions: {
        async getFavourites() {
            this.favLoading = true;
            const axios = useNuxtApp().$axios;
            await axios.get("favourites").then((res) => {
                this.favourites = res.data.data;
                this.favCount = res.data.data.length;
                this.favLoading = false;
            });
        },
    }
})