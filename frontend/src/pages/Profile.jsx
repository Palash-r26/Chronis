import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { User, Mail, Calendar, ShieldCheck, Upload } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: user?.name || '',
    profile_photo_url: user?.profile_photo_url || ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      const response = await api.put('/api/users/me', formData);
      setUser(response.data);
      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 256;
          let { width, height } = img;
          
          if (width > height && width > MAX_SIZE) {
            height = Math.round(height * (MAX_SIZE / width));
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = Math.round(width * (MAX_SIZE / height));
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          setFormData({ ...formData, profile_photo_url: canvas.toDataURL('image/jpeg', 0.8) });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long', year: 'numeric'
  }) : 'Recently';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h2 className="text-3xl font-display font-bold mb-8">Your Profile</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="glass-panel rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary p-1 mb-6 shadow-lg shadow-primary/20 relative group mx-auto">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                {formData.profile_photo_url || user?.profile_photo_url ? (
                  <img src={formData.profile_photo_url || user?.profile_photo_url} alt="Profile" className="w-full h-full object-cover bg-surface" />
                ) : (
                  <div className="w-full h-full bg-surface flex items-center justify-center text-4xl font-display font-bold text-white">
                    {getInitials(formData.name || user?.name)}
                  </div>
                )}
                {isEditing && (
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                    <Upload size={24} className="mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                )}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold font-display">{user?.name}</h3>
            <p className="text-textSecondary mb-6">{user?.email}</p>
            
            <div className="w-full pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center text-sm text-textSecondary">
                <Calendar size={16} className="mr-3 text-primary" />
                Joined {joinedDate}
              </div>
              <div className="flex items-center text-sm text-textSecondary">
                <ShieldCheck size={16} className="mr-3 text-secondary" />
                Data Source: {user?.linked_user_id}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="glass-panel rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-display font-bold">Personal Information</h3>
              <button 
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (!isEditing) setFormData({ name: user?.name || '', profile_photo_url: user?.profile_photo_url || '' });
                }}
                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {message && <div className="mb-6 p-3 bg-secondary/10 border border-secondary/20 text-secondary rounded-lg text-sm">{message}</div>}
            {error && <div className="mb-6 p-3 bg-warning/10 border border-warning/20 text-warning rounded-lg text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-textSecondary text-sm mb-2">Full Name</label>
                <div className="relative">
                  <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textSecondary" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-textPrimary focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-textSecondary text-sm mb-2">Email Address (Locked)</label>
                <div className="relative opacity-70">
                  <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textSecondary" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled={true}
                    readOnly={true}
                    className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-textPrimary focus:outline-none focus:border-primary transition-colors cursor-not-allowed"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-xl transition-transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
