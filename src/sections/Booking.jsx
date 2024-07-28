import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { createBooking} from "../features/bookingSlice";
import { Modal, Button } from "react-bootstrap";


const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setUserId(user.uid); // Get the UID from Firebase Auth
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      name,
      email,
      contact,
      date,
      message,
      user_id: userId,
    };
    console.log("Booking Data:", bookingData);

    dispatch(createBooking(bookingData))
      .then(response => {
        setShowModal(true);
        clearForm();
      })
      .catch(error => console.error("Error create booking:", error));
    };

  

  const clearForm = () => {
    setName("");
    setEmail("");
    setContact("");
    setDate("");
    setMessage("");
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="container text-gray-600 body-font justify-center relative">
          <h3 className="font-palanquin text-center text-4xl font-bold">
            Make your 
            <span className="text-red-600"> Reservations</span> Now
          </h3>
          <div className="px-5 py-10 mx-auto flex flex-wrap">
            <div className="xl:w-1/2 md:w-2/5 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
              <iframe 
                width="100%" 
                height="100%" 
                className="absolute inset-0" 
                title="map"
                src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
              ></iframe>
              <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                <div className="lg:w-1/2 px-6">
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                  <p className="mt-1">Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
                </div>
                <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                  <a className="text-red-500 leading-relaxed">example@email.com</a>
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                  <p className="leading-relaxed">123-456-7890</p>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-2/5 bg-white flex flex-col md:ml-5 w-full md:py-8 mt-8 md:mt-0">
              <div className="relative mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="contact" className="leading-7 text-sm text-gray-600">Contact</label>
                <input 
                  type="tel" 
                  id="contact" 
                  name="contact" 
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="date" className="leading-7 text-sm text-gray-600">Date</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Booking successfully created. Please view your details in the profile page.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Booking;
