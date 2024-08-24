'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../lib/firebaseConfig';

const AddProductForm: React.FC = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        vendor: '',
        type: '',
        tags: '',
        description: '',
        deviceType: '',
        stock: '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [authorized, setAuthorized] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const db = getFirestore(app);
    const storage = getStorage(app);
    const auth = getAuth(app);

    const allowedEmails = ['dev.mhany@gmail.com', 'allowedemail2@example.com'];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                if (allowedEmails.includes(currentUser.email || '')) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } else {
                setUser(null);
                setAuthorized(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Set the image preview URL
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!authorized) {
                alert('You are not authorized to add products.');
                return;
            }

            if (!image) {
                alert('Please upload an image.');
                return;
            }

            // Upload image to Firebase Storage
            const storageRef = ref(storage, `products/${image.name}`);
            await uploadBytes(storageRef, image);
            const imageUrl = await getDownloadURL(storageRef);

            console.log('Image uploaded successfully:', imageUrl); // Log the image URL

            // Save product data to Firestore
            await addDoc(collection(db, 'products'), {
                ...product,
                imageUrl,
                createdAt: new Date(),
            });

            console.log('Product added successfully:', product); // Log the product data

            // Reset the form
            setProduct({
                name: '',
                price: '',
                category: '',
                vendor: '',
                type: '',
                tags: '',
                description: '',
                deviceType: '',
                stock: '',
            });
            setImage(null);
            setImagePreview(null);
            setSuccessMessage('Product saved successfully!'); // Set success message

        } catch (error) {
            console.error('Error adding product: ', error);
            alert('Failed to add product.');
        }
    };

    if (!user) {
        return <Typography variant="h6">Please sign in to add products.</Typography>;
    }

    if (!authorized) {
        return <Typography variant="h6">You are not authorized to access this page.</Typography>;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h4">Add New Product</Typography>
            {successMessage && <Typography variant="h6" color="success.main">{successMessage}</Typography>}
            <TextField
                label="Name"
                name="name"
                value={product.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Price"
                name="price"
                value={product.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                required
            />
            <TextField
                label="Category"
                name="category"
                value={product.category}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                select
            >
                <MenuItem value="screen">Screen Protector</MenuItem>
                <MenuItem value="skins">Skins</MenuItem>
                <MenuItem value="laser">LaserCNC</MenuItem>
                <MenuItem value="cut">Cutter Plotter</MenuItem>
            </TextField>
            <TextField
                label="Vendor"
                name="vendor"
                value={product.vendor}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Type"
                name="type"
                value={product.type}
                onChange={handleChange}
                fullWidth
                margin="normal"
                select
            >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="refurbished">Refurbished</MenuItem>
            </TextField>
            <TextField
                label="Tags"
                name="tags"
                value={product.tags}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={product.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <TextField
                label="Device Type"
                name="deviceType"
                value={product.deviceType}
                onChange={handleChange}
                fullWidth
                margin="normal"
                select
            >
                <MenuItem value="mobile">Mobile</MenuItem>
                <MenuItem value="tablet">Tablet</MenuItem>
                <MenuItem value="laptop">Laptop</MenuItem>
                <MenuItem value="otherDevicesType">Others</MenuItem>
            </TextField>
            <TextField
                label="Stock"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                required
            />
            {imagePreview && (
                <Box sx={{ mt: 2 }}>
                    <img src={imagePreview} alt="Product Preview" style={{ maxWidth: '100%', maxHeight: 200 }} />
                </Box>
            )}
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
                Upload Image{' '}
                <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                Add Product
            </Button>
        </Box>
    );
};

export default AddProductForm;
