export const makeFeed = (responseArray, numColumns) => {
  const array = [...responseArray];
  const feed = new Array(numColumns).fill([]);
  feed[0].push(1);
  console.log(feed);
  /*console.log(responseArray);
  array.forEach((feedItem, index) => {
    console.log(index % numColumns);
    feed[index % numColumns].push(feedItem);
    console.log(feed);
  });*/
  return feed;
};
