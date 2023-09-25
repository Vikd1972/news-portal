import React, { useState, useEffect } from 'react';

import getDate from '../../../utils/getDate';
import HeaderWrapper from './Header.styles';

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
      <h4 className="title">NEWS PORTAL</h4>
      <div className="date-box">
        <p className="text">It&apos;s now {today?.date}</p>
        <p className="text">{today?.time}</p>
      </div>
      <div className="user-data">
        <p className="text">{user?.fullname}</p>
        <p className="text">{user?.email}</p>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
