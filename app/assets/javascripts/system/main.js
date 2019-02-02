$(document).on('ready', () => {
  Waves.displayEffect();

  $('.modal').modal();

  if (!hasTouch()) {
    $('.tooltiped').tooltip();

    $('.tooltiped-delayed').tooltip({
      enterDelay: 500
    });
  }

  setTimeout(() => {
    $('.pulse.2s').removeClass('pulse 2s');
  }, 2000);

  setTimeout(() => {
    $('.pulse.3s').removeClass('pulse 3s');
  }, 3000);
});

function hasTouch() {
  return 'ontouchstart' in document.documentElement
         || navigator.maxTouchPoints > 0
         || navigator.msMaxTouchPoints > 0;
}

function onUserPictureError({ target }) {
  target.src = '/images/empty_avatar.png';
}

function onUserBackgroundError({ target }) {
  target.src = 'https://placeimg.com/220/220/any';
}

function openUrl(url, event) {
  if (!event || (event && !event.target.closest('a') && !event.target.closest('button'))) {
    window.location.href = url;
  }
}

function openUserShow(id, event) {
  if (!event || (event && !event.target.closest('a') && !event.target.closest('button'))) {
    M.Modal.getInstance(document.getElementById(id)).open();
  }
}

function closeUserShow(id) {
  M.Modal.getInstance(document.getElementById(id)).close();
}

function closeDeleteModal(id) {
  M.Modal.getInstance(document.getElementById(id)).close();
}

function sort(url, search, field, direction) {
  openUrl(`${url}?order=${field}-${direction}${search ? `&search=${search}` : ''}`);
}
