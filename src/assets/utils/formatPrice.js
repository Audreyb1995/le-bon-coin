export const formatPrice = (price) => {
  if (price >= 1000) {
    const priceStr = price.toString()
    let newPrice = []
    for (let i = priceStr.length - 1; i >= 0; i--) {
      if (i === priceStr.length - 4 || i === priceStr.length - 7) {
        // SI c'est le 3ème ou 6ème tour, on ajoute le caractère et un espace
        newPrice.push(priceStr[i] + ' ')
      } else {
        newPrice.push(priceStr[i])
      }
    }
    return newPrice.reverse().join('')
  } else {
    return price
  }
}
