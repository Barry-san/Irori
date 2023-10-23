const Toggle = (elem: Element | null) => {
  if (elem === null) return;
  if (elem.classList.contains("flex")) {
    elem.classList.add("hidden");
    elem.classList.remove("flex");
  } else {
    elem.classList.add("flex");
    elem.classList.remove("hidden");
  }
};
export default Toggle;
