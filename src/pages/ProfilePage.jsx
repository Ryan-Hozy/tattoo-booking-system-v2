import { getAuth, updateProfile } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { db, storage } from "../firebase";
import { useSelector } from "react-redux";
import { AuthContext } from "../components/AuthProvider";
import { CgProfile } from "react-icons/cg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FaEdit } from "react-icons/fa";
import Nav from '../components/Nav';
import axios from 'axios';

const BASE_URL = 'https://e10465e6-2c62-4400-932b-e3b715e420a2-00-a06eotzji59s.pike.replit.dev'; // Replace with your actual API base URL

export default function Profile() {
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editedBookingData, setEditedBookingData] = useState({
    date: '',
    message: '',
    contact: '',
    email: '',
  });

  useEffect(() => {
    console.log("Profile component rendered");
    if (currentUser) {
      console.log("User is authenticated, fetching bookings");
      fetchUserBookings(currentUser.uid);
    } else {
      console.log("User is not authenticated");
    }
  }, [currentUser]);

  const fetchUserBookings = async (userId) => {
    setBookingsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/booking/${userId}`);
      setBookings(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setBookingsLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    username: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { username, email } = formData;

  const [imagePreview, setImagePreview] = useState(null);
  const [isProfilePicChanged, setIsProfilePicChanged] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setIsProfilePicChanged(true);
    };
    reader.readAsDataURL(file);
  };

  const uploadProfilePicture = async (file) => {
    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(snapshot.ref);
    return photoURL;
  };

  const edit = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const submitChanges = async () => {
    try {
      setLoading(true);
  
      if (!username.trim()) {
        toast.error("Username cannot be empty.");
        return;
      }
  
      let updatedPhotoURL = currentUser.photoURL;
      if (isProfilePicChanged && imagePreview) {
        const file = await fetch(imagePreview).then(r => r.blob());
        updatedPhotoURL = await uploadProfilePicture(file);
      }
  
      if (auth.currentUser.displayName !== username) {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(query(usersRef, where("username", "==", username)));
        if (!querySnapshot.empty) {
          toast.error("Username already exists. Please choose a different username.");
          return;
        }
      }
  
      // Update in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: updatedPhotoURL
      });
  
      // Update in Firestore
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        username: username,
        photoURL: updatedPhotoURL
      });
  
      toast.success("Profile details updated successfully!");
    } catch (error) {
      console.error("Error updating profile details:", error);
      toast.error("Failed to update the profile details.");
    } finally {
      setLoading(false);
      setIsProfilePicChanged(false);
      setImagePreview(null);
    }
  };

  const handleImageUpload = () => {
    document.getElementById('fileInput').click();
  };

  const handleEditBooking = (booking) => {
    setEditingBookingId(booking.id);
    setEditedBookingData({
      name: booking.name,
      date: booking.date,
      message: booking.message,
      contact: booking.contact,
      email: booking.email
    });
  };

  const handleSaveBooking = async () => {
    try {
      console.log("Editing Booking ID:", editingBookingId);
      console.log("Edited Booking Data:", editedBookingData);
      const response = await axios.put(`${BASE_URL}/booking/${editingBookingId}`, editedBookingData);
      console.log("Response from server:", response.data)
      
      setBookings(bookings.map(booking => (booking.id === editingBookingId ? response.data.data : booking)));
      setEditingBookingId(null);
      toast.success("Booking updated successfully!");
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.success("Booking updated successfully!");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await axios.delete(`${BASE_URL}/booking/${bookingId}`);
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      toast.success("Booking deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete booking.");
    }
  };
  


  return (
    <>
      <ToastContainer position="bottom-center" />
      <Nav />
      <section className="max-w-6xl mx-auto my-4 flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
  
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleImageChange}
          accept=".jpeg, .png, .jpg"
          disabled={!changeDetail}
        />
        <div className="mt-5"></div>
        <div
          className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer group"
          onClick={handleImageUpload}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300"
            />
          ) : currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300"
            />
          ) : (
            <CgProfile className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300" />
          )}
          {isProfilePicChanged && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white">{Math.round(uploadProgress)}%</span>
            </div>
          )}
          {changeDetail && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-0 group-hover:bg-opacity-50 first-letter:transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <span className="text-white text-lg">Upload Profile Pic</span>
            </div>
          )}
        </div>
  
        <div className="w-full md:w-[50%] mt-5 px-3">
          <form>
            <input
              type="text"
              id="username"
              value={username}
              disabled={!changeDetail}
              onChange={edit}
              className={`w-full px-4 py-2 text-xl text-gray-700 border border-gray-400 
              rounded transition ease-in-out mb-5 ${changeDetail && "bg-red-300 focus:bg-red-300"}`}
            />
  
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 border 
              border-gray-400 rounded transition ease-in-out mb-5"
            />
  
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p
                onClick={() => {
                  changeDetail && submitChanges();
                  setChangeDetail((prevState) => !prevState);
                }}
                className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer"
              >
                {changeDetail ? "Apply change" : "Edit profile"} <FaEdit className="ml-2" />
              </p>
            </div>
          </form>
        </div>
      </section>
  
      {bookingsLoading && <p>Loading bookings...</p>}
      {error && <p>Error loading bookings: {error}</p>}
      {bookings && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
              {editingBookingId === booking.id ? (
                <>
                <input
                    type="text"
                    value={editedBookingData.name}
                    onChange={(e) => setEditedBookingData({ ...editedBookingData, name: e.target.value })}
                    className="w-full px-2 py-1 border rounded mb-2"
                  />
                  <input
                    type="date"
                    value={editedBookingData.date}
                    onChange={(e) => setEditedBookingData({ ...editedBookingData, date: e.target.value })}
                    className="w-full px-2 py-1 border rounded mb-2"
                  />
                  <input
                    type="text"
                    value={editedBookingData.message}
                    onChange={(e) => setEditedBookingData({ ...editedBookingData, message: e.target.value })}
                    className="w-full px-2 py-1 border rounded mb-2"
                  />
                  <input
                    type="text"
                    value={editedBookingData.contact}
                    onChange={(e) => setEditedBookingData({ ...editedBookingData, contact: e.target.value })}
                    className="w-full px-2 py-1 border rounded mb-2"
                  />
                  <input
                    type="email"
                    value={editedBookingData.email}
                    onChange={(e) => setEditedBookingData({ ...editedBookingData, email: e.target.value })}
                    className="w-full px-2 py-1 border rounded mb-2"
                  />
                  <button
                    onClick={handleSaveBooking}
                    className="text-green-500 hover:underline mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingBookingId(null)}
                    className="text-red-500 hover:underline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p><strong>Date:</strong> {booking.date}</p>
                  <p><strong>Message:</strong> {booking.message}</p>
                  <p><strong>Contact:</strong> {booking.contact}</p>
                  <p><strong>Email:</strong> {booking.email}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleEditBooking(booking)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
 }