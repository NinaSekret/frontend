const React = require('react');
const TodoList = require('todo-list/todo-list.jsx');
const { div } = require('react-dom');

const Main = () => (
  <div className='main'>
    <TodoList/>
  </div>
);

module.exports = Main;
