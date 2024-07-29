import { getAuth, updateProfile } from "firebase/auth"
import {  collection, deleteDoc, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { db, storage } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../components/AuthProvider";
import { CgProfile } from "react-icons/cg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";


export default function Profile () {
  const auth = getAuth();
  const {currentUser} = useContext(AuthContext)
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true);
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] =useState(false)

  const [formData, setFormData] =useState({
    username: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const {username, email} = formData

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

//enable to edit username
  const edit = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const submitChanges = async() => {
    try {   
      setLoading(true)
      if (!username.trim()) {
        toast.error("Username cannot be empty.");
        return;
      }

      let updatedPhotoURL = currentUser.photoURL;
      if (isProfilePicChanged && imagePreview) {
        const file = await fetch(imagePreview).then(r => r.blob());
        updatedPhotoURL = await uploadProfilePicture(file)
        }

      if(auth.currentUser.displayName !== username){
        // Query the 'users' collection to check if the new username already exists
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(query(usersRef, where("username", "==", username)));
        // If username already exists, show an error message
        if (!querySnapshot.empty) {
          toast.error("Username already exists. Please choose a different username.");
          return;
        }
      }
        //update in firebase Auth
        await updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: updatedPhotoURL
        });

      //update to firestore//"collection"
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          username: username, photoURL :updatedPhotoURL
        })
        toast.success("Profile details updated successfully!")
    } catch (error) {
      toast.error("Failed to update the profile details.")
    } finally {
      setLoading(false);
      setIsProfilePicChanged(false);
      setImagePreview(null); 
    }
  }
  

  const handleImageUpload = () => {
    document.getElementById('fileInput').click();
  };
  

  return (
    <>
    <ToastContainer/>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">
          My Profile
        </h1>

        <input 
          type="file" 
          id="fileInput" 
          className="hidden" 
          onChange={handleImageChange}
          accept=".jpeg, .png, .jpg" 
          disabled={!changeDetail}
        />
        <div className="mt-5"></div>
          <div className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer group" 
            onClick={handleImageUpload}>
            {imagePreview ? 
              <img src={imagePreview}  
                className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300"
              />: currentUser.photoURL ? (
                <img src={currentUser.photoURL}  
                     className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300"
                />
              ) : (<CgProfile className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300"/>
              )
            }
             {isProfilePicChanged && uploadProgress > 0 && uploadProgress < 100 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white">{Math.round(uploadProgress)}%</span>
              </div>
            )}
            {changeDetail&&
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-0 group-hover:bg-opacity-50 first-letter:transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-lg">
                    Upload Profile Pic
                  </span>
              </div>
            }
        </div>

        <div className="w-full md:w-[50%] mt-5 px-3">
          <form>
            <input type="text" 
              id="username" 
              value={username} 
              disabled={!changeDetail}
              onChange={edit}
              className={`w-full px-4 py-2 text-xl text-gray-700 border border-gray-400 
              rounded transition ease-in-out mb-5 ${
                changeDetail && "bg-red-300 focus:bg-red-300"
              }`}
            />

            <input type="email" id="email" value={email} disabled 
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
        
    
    </>
  )
}