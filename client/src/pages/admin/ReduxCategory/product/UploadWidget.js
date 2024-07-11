import { useState } from "react";
import Card from "../../../../components/cards/Card";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";

const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = "https://api.cloudinary.com/v1_1/maxstore/image/upload";

export default function UploadWidget({ files, setFiles }) {
    const [selectedImages,setSelectedImages] = useState([]);
    const [images,setImages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);


    const addImages = (e) => {
        const selectedFiles = e.target.files;

       const selectedFilesArray = Array.from(selectedFiles);

        const imageArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file)
        })
        setSelectedImages((prevImages) => prevImages.concat(imageArray));
        setImages((prevImages) => prevImages.concat(selectedFilesArray))

       console.log("Show selected files =>", imageArray);
       console.log("Show array of selected files =>", selectedFilesArray);
    }

    const removeImage = (image) => {
        const imageIndex = selectedImages.indexOf(image);
        setSelectedImages(selectedImages.filter((img) => img !== image));
        setImages(images.filter((img, index) => index !== imageIndex));
        URL.revokeObjectURL(image);
    }

    const uploadImages = () => {
        setUploading(true)
        let imageUrls =  []

        const formData = new FormData()
        for (let i = 0; i < images.length; i++) {
            let file = images[i];
            formData.append("file", file);
            formData.append("upload_preset", upload_preset);
            formData.append("folder", "maxstoreApp");


            fetch(url, {
                method: "POST",
                body: formData,
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                imageUrls.push(data.secure_url)
                setProgress(imageUrls.length)

            if (imageUrls.length === images.length) {
                setFiles((prevfiles) => prevfiles.concat(imageUrls))
                setUploading(false)
                console.log(files);
                toast.success("image upload complete.")
                setImages([])
                setSelectedImages([])
                setProgress(0);
            }
            })
            .catch((error) =>{
                setUploading(false)
                toast.error(error.message)
                console.log(error);
            })
        }
    }

    
    return (
        <div>
            <Card cardClass={"formcard group"}>
                <label className="uploadWidget btn btn-outline-secondary text-center col-12">
                    <AiOutlineCloudUpload className="icon" size={35} />
                    <br />
                    <span>Click to upload maximum of 5 images</span>
                    <div className="file-wrapper d-flex justify-content-center">
                        <input
                            className="file-container p-3"
                            type="file"
                            name="photo"
                            onChange={addImages}
                            multiple
                            accept="image/*" 
                            
                        />
                    </div>
                </label>
                <br />
                {selectedImages.length > 0 && (
                    selectedImages.length > 5 ? (
                        <p className="error">
                            You can't upload more than 5 images! <br />
                            <span>
                                Please remove <b>{selectedImages.length - 5}</b> of them.
                            </span>
                        </p>
                    ) : (
                       <div className="--center-all">
                            <button 
                                className="--btn --btn-danger --btn-large"
                                disabled={uploading}
                                onClick={uploadImages}
                            >
                                {uploading
                                    ? `Uploading ${progress} of ${images.length}`
                                    : `Upload ${images.length} Image(s)`}
                            </button>
                       </div> 
                    )
                )}

                <div className={selectedImages.length > 0 ? "images" : ""}>
                    {selectedImages.length !== 0 &&
                        selectedImages.map((image, index) => {
                            return (
                                <div key={image} className="image">
                                    <img src={image} alt="productImage" width="200"/>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p>{index + 1}</p>
                                        <button 
                                            className="--btn"
                                            onClick={() => removeImage(image)}
                                        >
                                            <BsTrash 
                                                size={25} 
                                                color="white" 
                                                
                                            />
                                        </button>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </Card>
        </div>
    )
}