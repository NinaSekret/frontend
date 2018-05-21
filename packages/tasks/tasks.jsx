const React = require('react');
const Task = require('./task.jsx');
const AddTask = require('add-task/add-task.jsx');
const className = require('class-name/class-name');
const locale = require('core/locale').tasks;
const { visibilityFilters, responseStatuses } = require('core/constants');
const createRequest = require('core/create-request');
const Messages = require('messages/messages');

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', props);

    this.state = {
      tasks: [],
      activeFilter: visibilityFilters.ALL,
      isLoading: true,
      messages: [],
    };

    this.addTask = this.addTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  componentDidMount() {
    createRequest('fetchTasks').then((response) => {
      this.setState({ tasks: response.data || [], isLoading: false, messages: response.messages });
    });
  }

  addTask(text) {
    const { tasks } = this.state;

    this.setState({ isLoading: true });
    createRequest('addTask', {}, { text }).then((response) => {
      if (response.status === responseStatuses.OK) {
        tasks.push(response.data);
        this.setState({ tasks, isLoading: false, messages: response.messages });
      } else {
        this.setState({ isLoading: false, messages: response.messages });
      }
    });
  }

  toggleTask(event) {
    const id = event.currentTarget.dataset.taskId;
    const { tasks } = this.state;
    let task = tasks.find((item) => item.id === id);

    this.setState({ isLoading: true });
    createRequest('updateTask', { id }, { isCompleted: !task.isCompleted }).then((response) => {
      if (response.status === responseStatuses.OK) {
        task = Object.assign(task, response.data);
        this.setState({ tasks, isLoading: false, messages: response.messages });
      } else {
        this.setState({ isLoading: false, messages: response.messages });
      }
    });
  }

  deleteTask(event) {
    event.preventDefault();
    event.stopPropagation();
    const id = event.currentTarget.dataset.taskId;

    console.log(event.currentTarget.dataset);

    let { tasks } = this.state;

    this.setState({ isLoading: true });
    createRequest('deleteTask', { id }).then((response) => {
      if (response.status === responseStatuses.OK) {
        tasks = tasks.filter((item)=> item.id !== id);
        this.setState({ tasks, isLoading: false, messages: response.messages });
      } else {
        this.setState({ isLoading: false, messages: response.messages });
      }
    });
  }

  changeFilter(event) {
    const newFilter = event.currentTarget.dataset.filterCode;
    this.setState({ activeFilter: newFilter });
  }

  render() {
    const { activeFilter, tasks, isLoading, messages } = this.state;

    const filteredTasks = tasks.filter((task) => {
      switch (activeFilter) {
        case visibilityFilters.ACTIVE:
          return !task.isCompleted;

        case visibilityFilters.COMPLETED:
          return task.isCompleted;

        case visibilityFilters.ALL:
        default:
          return true;
      }
    });

    return (
      <div className={className({ name: 'tasks', mods: { loading: isLoading } })}>
        <div className="tasks_filters">
          {['ALL', 'ACTIVE', 'COMPLETED'].map((item) => (
            <div
              className={className({
                name: 'tasks_filters_item',
                mods: { active: activeFilter === visibilityFilters[item] },
              })}
              onClick={this.changeFilter}
              data-filter-code={visibilityFilters[item]}
              key={item}
            >
              {locale.filters[visibilityFilters[item]]}
            </div>
          ))}
        </div>
        {
          filteredTasks.length > 0
          && (
          <ul className="tasks_list">
            {filteredTasks.map((item) => (
              <Task item={item} toggleTask={this.toggleTask} deleteTask={this.deleteTask} key={item.id} />
            ))}
          </ul>
          )
        }
        {
          messages.length === 0 && !isLoading && filteredTasks.length === 0
          && <div className="tasks_empty">{locale.empty}</div>
        }
        {
          !isLoading && messages.length > 0
          && <Messages messages={messages} />
        }
        <AddTask addTask={this.addTask} />
      </div>
    );
  }
}

module.exports = Tasks;
