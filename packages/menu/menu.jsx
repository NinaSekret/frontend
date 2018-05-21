const React = require('react');
const { Link } = require('react-router-dom');


// TODO: 12321321
const Menu = () => (
  <div className="menu">
    <Link className="menu_item" to="/">Главная</Link>
    <Link className="menu_item" to="/tasks">Задачи</Link>
    <Link className="menu_item" to="/habits">Привычки</Link>
    <Link className="menu_item" to="/about">О программе</Link>
    <input />
  </div>
);

module.exports = Menu;
