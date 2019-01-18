function openSidebar() {
  $('.app-sidebar').addClass('open');
}

function closeSidebar() {
  $('.app-sidebar').removeClass('open');
}

function checkDimensions() {
  if (window.innerWidth >= 768) {
    closeSidebar();
  }
}

window.addEventListener('resize', checkDimensions);
