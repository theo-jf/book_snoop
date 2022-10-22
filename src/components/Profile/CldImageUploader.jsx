import { useSelector } from "react-redux";

import { openUploadWidget } from "../../utils/CloudinaryService";

// MUI Imports
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function CldImageUploader(props) {
  const user = useSelector(store => store.user)
  const uploadImageWidget = () => {
    console.log('PROPS:', props);
    let myUploadWidget = openUploadWidget(
      {
        cloudName: props.cloud_name,
        uploadPreset: props.upload_preset,
        tags: [`${user.id}`],
        maxImageWidth: 600,
        sources: ["local", "url", "camera"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
          props.onImageUpload(result.info.public_id);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    // <button className="greenButton" onClick={uploadImageWidget}>
    <IconButton id="imageUploader" className="addProfilePicture" color="primary" aria-label="upload picture" component="label" onClick={uploadImageWidget}>
        <PhotoCamera />
    </IconButton>
  );
};