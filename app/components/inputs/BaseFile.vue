<template>
  <div class="input_wrapper">
    <label v-if="label" class="block mb-2 font-medium text-gray-700">{{ label }}</label>

    <div
      :class="[
        'upload relative rounded-full border border-gray-300 transition',
        dragOver ? 'border-dashed bg-gray-50' : '',
        uploadPercentage > 0 && !uploadFinshed ? 'opacity-70' : ''
      ]"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"    >
      <input
        ref="refFile"
        type="file"
        :id="id"
        class="hidden"
        :accept="accept"
        :multiple="multiple"
        @change="onFileChange"
      />

      <label
        :for="id"
        class="flex cursor-pointer size-60 flex-col items-center justify-center gap-3  text-center text-xl"
      >
        <img
          v-if="preview && !no_preview"
          :src="preview"
          class="mx-auto w-full rounded-full object-cover"
          alt="preview"
        />
        <template v-else>
          <img
            class="mx-auto mb-3 size-7 rounded-full object-contain"
            alt="Upload"
            :src="iconSrc"
          />
          <span class="text-gray-500 text-base">{{ $t("LABELS.dropFilesHereOrClickToUpload") }}</span>
        </template>
      </label>

      <!-- <div class="flex gap-2 mt-4 items-center pb-7">
        <img src="/logo.png" alt="file upload" class="size-6" />
        <div class="flex flex-1 flex-col">
          <h5 class="flex items-center justify-between">
            <span class="text-gray-900">{{ $t("LABELS.uploadingFile") }}</span>
            <div class="flex items-center gap-2 font-bold text-primary">
              <span v-if="uploadFinshed" class="text-green-600">✓</span>
              <span v-else-if="uploadPercentage">{{ uploadPercentage + "%" }}</span>
              <button
                v-if="(uploadPercentage && !uploadFinshed) || uploadFinshed"
                type="button"
                @click="cancelReq"
                class="size-6 rounded-full border border-primary text-primary transition hover:bg-primary hover:text-white"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </h5>

          <div class="mt-2 h-1 w-full rounded-lg bg-gray-200">
            <div
              class="h-2 rounded-lg bg-primary transition-all"
              :style="`width:${uploadPercentage}%;`"
            ></div>
          </div>
        </div>
      </div> -->
    </div>
 <!--    <div
      v-if="preview && !no_preview && !notPreview"
      class="flex flex-wrap items-center gap-3 mt-3"   >
      <div class="relative">
        <button
          class="absolute -left-1 -top-1 z-10 size-6 rounded-full border bg-primary text-white text-xs flex items-center justify-center"
          type="button"
          @click="cancelReq"
        >
          <Icon name="mdi-heart"/>
        </button>
        <img
          width="80"
          height="60"
          class="h-15 w-20 rounded-lg border border-gray-300 object-cover"
          :src="preview"
          alt="preview"
        />
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { useToastStore } from "~/store/toast.js";
const toast = useToastStore();

const props = defineProps({
  accept: { type: String, default: "image/*" },
  no_preview: { type: Boolean, default: false },
  itemValue: { required: false },
  image: { required: false },
  id: { type: String, required: true },
  name: { type: String, required: true },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  modalName: { type: String, default: "" },
  modalType: { type: String, default: "" },
  notPreview: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  returnFile: { type: Boolean, default: false }, 
   baseUrl: { type: String, default: "" },
  attachment: { type: String, default: "/store_attachment" }, 
  iconSrc: { type: String, default: "" },
});

const emit = defineEmits(["update:itemValue", "update:image", "uploading"]);

const preview = ref(props.itemValue || "");
const uploadPercentage = ref(0);
const uploadFinshed = ref(false);
const refFile = ref(null);
const dragOver = ref(false);
let requestToken = null;

const nuxt = useNuxtApp();
const $api = nuxt.$api || nuxt.$axios || null;

watch(
  () => props.itemValue,
  (v) => {
    if (v) preview.value = v;
  },
  { deep: true }
);

onMounted(() => {
  if (props.itemValue) preview.value = props.itemValue;
});

function onDragOver(e) {
  dragOver.value = true;
}
function onDragLeave(e) {
  dragOver.value = false;
}
function onDrop(e) {
  dragOver.value = false;
  const dt = e.dataTransfer;
  if (!dt) return;
  const files = dt.files;
  if (files && files.length) {
    handleFile(files[0]);
  }
}
function onFileChange(e) {
  const files = e.target.files;
  if (!files || !files.length) return;
  handleFile(files[0]);
}

function handleFile(file) {
  if (!file) return;
  uploadPercentage.value = 0;
  emit("uploading", true);

  // show preview immediately
  preview.value = URL.createObjectURL(file);
  emit("update:itemValue", preview.value);

  if (props.returnFile) {
    // don't upload to server, just return the File object
    emit("update:image", file);
    uploadPercentage.value = 100;
    uploadFinshed.value = true;
    emit("uploading", false);
    return;
  }

  // else upload to server (if $api available)
  if (!$api) {
    // fallback: just return file object (caller can handle)
    emit("update:image", file);
    uploadPercentage.value = 100;
    uploadFinshed.value = true;
    emit("uploading", false);
    return;
  }

  // prepare form
  const form = new FormData();
  form.append("file", file);
  form.append("attachment_type", props.modalType || "image");
  form.append("model", props.modalName || "");


  // we assume $api is axios-like (as in your project)
  try {
    // create cancel token if axios supports it
    const CancelToken = $api.CancelToken || (nuxt.$axios && nuxt.$axios.CancelToken) || null;
    if (CancelToken) {
      requestToken = CancelToken.source();
    }

    $api
      .post(props.attachment || "/store_attachment", form, {
        onUploadProgress: (evt) => {
          if (!evt.total) return;
          uploadPercentage.value = Math.round((evt.loaded / evt.total) * 100);
        },
        cancelToken: requestToken ? requestToken.token : undefined,
      })
      .then((res) => {
        const serverData = res?.data?.data ?? res?.data ?? res;
        emit("update:image", serverData);
        uploadFinshed.value = true;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Upload failed");
        preview.value = "";
        emit("update:itemValue", "");
        emit("update:image", "");
      })
      .finally(() => {
        emit("uploading", false);
      });
  } catch (err) {
    // generic fallback: emit file
    emit("update:image", file);
    uploadPercentage.value = 100;
    uploadFinshed.value = true;
    emit("uploading", false);
  }
}

function cancelReq() {
  if (requestToken && requestToken.cancel) requestToken.cancel("user_cancel");
  uploadPercentage.value = 0;
  preview.value = "";
  emit("update:itemValue", "");
  emit("update:image", "");
  if (refFile.value) refFile.value.value = null;
  uploadFinshed.value = false;
  requestToken = null;
}
</script>
