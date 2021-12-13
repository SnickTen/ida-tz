export default function (value, space = " ") {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + space)
}
