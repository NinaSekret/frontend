const React = require('react');
const PropTypes = require('prop-types');
const Message = require('./message.jsx');

const propTypes = { messages: PropTypes.array.isRequired };

const Messages = ({ messages }) => (
  <div className='messages'>
    {messages.map((message) => <Message message={message} key={message.code} />)}
  </div>
);

Messages.propTypes = propTypes;

module.exports = Messages;
