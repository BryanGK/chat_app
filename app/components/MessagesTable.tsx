import { Button, Card, CardText, CardTitle } from 'reactstrap';
import { Message, User } from '../components';

interface MessagesList {
  messages: Message[];
  user: User | undefined;
}

const MessagesTable: React.FC<MessagesList> = ({ messages, user }) => {
  return (
    <div className="msg-table">
      {messages.map((msg) => {
        const isUsersMessage = () => {
          return user?.username === msg.author;
        };
        return (
          <div key={msg.id} className="msg-container">
            <Card body color={isUsersMessage() ? 'info' : 'warning'} inverse>
              <CardTitle tag="h6">{msg.message}</CardTitle>
              <CardText>Sent by {msg.author}</CardText>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesTable;
