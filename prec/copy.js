const debounce = (fn, wait=30) => {
  return function () {
    clearTimeout(fn.time)
    fn.time = setTimeout(fn.call(this, arguments), wait);
  }
}


const throttle = (fn, wait=100) => {
  return function () {
    if (fn.time) return
    fn.time = setTimeout(() => {
      fn.apply(this, arguments)
      fn.time = null
    }, wait);
  }
}
