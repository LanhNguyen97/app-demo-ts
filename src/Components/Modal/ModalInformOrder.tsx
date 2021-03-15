import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../Button";

const ModalInformOrder = props => {
    const { isShow, onClose, onContinue, onCancel } = props;
    return (
        <Modal
            show={isShow}
            onHide={onClose}
            dialogClassName="modal-inform-order"
        >
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Your order is successfully created. Continue to shopping.
            </Modal.Body>
            <Modal.Footer>
                <Button theme="success" onClick={onContinue}>
                    Let's go
                </Button>
                <Button theme="primary" onClick={onCancel}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalInformOrder;
