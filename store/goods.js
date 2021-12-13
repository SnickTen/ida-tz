export const state = () => ({
  goods: [],
  sort: ''
})

export const getters = {
  sortedList: (state) => {
    if (state.sort !== '') {
      const goods = [...state.goods]
      if (state.sort === "min") {
        return goods.sort(function(a, b) {
          return a.price - b.price
        })
      } else if (state.sort === 'max') {
        return goods.sort(function(a, b) {
          return b.price - a.price
        })
      }
      return goods.sort(function (a, b) {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1
        }
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1
        }
        return 0
      })
    }
    return state.goods
  }
}

export const actions = {
  getGoodsFromLocalStorage({ commit }) {
    const goods = localStorage.getItem('goods')
    if (goods) {
      commit('setGoods', JSON.parse(goods))
    }
  },
  setToLocalStorage({ state }) {
    localStorage.setItem('goods', JSON.stringify(state.goods))
  },
  addGood ({ commit, dispatch }, good) {
    commit('addGood', good)
    dispatch('setToLocalStorage')
  },
  removeGood ({ commit, dispatch }, goodId) {
    commit('removeGood', goodId)
    dispatch('setToLocalStorage')
  },
  setSort ({ commit }, value) {
    commit('setSort', value)
  }
}
export const mutations = {
  setGoods: (state, goods) => (state.goods = goods),
  addGood: (state, good) => (state.goods.push(good)),
  removeGood: (state, goodId) => (state.goods.splice(state.goods.findIndex(x => x.id === goodId), 1)),
  setSort: (state, value) => (state.sort = value)
}
