
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Trips = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const response = await axiosInstance.get('/api/trips', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setTrips(response.data);
      } catch (error) {
        alert('Unable to load trips.');
      }
    };

    if (user?.token) {
      loadTrips();
    }
  }, [user]);

  const handleJoin = async (tripId) => {
    try {
      await axiosInstance.post(
        `/api/join-requests/${tripId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      alert('Join request sent successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to join trip.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Available Trips</h1>

      {trips.length === 0 && <p>No trips available yet.</p>}

      {trips.map((trip) => (
        <div key={trip._id} className="bg-white p-4 shadow rounded mb-4">
          <h2 className="text-xl font-bold">{trip.destination}</h2>
          <p>Start: {new Date(trip.startDate).toLocaleDateString()}</p>
          <p>End: {new Date(trip.endDate).toLocaleDateString()}</p>
          <p>{trip.description}</p>

          {user?.role === 'traveller' && (
            <button
              onClick={() => handleJoin(trip._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
            >
              Request to Join
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Trips;
