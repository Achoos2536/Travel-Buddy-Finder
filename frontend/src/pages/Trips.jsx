
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Trips = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = user ? { Authorization: `Bearer ${user.token}` } : {};

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const tripResponse = await axiosInstance.get('/api/trips', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setTrips(tripResponse.data);

        if (user?.role === 'traveller') {
          const requestResponse = await axiosInstance.get('/api/join-requests/my-requests', {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          });
          setMyRequests(requestResponse.data);
        }
      } catch (error) {
        alert('Unable to load trips or join requests.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {loadData();
    }
    }, [user]);

    const handleJoin = async (tripId) => {
    try {
      const response = await axiosInstance.post(
        `/api/join-requests/${tripId}`,
        {},
        { headers }
      );

      setMyRequests((previous) => [...previous, response.data]);

      alert('Join request sent successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to join trip.');
    }
  };

  const getRequest = (tripId) => {
    return myRequests.find((request) => {
      const requestTripId =
        typeof request.tripId === 'object'
          ? request.tripId?._id
          : request.tripId;

      return requestTripId === tripId;
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">
        Available Trips
      </h1>

      {loading && <p>Loading trips...</p>}

      {!loading && trips.length === 0 && (
        <p>No trips available yet.</p>
      )}

      {!loading && trips.map((trip) => {
        const request = getRequest(trip._id);

        return (
          <div
            key={trip._id}
            className="bg-white p-4 shadow rounded mb-4"
          >
            <h2 className="text-xl font-bold">
              {trip.destination}
            </h2>

            <p>
              Start: {new Date(trip.startDate).toLocaleDateString()}
            </p>

            <p>
              End: {new Date(trip.endDate).toLocaleDateString()}
            </p>

            <p>{trip.description}</p>

            {user?.role === 'traveller' && (
              <div className="mt-3">
                {request ? (
                  <span
                    className={`inline-block px-4 py-2 rounded font-semibold ${getStatusStyle(request.status)}`}
                  >
                    Request Status: {
                      request.status === 'approved'
                        ? 'Approved'
                        : request.status === 'rejected'
                        ? 'Rejected'
                        : 'Pending'
                    }
                  </span>
                ) : (
                  <button
                    onClick={() => handleJoin(trip._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Request to Join
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Trips;