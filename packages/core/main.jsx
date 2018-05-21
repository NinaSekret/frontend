const React = require('react');
const Router = require('react-router-dom').BrowserRouter;
const { Route } = require('react-router-dom');
const Tasks = require('tasks/tasks');
const About = require('about/about');
const Habits = require('habits/habits');
const Menu = require('menu/menu');
const Home = require('home/home');

const routes = [
  { path: '/', component: Home, exact: true }, // поменять на что-то
  { path: '/tasks', component: Tasks },
  { path: '/habits', component: Habits },
  { path: '/about', component: About },
];

const Main = () => (
  <Router>
    <div className="main">
      {
        routes.map((route) => (
          <Route
            path={route.path}
            exact={route.exact || false}
            component={route.component}
            key={route.path}
          />
        ))
      }
      <Menu />
    </div>
  </Router>
);

module.exports = Main;
