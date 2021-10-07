const navbarList = $("#navbarList");
const burgerToggle = $(".navbar__burger-toggle")
const burger = $('#burgerToggle');
const crossToggle = $("#crossToggle")

burgerToggle.on("click", function(event) {
    event.preventDefault();

    burger.toggleClass('active');
    crossToggle.toggleClass('active');
    navbarList.toggleClass("active");
});

