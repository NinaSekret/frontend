const { createElement, Component } = require('react');
const { div, ul } = require('react-dom-factories');
const TodoItem = require('todo-item/todo-item');
const AddTodo = require('add-todo/add-todo');
const className = require('class-name/class-name');
const locale = require('core/locale').todoList;
const { VisibilityFilters } = require('core/constants');

class TodoList extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      todos: [
        { id: '100001', text: '1 задача', isCompleted: false },
        { id: '100002', text: '2 задача', isCompleted: true },
        { id: '100003', text: '3 задача', isCompleted: true },
        { id: '100004', text: '4 задача', isCompleted: false },
        { id: '100005', text: '5 задача', isCompleted: false },
      ],
      activeFilter: VisibilityFilters.ALL,
    };

    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  addTodo(text) {
    const { todos } = this.state;

    const lastTodoId = todos[todos.length - 1].id;
    const id = Number(lastTodoId) + 1;
    todos.push({ id: String(id), text, isCompleted: false });

    this.setState({ todos });
  }

  toggleTodo(id) {
    const { todos } = this.state;

    const todo = todos.find((item) => item.id === id);
    todo.isCompleted = !todo.isCompleted;

    this.setState({ todos });
  }

  changeFilter(newFilter) {
    this.setState({ activeFilter: newFilter });
  }

  render() {
    const { activeFilter, todos } = this.state;

    const filteredTodos = todos.filter((item) => {
      switch (activeFilter) {
        case VisibilityFilters.ACTIVE:
          return !item.isCompleted;

        case VisibilityFilters.COMPLETED:
          return item.isCompleted;

        case VisibilityFilters.ALL:
        default:
          return true;
      }
    });

    return div({ className: 'todo-list' }, [
      div({ className: 'todo-list_filters', key: 'filter' }, [
        ['ALL', 'ACTIVE', 'COMPLETED'].map((item) => div({
          className: className({
            name: 'todo-list_filters_item',
            mods: { active: activeFilter === VisibilityFilters[item] },
          }),
          onClick: this.changeFilter.bind(this, VisibilityFilters[item]),
          key: item,
        }, locale.filters[item.toLowerCase()])),
      ]),
      ul(
        { className: 'todo-list_list', key: 'list' },
        filteredTodos.map((item) => createElement(TodoItem, {
          item,
          toggleTodo: this.toggleTodo,
          key: item.id,
        }))
      ),
      createElement(AddTodo, { addTodo: this.addTodo, key: 'addTodo' }),
    ]);
  }
}

module.exports = TodoList;
