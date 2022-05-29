import { Button, Input } from 'reactstrap';

const MessageInput = () => {
  return (
    <form className="msg-form">
      <Input className="form-input" />
      <Button type="submit" color="primary">
        Send Message
      </Button>
    </form>
  );
};

export default MessageInput;
