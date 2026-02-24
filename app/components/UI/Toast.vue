<template>
  <div class="fixed top-4 right-4 z-1001 space-y-2">
    <TransitionGroup name="toast" tag="div" class="space-y-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-container"
        :class="'toast-' + toast.type"
      >
        <div class="toast-content">
          <!-- Logo/Icon -->
          <div class="toast-icon">
            <img
              v-if="toast.logo"
              :src="toast.logo"
              :alt="toast.title"
              class="w-6 h-6"
            />
            <component
              v-else
              :is="getIconComponent(toast.type)"
              class="w-6 h-6"
            />
          </div>

          <!-- Content -->
          <div class="toast-body">
            <h4 class="toast-title">{{ toast.title }}</h4>
            <p class="toast-description">{{ toast.description }}</p>
          </div>

          <!-- Close button -->
          <button
            @click="removeToast(toast.id)"
            class="toast-close"
            aria-label="Close notification"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Progress bar -->
        <div class="toast-progress-container">
          <div
            class="toast-progress-bar"
            :class="'toast-progress-' + toast.type"
            :style="{
              animationDuration: toast.duration + 'ms',
            }"
          ></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useToastStore } from "~/store/toast.js";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-vue-next";

const toastStore = useToastStore();
const toasts = computed(() => toastStore.toasts);

const removeToast = (id) => {
  toastStore.removeToast(id);
};

const getIconComponent = (type) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  };
  return icons[type] || Info;
};

// No cleanup needed since we removed timer management
</script>

<style scoped>
/* Animations */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes progressBar {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* Toast transition animations */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>