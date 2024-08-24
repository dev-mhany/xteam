'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    MenuItem,
    Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import Image from 'next/image';
import { fetchProducts, updateProduct, deleteProduct } from '../utils/productUtils';
import { auth } from '../lib/firebaseConfig'; // Import Firebase auth instance
import { onAuthStateChanged, User } from 'firebase/auth'; // Import Firebase auth methods
import { Product } from '../types';
import placeHolder from '../assets/images/landscape-placeholder-svgrepo-com.svg';

const allowedEmails = ['dev.mhany@gmail.com', 'eyadwael444@gmail.com'];

const ProductManagementPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openImage, setOpenImage] = useState(false);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [authorized, setAuthorized] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Set up Firebase Auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
                setAuthorized(allowedEmails.includes(authUser.email ?? ''));
            } else {
                setUser(null);
                setAuthorized(false);
            }
        });

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    // Load products if authorized
    useEffect(() => {
        if (authorized) {
            const loadProducts = async () => {
                try {
                    const productsData = await fetchProducts();
                    console.log('Fetched Products:', productsData);
                    setProducts(productsData);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };
            loadProducts();
        }
    }, [authorized]);

    const handleEdit = (product: Product) => {
        setSelectedProduct({
            ...product,
            tags: Array.isArray(product.tags) ? product.tags : [],
        });
        setNewImage(null);
        setOpenEdit(true);
    };

    const handleDelete = (product: Product) => {
        setSelectedProduct(product);
        setOpenDelete(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedProduct(null);
        setNewImage(null);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        setSelectedProduct(null);
    };

    const handleOpenImage = (product: Product) => {
        setSelectedProduct(product);
        setOpenImage(true);
    };

    const handleCloseImage = () => {
        setOpenImage(false);
        setSelectedProduct(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedProduct) {
            const { name, value } = e.target;
            if (name === 'tags') {
                setSelectedProduct({
                    ...selectedProduct,
                    tags: value.split(',').map(tag => tag.trim()),
                });
            } else {
                setSelectedProduct({
                    ...selectedProduct,
                    [name]: value,
                });
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewImage(file);
        }
    };

    const handleSave = async () => {
        if (selectedProduct) {
            try {
                const updatedProduct = await updateProduct(selectedProduct, newImage || undefined);
                setProducts((prevProducts) =>
                    prevProducts.map((prod) =>
                        prod.id === updatedProduct.id ? updatedProduct : prod
                    )
                );
                setOpenEdit(false);
                setSelectedProduct(null);
                setNewImage(null);
            } catch (error) {
                console.error("Error updating product:", error);
                alert("Failed to update product.");
            }
        }
    };

    const confirmDelete = async () => {
        if (selectedProduct) {
            try {
                await deleteProduct(selectedProduct);
                setProducts((prevProducts) =>
                    prevProducts.filter((prod) => prod.id !== selectedProduct.id)
                );
                setOpenDelete(false);
                setSelectedProduct(null);
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product.");
            }
        }
    };

    if (!user) {
        return <Typography variant="h6">Please sign in to manage products.</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!authorized) {
        return <Typography variant="h6">You are not authorized to access this page.</Typography>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Product Management
            </Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Vendor</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenImage(product)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                    <Image
                                        src={product.imageUrl ?? placeHolder}
                                        alt={product.name}
                                        width={50}
                                        height={50}
                                        objectFit="cover"
                                    />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.vendor}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(product)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(product)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* View Product Image Dialog */}
            {selectedProduct && (
                <Dialog open={openImage} onClose={handleCloseImage}>
                    <DialogTitle>{selectedProduct.name}</DialogTitle>
                    <DialogContent>
                        <Image
                            src={selectedProduct.imageUrl ?? placeHolder}
                            alt={selectedProduct.name}
                            width={400}
                            height={400}
                            objectFit="cover"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseImage} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Edit Product Dialog */}
            {selectedProduct && (
                <Dialog open={openEdit} onClose={handleCloseEdit}>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Modify the product details below and click save to update the product.
                        </DialogContentText>
                        <TextField
                            label="Name"
                            name="name"
                            value={selectedProduct.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Price"
                            name="price"
                            value={selectedProduct.price}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            label="Category"
                            name="category"
                            value={selectedProduct.category}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
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
                            value={selectedProduct.vendor}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Type"
                            name="type"
                            value={selectedProduct.type}
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
                                value={Array.isArray(selectedProduct.tags) ? selectedProduct.tags.join(', ') : ''}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Tooltip>
                        <TextField
                            label="Description"
                            name="description"
                            value={selectedProduct.description}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="Device Type"
                            name="deviceType"
                            value={selectedProduct.deviceType}
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
                            value={selectedProduct.stock}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="number"
                        />
                        <Box sx={{ mt: 2 }}>
                            <Typography>Current Image:</Typography>
                            <Image
                                src={selectedProduct.imageUrl ?? placeHolder}
                                alt={selectedProduct.name}
                                width={100}
                                height={100}
                                objectFit="cover"
                            />
                        </Box>
                        <Button variant="contained" component="label" sx={{ mt: 2 }}>
                            Upload New Image{' '}
                            <input type="file" hidden onChange={handleImageChange} />
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Delete Product Confirmation Dialog */}
            {selectedProduct && (
                <Dialog open={openDelete} onClose={handleCloseDelete}>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`Are you sure you want to delete the product "${selectedProduct.name}"? This action cannot be undone.`}
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDelete} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default ProductManagementPage;
