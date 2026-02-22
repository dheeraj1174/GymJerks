import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../utils/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/users');
            setUsers(data);
        } catch { }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this user?')) return;
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch { }
    };

    return (
        <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-black uppercase text-white mb-8">Users</h1>

            <div className="glass rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">User</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Email</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Role</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Joined</th>
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
                            ) : users.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-10 text-gray-500">No users</td></tr>
                            ) : users.map(user => (
                                <tr key={user._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ccff00] to-green-600 flex items-center justify-center text-black text-xs font-bold">
                                                {user.name?.charAt(0)?.toUpperCase()}
                                            </div>
                                            <span className="text-white text-sm font-medium">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${user.isAdmin ? 'bg-[#ccff00]/10 text-[#ccff00]' : 'bg-white/5 text-gray-400'}`}>
                                            {user.isAdmin ? 'Admin' : 'Customer'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        {!user.isAdmin && (
                                            <button onClick={() => handleDelete(user._id)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        )}
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

export default AdminUsers;
