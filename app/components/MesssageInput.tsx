import { Button, Input } from 'reactstrap';

interface Props {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  messageInputValue: string;
}

const MessageInput = ({ onClick, onChange, messageInputValue }: Props) => {
  return (
    <div className="msg-form">
      <Input
        className="form-input"
        onChange={onChange}
        value={messageInputValue}
      />
      <Button type="submit" color="primary" onClick={onClick}>
        Send Message
      </Button>
    </div>
  );
};

export default MessageInput;
