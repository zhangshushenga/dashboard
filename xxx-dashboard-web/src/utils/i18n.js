// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(key, dafaultTitle) {
  const hasKey = this.$te('route.' + key)

  // console.log(hasKey, key)
  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + key)
    // console.log(translatedTitle)
    return translatedTitle
  }
  return dafaultTitle
}
