import React, { useEffect } from 'react';
import { useDirection } from '../../hooks/useDirection';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { direction, toggleDirection } = useDirection();
  const {user, loading} = useSelector((store) => store.auth);

  useEffect(() => {
    // Update the direction on component mount based on the context
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    // console.log(user)
  }, [user]);


  return (
    <div>
      {/* <h1>{direction === 'ltr' ? 'Left to Right Layout' : 'Right to Left Layout'}</h1>
      <button onClick={toggleDirection}>
        Toggle Direction
      </button> */}
      <p>Welcome to the Dashboard!</p>
    </div>
  );
};

export default Dashboard;
