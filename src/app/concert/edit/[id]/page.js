'use client';

import React, { useEffect, useState } from 'react';
import { getSingleConcert } from '../../../../api/concertData';
import ConcertForm from '../../../../components/ConcertForm';

export default function EditConcertPage({ params }) {
  const [editItem, setEditItem] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleConcert(id).then((data) => {
      setEditItem(data);
      console.log(data);
      console.log(editItem);
    });
  }, [id]);
  return (
    <div>
      <ConcertForm concert={editItem} />
    </div>
  );
}
