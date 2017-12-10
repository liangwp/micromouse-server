
document.addEventListener('DOMContentLoaded', init); // works in chrome

function init() {
    var el = document.getElementById("renderCanvas");
    setTimeout(function () {
        el.innerHTML = "timeout";
    }, 3000);
}

