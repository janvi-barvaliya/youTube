import React, { useRef, useState } from 'react'
import API from '../../axios';
import "./Setting.css";
import styled from 'styled-components';



const Setting = () => {
    const [avatar, setAvatar] = useState(null);
    const [cover, setCover] = useState(null);
    const [alert, setAlert] = useState({
        message: '',
        isOpen: false,
        redirectTo: null,
    });
    const [formData, setFormData] = useState({
        name: '',
        username: '',
    });
    const [updatePassword, setUpdatePassword] = useState({
        currentPassword: '',
        newPassword: '',
    });

    const avatarInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const handleAvatarClick = () => {
        avatarInputRef.current.click();
    };

    const handleCoverClick = () => {
        coverInputRef.current.click();
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
        }
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCover(file);
        }
    };

    // Updating Avatar
    const handleUpdateAvatar = async () => {
        if (!avatar) return;

        const formData = new FormData();
        formData.append('avatar', avatar);

        try {
            await API.patch('/api/v1/users/update-avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setAlert({
                message: 'Avatar updated successfully',
                isOpen: true,
            });
            setAvatar(null);
        } catch (error) {
            console.error('Error while updating avatar image: ', error);
        }
    };

    // Updating Cover Image
    const handleUpdateCoverImage = async () => {
        if (!cover) return;

        const formData = new FormData();
        formData.append('coverImage', cover);

        try {
            await API.patch('/api/v1/users/update-coverImage', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setAlert({
                message: 'Cover Image updated successfully',
                isOpen: true,
            });
            setCover(null);
        } catch (error) {
            console.error('Error while updating cover image: ', error);
        }
    };

    // Updating Details
    const handleUpdateDetails = async () => {
        const { name, username } = formData;
        if (!(name || username)) {
            setAlert({
                message: 'name or username is required!',
                isOpen: true,
            });
        }

        try {
            await API.patch('/api/v1/users/update-details', { name, username });
            setAlert({
                message: 'Details updated successfully',
                isOpen: true,
            });
            setFormData({ name: '', username: '' });
        } catch (error) {
            console.error('Error while updating the details: ', error);
        }
    };

    // Updating Password
    const handleUpdatePassword = async () => {
        const { currentPassword, newPassword } = updatePassword;

        try {
            await API.patch('/api/v1/users/update-password', {
                currentPassword,
                newPassword,
            });
            setAlert({
                message: 'Password updated successfully',
                isOpen: true,
            });
            setUpdatePassword({ currentPassword: '', newPassword: '' });
        } catch (error) {
            console.error('Error while updating password: ', error);
        }
    };
    return (
        <div className="container">
            <div className="content">
                <div className="updater">
                    <h2>Update Avatar</h2>
                    <div className="avtar" onClick={handleAvatarClick}>
                        {avatar ? (
                            <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" />
                        ) : (
                            <i className="bx bxs-camera"></i>
                        )}
                        <input type="file"
                            ref={avatarInputRef}
                            style={{ display: 'none' }}
                            accept='image/*'
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <button onClick={handleAvatarChange}>Update Avatar</button>
                </div>
                <div className="updater">
                    <h2>Update Cover Image</h2>
                    <div className="coverImage" onClick={handleCoverClick}>
                        {cover ? (
                            <img src={URL.createObjectURL(cover)} alt="Cover Preview" />
                        ) : (
                            <>
                                <i className="bx bxs-camera"></i>
                                <span>Cover Image</span>
                            </>

                        )}
                        <input type="file"
                            ref={coverInputRef}
                            style={{ display: 'none' }}
                            accept='image/*'
                            onChange={handleCoverChange}
                        />
                    </div>
                    <button onClick={handleUpdateCoverImage}>Update Cover Image</button>
                </div>
            </div>
            <div className="content">
                <div className="updater">
                    <h2>Update Details</h2>
                    <div className="updateDetails">
                        <div className="inputField">
                            <i className="bx bxs-user-circle"></i>
                            <input type="text"
                                placeholder='Username'
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                        <div className="inputField">
                            <i className="bx bxs-user-circle"></i>
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <button onClick={handleUpdateDetails}>Update Details</button>
                </div>
                <div className="updater">
                    <h2>Update Password</h2>
                    <div className="updatePassword">
                        <div className="inputField">
                            <i className="bx bxs-lock-alt"></i>
                            <input
                                type="password"
                                placeholder="Current password"
                                value={updatePassword.currentPassword}
                                onChange={(e) =>
                                    setUpdatePassword({
                                        ...updatePassword,
                                        currentPassword: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="inputField">
                            <i className="bx bxs-lock-alt"></i>
                            <input
                                type="password"
                                placeholder="New password"
                                value={updatePassword.newPassword}
                                onChange={(e) =>
                                    setUpdatePassword({
                                        ...updatePassword,
                                        newPassword: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <button onClick={handleUpdatePassword}>Update Password</button>
                </div>
            </div>
        </div>
    )
}

export default Setting