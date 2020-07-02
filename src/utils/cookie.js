export class UtilCookie {
  /**
   * 获取指定cookie值
   * @param {String} ck_name
   */
  get(ck_name) {
    if (document.cookie.length > 0) {
      let ck_start = document.cookie.indexOf(ck_name + '=')
      if (ck_start != -1) {
        ck_start = ck_start + ck_name.length + 1
        let ck_end = document.cookie.indexOf(';', ck_start)
        if (ck_end == -1) ck_end = document.cookie.length
        return unescape(document.cookie.substring(ck_start, ck_end))
      }
    }
    return ''
  }
  /**
   * 设置指定cookie值
   * @param {String} ck_name
   * @param {*} value
   */
  set(ck_name, value) {
    document.cookie = ck_name + '=' + escape(value)
  }
  /**
   * 清空指定cookie值
   * @param {String} ck_name
   */
  clear(ck_name) {
    this.set(ck_name, '')
  }
}
