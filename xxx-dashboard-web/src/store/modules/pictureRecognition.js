
const state = {
  textSearchImages: JSON.parse(localStorage.getItem('textSearchImages'))
}

const mutations = {
  TEXT_SEARCH_IMAGES: (state, textSearchImages) => {
    state.textSearchImages = textSearchImages
    localStorage.setItem('textSearchImages', JSON.stringify(textSearchImages));
  },
}

const actions = {
  setTextSearchImages({ commit }, textSearchImages) {
    commit('TEXT_SEARCH_IMAGES', textSearchImages)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
