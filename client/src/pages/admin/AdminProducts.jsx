import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';
import api from '../../utils/api';

const emptyProduct = { name: '', price: '', originalPrice: '', brand: 'GYMJERKSS', category: 'T-Shirts', description: '', image: '', countInStock: '', sizes: 'S,M,L,XL', colors: 'Black,White', tags: '' };

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyProduct);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch { }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            price: Number(form.price),
            originalPrice: Number(form.originalPrice) || Number(form.price),
            countInStock: Number(form.countInStock),
            sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
            colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
            tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
        };

        try {
            if (editing) {
                await api.put(`/products/${editing}`, payload);
            } else {
                await api.post('/products', payload);
            }
            setShowForm(false);
            setEditing(null);
            setForm(emptyProduct);
            fetchProducts();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving product');
        }
    };

    const handleEdit = (product) => {
        setForm({
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice || '',
            brand: product.brand,
            category: product.category,
            description: product.description,
            image: product.image,
            countInStock: product.countInStock,
            sizes: product.sizes?.join(', ') || '',
            colors: product.colors?.join(', ') || '',
            tags: product.tags?.join(', ') || '',
        });
        setEditing(product._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch { }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-heading text-2xl lg:text-3xl font-black uppercase text-white">Products</h1>
                <button
                    onClick={() => { setShowForm(true); setEditing(null); setForm(emptyProduct); }}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" /> Add Product
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-[#111] border border-white/10 rounded-2xl p-6 lg:p-8 w-full max-w-2xl max-h-[85vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-heading text-xl font-bold text-white">{editing ? 'Edit Product' : 'New Product'}</h3>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Name</label>
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark" />
                                </div>
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Brand</label>
                                    <input required value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className="input-dark" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Price (₹)</label>
                                    <input type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="input-dark" />
                                </div>
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Original Price</label>
                                    <input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} className="input-dark" />
                                </div>
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Stock</label>
                                    <input type="number" required value={form.countInStock} onChange={e => setForm({ ...form, countInStock: e.target.value })} className="input-dark" />
                                </div>
                            </div>
                            <div>
                                <label className="text-white text-sm font-medium mb-2 block">Category</label>
                                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-dark">
                                    <option value="T-Shirts">T-Shirts</option>
                                    <option value="Tanks">Tanks</option>
                                    <option value="Hoodies">Hoodies</option>
                                    <option value="Bottoms">Bottoms</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-white text-sm font-medium mb-2 block">Image URL</label>
                                <input required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="input-dark" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="text-white text-sm font-medium mb-2 block">Description</label>
                                <textarea rows={3} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-dark resize-none" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Sizes (comma separated)</label>
                                    <input value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} className="input-dark" placeholder="S, M, L, XL" />
                                </div>
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Colors (comma separated)</label>
                                    <input value={form.colors} onChange={e => setForm({ ...form, colors: e.target.value })} className="input-dark" placeholder="Black, White" />
                                </div>
                            </div>
                            <div>
                                <label className="text-white text-sm font-medium mb-2 block">Tags (comma separated)</label>
                                <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="input-dark" placeholder="bestseller, new-arrival, featured" />
                            </div>
                            <button type="submit" className="w-full btn-primary py-4 text-lg">{editing ? 'Update Product' : 'Create Product'}</button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Products table */}
            <div className="glass rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Product</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Price</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Stock</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Category</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        {Array.from({ length: 5 }).map((_, j) => (
                                            <td key={j} className="px-6 py-4"><div className="skeleton h-4 w-20"></div></td>
                                        ))}
                                    </tr>
                                ))
                            ) : products.map(product => (
                                <tr key={product._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-[#0a0a0a]" />
                                            <span className="text-white text-sm font-medium line-clamp-1">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#ccff00] font-bold text-sm">₹{product.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-medium ${product.countInStock > 10 ? 'text-green-400' : product.countInStock > 0 ? 'text-orange-400' : 'text-red-400'}`}>
                                            {product.countInStock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">{product.category}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(product)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                <Pencil className="h-3.5 w-3.5" />
                                            </button>
                                            <button onClick={() => handleDelete(product._id)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
