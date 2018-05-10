const React = require('react');
const PropTypes = require('prop-types');
const { form, label, input, button } = require('react-dom');
const locale = require('core/locale').todoList.addTodo;

const propTypes = { addTodo: PropTypes.func.isRequired };

const AddTodo = ({ addTodo }) => {
  let inputElement;

  const onSubmit = (event) => {
    event.preventDefault();

    if (!inputElement.value.trim()) {
      return;
    }
    addTodo(inputElement.value);
    inputElement.value = '';
  };

  return (
    <form className="add-todo" onSubmit={onSubmit}>
      <label className="add-todo_label" htmlFor="text">{locale.textLabel}</label>
      <input
        className="add-todo_field"
        type="text"
        id="text"
        ref={(el) => { inputElement = el; }}
      />
      <button className='add-todo_button' type='submit'>{locale.buttonLabel}</button>
    </form>
  );
};

AddTodo.propTypes = propTypes;

module.exports = AddTodo;
