$(document).on('ready', () => {
  Waves.displayEffect();

  if (!hasTouch()) {
    $('.tooltiped').tooltip();

    $('.tooltiped-delayed').tooltip({
      enterDelay: 500
    });
  }
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
  if (!event || (event && !event.target.closest('a'))) {
    window.location.href = url;
  }
}

function sort(url, search, field, direction) {
  openUrl(`${url}?order=${field}-${direction}${search ? `&search=${search}` : ''}`);
}
