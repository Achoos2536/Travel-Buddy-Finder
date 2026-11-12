
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const JoinRequests = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const response = await axiosInstance.get('/api/trips', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        const myTrips = response.data.filter((trip) => trip.creatorId === user.id);
        setTrips(myTrips);
      } catch (error) {
        alert('Unable to load trips.');
      }
    };

    if (user?.role === 'tripCreator') {
      loadTrips();
    }
  }, [user]);

  const loadRequests = async (tripId) => {
    try {
      const response = await axiosInstance.get(
        `/api/join-requests/trip/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      setRequests(response.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to load requests.');
    }
  };

  const updateRequest = async (requestId, status) => {
    try {
      await axiosInstance.patch(
        `/api/join-requests/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      setRequests(requests.map((request) =>
        request._id === requestId
          ? { ...request, status }
          : request
      ));
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to update request.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Join Requests</h1>

      <h2 className="text-xl font-bold mb-3">Select a Trip</h2>

      {trips.map((trip) => (
        <button
          key={trip._id}
          onClick={() => loadRequests(trip._id)}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2 mb-3"
        >
          {trip.destination}
        </button>
      ))}

      <h2 className="text-xl font-bold mt-6 mb-3">Requests</h2>

      {requests.length === 0 && <p>No requests to display.</p>}

      {requests.map((request) => (
        <div key={request._id} className="bg-white p-4 shadow rounded mb-3">
          <p>Traveller: {request.travellerId?.name || 'Unknown'}</p>
          <p>Status: {request.status}</p>

          {request.status === 'pending' && (
            <div className="mt-3">
              <button
                onClick={() => updateRequest(request._id, 'approved')}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              >
                Approve
              </button>

              <button
                onClick={() => updateRequest(request._id, 'rejected')}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JoinRequests;
