function onLabelClick({ target }) {
  if ($(target.closest('.label-icon')).hasClass('active')) {
    target.closest('form').submit();
  }
}
