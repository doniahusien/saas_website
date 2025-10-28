export function useDynamicMeta(metaData: {
  title?: string
  description?: string
  image?: string
}) {
  const title = metaData.title
  const description = metaData.description
  const image = metaData.image

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
  })
}
