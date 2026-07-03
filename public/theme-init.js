(function () {
  try {
    var e = document.documentElement;
    e.classList.add("js");
    var s = localStorage.getItem("theme");
    var d = s ? s === "dark" : true;
    e.classList.toggle("dark", d);
    e.style.colorScheme = d ? "dark" : "light";
  } catch (err) {}
})();
