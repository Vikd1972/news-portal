import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import FeedbackIcon from '@mui/icons-material/Feedback';
import dayjs from 'dayjs';
import HeaderWrapper from './Header.styles';
import config from '../../../utils/constant';
import type { IUserType } from '../../../store/newsPortalSlice';
import { resetCurrentUser } from '../../../store/newsPortalSlice';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';

const socket = io(config.socketUrl);

type MessageType = {
  newsId: number;
  title: string;
  dateOfChange: Date;
  user: IUserType;
};

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(({ newsPortal }) => newsPortal.user);

  const [acteveTab, setActiveTab] = React.useState(1);
  const [newMessage, setNewMessage] = useState<MessageType | null>(null);
  const [isReadMessage, setIsReadMessage] = useState(false);

  const isNewMessage = React.useMemo(() => {
    if (!newMessage) {
      return false;
    }
    return true;
  }, [newMessage]);

  useEffect(() => {
    socket.on('changeNews', (...arg) => {
      setNewMessage(arg[0]);
    });
    return () => { socket.removeAllListeners('changeNews'); };
  }, []);

  const toReaMessage = () => {
    setIsReadMessage(true);
  };

  const onCloseMessage = () => {
    setNewMessage(null);
    setIsReadMessage(false);
  };

  useEffect(() => {
    if (acteveTab === 1) {
      navigate(config.localPath.news);
    } else {
      navigate(config.localPath.writeNews);
      if (!user) {
        setActiveTab(1);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acteveTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const onSignIn = () => {
    navigate(config.localPath.signIn);
  };

  const onLogout = () => {
    dispatch(resetCurrentUser());
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setActiveTab(1);
    navigate(config.localPath.news);
  };

  return (
    <HeaderWrapper>
      <div className="info-panel">
        <Link
          to="/"
        >
          <div className="title-portal">NEWS PORTAL</div>
        </Link>

        {isNewMessage && (
          <div
            className="new-message-icon"
            onClick={toReaMessage}
          >
            <FeedbackIcon />
          </div>
        )}

        {user?.email
          ? (
            <Button
              className="button"
              variant="outlined"
              onClick={onLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              className="button"
              variant="outlined"
              onClick={onSignIn}
            >
              Sign In
            </Button>
          )}
      </div>

      <div className="tabs-container">
        <Tabs value={acteveTab} onChange={handleChange}>
          <Tab label="Read news" value={1} />
          <Tab label="Write news" value={2} />
        </Tabs>
      </div>

      {isReadMessage && (
        <div className="new-message modal-container">
          <div>
            {`News with title "${newMessage?.title}" was changed on ${dayjs(newMessage?.dateOfChange).toString()}`}
          </div>
          <Button
            className="button"
            variant="outlined"
            onClick={onCloseMessage}
          >
            Закрыть
          </Button>
        </div>
      )}

    </HeaderWrapper>
  );
};

export default Header;
