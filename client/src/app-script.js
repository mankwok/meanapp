document.addEventListener('DOMContentLoaded', function () {
    var layout = document.getElementById('nav-layout');
    var navLinks = document.getElementsByClassName("mdl-navigation__link");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].onclick = function () {
            layout.MaterialLayout.toggleDrawer();
        }
    }
}, false);
