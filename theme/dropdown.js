$(document).ready(() => {
  const $mobileBtn = $(".navigation__mobile-btn");
  const $mobileMenu = $(".navigation__mobile-nav");

  $mobileBtn.click(e => {
    e.preventDefault();
    if ($mobileMenu.hasClass("mobile-dropdown")) {
      $mobileMenu.removeClass("mobile-dropdown");
    } else {
      $mobileMenu.addClass("mobile-dropdown");
    }
  });
});
