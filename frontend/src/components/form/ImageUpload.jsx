import React, { useState } from 'react';
import './ImageUpload.scss';

const ImageUpload = ({ defaultImage, handleChange }) => {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        handleChange(e);
    };

    return (
        <div className="image-upload-container">
            <div className="image-upload-form">
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload-input"
                />
                <div className="image-preview">
                    <img src={preview || defaultImage} alt="Preview" className="image-preview-img" />
                </div>
                <label htmlFor="image-upload" className="image-upload-label">
                    <div className="icon-container">
                        <i className="bx bx-camera"></i> 
                    </div>
                </label>
                
            </div>
        </div>
    );
};

export default ImageUpload;