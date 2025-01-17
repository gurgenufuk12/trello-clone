import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getInvite, acceptBoardInvite } from "../services/InviteService";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const InvitePage: React.FC = () => {
  const { inviteId } = useParams<{ inviteId: string }>();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { user, loading } = authContext!;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processInvite = async () => {
      try {
        if (!inviteId) return;

        const invite = await getInvite(inviteId);
        console.log("invite", invite);

        if (!loading) {
          if (user) {
            const result = await acceptBoardInvite(inviteId, user.id);
            console.log("result", result);

            navigate(`/board/${result.boardId}`);
          } else {
            localStorage.setItem(
              "pendingInvite",
              JSON.stringify({
                inviteId,
                boardId: invite.boardId,
              })
            );
            navigate("/register");
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Invalid or expired invite");
      }
    };

    processInvite();
  }, [inviteId, user, loading]);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  return <Container>Processing invite...</Container>;
};

export default InvitePage;
