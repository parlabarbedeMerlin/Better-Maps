const checkUrls = (urlPathName, regexs) => Boolean(Object.values(regexs).find((regex) => regex.test(urlPathName)))

export default checkUrls