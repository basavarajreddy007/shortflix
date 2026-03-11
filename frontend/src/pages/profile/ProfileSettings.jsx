import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import { User, Mail, Lock, CreditCard, Bell, Shield, Check, Upload } from 'lucide-react';

const ProfileSettings = () => {
 const [activeTab, setActiveTab] = useState('profile');

 const tabs = [
   { id: 'profile', label: 'Profile Info', icon: User },
   { id: 'account', label: 'Account & Security', icon: Shield },
   { id: 'subscription', label: 'Subscription', icon: CreditCard },
   { id: 'notifications', label: 'Notifications', icon: Bell },
 ];

 return (
   <div className="px-4 md:px-8 py-12">
     {/* Section Header */}
     <motion.div
       initial={{ opacity: 0, y: -30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       className="mb-8"
     >
       <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Settings</h2>
       <p className="text-gray-400">Manage your account and preferences</p>
     </motion.div>

     {/* Tabs */}
     <div className="flex flex-wrap gap-2 mb-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2">
      {tabs.map((tab) => (
         <motion.button
           key={tab.id}
           onClick={() => setActiveTab(tab.id)}
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === tab.id
             ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
           }`}
         >
           <tab.icon className="w-4 h-4" />
           <span className="hidden sm:inline">{tab.label}</span>
         </motion.button>
        ))}
     </div>

     {/* Tab Content */}
     <div className="max-w-4xl">
      {activeTab === 'profile' && <ProfileTab />}
      {activeTab === 'account' && <AccountTab />}
      {activeTab === 'subscription' && <SubscriptionTab />}
      {activeTab === 'notifications' && <NotificationsTab />}
     </div>
   </div>
 );
};

const ProfileTab = () => {
 const [uploading, setUploading] = useState(false);
 const [formData, setFormData] = useState({
   username: '',
   email: '',
   phone: '',
   location: '',
   bio: '',
 });
 const [saving, setSaving] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
  try {
    await api.put('/api/user/profile', formData);
    alert('Profile updated successfully!');
  } catch (error) {
   console.error('Error updating profile:', error);
    alert('Failed to update profile');
  } finally {
   setSaving(false);
  }
 };

const handleAvatarUpload = async (e) => {
 const file = e.target.files[0];
 if (!file) return;

  setUploading(true);
 const formData = new FormData();
  formData.append('avatar', file);
  
  try {
    await api.put('/api/user/avatar', formData);
    alert('Avatar updated successfully!');
  } catch (error) {
   console.error('Error uploading avatar:', error);
    alert('Failed to upload avatar');
  } finally {
   setUploading(false);
  }
 };

 return (
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
   >
     {/* Avatar Upload */}
     <div className="bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
       <h3 className="text-xl font-bold text-white mb-4">Profile Picture</h3>
       
       <div className="flex items-center gap-6">
         <div className="relative group cursor-pointer">
           {uploading ? (
             <div className="w-24 h-24 rounded-full bg-black/50 flex items-center justify-center">
               <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
             </div>
           ) : (
             <>
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
               <img
                 src="https://i.pravatar.cc/300?img=12"
                 alt="Profile"
                  className="relative w-24 h-24 rounded-full object-cover border-2 border-white/20"
               />
               <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-black/50 backdrop-blur-sm rounded-full">
                 <Upload className="w-8 h-8 text-white" />
                 <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
               </label>
             </>
           )}
         </div>
         
         <div>
           <p className="text-xs text-gray-400 mt-2">JPG or PNG. Max size 2MB.</p>
         </div>
       </div>
     </div>

     {/* Profile Information Form */}
     <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
       <h3 className="text-xl font-bold text-white mb-4">Profile Information</h3>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <InputField 
           label="Username" 
           value={formData.username}
           onChange={(e) => setFormData({...formData, username: e.target.value})}
           icon={User} 
         />
         <InputField 
           label="Email" 
           type="email"
           value={formData.email}
           onChange={(e) => setFormData({...formData, email: e.target.value})}
           icon={Mail} 
         />
         <InputField 
           label="Phone" 
           type="tel"
           value={formData.phone}
           onChange={(e) => setFormData({...formData, phone: e.target.value})}
         />
         <InputField 
           label="Location"
           value={formData.location}
           onChange={(e) => setFormData({...formData, location: e.target.value})}
         />
       </div>

       <div className="mt-6">
         <label className="block text-sm font-semibold text-gray-300 mb-2">Bio</label>
         <textarea
           className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-500 resize-none"
           rows="4"
           placeholder="Tell us about yourself..."
           value={formData.bio}
           onChange={(e) => setFormData({...formData, bio: e.target.value})}
        defaultValue="Movie enthusiast. Love sci-fi and documentaries."
         />
       </div>

       <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         type="submit"
         disabled={saving}
          className={`mt-6 px-8 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
       >
         {saving ? 'Saving...' : 'Save Changes'}
       </motion.button>
     </form>
   </motion.div>
 );
};

const AccountTab = () => {
 return (
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
   >
     {/* Change Password */}
     <div className="bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
       <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
         <Lock className="w-5 h-5 text-cyan-400" />
         Change Password
       </h3>
       
       <div className="space-y-4">
         <InputField label="Current Password" type="password" />
         <InputField label="New Password" type="password" />
         <InputField label="Confirm New Password" type="password" />
       </div>

       <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
       >
         Update Password
       </motion.button>
     </div>

     {/* Security Settings */}
     <div className="bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
       <h3 className="text-xl font-bold text-white mb-4">Security Settings</h3>
       
       <div className="space-y-4">
         <ToggleSetting 
           label="Two-Factor Authentication" 
          description="Add an extra layer of security"
         />
         <ToggleSetting 
           label="Login Notifications" 
          description="Get notified when someone logs into your account"
         />
       </div>
     </div>

     {/* Danger Zone */}
     <div className="bg-gradient-to-br from-red-500/10 via-red-500/5 to-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl p-6">
       <h3 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h3>
       <p className="text-gray-400 text-sm mb-4">
         Once you delete your account, there is no going back. Please be certain.
       </p>
       <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-xl font-bold text-red-400 hover:bg-red-500/30 transition-all"
       >
         Delete Account
       </motion.button>
     </div>
   </motion.div>
 );
};

const SubscriptionTab = () => {
 const plans = [
   {
    name: 'Basic',
     price: '$9.99/mo',
     features: ['HD Streaming', '1 Device', 'Limited Ads'],
     gradient: 'from-cyan-500 to-blue-500',
   },
   {
    name: 'Premium',
     price: '$19.99/mo',
     features: ['4K Ultra HD', '4 Devices', 'No Ads', 'Offline Downloads', 'AI Recommendations'],
     gradient: 'from-purple-500 to-pink-500',
     popular: true,
   },
   {
    name: 'Family',
     price: '$29.99/mo',
     features: ['4K Ultra HD', 'Unlimited Devices', 'No Ads', 'Offline Downloads', 'Parental Controls'],
     gradient: 'from-amber-500 to-orange-500',
   },
 ];

 return (
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
   >
     {/* Current Plan */}
     <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-md border border-purple-400/50 rounded-2xl p-6">
       <div className="flex items-center justify-between mb-4">
         <div>
           <h3 className="text-xl font-bold text-white mb-2">Current Plan</h3>
           <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
             Premium - $19.99/mo
           </p>
         </div>
         <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-white text-sm">
           Active
         </div>
       </div>
       
       <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
         <div className="flex items-center gap-2">
           <Check className="w-4 h-4 text-green-400" />
           <span>Next billing date: April 15, 2025</span>
         </div>
       </div>

       <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all"
       >
         Manage Billing
       </motion.button>
     </div>

     {/* Upgrade Plans */}
     <div>
       <h3 className="text-xl font-bold text-white mb-4">Available Plans</h3>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
           <PlanCard key={index} plan={plan} index={index} />
          ))}
       </div>
     </div>
   </motion.div>
 );
};

const PlanCard = ({ plan, index }) => {
 return (
   <motion.div
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: index * 0.1 }}
     whileHover={{ y: -10, scale: 1.05 }}
      className={`relative bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border rounded-2xl p-6 overflow-hidden ${plan.popular ? 'border-purple-400/50' : 'border-white/10'}`}
   >
     {plan.popular && (
       <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white">
         Most Popular
       </div>
     )}

     <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
       <CreditCard className="w-6 h-6 text-white" />
     </div>

     <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
     <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
       {plan.price}
     </p>

     <ul className="space-y-2 mb-6">
      {plan.features.map((feature, i) => (
         <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
           <Check className="w-4 h-4 text-green-400" />
           {feature}
         </li>
        ))}
     </ul>

     <motion.button
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
        className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular
         ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/30'
          : 'bg-white/10 text-white hover:bg-white/20'
       }`}
     >
       {plan.popular ? 'Upgrade Now' : 'Choose Plan'}
     </motion.button>
   </motion.div>
 );
};

const NotificationsTab = () => {
 return (
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
   >
     <div className="bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
       <h3 className="text-xl font-bold text-white mb-4">Notification Preferences</h3>
       
       <div className="space-y-4">
         <ToggleSetting 
           label="Email Notifications" 
          description="Receive updates about new releases and recommendations"
          defaultChecked
         />
         <ToggleSetting 
           label="Push Notifications" 
          description="Get notified about trending content"
          defaultChecked
         />
         <ToggleSetting 
           label="SMS Notifications" 
          description="Important account updates via SMS"
         />
         <ToggleSetting 
           label="Marketing Emails" 
          description="Special offers and promotions"
         />
       </div>
     </div>
   </motion.div>
 );
};

// Helper Components
const InputField = ({ label, type = 'text', value, defaultValue, icon: Icon }) => (
 <div>
   <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
   <div className="relative">
     {Icon && (
       <div className="absolute left-4 top-1/2 -translate-y-1/2">
         <Icon className="w-5 h-5 text-gray-400" />
       </div>
     )}
     <input
       type={type}
      defaultValue={defaultValue || value}
       className={`w-full px-4 py-3 ${Icon ? 'pl-12' : ''} bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-500`}
     />
   </div>
 </div>
);

const ToggleSetting = ({ label, description, defaultChecked = false }) => {
 const [enabled, setEnabled] = useState(defaultChecked);

 return (
   <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
     <div>
       <p className="font-semibold text-white mb-1">{label}</p>
       <p className="text-sm text-gray-400">{description}</p>
     </div>
     <button
       onClick={() => setEnabled(!enabled)}
       className={`relative w-14 h-8 rounded-full transition-colors ${enabled ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-white/10'}`}
     >
       <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : ''}`} />
     </button>
   </div>
 );
};

export default ProfileSettings;
