$(document).on('ready', () => {
  Waves.displayEffect();
  $('.tooltiped').tooltip();
});

function onUserPictureError({ target }) {
  target.src = 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png';
}

function openUrl(url, event) {
  if (!event || (event && !event.target.closest('a'))) {
    window.location.href = url;
  }
}

function sort(url, search, field, direction) {
  openUrl(`${url}?order=${field}-${direction}${search ? `&search=${search}` : ''}`);
}
