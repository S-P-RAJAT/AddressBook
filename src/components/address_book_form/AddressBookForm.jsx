/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './AddressBookForm.css';
import AddressBookService from "../../services/AddressBookService";

import logo from '../../assets/images/logo.png'
import cancelIcon from '../../assets/images/cancel.png';
import { useParams, Link, withRouter } from 'react-router-dom';

const AddressBookForm = (props) => {
    let initialValue = {
        contactId: '',
        name: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        error: {
            name: '',
            phoneNumber: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            email: ''
        }
    }
    const [formValue, setForm] = useState(initialValue);
    const addressBookService = new AddressBookService();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getDataById(params.id);
        }
    }, []);

    const getDataById = (id) => {
        addressBookService
            .getEmployee(id)
            .then((response) => {
                console.log("data is ", response.data.data);
                let obj = response.data.data;
                console.log(obj)
                setData(obj);
            })
            .catch((err) => {
                console.log("err is ", err);
            });
    };

    const setData = (obj) => {
        setForm({
            ...formValue,
            ...obj,
            isUpdate: true,
        });
    };

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
        console.log("Inside change value " + event.target.value)
    }


    const handleValidations = async () => {
        return false;

    }

    const save = async (event) => {
        event.preventDefault();
        console.log("error", formValue);
        if (await handleValidations()) {
            console.log("error", formValue);
            return;
        } else {
            let object = {
                firstName: formValue.name.split(' ')[0],
                lastName: formValue.name.split(' ')[1],
                phoneNumber: formValue.phoneNumber,
                address: formValue.address,
                city: formValue.city,
                state: formValue.state,
                zip: formValue.zip,
                email: formValue.email,
            };
            if (formValue.isUpdate) {
                addressBookService
                    .updateContact(object)
                    .then((data) => {
                        console.log("data after update", data);
                        props.history.push("");
                    })
                    .catch((error) => {
                        console.log("Error after update" + error);
                    });
            } else {
                addressBookService
                    .addContact(object)
                    .then((data) => {
                        alert("Contact added to address book");
                        console.log("Contact added to address book");
                        props.history.push("");
                    })
                    .catch((err) => {
                        console.log("error occured while adding contact");
                    });
            }
        }
    }

    const reset = () => {
        setForm({ ...initialValue, employeeId: formValue.employeeId, isUpdate: formValue.isUpdate });

        console.log(formValue);
    }
    return (
        <div className="address-book-main">
            <header className="header-content header">
                <div className="logo-content">
                    <img className="logo-content-img" src={logo} />
                    <div>
                        <span className="header-text">ADDRESS</span><br />
                        <span className="header-text header-secondary-text">BOOK</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className="form" action="#" onSubmit={save} autoComplete="off">
                    <div className="form-head">
                        <div className="form-head-text">Person Address Form</div>
                        <a href="" className="cancel-button"><img src={cancelIcon} className="form-cancel-img" /></a>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="name">Full Name</label>
                        <div className="row-input">
                            <input className="input" type="text" name="name" id="name" value={formValue.name} onChange={changeValue} required />
                            <error-output className="name-error" for="text">{formValue.error.name}</error-output>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="phone">Phone Number</label>
                        <input className="input" type="text" name="phoneNumber" id="phone" value={formValue.phoneNumber} onChange={changeValue} required />
                        <error-output className="phone-error" for="text">{formValue.error.phoneNumber}</error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="address">Address</label>
                        <textarea className="input" id="address" name="address" value={formValue.address} onChange={changeValue} required></textarea>
                        <error-output className="address-error" for="text">{formValue.error.address}</error-output>
                    </div>
                    <div className="row-content-exp">
                        <div className="oneRow-content">
                            <label className="label text" for="city">City</label>
                            <input className="input" type="text" name="city" id="state" value={formValue.city} onChange={changeValue} required />
                        </div>
                        <div className="oneRow-content">
                            <label className="label text" for="state">State</label>
                            <input className="input" type="text" name="state" id="state" value={formValue.state} onChange={changeValue} required />
                        </div>
                        <div className="zip-container">
                            <label className="label text" for="zip">Zip</label>
                            <input className="input" type="text" name="zip" id="zip" value={formValue.zip} onChange={changeValue} required />
                        </div>
                        <error-output className="zip-error" for="text">{formValue.error.state}</error-output>
                    </div>

                    <div className="row-content">
                        <label className="label text" for="email">Email</label>
                        <input className="input" type="text" name="email" id="email" value={formValue.email} onChange={changeValue} required />
                        <error-output className="email-error" for="text">{formValue.error.email}</error-output>
                    </div>
                    <div className="submit-reset-container">
                        <button type="submit" className="button submit-button-disabled" id="submit-button" >{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                        <button type="button" onClick={reset} className="button reset-button">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(AddressBookForm);