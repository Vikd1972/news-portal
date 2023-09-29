import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeaderWrapper from './Header.styles';

import getDate from '../../../utils/getDate';
import { useAppSelector } from '../../../store/hooks';

export const Header: React.FC = () => {
  const user = useAppSelector(({ newsPortal }) => newsPortal.user);

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

  return (
    <HeaderWrapper>
      <div className="title-portal">NEWS PORTAL</div>
      <div className="date-box">
        <p className="text">It&apos;s now {today?.date}</p>
        <p className="text">{today?.time}</p>
      </div>
      {true
        ? (
          <nav className="panel__buttons">
          {/* {quantityNewComment ? <div className="counter">{quantityNewComment}</div> : null} */}

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
            <form action="/login">
              <Button
                className="button"
                variant="outlined"
              >
                Sign In
              </Button>
            </form>
          </div>
        )}
    </HeaderWrapper>
  );
};

export default Header;
