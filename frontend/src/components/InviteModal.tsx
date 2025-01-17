import React, { useState } from "react";
import styled from "styled-components";
import { generateBoardInvite } from "../services/InviteService";
import { Close, ContentCopy as ContentCopyIcon } from "@mui/icons-material";

interface InviteModalProps {
  boardId: string;
  onClose: () => void;
}
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #282f27;
  padding: 24px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  margin: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #3f4447;
  background: #1e2124;
  color: white;
  font-family: "Poppins", sans-serif;

  &::placeholder {
    color: #8b949e;
  }

  &:focus {
    outline: none;
    border-color: #ff4757;
  }
`;

const Button = styled.button<{ isSecondary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${(props) => (props.isSecondary ? "#282f27" : "#ff4757")};
  border: ${(props) => (props.isSecondary ? "1px solid #ff4757" : "none")};
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.isSecondary ? "#353b34" : "#ff6b81")};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

const Error = styled.div`
  color: #ff4757;
  font-size: 14px;
  margin-top: 8px;
  font-family: "Poppins", sans-serif;
`;
const LinkContainer = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 10px;
`;

const InviteModal: React.FC<InviteModalProps> = ({ boardId, onClose }) => {
  const [email, setEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState("");

  const handleGenerateInvite = async () => {
    try {
      const link = await generateBoardInvite(boardId, email);
      setInviteLink(link);
      setError("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to generate invite link");
    }
  };

  return (
    <Modal>
      <Header>
        <Title>Invite to Board</Title>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </Header>

      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />

      <Button onClick={handleGenerateInvite}>Generate Invite Link</Button>

      {inviteLink && (
        <LinkContainer>
          <Input value={inviteLink} readOnly />
          <Button
            isSecondary
            onClick={() => navigator.clipboard.writeText(inviteLink)}
          >
            <ContentCopyIcon />
          </Button>
        </LinkContainer>
      )}

      {error && <Error>{error}</Error>}
    </Modal>
  );
};

export default InviteModal;
