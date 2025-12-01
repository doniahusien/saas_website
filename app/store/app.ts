import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { useToast } from "vue-toastification";
export const useAppStore = defineStore("app", {
  state: () => ({
    cmsPages:null,
    settings: null,
    notifications: [] as any[],
    notificationsLoading: false,
    favourites: [] as any[],
    favLoading: false,
    cartLoading: false,
    cart: [] as any[],
    price:0,
    currency:'LE',
    cartCount: 0,
    availablePoints: 0,
    availableWallet: 0,
     unreadNotification: 0,
    product_fav: null,
    product_fav_status: null,
  }),
  getters: {
    getCmsData: (state) => state.cmsPages,
    getCartCount: (state) => state.cartCount,
    getCartData: (state) => state.cart,
    getCartPrice: (state) => state.price,
    getCartCurrency: (state) => state.currency,
    getAvailablePoints: (state) => state.availablePoints,
    getAvailableWallet: (state) => state.availableWallet,
  },
  actions: {

    async getNotifications() {
      this.notificationsLoading = true;
      const { $api } = useNuxtApp();
      await $api.get("notifications").then((res) => {
        this.notifications = res.data.data;
        this.notifications.status = res.data.data.status || '';
        this.unreadNotification = 0;
        this.notificationsLoading = false;
      });
    },

    async getFavourites() {
      this.favLoading = true;
      const {$api} = useNuxtApp();
      await $api.get("favourite").then((res) => {
        this.favourites = res.data.data;
        this.favLoading = false;
      });
    },

    async getCmsPages() {
      const { $api } = useNuxtApp();
      await $api
        .get("/cms-pages")
        .then((res) => (this.cmsPages = res.data.data));
    },
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

      try {
        const res = await $api.get("carts");
        console.log("Cart response:", res.data);
        const products = res.data.data ?? [];
        this.price = res.data.price;
        this.currency = res.data.currency;
        this.cart = products;
        this.availablePoints = res.data.data?.points ?? 0;
        this.availableWallet = res.data.data?.wallet ?? 0;

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
    },
    async updateCounter(cartProductId: number, quantity: number, type: string) {
      const toast = useToast();
      const { $api } = useNuxtApp();
      this.cartLoading = true;

      try {
        const frmData = new FormData();
        frmData.append("cart_product_id", cartProductId);
        frmData.append("quantity", type === "decrease" ? --quantity : ++quantity);
        frmData.append("_method", "put");

        await $api.post("carts/update-count", frmData);
        await this.getCarts();

      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to update quantity");
      } finally {
        this.cartLoading = false;
      }
    }
  },
});
