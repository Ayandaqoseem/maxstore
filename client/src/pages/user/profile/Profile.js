import { useDispatch, useSelector } from "react-redux";
import PageMenu from "../../../components/Nav/pageMenu/PageMenu";
import Card from "../../../components/cards/Card";
import LoadingGif from "../../../image/loading/spinner.gif";
import { useEffect, useState } from "react";
import { getUser, updatePhoto, updateUser } from "../../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./Profile.scss";


const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = process.env.REACT_APP_CLOUD_URL;

export default function UserProfile() {
  const { user, isLoading } = useSelector((state) => state.auth);

  // console.log("user profile", user);
  const initialState = {
    name: user?.newUser?.name || user?.name || "",
    email: user?.newUser?.email || user?.email || "",
    phone: user?.newUser?.phone || user?.phone || "",
    role: user?.newUser?.role || user?.role || "",
    address: {
      address:
        user?.newUser?.address?.address || user?.address?.address || "",
      state: user?.newUser?.address?.state || user?.address?.state || "",
      country:
        user?.newUser?.address?.country || user?.address?.country || "",
    },
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      if (!profile?.name || !profile?.phone || !profile?.address) {
        return toast.error("Please provide all required field");
      }

      const userData = {
        name: profile.name,
        phone: profile.phone,
        address: {
          address: profile.address.address,
          state: profile.address.state,
          country: profile.address.country,
        },
      };
      await dispatch(updateUser(userData));
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(( prevProps ) => ({
      ...prevProps,
      [name]: value,
      address: {
        ...prevProps.address,
        [name]: value,
      },
    }));
  };

  const savePhoto = async (e) => {
    e.preventDefault()
    let imageUrl;

    try {
      if(
        profileImage !== null && 
        (profileImage.type === "image/jpeg" ||
        profileImage.type === "image/png" ||
        profileImage.type === "image.jpg")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // save image to cloudinary
        const response = await fetch(url, {
          method: "post",
          body: image
        })
        const imgData = await response.json()
        imageUrl = imgData.secure_url.toString();
      }
      // save image to mongo
      const userData = {
        photo: profileImage ? imageUrl : profile.photo
      };
      await dispatch(updatePhoto(userData));
      setImagePreview(null);
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.newUser?.name || user?.name || "",
        email: user?.newUser?.email || user?.email || "",
        phone: user?.newUser?.phone || user?.phone || "",
        role: user?.newUser?.role || user?.role || "",
        address: {
          address:
            user?.newUser?.address?.address || user?.address?.address || "",
          state: user?.newUser?.address?.state || user?.address?.state || "",
          country:
            user?.newUser?.address?.country || user?.address?.country || "",
        },
      });
    }
  }, [user]);

  return (
    <div className="container-fluid d-wrapper-profile">
      <div className="row">
        {/* <div className="col-md-2 --sidebar-wrapper-dashboard profile-menu">
          <UserMenu />
        </div> */}

        <div className="col-md-10 mt-5 container">
          <PageMenu />
          {/* <p className="p-3 mt-2 h6 custom-text fw-bold">User information</p> */}

          <section>
            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "10vh" }}
              >
                <img
                  style={{ width: "100px" }}
                  src={LoadingGif}
                  alt="loading.."
                />
              </div>
            ) : (
              <div className="profile">
                <Card cardClass={"card"}>
                  {!isLoading && user && (
                    <>
                      <div className="details-wrapper">
                        <div className="profile-photo">
                          <div>
                            <img
                              src={
                                imagePreview === null
                                  ? user?.photo || user?.newUser?.photo
                                  : imagePreview
                              }
                              alt="profile-photo"
                            />
                            <h4>Role: {profile?.role}</h4>
                            {imagePreview !== null && (
                              <div className="upload-button">
                                <button
                                  className="--btn --btn-secondary"
                                  onClick={savePhoto}
                                >
                                  <AiOutlineCloudUpload size={18} />
                                  Upload Photo
                                </button>
                              </div>
                            )}
                            <div className="image-input">
                              <p>
                                <label>Change Photo</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  name="image"
                                  onChange={handleImageChange}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                        <form>
                          <div>
                            <p>
                              <label>Name:</label>
                              <input
                                type="text"
                                name="name"
                                value={profile?.name}
                                onChange={handleInputChange}
                              />
                            </p>
                            <p>
                              <label>Email:</label>
                              <input
                                type="email"
                                name="email"
                                value={profile?.email}
                                onChange={handleInputChange}
                                disabled
                              />
                            </p>
                            <p>
                              <label>Phone:</label>
                              <input
                                type="text"
                                name="phone"
                                value={profile?.phone}
                                onChange={handleInputChange}
                              />
                            </p>
                            <div>
                              <p>
                                <label>Address:</label>
                                <input
                                  type="text"
                                  name="address"
                                  value={profile?.address?.address}
                                  onChange={handleInputChange}
                                />
                              </p>
                              <p>
                                <label>State:</label>
                                <input
                                  type="text"
                                  name="state"
                                  value={profile?.address?.state}
                                  onChange={handleInputChange}
                                />
                              </p>
                              <p>
                                <label>Country:</label>
                                <input
                                  type="text"
                                  name="country"
                                  value={profile?.address?.country}
                                  onChange={handleInputChange}
                                />
                              </p>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="--btn --btn-primary --btn-block"
                            onClick={saveProfile}
                          >
                            Update Profile
                          </button>
                        </form>
                      </div>
                    </>
                  )}
                </Card>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

