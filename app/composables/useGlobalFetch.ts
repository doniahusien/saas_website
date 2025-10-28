export const useGlobalFetch = async <T = any>(
  url: string,
  method: string = "GET",
  body?: any
): Promise<T> => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();

  try {
    return await $fetch<T>(url, {
      method,
      ...(body && { body: body }),
      baseURL: config.public.baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": locale.value
      },
    });
  }
  catch (error: any) {
    console.error(error);
    throw error
  }

};
