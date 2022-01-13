function clearCookies() {
  console.log('clear')
  var cookies = document.cookie.split(";")
  var domain = '.' + location.host
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i]
    var eqPos = cookie.indexOf("=")
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=" + domain + "; path=/"
  }
  if (cookies.length > 0) {
    for (var j = 0; j < cookies.length; j++) {
      const cookie = cookies[j]
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=" + domain + "; path=/"
    }
  }
}
export default clearCookies