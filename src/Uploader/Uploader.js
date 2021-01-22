import React from "react";
// import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import firebase from '../firebase'
 
export default class Uploader extends React.Component {
  state = {
    filenames: [],
    downloadURLs: [],
    isUploading: false,
    uploadProgress: 0,
    name: this.props.url
  };
 
  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });
 
  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });
 
  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };
 
  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();
 
    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
  };
 
  render() {
    console.log(this.props.url)
    return (
      <div>
        <input value={this.props.url} disabled/>
        <FileUploader
          accept="image/*"
          name="image-uploader-multiple"
          randomizeFilename
          storageRef={firebase.storage().ref(this.props.url)}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          multiple
        />
      </div>
    );
  }
}
