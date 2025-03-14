document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded");
  try {
    const container = document.getElementById("__modal_component");
    console.log("loaded", container);
  } catch (e) {
    console.log("some error occured");
  }
});
