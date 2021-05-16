export default {
  totalCount (state) {
    return state.cartFoods.reduce((initial, food) => initial + food.count, 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((initial, food) => initial + (food.count * food.price), 0)
  },
  positiveSize (state) {
    return state.ratings.reduce((initial, rating) => initial + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
