<template>
  <div class="p-6 space-y-8">
    <div v-for="group in subModifiers" :key="group.id">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">
        {{ group.name }}
        <span class="text-sm text-amber-500 font-medium ml-2">
          ({{ group.min_num_of_selection }} - {{ group.max_num_of_selection }})
        </span>
      </h2>
 
      <div v-if="group.selections_type === 'exact'" class="flex flex-wrap gap-4">
        <button
          v-for="item in group.item_modifiers"
          :key="item.id"
          @click="toggleExact(group, item.id)"
          class='px-5 py-3 cursor-pointer rounded-xl text-sm font-medium border transition w-fit'
           
            :class="[ isSelected(group.id, item.id)
              ? 'border-blue-500 text-blue-600 bg-blue-50'
              : 'border-gray-200 text-gray-700 hover:border-blue-400',
          ]"
        >
          {{ item.name }}
          (+{{ item.price.price }} {{ item.price.currency }})
        </button>
      </div>

      <div
        v-else-if="group.selections_type === 'min_max'"
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div
          v-for="item in group.item_modifiers"
          :key="item.id"
          class="flex items-center  justify-between border border-gray-200 rounded-xl p-4"
        >
          <div>
            <p class="font-medium text-gray-800">
              {{ item.name }} (+{{ item.price.price }} {{ item.price.currency }})
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button
              class="cursor-pointer w-6 h-6 rounded-sm bg-gray-100 text-gray-600 text-sm"
              @click="decreaseCount(group.id, item.id)"
            >
              −
            </button>
            <span class="text-gray-700 text-sm font-medium">
              {{ getCount(group.id, item.id) }}
            </span>
            <button
              class="cursor-pointer w-6 h-6 rounded-sm bg-btn text-white text-sm"
              @click="increaseCount(group, item.id)"
            >
              +
            </button>
          </div>
        </div>
      </div>
<!-- 
      <p v-if="!isGroupValid(group)" class="text-red-500 text-sm mt-2">
        {{
          $t("productOptions.selectionWarning", {
            min: group.min_num_of_selection,
            max: group.max_num_of_selection,
          })
        }}
      </p> -->
    </div>

    <div class="flex justify-end items-center gap-4 pt-4 border-t border-gray-100">
      <div class="flex items-center gap-2">
        <button
          class="cursor-pointer w-7 h-7 rounded-sm bg-gray-100 text-gray-600 text-sm"
          @click="quantity = Math.max(1, quantity - 1)"
        >
          −
        </button>
        <span class="text-gray-700 text-sm font-medium">{{ quantity }}</span>
        <button
          class="cursor-pointer w-7 h-7 rounded-sm bg-btn text-white text-sm"
          @click="quantity++"
        >
          +
        </button>
      </div>

      <button
        class="flex items-center justify-center gap-2 cursor-pointer bg-btn text-white font-semibold rounded-xl px-8 py-3 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!allValid || addingToCart"
        @click="handleAddToCart"
      >
        <Icon name="mdi:cart-outline" class="text-lg" />
        {{ $t("productOptions.addToCart") }}
        <span class="text-sm font-medium opacity-80">
          {{ $t("productOptions.totalPrice", { price: totalPrice }) }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCookie } from "#app";
import { useAppStore } from "~/store/app";
import { useToast } from "vue-toastification";

const props = defineProps({
  subModifiers: {
    type: Array,
    required: true,
  },
  productId:{
    type:Number
  }
});
const {t} = useI18n();
const appStore = useAppStore();
const toast = useToast();
const addingToCart = ref<boolean>(false);
const quantity = ref<number>(1);
const selectedItems = ref<Record<number, any>>({});

const toggleExact = (group: any, itemId: number) => {
  const groupId = group.id;
  const max = group.max_num_of_selection || 1;
  const items = selectedItems.value[groupId] || [];

  if (items.some((i: any) => i.id === itemId)) {
    selectedItems.value[groupId] = items.filter((i: any) => i.id !== itemId);
  } else if (items.length < max) {
    selectedItems.value[groupId] = [...items, { id: itemId, count: 1 }];
  }
};

const isSelected = (groupId: number, itemId: number) => {
  return selectedItems.value[groupId]?.some((i: any) => i.id === itemId);
};

const increaseCount = (group: any, itemId: number) => {
  const groupId = group.id;
  const max = group.max_num_of_selection || Infinity;
  const items = selectedItems.value[groupId] || [];
  const totalCount = items.reduce((sum: number, i: any) => sum + i.count, 0);

  if (totalCount < max) {
    const existing = items.find((i: any) => i.id === itemId);
    if (existing) existing.count++;
    else items.push({ id: itemId, count: 1 });
    selectedItems.value[groupId] = [...items];
  }
};

const decreaseCount = (groupId: number, itemId: number) => {
  const items = selectedItems.value[groupId] || [];
  const existing = items.find((i: any) => i.id === itemId);
  if (existing) {
    existing.count--;
    if (existing.count <= 0)
      selectedItems.value[groupId] = items.filter((i: any) => i.id !== itemId);
  }
};

const getCount = (groupId: number, itemId: number) => {
  const group = selectedItems.value[groupId];
  const item = group?.find((i: any) => i.id === itemId);
  return item ? item.count : 0;
};

const isGroupValid = (group: any) => {
  const selected = selectedItems.value[group.id] || [];
  const total = selected.reduce((sum: number, i: any) => sum + (i.count || 1), 0);
  return total >= group.min_num_of_selection && total <= group.max_num_of_selection;
};

const allValid = computed(() => {
  return props.subModifiers.every((g: any) => isGroupValid(g));
});

const totalPrice = computed(() => {
  let total = 0;
  for (const group of props.subModifiers) {
    const selected = selectedItems.value[group.id] || [];
    for (const sel of selected) {
      const item = group.item_modifiers.find((m: any) => m.id === sel.id);
      if (item) total += item.price.price * sel.count;
    }
  }
  return total * quantity.value;
});

const handleAddToCart = async () => {
  if (!allValid.value) {
    toast.error("Please select required options before adding to cart.");
    return;
  }

  addingToCart.value = true;

  const branchCookie = useCookie<Branch| null>("selectedBranch");
  const storeId = branchCookie.value?.id;

  const userLocation = useCookie("userLocation").value;

  const sub_modifiers_payload: any[] = [];
  for (const group of props.subModifiers) {
    const selected = selectedItems.value[group.id] || [];
    for (const sel of selected) {
      sub_modifiers_payload.push({
        sub_modifier_id: group.id,
        item_modifier_id: sel.id,
        quantity: sel.count || 1,
      });
    }
  }

  const payload: any = {
    store_id: storeId,
    product_id:props.productId,
    quantity: quantity.value,
    sub_modifiers: sub_modifiers_payload,
    lat: userLocation?.lat,
    lng: userLocation?.lng,
  };

  try {
    await appStore.addToCart(payload);
    toast.success(`${$t("added_to_cart")}`);
  } catch (err: any) {
    console.error(err);
    toast.error(err?.message || "Failed to add to cart");
  } finally {
    addingToCart.value = false;
  }
};
</script>
