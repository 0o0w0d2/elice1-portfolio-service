import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { UserStateContext } from '../App';
import * as Api from '../api';
import User from './user/User';
import Comments from './comment/Comments';
import EducationList from './education/EducationList';
import ProjectList from './project/ProjectList';
import AwardList from './award/AwardList';
import CertificateList from './certificate/CertificateList';
import FloatingIcon from './chat/FloatingIcon';
import ChatBox from './chat/ChatBox';

import './Portfolio.scss';

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPortfolioOwner = async (ownerId) => {
    try {
      const res = await Api.get('users', ownerId);
      const ownerData = res.data;
      setPortfolioOwner(ownerData);
      setIsFetchCompleted(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('로그인한 유저만 사용할 수 있는 서비스입니다.');
        navigate('/');
      } else {
        alert('오류가 발생했습니다.');
      }
      throw error;
    }
  };

  useEffect(() => {
    if (!userState.user) {
      navigate('/login', { replace: true });
      return;
    }

    if (params.userId) {
      const ownerId = params.userId;
      fetchPortfolioOwner(ownerId);
    } else {
      const ownerId = userState.user.id;
      fetchPortfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return 'loading...';
  }

  return (
    <div id="portfolio">
      <Container fluid>
        <Row>
          <Col md="3" lg="3">
            <User
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
<<<<<<< HEAD
            <Comments portfolioOwnerId={portfolioOwner.id} />
=======
            <Comments
              portfolioOwnerId={portfolioOwner.id}
              isEditable={true} // 일단 테스트를 위해 모든 상황에도 사용할 수 있도록 설정
            />
>>>>>>> mercon
          </Col>
          <Col>
            <div style={{ textAlign: 'center' }}>
              <EducationList
                className="list"
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <ProjectList
                className="list"
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <CertificateList
                className="list"
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <AwardList
                className="list"
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <FloatingIcon setShowChat={setShowChat} />
              {showChat && (
                <ChatBox
                  show={showChat}
                  handleClose={() => setShowChat(false)}
                  senderId={userState.user.id} // set the sender id to the current user id
                  receiverId={portfolioOwner.id} // set the receiver id to the portfolio owner id
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Portfolio;
