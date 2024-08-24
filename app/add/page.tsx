'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    MenuItem,
    Tooltip
} from '@mui/material';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../lib/firebaseConfig';
import { addProduct } from '../utils/productUtils';
import { Product } from '../types';
import Image from 'next/image';

const AddProductForm: React.FC = () => {
    const [product, setProduct] = useState<Omit<Product, 'id' | 'imageUrl'>>({
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

    const auth = getAuth(app);
    const allowedEmails = useMemo(() => ['dev.mhany@gmail.com', 'eyadwael444@gmail.com'], []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthorized(currentUser ? allowedEmails.includes(currentUser.email ?? '') : false);
        });

        return () => unsubscribe();
    }, [auth, allowedEmails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
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

            const tagsArray = Array.isArray(product.tags) ? product.tags : product.tags.split(',').map(tag => tag.trim());
            await addProduct({ ...product, tags: tagsArray }, image);

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
            setSuccessMessage('Product saved successfully!');
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
            <Tooltip title="Enter tags separated by commas">
                <TextField
                    label="Tags"
                    name="tags"
                    value={product.tags}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
            </Tooltip>
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
                    <Image src={imagePreview} alt="Product Preview" style={{ maxWidth: '100%', maxHeight: 200 }} />
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
