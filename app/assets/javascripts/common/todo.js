function toggleTodo (event) {
  const todo = event.target.closest('.todo');

  event.stopPropagation();

  if (!event || (event && !event.target.closest('a') && !event.target.closest('button'))) {
    if (todo.classList.contains('show')) {
      todo.scrollTo(0, 0);
      todo.classList.remove('show');
    } else {
      todo.classList.add('show');
    }
  }
}

function closeTodo(event) {
  const todo = event.target.closest('.todo');

  event.stopPropagation();
  todo.classList.remove('show');
  todo.classList.add('closed');
}
