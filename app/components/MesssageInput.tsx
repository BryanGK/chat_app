import { Button, Input } from 'reactstrap';

interface Props {
  postMessage(e: React.MouseEvent<HTMLButtonElement>): void;
  handleMessageChange(e: React.ChangeEvent<HTMLInputElement>): void;
  messageInputValue: string;
}

const MessageInput = ({
  postMessage,
  handleMessageChange,
  messageInputValue,
}: Props) => {
  return (
    <div className="msg-form">
      <Input
        className="form-input"
        onChange={handleMessageChange}
        value={messageInputValue}
      />
      <Button type="submit" color="info" onClick={postMessage}>
        Send Message
      </Button>
    </div>
  );
};

export default MessageInput;
