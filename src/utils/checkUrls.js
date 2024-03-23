/**
 * 
 * @param {String} urlPathName the url path name to check against the regexs
 * @param {Object} regexs object where the keys are the name of the regex and the values are the regex 
 * @returns {Boolean} true if the urlPathName matches any of the regexs
 */
const checkUrls = (urlPathName, regexs) => Boolean(Object.values(regexs).find((regex) => regex.test(urlPathName)))

export default checkUrls