import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { useToast } from "vue-toastification";
export const useAppStore = defineStore("app", {
  state: () => ({
    cmsPages:null,
     settingsData: {
      website_setting: [
        {
          key: "website_logo",
          value: "logo.svg",
        },
        {
          key: "website_default_language",
          value: "en",
        },
        {
          key: "website_fav_icon",
          value: "/favicon.svg",
        },
        {
          key: "website_title",
          value: "MEA TELECOM",
        },
        {
          key: "website_host_name",
          value: "https://saas-website.ui.aait-d.com/",
        },
        {
          key: "website_background_image",
          value:
            "https://saas.khlod.aait-d.com/storage/tenants/app_brand/images/website_settings/website_background_image/hJvlF7Id0RjjAAuWsOunBpDIIrBZT9vZwYVBMEMf.png",
        },
      ],
      website_colors: [
        {
          key: "website_primary_color",
          value: "#5a6ae8",
        },
        {
          key: "website_secondary_color",
          value: "#5CBBF6",
        },
        {
          key: "website_tertiary_color",
          value: "#FAFAFC",
        },
        {
          key: "website_light_border_color",
          value: "#EFF0F1",
        },
        {
          key: "website_font_color",
          value: "#171717",
        },
        {
          key: "website_light_font_color",
          value: "#828ABA",
        },
        {
          key: "website_success_color",
          value: "#06D6A0",
        },
        {
          key: "website_warning_color",
          value: "#FF445B",
        },
        {
          key: "website_dark_border_color",
          value: "#797979",
        },
        {
          key: "website_white_color",
          value: "#F6F6F6",
        },
        {
          key: "website_footer_color",
          value: "#E4E4E7",
        },
      ],
      website_customization: [
        {
          key: "top_bar_availability",
          value: true,
        },
        {
          key: "top_bar_logo_position",
          value: "left",
        },
        {
          key: "slider_availability",
          value: true,
        },
        {
          key: "slider_multi_image",
          value: true,
        },
        {
          key: "title_availability",
          value: true,
        },
        {
          key: "footer_main_part_availability",
          value: true,
        },
        {
          key: "offers",
          value: "show",
        },
        {
          key: "driver_tips",
          value: "show",
        },
        {
          key: "schedule_orders",
          value: "show",
        },
      ],
      seo_settings: [
        {
          key: "meta_title_ar",
          value: "Meta Title (AR)",
        },
        {
          key: "meta_ar",
          value: "Meta (AR)",
        },
        {
          key: "keywords_ar",
          value: "Keywords (AR)",
        },
        {
          key: "meta_title",
          value: "Meta Title (EN)",
        },
        {
          key: "meta",
          value: "Meta (EN)",
        },
        {
          key: "keywords",
          value: "Keywords (EN)",
        },
        {
          key: "facebook_pixel",
          value: "Facebook Pixel",
        },
        {
          key: "google_analytics",
          value: "Google Analytics",
        },
      ],
      contact_us: [
        {
          key: "store_address",
          value: {
            lat: "21.485811",
            lng: "39.192522",
            location: "location_to_brand_store",
          },
        },
        {
          key: "store_location",
          value:
            "Cairo - Kattameya - One Kattameya - Memaar El Morshedy - Building 119 - Floor 7 - Office 74",
        },
        {
          key: "email",
          value: ["info@alalmiyalhura.com"],
        },
        {
          key: "phone_number",
          value: [
            {
              phone: "1099556719",
              phone_code: "20",
              flag: "https://saas.khlod.aait-d.com/storage/tenants/app_brand/images/brand_countries/sYsc9EPfu1TvmmcAstmM0UXstKDGgdBexh5He9Pz.png",
            },
          ],
        },
      ],
      payment_methods: [
        {
          key: "cash_on_delivery",
          value: true,
        },
        {
          key: "card",
          value: true,
        },
      ],
      social_media_links: [
        {
          key: "app_store",
          value: "https://www.appstore.com",
        },
        {
          key: "google_play",
          value: "https://www.googleplay.com",
        },
        {
          key: "google_plus",
          value: "https://www.googleplus.com",
        },
        {
          key: "itunes",
          value: "https://www.itunes.com",
        },
        {
          key: "facebook",
          value: "https://www.facebook.com",
        },
        {
          key: "instagram",
          value: "https://www.instagram.com",
        },
        {
          key: "linkedin",
          value: "https://www.linkedin.com",
        },
        {
          key: "whatsapp",
          value: "https://www.whatsapp.com",
        },
        {
          key: "youtube",
          value: "https://www.youtube.com",
        },
        {
          key: "snapchat",
          value: "https://www.snapchat.com",
        },
        {
          key: "x",
          value: "https://www.twitter.com",
        },
      ],
    },
    
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
    branchLoading: false,
    branches: null,
    countries: [] as Country[],
    websiteLoading: false,
    colors: {
      website_primary_color: "#7e3c90",
      website_secondary_color: "#F6F6FD",
      website_tertiary_color: "#8f8f8f",
      website_light_border_color: "#0f87ff",
      website_font_color: "#171717",
      website_light_font_color: "#828ABA",
      website_success_color: "#06D6A0",
      website_warning_color: "#FF445B",
      website_dark_border_color: "#797979",
      website_footer_color: "#E4E4E7",
      website_white_color: "#F6F6F6",
    }
  }),
  getters: {
    getWebSettingsData: (state) => state.settingsData,
    getCmsData: (state) => state.cmsPages,
    getCartCount: (state) => state.cartCount,
    getCartData: (state) => state.cart,
    getCartPrice: (state) => state.price,
    getCartCurrency: (state) => state.currency,
    getAvailablePoints: (state) => state.availablePoints,
    getAvailableWallet: (state) => state.availableWallet,
    getBranchData: (state) => state.branches,

  },
  actions: {
    async getWebSettings() {
      const i18n = useNuxtApp().$i18n;
      this.websiteLoading = true;
      const {$api} = useNuxtApp();
      await $api.get("web_settings").then((res) => {
        const obj = {}
        const result = res.data.data
        for (const [key, value] of Object.entries(res.data.data)) {
          const objItem: any = {}
          value.map((item: any) => objItem[item.key] = item.value)
          obj[key] = objItem
        }

        this.settingsData = obj;

        if (!useCookie("changeLocale").value) {
          useCookie("changeLocale").value = obj.website_setting?.website_default_language ?? 'en';
          i18n.setLocale(useCookie("changeLocale").value!);
        }

        this.getColors(obj.website_colors);
        this.websiteLoading = false;
      });
    },
    async getColors(data: { [key: string]: string }) {
      if (typeof window === 'undefined') return;
      
      if (data) {
        for (const [key, color] of Object.entries(data)) {
          document.documentElement.style.setProperty(
            `--${key}`,
            color
          );

          if (key == "website_success_color") {
            document.body.style.setProperty(
              `--toast-background-color`,
              color
            );
            document.body.style.setProperty(`--v-theme-success`, color);
            document.body.style.setProperty(
              `--v-theme-on-success`,
              color
            );
            document.body.style.setProperty(
              `--toastify-color-success`,
              color
            );
            document.body.style.setProperty(
              `--toastify-color-progress-success`,
              color
            );
            document.body.style.setProperty(
              `--toastify-icon-color-success`,
              color
            );
          }
        }
      }
    },
    async setDefultColor() {
      if (typeof window === 'undefined') return;
      
      this.settingsData.website_colors.map((color: any) => {
        document.documentElement.style.setProperty(
          `--${color.key}`,
          color.value
        );

        if (color.key == "website_success_color") {
          document.body.style.setProperty(`--v-theme-success`, color.value);
          document.body.style.setProperty(`--v-theme-on-success`, color.value);
          document.body.style.setProperty(
            `--toastify-color-success`,
            color.value
          );
          document.body.style.setProperty(
            `--toastify-color-progress-success`,
            color.value
          );
          document.body.style.setProperty(
            `--toastify-icon-color-success`,
            color.value
          );
        }
        if (color.key == "error_color") {
          document.body.style.setProperty(`--v-theme-error`, color.value);
          document.body.style.setProperty(
            `--toastify-color-error`,
            color.value
          );
          document.body.style.setProperty(
            `--toastify-color-progress-error`,
            color.value
          );
          document.body.style.setProperty(
            `--toastify-icon-color-error`,
            color.value
          );
        }
      });
    },
      async getCountries() {
      const {$api} = useNuxtApp();
      try {
        const { data } = await $api.get("/brand_country");
        this.countries = data?.data || [];
      } catch (err) {
        console.error("Failed to load countries", err);
        this.countries = [];
      }
    },
    async getBranches() {
      this.branchLoading = true;
      const {$api} = useNuxtApp();
      await $api.get("branches").then((res) => {
        this.branches = res.data.data;
        this.branchLoading = false;
      });
    },
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
