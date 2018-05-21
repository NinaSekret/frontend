const React = require('react');
const PropTypes = require('prop-types');
const className = require('class-name/class-name');

const propTypes = {
  item: PropTypes.object.isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

const Task = ({ item, toggleTask, deleteTask }) => (
  <li
    className={className({ name: 'task', mods: { completed: item.isCompleted } })}
    onClick={toggleTask}
    data-task-id={item.id}
  >
    <div className="task_text">{item.text}</div>
    <div className="task_delete" onClick={deleteTask} data-task-id={item.id}>X</div>
  </li>
);

Task.propTypes = propTypes;

module.exports = Task;
