export default defineNuxtPlugin(async (nuxtApp) => {
    const user_guest_token = useCookie('user_guest_token')
    if (!user_guest_token.value) {
      const stringSpace =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const stringLength = stringSpace.length
      let randomString:string = ""
      for (let i = 0; i < 64; i++) {
        randomString =
          randomString + stringSpace[Math.floor(Math.random() * stringLength)]
      }
      user_guest_token.value = randomString
    }
  })