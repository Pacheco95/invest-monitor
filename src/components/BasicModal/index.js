import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap';

const BasicModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const show = (title, body) => {
    setTitle(title);
    setBody(body);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    show, hide
  }));

  return (
    <>
      <Modal show={visible} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default BasicModal;
