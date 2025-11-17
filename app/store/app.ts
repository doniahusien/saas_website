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
    cart: [] as any[],
    cartCount: 0
  }),
  getters: {
    getCartCount: (state) => state.cartCount,
    getCartData: (state) => state.cart,
  }
  ,
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

    async addToFavourites(product_id: any) {
      const toast = useToast();
      const { $api } = useNuxtApp();
      this.favLoading = true;

      try {
        const res = await $api.post("favourite", { product_id });
        toast.success(res.data.message);

        return res.data;
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
        return null;
      } finally {
        this.favLoading = false;
      }
    },

    async deleteFav(favourite_id: any) {
      const toast = useToast();
      const { $api } = useNuxtApp();
      this.favLoading = true;

      try {
        const res = await $api.delete(`favourite/${favourite_id}`);
        toast.success(res.data.message);
        return res.data;
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
        return null;
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
    async getCarts() {
      this.cartLoading = true;
      const { $api } = useNuxtApp();
      const branchCookie = useCookie<Branch | null>("selectedBranch");
      const storeId = branchCookie.value?.id || null;

      try {
        const res = await $api.get("carts", {
          params: { store_id: storeId },
        });

        const products = res.data ?? [];
        this.cart = products;

        /*   this.cartCount = products.reduce(
            (sum: number, product: any) => sum + product.quantity,
            0
          ); */

      } catch (error) {
        console.error("Error fetching carts:", error);
      } finally {
        this.cartLoading = false;
      }
    },
    async removeFromCart(cartItemId: number) {
      const toast = useToast();
      const { $api } = useNuxtApp();
      this.cartLoading = true;

      try {
        const res = await $api.delete(`carts/delete-item/${cartItemId}`);
        toast.success(res.data.message);
        await this.getCarts();
      } catch (error: any) {
        toast.error(error?.message || "Failed to remove item");
      } finally {
        this.cartLoading = false;
      }
    }

  },
});
