export const generateHexString = (length = 5) => {
  let ret = "";
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2);
  }
  return ret.substring(0, length);
};

export const changeSourceUrl = (url) => {
  let urlCopy = url;
  if (urlCopy.includes("https://www.yummly.com/")) {
    urlCopy = urlCopy.replace("private/", "");
  }
  return urlCopy;
};
