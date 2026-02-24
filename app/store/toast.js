import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
  const toasts = ref([]);
  let toastId = 0;

  const addToast = (toast) => {
    const id = ++toastId;
    const newToast = {
      id,
      type: toast.type || "info",
      title: toast.title || "",
      description: toast.description || "",
      duration: toast.duration || 5000,
      logo: toast.logo || null,
      ...toast,
    };
    
    toasts.value.push(newToast);
    
    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
    
    return id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const clearAllToasts = () => {
    toasts.value = [];
  };

  // Convenience methods for different toast types
  const success = (title, description, options = {}) => {
    return addToast({
      type: "success",
      title,
      description,
      ...options,
    });
  };

  const error = (title, description, options = {}) => {
    return addToast({
      type: "error",
      title,
      description,
      ...options,
    });
  };

  const info = (title, description, options = {}) => {
    return addToast({
      type: "info",
      title,
      description,
      ...options,
    });
  };

  const warning = (title, description, options = {}) => {
    return addToast({
      type: "warning",
      title,
      description,
      ...options,
    });
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    info,
    warning,
  };
});