function toggleTodo (event, close = false) {
  const todo = event.target.closest('.todo');
  event.stopPropagation();

  if (close) {
    todo.classList.remove('show');
    todo.classList.add('closed');
  } else if (todo.classList.contains('show')) {
    todo.classList.remove('show');
  } else {
    todo.classList.add('show');
  }
};
