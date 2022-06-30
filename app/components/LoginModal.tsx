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
  toggleModal: () => void;
  modalState: boolean;
  handleUserInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createUser: () => void;
  login: () => void;
  logout: () => void;
  createUserState: boolean;
}

const LoginModal = ({
  toggleModal,
  toggleCreateUserState,
  modalState,
  handleUserInputChange,
  handlePasswordInputChange,
  createUser,
  login,
  logout,
  createUserState,
}: Props) => {
  return (
    <div>
      <div className="user-buttons">
        <Button className="enter-chat" color="danger" onClick={toggleModal}>
          Enter Chat
        </Button>
        <Button className="leave-chat" colour="info" onClick={logout}>
          Leave Chat
        </Button>
      </div>
      <Modal toggle={toggleModal} isOpen={modalState}>
        <ModalHeader toggle={toggleModal}>
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
                type="password"
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
          <Button onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LoginModal;
