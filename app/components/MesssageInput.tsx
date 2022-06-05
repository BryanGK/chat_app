import { Button, Input } from 'reactstrap';

interface Props {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const MessageInput = ({ onClick, onChange }: Props) => {
  return (
    <div className="msg-form">
      <Input className="form-input" onChange={onChange}/>
      <Button type="submit" color="primary" onClick={onClick}>
        Send Message
      </Button>
    </div>
  );
};

export default MessageInput;
