interface Message {
  id: string;
  message: string;
  author: string;
}

interface MessagesList {
  messages: Message[];
}

const MessagesTable: React.FC<MessagesList> = ({ messages }) => {
  return (
    <div className="msg-table">
      {messages.map((msg) => {
        return (
          <div key={msg.id}>
            {msg.message} {msg.author}
          </div>
        );
      })}
    </div>
  );
};

export default MessagesTable;
