import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  //HOOKS REACT-PART
  const [formData, setFormData] = useState({
    authorizationKey: "",
    title: "",
    description: "",
    tags: "",
    date: "",
    software: "",
    thumbnailImg: null,
    sourceFile: null,
  });
  //HOOKS FOR HANDLING ERRORS
  const [errors, setErrors] = useState({});
  //HOOKS FOR SET TRUE FALSE WHEN FORM WILL SUBMIT
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  //SAVING CHANGES WHEN A USER INPUT ON FIELD
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //HANDLING CHANGES WHEN FILE WILL UPLOAD
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };
  //validating form and give erros
  const validateForm = () => {
    const newErrors = {};

    if (!formData.authorizationKey.trim()) {
      newErrors.authorizationKey = "Authorization Key is required";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.tags.trim()) {
      newErrors.tags = "Tags are required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.software.trim()) {
      newErrors.software = "Software is required";
    }

    if (!formData.thumbnailImg) {
      newErrors.thumbnailImg = "Thumbnail Image is required";
    }

    if (!formData.sourceFile) {
      newErrors.sourceFile = "Source File is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //handling the part when user will submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formDataToSend = new FormData();

        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        const response = await axios.post("https://jsonplaceholder.typicode.com/posts", formData);
        console.log(response.data)
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    }
  };

  return (
    //HTML CODE

    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>UDesignDaily</h1>
        <h2>Upload Files</h2>
        
        <label htmlFor="authorizationKey">Authorization Key</label>
        <input
          type="text"
          name="authorizationKey"
          value={formData.authorizationKey}
          onChange={handleChange}
          />
          {errors.authorizationKey && <p className="error">{errors.authorizationKey}</p>}

        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />

        {errors.title && <p className="error">{errors.title}</p>}
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}

        <label htmlFor="tags">Tags</label>
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
        {errors.tags && <p className="error">{errors.tags}</p>}

        <label htmlFor="date">Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />

        {errors.date && <p className="error">{errors.date}</p>}

        <label htmlFor="software">Software</label>
        <select name="software" value={formData.software} onChange={handleChange}>
          <option value="">Select Software</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
        {errors.software && <p className="error">{errors.software}</p>}

        <label htmlFor="thumbnailImg">Thumbnail Image</label>
        <input
          type="file"
          name="thumbnailImg"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          />
          {errors.thumbnailImg && <p className="error">{errors.thumbnailImg}</p>}
        <label htmlFor="sourceFile">Source File</label>
        <input type="file" name="sourceFile" onChange={handleFileChange} />
        {errors.sourceFile && <p className="error">{errors.sourceFile}</p>}

        <button type="submit">Submit</button>
        {isSubmitted && <p className="success-message">Form submitted successfully!</p>}
      </form>
    </div>
  );
};

export default UserForm;
