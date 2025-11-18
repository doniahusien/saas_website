import { ref, watch, type Ref } from 'vue';

export function useCartMapper(carts: Ref<any>) {
  const localProducts = ref<any[]>([]);
  const price = ref<Record<string, any>>({});
  const currency = ref<string>('LE');

  watch(
    carts,
    (newVal) => {
      if (!newVal || !newVal?.data?.products || !newVal.price) {
        localProducts.value = [];
        price.value = {};
        return;
      }

      localProducts.value = newVal.data.products.map((item: any) => ({
        ...item.product,
        id: item.id,
        quantity: item.quantity,
        total_price: item.total_price,
        note: item.note,
        combo: item.combo,
        sub_modifiers: item.sub_modifiers,
      }));

      price.value = newVal.price;
      currency.value = newVal.currency;
    },
    { deep: true, immediate: true }
  );

  return { localProducts, price, currency };
}
