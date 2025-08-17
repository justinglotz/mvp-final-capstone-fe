import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteConcert } from '../api/concertData';

function ConcertCard({ concert, onUpdate }) {
  if (!concert) return null;

  const { date, venue, artists } = concert;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this?`)) {
      deleteConcert(concert.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Concert Details</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {date}
          <br />
          <strong>Venue:</strong> {venue.name}
          <br />
          <strong>Location:</strong> {venue.city}, {venue.state}
          <br />
          {artists.length > 0 && (
            <>
              <strong>Artists:</strong> {artists.map((artist) => artist.name).join(', ')}
            </>
          )}
        </Card.Text>
        <div className="d-flex flex-row gap-3 justify-content-center align-content-center">
          <Link href={`/concert/edit/${concert.id}`} passHref>
            <Button>Edit</Button>
          </Link>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ConcertCard;
ConcertCard.propTypes = {
  concert: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    date: PropTypes.string.isRequired,
    venue: PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }).isRequired,
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }),
  onUpdate: PropTypes.func.isRequired,
};
