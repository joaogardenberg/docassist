$(document).on('ready turbolinks:load', () => {
  Waves.displayEffect();
  $('.tooltiped').tooltip();
});

function onUserPictureError({ target }) {
  target.src = 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png';
};
