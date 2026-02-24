import { useToastStore } from "~/store/toast.js";

export function useToast() {
  const toast = useToastStore();

  return {
    success: (title, description = "", options = {}) => toast.success(title, description, options),
    error: (title, description = "", options = {}) => toast.error(title, description, options),
    info: (title, description = "", options = {}) => toast.info(title, description, options),
    warning: (title, description = "", options = {}) => toast.warning(title, description, options),
    add: (payload) => toast.addToast(payload),
    remove: (id) => toast.removeToast(id),
    clear: () => toast.clearAllToasts(),
  };
}
