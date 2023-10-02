import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeaderWrapper from './Header.styles';
import config from '../../../utils/constant';
import getDate from '../../../utils/getDate';
import { useAppSelector } from '../../../store/hooks';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(({ newsPortal }) => newsPortal.user);
  const [acteveTab, setActiveTab] = React.useState(1);

  const [today, setToday] = useState<{ date: string; time: string }>();

  useEffect(() => {
    const timer = setInterval(() => {
      const { date, time } = getDate(Date.now() / 1000);
      setToday({ date, time });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (acteveTab === 1) {
      navigate(config.localPath.news);
    } else {
      navigate(config.localPath.writeNews);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acteveTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const onSignIn = () => {
    navigate(config.localPath.signIn);
  };

  return (
    <HeaderWrapper>
      <div className="info-panel">
        <Link
          to="/"
        >
          <div className="title-portal">NEWS PORTAL</div>
        </Link>

        <div className="date-box">
          <p className="text">It&apos;s now {today?.date}</p>
          <p className="text">{today?.time}</p>
        </div>

        {user?.email
          ? (
            <nav className="panel__buttons">

              <Link
                className="button__icon"
                to="/profile"
              >
                <AccountCircleIcon
                  className="user-icon"
                  fontSize="large"
                />
              </Link>
            </nav>
          ) : (
            <div>
              <Button
                className="button"
                variant="outlined"
                onClick={onSignIn}
              >
                Sign In
              </Button>
            </div>
          )}
      </div>

      <div className="tabs-container">
        <Tabs value={acteveTab} onChange={handleChange}>
          <Tab label="Read news" value={1} />
          <Tab label="Write news" value={2} />
        </Tabs>
      </div>

    </HeaderWrapper>
  );
};

export default Header;
