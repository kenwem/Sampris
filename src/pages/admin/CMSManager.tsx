import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMS, CMSItem } from '../../hooks/useCMS';
import { 
  Plus, 
  CheckCircle2,
  Search, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  Video as VideoIcon,
  ArrowUp, 
  ArrowDown,
  Loader2,
  ExternalLink,
  Save,
  X
} from 'lucide-react';
import { format } from 'date-fns';

interface ManagerProps {
  collectionName: string;
  fields: { name: string; label: string; type: 'text' | 'textarea' | 'number' | 'image' | 'video' | 'markdown' | 'select'; options?: string[] }[];
}

export default function CMSManager({ collectionName, fields }: ManagerProps) {
  const { fetchItems, saveItem, deleteItem, uploadImage } = useCMS();
  const [items, setItems] = useState<CMSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [lastUploaded, setLastUploaded] = useState<string | null>(null);

  const loadItems = async () => {
    setLoading(true);
    const data = await fetchItems(collectionName);
    setItems(data.sort((a, b) => (a.position || 0) - (b.position || 0)));
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, [collectionName]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveItem(collectionName, currentItem, currentItem.id);
      setIsEditing(false);
      loadItems();
    } catch (err) {
      console.error(err);
      alert('Error saving item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(collectionName, id);
      loadItems();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(prev => ({ ...prev, [fieldName]: true }));
      setLastUploaded(null);
      try {
        const url = await uploadImage(file);
        setCurrentItem((prev: any) => ({ ...prev, [fieldName]: url }));
        setLastUploaded(fieldName);
        setTimeout(() => setLastUploaded(null), 3000);
      } catch (err: any) {
        alert(err.message);
      } finally {
        setUploading(prev => ({ ...prev, [fieldName]: false }));
      }
    }
  };

  const movePosition = async (item: CMSItem, direction: 'up' | 'down') => {
    const index = items.findIndex(i => i.id === item.id);
    const newItems = [...items];
    if (direction === 'up' && index > 0) {
      [newItems[index], newItems[index-1]] = [newItems[index-1], newItems[index]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index+1]] = [newItems[index+1], newItems[index]];
    } else {
      return;
    }

    // Update positions in batch
    for (let i = 0; i < newItems.length; i++) {
        await saveItem(collectionName, { ...newItems[i], position: i }, newItems[i].id);
    }
    loadItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 capitalize">{collectionName}</h1>
          <p className="text-slate-500 text-sm">Manage your {collectionName} entries</p>
        </div>
        <button
          onClick={() => { setCurrentItem({ position: items.length }); setIsEditing(true); }}
          className="bg-brand-primary text-white px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-md active:scale-95"
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-slate-700">{currentItem.id ? 'Edit' : 'Create'} {collectionName}</h2>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
          </div>
          <form onSubmit={handleSave} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map(field => (
                <div key={field.name} className={field.type === 'markdown' || field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{field.label}</label>
                  
                  {field.type === 'text' && (
                    <input
                      type="text"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                      value={currentItem[field.name] || ''}
                      onChange={e => setCurrentItem((prev: any) => ({ ...prev, [field.name]: e.target.value }))}
                    />
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      rows={4}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                      value={currentItem[field.name] || ''}
                      onChange={e => setCurrentItem((prev: any) => ({ ...prev, [field.name]: e.target.value }))}
                    />
                  )}

                  {field.type === 'markdown' && (
                    <textarea
                      rows={10}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent transition-all font-mono text-sm"
                      value={currentItem[field.name] || ''}
                      onChange={e => setCurrentItem((prev: any) => ({ ...prev, [field.name]: e.target.value }))}
                      placeholder="# Markdown Title\n\nWrite content here..."
                    />
                  )}

                  {field.type === 'image' && (
                    <div className="space-y-4">
                      <div className="flex gap-4 items-center">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            placeholder="Image URL"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                            value={currentItem[field.name] || ''}
                            onChange={e => setCurrentItem((prev: any) => ({ ...prev, [field.name]: e.target.value }))}
                          />
                          {uploading[field.name] && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <Loader2 className="animate-spin text-brand-primary" size={16} />
                            </div>
                          )}
                          {lastUploaded === field.name && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-500">
                              <CheckCircle2 size={16} />
                              <span className="text-[10px] font-bold uppercase">Ready</span>
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleImageChange(e, field.name)}
                            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            disabled={uploading[field.name]}
                          />
                          <button type="button" className="p-3 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 disabled:opacity-50">
                             <ImageIcon size={20} />
                          </button>
                          {lastUploaded === field.name && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                               <CheckCircle2 size={12} />
                            </div>
                          )}
                        </div>
                      </div>
                      {currentItem[field.name] && !uploading[field.name] && (
                        <div className="w-full max-w-sm h-48 rounded-lg border-2 border-slate-100 overflow-hidden bg-slate-50 relative group">
                          <img 
                            src={currentItem[field.name]} 
                            className="w-full h-full object-contain" 
                            alt="Preview" 
                            referrerPolicy="no-referrer"
                            onError={(e: any) => {
                               e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800';
                            }}
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 text-center">
                             <span className="text-[8px] text-white font-bold uppercase tracking-widest">Live Preview</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {field.type === 'video' && (
                    <div className="space-y-4">
                      <div className="flex gap-4 items-center">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            placeholder="Video/Embed URL"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                            value={currentItem[field.name] || ''}
                            onChange={e => setCurrentItem((prev: any) => ({ ...prev, [field.name]: e.target.value }))}
                          />
                          {uploading[field.name] && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <Loader2 className="animate-spin text-brand-primary" size={16} />
                            </div>
                          )}
                          {lastUploaded === field.name && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-500">
                              <CheckCircle2 size={16} />
                              <span className="text-[10px] font-bold uppercase">Ready</span>
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={e => handleImageChange(e, field.name)}
                            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            disabled={uploading[field.name]}
                          />
                          <button type="button" className="p-3 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 disabled:opacity-50">
                             <VideoIcon size={20} />
                          </button>
                        </div>
                      </div>
                      {currentItem[field.name] && !uploading[field.name] && (
                        <div className="w-full max-w-sm aspect-video rounded border overflow-hidden bg-black">
                          {currentItem[field.name].includes('youtube.com') || currentItem[field.name].includes('youtu.be') || currentItem[field.name].includes('vimeo.com') ? (
                            <div className="w-full h-full flex items-center justify-center text-white text-[10px] uppercase font-bold tracking-widest text-center px-4">
                              Embedded Link Preview Not Available in Editor
                            </div>
                          ) : (
                            <video 
                              src={currentItem[field.name]} 
                              className="w-full h-full" 
                              controls 
                              crossOrigin="anonymous"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {field.type === 'select' && (
                    <select
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                      value={currentItem[field.name] || ''}
                      onChange={e => setCurrentItem((prev: any) => ({ ...prev, [field.name]: e.target.value }))}
                    >
                      <option value="">Select Option</option>
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  )}
                </div>
              ))}
            </div>


            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 text-slate-500 font-bold uppercase tracking-wider text-xs hover:text-slate-700"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={saving}
                className="bg-brand-primary text-white px-8 py-2 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-brand-primary/90 transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                Save Item
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
             <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
             </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400">Loading {collectionName}...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Details</th>
                    <th className="px-6 py-4">Created</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.filter(i => !search || JSON.stringify(i).toLowerCase().includes(search.toLowerCase())).map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 items-center w-8">
                          <button onClick={() => movePosition(item, 'up')} className="text-slate-300 hover:text-brand-accent"><ArrowUp size={14}/></button>
                          <span className="text-xs font-bold text-slate-500">{idx + 1}</span>
                          <button onClick={() => movePosition(item, 'down')} className="text-slate-300 hover:text-brand-accent"><ArrowDown size={14}/></button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            {item.image || item.imageUrl || item.featuredImage ? (
                              <img 
                                src={item.image || item.imageUrl || item.featuredImage} 
                                className="w-10 h-10 rounded object-cover border border-slate-200" 
                                referrerPolicy="no-referrer"
                                onError={(e: any) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800';
                                }}
                              />
                            ) : (

                              <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-300"><ImageIcon size={18}/></div>
                            )}
                            <div>
                               <p className="text-sm font-bold text-slate-700">{item.title || item.name || 'Untitled'}</p>
                               <p className="text-xs text-slate-400">{item.slug || collectionName}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                         {item.createdAt ? format(item.createdAt.toDate(), 'MMM dd, yyyy') : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => { setCurrentItem(item); setIsEditing(true); }}
                              className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded transition-all"
                            >
                               <Edit3 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                            >
                               <Trash2 size={18} />
                            </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
