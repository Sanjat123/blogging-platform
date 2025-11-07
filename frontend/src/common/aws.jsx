// In frontend/src/common/aws.jsx

import axios from "axios";

export const uploadImage = async (img) => {

    let imgUrl = null;
    const fileType = img.type; // <-- Get the file's actual MIME type (e.g., "image/png")

    // 1. Send the fileType to the backend as a query parameter
    await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url", {
        params: { fileType }
    })
    .then( async ({ data: { uploadURL } }) => {

        // 2. Upload to S3
        await axios({
            method: 'PUT',
            url: uploadURL,
            // 3. Set the Content-Type to the file's actual type
            headers: { 'Content-Type': fileType }, 
            data: img // 4. Send the raw file object
        })
        .then(() => {
            imgUrl = uploadURL.split("?")[0]
        })
        .catch(err => {
            console.error("Error uploading to S3:", err);
            // This will help the calling component's .catch() block
            throw new Error("Failed to upload image."); 
        })

    } )
   .catch(err => {
    let errorMsg = err.response ? err.response.data.error : "Server error: Could not get upload URL.";
    console.error("Error getting upload URL:", errorMsg);
    throw new Error(errorMsg);
})

    return imgUrl;

}