export {};

import type { AxiosInstance } from "axios";

declare global {
  interface Country {
    id: number;
    name: string;
    phone_code: string;
    phone_limit: number;
    flag: string;
  }
  interface OrderStatus {
    key: string;
    value: string;
    status: "waiting" | "in_progress" | "completed";
    icon: string;
  }
  
  interface OrderData {
    id: number;
    order_num: string;
    status: string;
    status_trans: string;
    order_type: string;
    is_schedule: boolean;
    address: any;
    is_payment: boolean;
    pay_type: Array<{ wallet?: number; type?: string }>;
    order_time: string;
    order_date: string;
    can_cancel: boolean;
    store: any;
    driver: any;
    item: Array<any>;
    item_count: number;
    cancel_reason: any;
    desc_cancel_reason: any;
    price_detail: {
      total_price: number;
      discount_value: number;
      total_item_price_before_discount: number;
      delivery_price: number;
      surcharge_value: number;
      tax_rate_percentage: number;
      tax_rate_value: number;
      price_paied_from_wallet: number;
      points: number;
      currency: string;
    };
    call_center: string;
    call_center_message: string;
    order_status: OrderStatus[];
  }
  interface User {
    id: number;
    full_name: string;
    avatar: string;
    email: string;
    phone_code: string;
    phone: string;
    user_type: "customer" | "admin" | string;
    notifiable: boolean;
    token: string;
    points: number;
    wallet: number;
    country: Country;
    default_address: unknown | null;
    tenant: string;
  }

  interface AuthStore {
    token: string | null;
    userData: User | null;
  }

  interface Branch {
    id: number;
    name: string;
    image: string;
    phone: string;
    phone_code: string;
    location_description: string;
    lat: string;
    lng: string;
  }

interface HomeData {
    address: string | null;
    sliders: Slider[];
    web_content: WebContent;
    popular_products: Product[];
    web_content_link: WebContentLink;
    products: Product[];
    subscription_content: SubscriptionContent;
    offers: Product[];
  }

  interface Slider {
    id: number;
    title: string;
    desc: string; 
    link: string | null;
    image: string;
  }

  interface WebContent {
    id: number;
    title: string;
    desc: string; 
    image: string;
  }

  interface WebContentLink {
    id: number;
    title: string;
    desc: string; 
    google_play: string;
    app_store: string;
    image: string;
  }

  interface SubscriptionContent {
    id: number;
    title: string; 
    desc: string;  
    image: string;
  }

  interface Product {
    id: number;
    name: string;
    slug: string;
    desc: string;
    type: string;
    image: string;
    food_icon: any[];
    rating: number;
    review_count: number;
    rate: number;
    is_favourite: boolean;
    favourite_id: number;
    price: Price;
  }

  interface Price {
    price: number;
    currency: string;
    percentage: number;
    discount_value: number;
    price_after: number;
    offer: Offer | null;
  }

  interface Offer {
    id: number;
    from_day: string;
    to_day: string;
    from_time: string;
    to_time: string;
  }

  interface ContactData {
  data: ContactItem[];
  status: string;
  message: string;
}

type ContactItem =
  | {
      key: "store_address";
      value: {
        lat: string;
        lng: string;
        location: string;
      };
    }
  | {
      key: "store_location";
      value: string;
    }
  | {
      key: "email";
      value: string[];
    }
  | {
      key: "phone_number";
      value: PhoneNumber[];
    }
  | {
      key: string; 
      value: any;
    };

interface PhoneNumber {
  phone: string;
  phone_code: string;
  flag: string;
}

  interface ApiResponse<T> {
    data: T;
    status: string;
    message: string;
  }
 interface ReviewUser {
  id: number;
  full_name: string;
  avatar: string;
}

interface ReviewData {
  id: number;
  rate: number;
  review: string;
  note: string;
  created_at: string;
  user: ReviewUser;
}

interface StarRate {
  key: string;
  value: number;
}

interface ReviewsResponse {
  data: ReviewData[];
  status: string;
  message: string;
  review_count: number;
  rate: number;
  star_rate: StarRate[];
  }
  interface Category {
  id: number;
  name: string;
  desc: string | null;
  image: string;
  icon: string;
}

interface CategoriesResponse {
  data: Category[];
  status: string;
  message: string;
  }
  interface SubCategoriesResponse {
  data: Category;
  status: string;
  message: string;
  }
  interface FoodIcon {
    id: number;
    name: string;
    image: string;
  }
  interface OfferResponse {
    data: Product[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: {
        url: string | null;
        label: string;
        active: boolean;
      }[];
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
    status: string;
    message: string;
  
}

}

declare module "#app" {
  interface NuxtApp {
    $api: AxiosInstance;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}
