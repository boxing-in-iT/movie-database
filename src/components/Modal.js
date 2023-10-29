import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1040;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  display: flex;
  align-items: center;
`;

const ModalWindow = styled.div`
  z-index: 100;
  position: relative;
  margin: auto;
  border-radius: 5px;
  max-width: 600px;
  width: 80%;
  padding: 1rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = ({ isShowing, hide, title, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay onClick={hide}>
            <ModalWrapper>
              <ModalWindow>
                <Content className="modal-body">{props.children}</Content>
              </ModalWindow>
            </ModalWrapper>
          </ModalOverlay>
        </>,
        document.body
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
