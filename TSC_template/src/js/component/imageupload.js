import React from 'react';
import {
  Button
} from 'react-bootstrap';
class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log('handle uploading-', this.state.file);
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        // Get image size for image.
        this.getImageSize(reader.result, function(imageWidth, imageHeight) {
          console.log('getImageSize imageWidth='+imageWidth+',imageHeight='+imageHeight);
            this.setState({
              file: file,
              imagePreviewUrl: reader.result
            });
         });
        
      }
      console.log('_handleImageChange file='+file);
      reader.readAsDataURL(file)
    }

    getImageSize(imageURL, callback) {      
      // Create image object to ascertain dimensions.
      var image = new Image();
   
      // Get image data when loaded.
      image.onload = function() {      
         // No callback? Show error.
         if (!callback) {
            console.log("Error getting image size: no callback. Image URL: " + imageURL);
   
         // Yes, invoke callback with image size.
         } else {
            callback(this.naturalWidth, this.naturalHeight);
         }
      }
   
      // Load image.
      image.src = imageURL;
   }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
  
      return (
        <div className="previewComponent" style={this.props.style}>
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
            <Button className="submitButton" bsStyle="success"
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</Button>
          </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>

            
        

        </div>
      )
    }
  }
    
  

export default ImageUpload ;

