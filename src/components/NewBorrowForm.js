import React, { useState, useEffect } from 'react';
import '../styles/NewBorrowForm.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';

function NewBorrowForm() {
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { setCart } = useCart();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course_code: '',
        project_code: '',
        phone_number: '',
        start_usage_date: '',
        end_usage_date: '',
        project_supervisor_name: '',
        supervisor_email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedErrors = { ...errors, [name]: '' };
        const updatedFormData = { ...formData, [name]: value };

        // Check for weekend dates
        if (name === 'start_usage_date' || name === 'end_usage_date') {
            const date = new Date(value);
            const dayOfWeek = date.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 = Sunday, 6 = Saturday
                updatedErrors[name] = 'Weekend dates are not allowed';
            }
        }

        setFormData(updatedFormData);
        setErrors(updatedErrors);
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        // Email validation regex
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        Object.keys(formData).forEach(key => {
            if (!formData[key].trim() && key !== 'additional_remarks') {
                newErrors[key] = 'Field cannot be blank';
                isValid = false;
            }

            if ((key === 'email' || key === 'supervisor_email') && !emailRegex.test(formData[key].trim())) {
                newErrors[key] = 'Invalid email format';
                isValid = false;
            }

            if ((key === 'start_usage_date' || key === 'end_usage_date') && formData[key]) {
                const date = new Date(formData[key]);
                const dayOfWeek = date.getDay();
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    newErrors[key] = 'Weekend dates are not allowed';
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                let itemsData = selectedItems.reduce((acc, item, index) => {
                    acc[`item_id_${index + 1}`] = item.item_id;
                    acc[`item_name_${index + 1}`] = item.item_name;
                    acc[`quantity_${index + 1}`] = item.qty_borrowed;
                    return acc;
                }, {});

                const formDataToSend = {
                    ...formData,
                    ...itemsData,
                    completion_time: new Date().toISOString()
                };

                await axios.post('https://express-server-1.fly.dev/api/submit-form', formDataToSend);
                setIsSubmitted(true);
                setCart([]);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                            className={errors[key] ? 'input-error' : ''}
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
