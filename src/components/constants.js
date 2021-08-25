export const toggleScroll = (bool) => {
  bool
    ? (document.body.style.overflow = "visible")
    : (document.body.style.overflow = "hidden");
};
