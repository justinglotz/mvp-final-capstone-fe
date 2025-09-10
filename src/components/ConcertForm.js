'use client';

import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import getVenues from '../api/venuedata';
import getArtists from '../api/artistdata';
import { useRouter } from 'next/navigation';
import { createConcert, updateConcert } from '../api/concertData';

const initialState = {
  date: '',
  venue: '',
  artists: [],
};

export default function ConcertForm({ concert = initialState }) {
  const [formInput, setFormInput] = useState(initialState);
  const [venues, setVenues] = useState([]);
  const [artists, setArtists] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  // normalize obj when it changes
  useEffect(() => {
    if (concert && concert.id) {
      setFormInput({
        id: concert.id,
        date: concert.date || '',
        venue: concert.venue?.id?.toString() || '', // ✅ ensure string ID
        artists: concert.artists ? concert.artists.map((a) => a.id.toString()) : [], // ✅ array of string IDs
      });
    } else {
      setFormInput(initialState);
    }
  }, [concert]);

  useEffect(() => {
    if (user?.uid) {
      getVenues(user.uid).then(setVenues);
      getArtists().then(setArtists);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormInput((prev) => {
      if (type === 'checkbox') {
        const updatedArtists = checked ? [...prev.artists, value] : prev.artists.filter((id) => id !== value);
        return { ...prev, artists: updatedArtists };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formInput, uid: user.uid };

      if (formInput.id) {
        console.log('update payload', payload);
        await updateConcert(payload);
      } else {
        console.log('create payload', payload);
        await createConcert(payload);
      }

      router.push('/');
    } catch (error) {
      console.error('Error submitting concert:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="concert-date">
        <Form.Label>Enter Date</Form.Label>
        <Form.Control type="text" name="date" placeholder="Enter date of concert (MM-DD-YYYY)" value={formInput.date} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="concert-venue">
        <Form.Label>Select Venue</Form.Label>
        <Form.Select name="venue" value={formInput.venue} onChange={handleChange}>
          <option value="">Select a venue...</option>
          {venues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="concert-artists">
        <Form.Label>Select Artists</Form.Label>
        {artists.map((artist) => (
          <Form.Check key={artist.id} type="checkbox" label={artist.name} value={artist.id.toString()} checked={formInput.artists.includes(artist.id.toString())} id={`artist-checkbox-${artist.id}`} onChange={handleChange} />
        ))}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
