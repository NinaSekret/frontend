const { createElement } = require('react');
const TodoList = require('todo-list/todo-list');
const { div } = require('react-dom-factories');

const Main = () => div({ className: 'main' }, [
  createElement(TodoList, { key: 'listContainer' }),
]);

module.exports = Main;
