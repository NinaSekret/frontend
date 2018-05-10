const PropTypes = require('prop-types');
const { li } = require('react-dom-factories');
const className = require('class-name/class-name');

const propTypes = {
  item: PropTypes.object.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

const TodoItem = ({ item, toggleTodo }) => li(
  {
    className: className({ name: 'todo-item', mods: { completed: item.isCompleted } }),
    onClick: toggleTodo.bind(null, item.id),
  },
  item.text
);

TodoItem.propTypes = propTypes;

module.exports = TodoItem;
