import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const CreateTrip = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post('/api/trips', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      alert('Trip created successfully!');
      navigate('/trips');
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to create trip.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Create Trip</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <input
          type="text"
          placeholder="Destination"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <textarea
          placeholder="Trip description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Create Trip
        </button>
      </form>
    </div>
  );
};

export default CreateTrip;
