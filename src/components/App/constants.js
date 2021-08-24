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

export const firstHeaders = {
  "x-rapidapi-key": "6e78af7e27mshf423b9eb8beec5ep14aa77jsnb5aca16d5d78",
  "x-rapidapi-host": "yummly2.p.rapidapi.com",
};

export const secondHeaders = {
  "x-rapidapi-host": "yummly2.p.rapidapi.com",
  "x-rapidapi-key": "1ed88af795msh37c44ee05ac42a2p18ca0fjsn217703022460",
};
