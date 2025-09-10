'use client';

import { Button } from 'react-bootstrap';
import { signOut } from '@/utils/auth';
import { useAuth } from '@/utils/context/authContext';
import ConcertCard from '../components/ConcertCard';
import { getConcerts } from '../api/concertData';
import { useEffect, useState } from 'react';

function Home() {
  const { user } = useAuth();
  const [concerts, setConcerts] = useState([]);

  const getAllTheConcerts = () => {
    if (!user?.uid) return;
    getConcerts(user.uid)
      .then((data) => setConcerts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllTheConcerts();
  }, [user]);

  return (
    <>
      <h1 className="text-center">{user?.displayName}'s Concerts</h1>
      <div className="text-center">
        <div className="d-flex flex-row gap-3 justify-content-center align-content-center flex-wrap">
          {concerts.map((concert) => (
            <ConcertCard key={concert.id} concert={concert} onUpdate={getAllTheConcerts} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
