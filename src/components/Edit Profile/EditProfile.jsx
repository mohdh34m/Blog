import React, { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import supabase from '../../config/supabaseClient';
import EditProfileSkeleton from './EditProfileSkeleton';
import { useNavigate } from 'react-router-dom'

function EditProfile() {
    const [userId, setUserId] = useState('');
    const [media, setMedia] = useState([]);
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const { data } = await supabase.auth.getSession();
            console.log()
            if (data) {
                setUserId(data.session.user.id);
                const { data: profileData, error: profileError } = await supabase
                    .from('profile')
                    .select('*')
                    .eq('id', data.session.user.id)
                    .single();
                if (profileData) {
                    setProfile(profileData);
                    setIsLoading(false);
                } else {
                    console.log("Profile error:", profileError);
                    navigate('/signin');
                }
            } else {
                navigate('/signin');
            }
        } catch (e) {
            console.log(e);
            navigate('/signin');
        }
    };

    async function uploadImage(e) {
        let file = e.target.files[0];
        const { data, error } = await supabase
            .storage
            .from('users-pics')
            .upload(userId + "/" + uuidv4(), file);

        if (data) {
            const imageUrl = `https://jktvcommsxlpbwptzyqe.supabase.co/storage/v1/object/public/${data.fullPath}`;
            const { error: updateError } = await supabase
                .from('profile')
                .update({ 'profile-pic': imageUrl })
                .eq('id', userId);
            getMedia();
        } else {
            console.log(error);
        }
    }

    async function getMedia() {
        const { data, error } = await supabase
            .from('profile')
            .select('profile-pic')
            .eq('id', userId);
        if (data) {
            setMedia(data);
        } else {
            console.log(71, error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('profile')
                .update({ username: username })
                .eq('id', userId);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (userId) {
            getMedia();
        }
    }, [userId]);

    return (
        <div>
            {userId ? (isLoading ? <EditProfileSkeleton /> : (
                <div className='edit-profile'>
                    <form onSubmit={handleSubmit}>
                        {media.map((mediaItem) => (
                            <div key={mediaItem['profile-pic']}>
                                <img src={mediaItem['profile-pic']} alt="Profile" />
                            </div>
                        ))}
                        <input type="file" onChange={uploadImage} />
                        <label htmlFor="name">Username</label>
                        <input type="text" name="name" className='name' defaultValue={profile.username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' className='email' value={profile.email} disabled />
                        <button type='submit'>Update</button>
                    </form>
                </div>
            )) : navigate('/signin')}
        </div>
    );
}

export default EditProfile;
