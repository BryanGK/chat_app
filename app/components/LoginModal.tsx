import Link from 'next/link';
import { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

interface Props {
  toggleCreateUserState: () => void;
  handleUserInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createUser: () => void;
  login: () => void;
  createUserState: boolean;
}

const LoginModal = ({
  toggleCreateUserState,
  handleUserInputChange,
  handlePasswordInputChange,
  createUser,
  login,
  createUserState,
}: Props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Enter Chat
      </Button>
      <Modal toggle={toggle} isOpen={modal}>
        <ModalHeader toggle={toggle}>
          Login - new?{' '}
          <Button
            color="info"
            outline
            size="sm"
            onClick={toggleCreateUserState}
          >
            create user
          </Button>
        </ModalHeader>
        <ModalBody>
          <Form inline>
            <FormGroup floating>
              <Input
                id="username"
                type="text"
                placeholder="Name"
                onChange={handleUserInputChange}
              />
              <Label for="username">Username</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="password"
                type="text"
                placeholder="Password"
                onChange={handlePasswordInputChange}
              />
              <Label for="password">Password</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={createUserState ? createUser : login}
          >
            {createUserState ? 'Create user' : 'Login'}
          </Button>{' '}
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LoginModal;
