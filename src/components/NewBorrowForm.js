import React, { useState } from 'react';
import '../styles/NewBorrowForm.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function NewBorrowForm() {

    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        matric_or_staff_no: '',
        project_title: '',
        project_code: '',
        phone_number: '',
        start_usage_date: '',
        end_usage_date: '',
        location_of_usage: '',
        purpose_of_usage: '',
        project_supervisor_name: '',
        supervisor_email: '',
        additional_remarks: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        Object.keys(formData).forEach(key => {
            if (formData[key].trim() === '') {
                newErrors[key] = 'Field cannot be blank';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Initialize an object to hold the flattened item data
                let itemsData = {};

                // Flatten selectedItems into formData
                selectedItems.forEach((item, index) => {
                    itemsData[`item_name_${index + 1}`] = item.item_name;
                    // Assuming the quantity to borrow is part of each item object
                    // If not, you'll need to adjust how you get the quantity
                    itemsData[`quantity_${index + 1}`] = item.qty_borrowed; // Adjust this key based on your actual data structure
                });

                const formDataToSend = {
                    ...formData,
                    ...itemsData,
                    completion_time: new Date().toISOString()
                };
                console.log("formDataToSend:", formDataToSend);

                await axios.post('https://loan-sys-express.onrender.com/api/submit-form', formDataToSend);
                setIsSubmitted(true);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };




    if (isSubmitted) {
        return <div className="submission-success">Form submitted successfully!</div>;
    }

    return (
        <div className="form-container">
            <h3 className="form-heading">Items to Borrow:</h3>
            <div className="selected-items">
                {selectedItems.length > 0 ? (
                    <ul className="selected-items-list">
                        {selectedItems.map((item, index) => (
                            <li key={index}>{item.item_name} (Qty: {item.qty_borrowed})</li>
                        ))}
                    </ul>
                ) : (
                    <p>No items selected.</p>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key, index) => (
                    <div className="form-group" key={index}>
                        <label>{key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:</label>
                        <input
                            type={key === 'email' ? 'email' : (key.includes('date') ? 'date' : 'text')}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                        />
                        {errors[key] && <p className="form-error">{errors[key]}</p>}
                    </div>
                ))}
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default NewBorrowForm;
