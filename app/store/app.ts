import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { useToast } from "vue-toastification";

export const useAppStore = defineStore("app", {
  state: () => ({
    settings: null,
    notifications: [] as any[],
    notificationsLoading: false,
    favourites: [] as any[],
    favLoading: false,
    cartLoading: false,
  }),

  actions: {
    /*    async getFavourites() {
         this.favLoading = true;
         const { $axios } = useNuxtApp();
   
         try {
           const res = await $axios.get("favourites");
           this.favourites = res.data.data;
         } catch (error) {
           console.error("Error fetching favourites:", error);
         } finally {
           this.favLoading = false;
         }
       }, */

    async addToFavourites(product_id:any) {
      const toast = useToast();
      const { $api } = useNuxtApp();
      this.favLoading = true;

      try {
        const res = await $api.post("favourite", {
          product_id: product_id,
        });

        toast.success(res.message);

      } catch (error) {
        toast.error(error.message);

      } finally {
        this.favLoading = false;
      }
    },

     async deleteFav(favourite_id:any) {
      const toast = useToast();
      const { $api } = useNuxtApp();
      this.favLoading = true;

      try {
        const res = await $api.delete("favourite/" + favourite_id);
        toast.success(res.data.message);

      } catch (error) {
        console.error("Error adding to favourites:", error);
        toast.success(error.message);

      } finally {
        this.favLoading = false;
      }
    },
     async addToCart(payload: any) {
      const toast = useToast();
      const { $api } = useNuxtApp();
      this.cartLoading = true;

      try {
        const res = await $api.post("carts", payload);
      } catch (error: any) {
        console.error("Error adding to cart:", error);
        toast.error(error?.response?.data?.message || "Failed to add to cart");
      } finally {
        this.cartLoading = false;
      }
    },

  },
});
