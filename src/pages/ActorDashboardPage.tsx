// In src/pages/ActorDashboardPage.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import OrderDetailsModal from '../components/OrderDetailsModal'; // Import the modal
import { ChevronDown, ChevronUp } from 'lucide-react';
// --- NEW: Define the controlled options for our dropdowns ---
const genderOptions = ["Male", "Female", "Non-Binary"];
const languageOptions = ["English (US)", "English (UK)", "Arabic (MSA)", "Arabic (Egyptian)", "French (France)", "Spanish (Spain)"];
const tagOptions = ["Warm", "Deep", "Conversational", "Corporate", "Announcer", "Character", "Young Adult", "Senior"];

// 1. Define clear, specific interfaces for our data
interface Actor {
  id: string;
  ActorName: string;
  bio: string;
  Gender: string;
  slug: string; // Add this line
  Language: string;
  Tags: string;
  BaseRate_per_Word: number;
  revisions_allowed: number; // Add this line
  WebMultiplier: number;
  BroadcastMultiplier: number;
  HeadshotURL?: string;
  // Add other fields you need
}

interface Order {
  actor_id: string;
  id: string;
  order_id_string: string;
  client_name: string;
  client_email: string; // added to match OrderDetailsModal's expected type
  status: string;
  script: string;
  final_audio_url?: string;
  // Add other fields from your 'orders' table as needed
}

const ActorDashboardPage = () => {
    // 2. All state is declared once at the top
    const [loading, setLoading] = useState(true);
    const [actorData, setActorData] = useState<Partial<Actor>>({});
    const [orders, setOrders] = useState<Order[]>([]);
    const [message, setMessage] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const navigate = useNavigate();
// NEW: State to manage the collapsible profile section
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
// --- NEW: State to manage the active tab ---
    const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
    // 3. A single, combined function to fetch all necessary data
    const fetchData = useCallback(async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            navigate('/actor-auth');
            return;
        }

        const { data: actorProfile } = await supabase.from('actors').select('*').eq('user_id', user.id).single();
        if (!actorProfile) {
            setMessage('Could not load your profile.');
            setLoading(false);
            return;
        }
        setActorData(actorProfile);

        const { data: orderData } = await supabase.from('orders').select('*').eq('actor_id', actorProfile.id).order('created_at', { ascending: false });
        if (orderData) {
            setOrders(orderData as Order[]);
        }
        
        setLoading(false);
    }, [navigate]);

    // 4. One useEffect to run the data fetching function
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Saving...');
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
// Clean the slug: lowercase, no spaces
        const cleanedSlug = (actorData.slug || '').toLowerCase().replace(/\s+/g, '-');

        const { error } = await supabase
            .from('actors')
            .update({
                ActorName: actorData.ActorName,
                Gender: actorData.Gender,
                Language: actorData.Language,
                slug: cleanedSlug, // Save the cleaned slug
                Tags: actorData.Tags,
                BaseRate_per_Word: actorData.BaseRate_per_Word,
                WebMultiplier: actorData.WebMultiplier,
                BroadcastMultiplier: actorData.BroadcastMultiplier,
                revisions_allowed: actorData.revisions_allowed, // Add this line to save the new value
                bio: actorData.bio, // Add this line
            })
            .eq('user_id', user.id);

        if (error) {
            // Check for the specific "unique constraint" error
            if (error.message.includes('duplicate key value violates unique constraint "actors_slug_key"')) {
                setMessage('Error: This URL slug is already taken. Please choose another.');
            } else {
                setMessage(`Error: ${error.message}`);
            }
        } else {
            // Update local state with the cleaned slug
            setActorData(prev => ({ ...prev, slug: cleanedSlug }));
            setMessage('Profile updated successfully!');
    }
};
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setActorData({ ...actorData, [name]: value });
    };

    // --- NEW: Function to handle adding/removing tags ---
    const handleTagToggle = (tagToToggle: string) => {
        const currentTags = actorData.Tags ? actorData.Tags.split(',').map(t => t.trim()) : [];
        const newTags = currentTags.includes(tagToToggle)
            ? currentTags.filter(t => t !== tagToToggle) // If tag exists, remove it
            : [...currentTags, tagToToggle]; // If tag doesn't exist, add it
            setActorData({ ...actorData, Tags: newTags.join(', ') });
            };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/actor-login');
    };


    // --- NEW: Function to handle profile picture upload ---
    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("User not found");

            // Use the user's ID as the file name. This ensures it's unique and can be replaced.
            const filePath = user.id;
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true }); // upsert: true is the magic for replacing the file

            if (uploadError) throw uploadError;

            // Get the public URL of the newly uploaded image
            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const newAvatarUrl = urlData.publicUrl;

            // Update the URL in the actors table
            const { error: updateError } = await supabase
                .from('actors')
                .update({ HeadshotURL: newAvatarUrl })
                .eq('user_id', user.id);

            if (updateError) throw updateError;
            
            // Update the local state to show the new image instantly
            setActorData(prev => ({ ...prev, HeadshotURL: newAvatarUrl }));
            setMessage("Profile picture updated!");

        } catch (error) {
            const err = error as Error;
            setMessage(`Error: ${err.message}`);
        } finally {
            setUploading(false);
        }
    };


    if (loading && !selectedOrder) { // Only show full-page loader initially
        return <div className="min-h-screen bg-slate-900 text-white text-center p-8">Loading Dashboard...</div>;
    }

    // --- NEW: Filter orders based on the active tab ---
    const filteredOrders = orders.filter(order => {
        if (activeTab === 'active') {
            return order.status !== 'Completed';
        }
        return order.status === 'Completed';
    });

    return (
        <div className="min-h-screen bg-slate-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold">Log Out</button>
                </div>

                {/* --- THIS IS THE MISSING SECTION --- */}
                <div className="bg-slate-800 rounded-lg border border-slate-700 mb-8">
                    {/* 1. This is now a clickable header */}
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="w-full flex justify-between items-center p-6"
                    >
                        <h2 className="text-2xl font-bold text-white">Manage Your Profile</h2>
                        {/* 2. An icon to show the state */}
                        {isProfileOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                    </button>

                    {/* 3. The form is now conditionally rendered */}
                    {isProfileOpen && (
                    <div className="p-6 pt-0">
                        {/* --- NEW: Avatar Upload UI --- */}
                        <div className="flex flex-col items-center gap-4 mb-6 border-b border-slate-700 pb-6">
                            <img
                                src={actorData.HeadshotURL || 'https://via.placeholder.com/150'} // Use a placeholder if no image
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-slate-600"
                            />
                            <label htmlFor="avatar-upload" className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm">
                                {uploading ? 'Uploading...' : 'Change Picture'}
                            </label>
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/png, image/jpeg"
                                onChange={handleAvatarUpload}
                                disabled={uploading}
                            />
                        </div>
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* --- NEW: Bio Textarea --- */}
                        <div className="md:col-span-2">
                            <label htmlFor="bio" className="block text-sm font-medium text-slate-300">Your Bio</label>
                            <textarea
                                name="bio"
                                id="bio"
                                rows={4}
                                value={actorData.bio || ''}
                                onChange={(e) => setActorData({ ...actorData, bio: e.target.value })}
                                className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white"
                                placeholder="Tell clients a little about your voice and experience..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="ActorName" className="block text-sm font-medium text-slate-300">Display Name</label>
                            <input type="text" name="ActorName" id="ActorName" value={actorData.ActorName || ''} onChange={handleInputChange} className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white" />
                        </div>

                        {/* --- NEW: Slug (Username) Input --- */}
                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-slate-300">Username / URL</label>
                                <input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    value={actorData.slug || ''}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white"
                                    placeholder="e.g., your-name"
                                />
                            </div>

                        {/* Gender Dropdown */}
                            <div>
                                <label htmlFor="Gender" className="block text-sm font-medium text-slate-300">Gender</label>
                                <select name="Gender" id="Gender" value={actorData.Gender || ''} onChange={handleInputChange} className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white">
                                    <option value="" disabled>Select gender...</option>
                                    {genderOptions.map(option => <option key={option} value={option}>{option}</option>)}
                                </select>
                            </div>
                            
                            {/* Language Dropdown */}
                            <div>
                                <label htmlFor="Language" className="block text-sm font-medium text-slate-300">Primary Language</label>
                                <select name="Language" id="Language" value={actorData.Language || ''} onChange={handleInputChange} className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white">
                                    <option value="" disabled>Select language...</option>
                                    {languageOptions.map(option => <option key={option} value={option}>{option}</option>)}
                                </select>
                            </div>

                            {/* Tag Selector */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-300">Tags (Select all that apply)</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tagOptions.map(tag => {
                                        const isSelected = (actorData.Tags || '').includes(tag);
                                        return (
                                            <button
                                                type="button"
                                                key={tag}
                                                onClick={() => handleTagToggle(tag)}
                                                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${isSelected ? 'bg-purple-600 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}
                                            >
                                                {tag}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>


                        <div className="md:col-span-2 pt-4 border-t border-slate-700">
                            <h3 className="text-xl font-bold text-white">Your Rates (MAD)</h3>
                        </div>
                        <div>
                            <label htmlFor="BaseRate_per_Word" className="block text-sm font-medium text-slate-300">Base Rate per Word</label>
                            <input type="number" step="0.01" name="BaseRate_per_Word" id="BaseRate_per_Word" value={actorData.BaseRate_per_Word || 0} onChange={handleInputChange} className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white" />
                        </div>
                        <div>
                            <label htmlFor="WebMultiplier" className="block text-sm font-medium text-slate-300">Web Usage Multiplier</label>
                            <input type="number" step="0.1" name="WebMultiplier" id="WebMultiplier" value={actorData.WebMultiplier || 1} onChange={handleInputChange} className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white" />
                        </div>
                        <div>
                            <label htmlFor="BroadcastMultiplier" className="block text-sm font-medium text-slate-300">Broadcast Multiplier</label>
                            <input type="number" step="0.1" name="BroadcastMultiplier" id="BroadcastMultiplier" value={actorData.BroadcastMultiplier || 1} onChange={handleInputChange} className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white" />
                        </div>
                        {/* --- NEW: Revisions Offered Input --- */}
                        <div>
                            <label htmlFor="revisions_allowed" className="block text-sm font-medium text-slate-300">Revisions Offered</label>
                            <input
                                type="number"
                                name="revisions_allowed"
                                id="revisions_allowed"
                                value={actorData.revisions_allowed || 2}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white"
                            />
                        </div>
                        <div className="md:col-span-2 text-right">
                           <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold">Save Changes</button>
                        </div>
                    </form>
                    {message && <p className="mt-4 text-center text-sm text-green-400">{message}</p>}
                        </div>
                    )}
                </div>

                {/* --- THIS IS THE MODIFIED ORDERS SECTION --- */}
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Your Orders</h2>
                        {/* Tab Buttons */}
                        <div className="flex gap-2 p-1 bg-slate-900 rounded-lg">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`px-4 py-1 rounded-md text-sm font-semibold transition ${activeTab === 'active' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setActiveTab('completed')}
                                className={`px-4 py-1 rounded-md text-sm font-semibold transition ${activeTab === 'completed' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map(order => (
                                <button
                                    key={order.id}
                                    onClick={() => setSelectedOrder(order)}
                                    className="w-full bg-slate-700 p-4 rounded-lg text-left hover:bg-slate-600 transition"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-white">Order #{order.order_id_string}</p>
                                            <p className="text-sm text-slate-400">Client: {order.client_name}</p>
                                        </div>
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${order.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <p className="text-slate-400 text-center py-4">
                                You have no {activeTab} orders.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdate={fetchData} 
                />
            )}
        </div>
    );
};

export default ActorDashboardPage;