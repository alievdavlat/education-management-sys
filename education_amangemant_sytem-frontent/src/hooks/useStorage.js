export const setItemToStorage = ( key , value ) => {

  window.localStorage.setItem(key, JSON.stringify(value))


}


export const getItemAtStorage = ( key ) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const removeItemAtStorage = ( key ) => {
  window.localStorage.removeItem(key)
}