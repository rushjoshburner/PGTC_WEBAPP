"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { ShopProvider, useShop, Product } from '@/context/ShopContext';
import {
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Gauge,
  Wrench,
  Users,
  Tag,
  MapPin,
  Calendar,
  Instagram,
  Youtube,
  ArrowLeft,
  Filter,
  Plus,
  Trash2,
  Lock
} from 'lucide-react';

// --- Assets & Constants ---
const ASSETS = {
  heroBg: "https://images.unsplash.com/photo-1609520505218-742184b3b223?q=80&w=2670&auto=format&fit=crop",
  trinityBg: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2600&auto=format&fit=crop",
  merchBg: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop",
  partsBg: "https://images.unsplash.com/photo-1530906358829-e8d976d633e2?q=80&w=2670&auto=format&fit=crop",
  carsBg: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2500&auto=format&fit=crop",
  meet1: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2670&auto=format&fit=crop",
  meet2: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop",
  aboutBg: "https://images.unsplash.com/photo-1493238792015-1a419bac32d3?q=80&w=2670&auto=format&fit=crop"
};

// --- Reusable Sub-components ---

const PageHeader = ({ title, subtitle, bg, parentPage, onBack }: { title: string, subtitle: string, bg: string, parentPage?: string, onBack: () => void }) => (
  <div className="relative h-[40vh] w-full overflow-hidden bg-black flex items-center">
    <div className="absolute inset-0">
      <img src={bg} alt={title} className="w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/60" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-xs uppercase font-body tracking-widest"
      >
        <ArrowLeft size={14} /> Back to {parentPage || 'Home'}
      </button>
      <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase mb-2">{title}</h1>
      <p className="text-lg text-gray-400 font-body max-w-2xl">{subtitle}</p>
    </div>
  </div>
);

// --- Page Components ---

const TrinityPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { trinityProducts } = useShop();

  return (
    <div className="bg-[#0A0A0A] min-h-screen pb-20">
      <PageHeader
        title="Trinity Performance"
        subtitle="The bleeding edge of German Engineering. Official partners for APR, Bilstein, and Brembo."
        bg={ASSETS.trinityBg}
        onBack={() => onNavigate('home')}
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trinityProducts.map((service) => (
            <div key={service.id} className="bg-[#1A1A1A] border border-white/10 p-8 rounded-sm hover:border-red-600/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <Gauge className="text-red-600" size={24} />
                <span className="text-xs font-body text-gray-500">{service.price}</span>
              </div>
              <h3 className="text-2xl font-display text-white mb-2">{service.name}</h3>
              <p className="text-gray-400 font-body mb-6">{service.description}</p>
              <button className="text-white text-xs font-bold uppercase tracking-widest border-b border-red-600 pb-1 hover:text-red-500">Enquire Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TorqueShiftPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { torqueCars } = useShop();

  return (
    <div className="bg-[#0A0A0A] min-h-screen pb-20">
      <PageHeader
        title="Torque Shift Motors"
        subtitle="Verified member cars. No lemons, just legends. Enthusiast owned and maintained."
        bg={ASSETS.carsBg}
        onBack={() => onNavigate('home')}
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-display text-white">Latest Listings</h2>
          <button className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400"><Filter size={14} /> Filter</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {torqueCars.map((car) => (
            <div key={car.id} className="bg-[#1A1A1A] rounded-sm overflow-hidden border border-white/10 group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={car.image || ASSETS.carsBg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={car.name} />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-display text-white">{car.name}</h3>
                  <span className="text-red-500 font-bold font-body">{car.price}</span>
                </div>
                <p className="text-sm text-gray-400 font-body mb-4">{car.description}</p>
                <div className="flex gap-2">
                  <span className="bg-white/5 text-gray-300 text-[10px] px-2 py-1 uppercase tracking-wider rounded-sm">Verified</span>
                  <span className="bg-white/5 text-gray-300 text-[10px] px-2 py-1 uppercase tracking-wider rounded-sm">Mumbai</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UsedPartsPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { usedParts } = useShop();

  return (
    <div className="bg-[#0A0A0A] min-h-screen pb-20">
      <PageHeader
        title="The Parts Bin"
        subtitle="Buy & Sell used performance parts. From intakes to wheels, find deals within the community."
        bg={ASSETS.partsBg}
        onBack={() => onNavigate('home')}
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {usedParts.length === 0 ? (
          <div className="bg-[#1A1A1A] border border-white/10 p-12 text-center rounded-sm">
            <Wrench size={48} className="text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-display text-white mb-4">Classifieds Access Restricted</h2>
            <p className="text-gray-400 font-body max-w-md mx-auto mb-8">
              To prevent scams and spam, the parts bin is only accessible to verified club members via our WhatsApp bot.
              <br /><br />
              <span className="text-xs text-gray-500">Admin Note: Add items via Admin Panel to test this view.</span>
            </p>
            <button className="bg-[#E7222E] text-white px-8 py-3 rounded-sm font-display text-xs font-bold uppercase tracking-wider skew-x-[-10deg]">
              <span className="block skew-x-[10deg]">Request Access</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {usedParts.map((part) => (
              <div key={part.id} className="bg-[#1A1A1A] rounded-sm overflow-hidden border border-white/10 group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden bg-gray-800">
                  {part.image && <img src={part.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={part.name} />}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-display text-white">{part.name}</h3>
                    <span className="text-red-500 font-bold font-body">{part.price}</span>
                  </div>
                  <p className="text-sm text-gray-400 font-body mb-4">{part.description}</p>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase py-2 rounded-sm transition-colors">Contact Seller</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MerchPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { merchProducts } = useShop();

  return (
    <div className="bg-[#0A0A0A] min-h-screen pb-20">
      <PageHeader
        title="Club Merch"
        subtitle="Official apparel and accessories. Wear the badge."
        bg={ASSETS.merchBg}
        onBack={() => onNavigate('home')}
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {merchProducts.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="bg-[#1A1A1A] aspect-[3/4] overflow-hidden mb-4 relative">
                <img src={item.image || ASSETS.merchBg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" alt={item.name} />
                <div className="absolute bottom-0 left-0 w-full bg-black/80 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full text-white text-[10px] uppercase font-bold tracking-widest">Add to Cart</button>
                </div>
              </div>
              <h3 className="text-white font-display text-sm mb-1">{item.name}</h3>
              <p className="text-gray-500 font-body text-xs">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const teamMembers = [
    { name: "Raj Mehta", role: "Founder & President", bio: "Polo GT owner since 2015. Started the club to bring together enthusiasts across India." },
    { name: "Amit Sharma", role: "Vice President", bio: "Automotive engineer with a passion for performance tuning and track days." },
    { name: "Priya Patel", role: "Events Coordinator", bio: "Organizes meetups, drives, and track events across the country." },
    { name: "Vikram Singh", role: "Technical Lead", bio: "Your go-to person for all technical queries about the GT TSI and TDI." },
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen pb-20">
      <PageHeader
        title="About PGTC"
        subtitle="Est. 2014. From a WhatsApp group to Mumbai's definitive car collective."
        bg={ASSETS.aboutBg}
        onBack={() => onNavigate('home')}
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Story */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-display font-bold mb-4 uppercase text-white">Our Story</h2>
          <div className="prose prose-invert max-w-none text-gray-400 space-y-4 font-body">
            <p>
              Polo GT Club was founded in 2018 by a group of passionate Volkswagen Polo GT
              owners who wanted to create a community where enthusiasts could connect, share
              experiences, and help each other.
            </p>
            <p>
              What started as a small WhatsApp group has grown into India&apos;s largest
              Polo GT community with members across 20+ cities. We organize regular meetups,
              track days, road trips, and provide a platform for members to buy and sell
              parts and cars within a trusted network.
            </p>
            <p>
              Our mission is simple: to celebrate the Volkswagen Polo GT and provide a
              supportive community for every owner and enthusiast in India.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#1A1A1A] border border-white/10 p-6 text-center rounded-sm">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="font-display font-semibold text-lg mb-2 text-white">Community First</h3>
            <p className="text-sm text-gray-400 font-body">
              We believe in helping each other and building lasting friendships.
            </p>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 p-6 text-center rounded-sm">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="font-display font-semibold text-lg mb-2 text-white">Trust & Transparency</h3>
            <p className="text-sm text-gray-400 font-body">
              Every car listing is verified. Every transaction is within the community.
            </p>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 p-6 text-center rounded-sm">
            <div className="text-4xl mb-4">🏎️</div>
            <h3 className="font-display font-semibold text-lg mb-2 text-white">Passion for Performance</h3>
            <p className="text-sm text-gray-400 font-body">
              We love the Polo GT for what it is - a true driver&apos;s car.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold text-center mb-8 uppercase text-white">Core Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-[#1A1A1A] border border-white/10 p-6 text-center rounded-sm">
                <div className="w-20 h-20 rounded-full bg-white/10 mx-auto mb-4 flex items-center justify-center text-3xl">
                  👤
                </div>
                <h3 className="font-display font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-red-500 mb-2 font-body">{member.role}</p>
                <p className="text-xs text-gray-500 font-body">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-display font-black text-red-600 mb-2">500+</div>
            <div className="text-gray-400 font-body text-sm uppercase tracking-wider">Active Members</div>
          </div>
          <div>
            <div className="text-4xl font-display font-black text-red-600 mb-2">20+</div>
            <div className="text-gray-400 font-body text-sm uppercase tracking-wider">Cities</div>
          </div>
          <div>
            <div className="text-4xl font-display font-black text-red-600 mb-2">50+</div>
            <div className="text-gray-400 font-body text-sm uppercase tracking-wider">Events Organized</div>
          </div>
          <div>
            <div className="text-4xl font-display font-black text-red-600 mb-2">100+</div>
            <div className="text-gray-400 font-body text-sm uppercase tracking-wider">Cars Sold</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin Panel ---

const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  const { trinityProducts, torqueCars, usedParts, merchProducts, addProduct, deleteProduct } = useShop();
  const [activeTab, setActiveTab] = useState<'trinity' | 'torque' | 'parts' | 'merch'>('trinity');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });

  const categories = [
    { id: 'trinity', label: 'Trinity Parts' },
    { id: 'torque', label: 'Torque Cars' },
    { id: 'parts', label: 'Used Parts' },
    { id: 'merch', label: 'Merch' },
  ];

  const getCurrentProducts = () => {
    switch (activeTab) {
      case 'trinity': return trinityProducts;
      case 'torque': return torqueCars;
      case 'parts': return usedParts;
      case 'merch': return merchProducts;
      default: return [];
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image || ASSETS.heroBg, // Default image if empty
      category: activeTab
    };
    addProduct(product);
    setNewProduct({ name: '', price: '', description: '', image: '' });
    setShowAddForm(false);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold uppercase">Admin Dashboard</h1>
          <button onClick={onBack} className="text-gray-400 hover:text-white font-body text-sm">Cancel / Back</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveTab(cat.id as any); setShowAddForm(false); }}
              className={`px-4 py-2 rounded-sm text-sm font-bold uppercase font-display whitespace-nowrap transition-colors ${activeTab === cat.id ? 'bg-red-600 text-white' : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#2A2A2A]'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List View */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-display uppercase">{categories.find(c => c.id === activeTab)?.label} Items</h2>
              <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-sm text-xs font-bold uppercase hover:bg-gray-200">
                <Plus size={16} /> Add Product
              </button>
            </div>

            {getCurrentProducts().length === 0 ? (
              <div className="bg-[#1A1A1A] border border-white/10 p-8 text-center text-gray-500 rounded-sm">
                No products found. Add one to get started.
              </div>
            ) : (
              getCurrentProducts().map(item => (
                <div key={item.id} className="bg-[#1A1A1A] border border-white/10 p-4 rounded-sm flex gap-4 items-center">
                  <div className="w-16 h-16 bg-black rounded-sm overflow-hidden flex-shrink-0">
                    {item.image && <img src={item.image} className="w-full h-full object-cover" alt={item.name} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-white truncate">{item.name}</h3>
                    <p className="text-xs text-red-500 font-body">{item.price}</p>
                    <p className="text-xs text-gray-500 font-body truncate">{item.description}</p>
                  </div>
                  <button
                    onClick={() => deleteProduct(item.id, activeTab)}
                    className="text-gray-500 hover:text-red-500 p-2"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add Form (Side Panel or Modal-like) */}
          {showAddForm && (
            <div className="lg:col-span-1">
              <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded-sm sticky top-24">
                <h3 className="font-display font-bold text-lg mb-4 uppercase">Add to {activeTab}</h3>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full bg-black border border-white/10 text-white px-3 py-2 text-sm rounded-sm focus:border-red-600 outline-none"
                      placeholder="e.g. Stage 1 Remap"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Price</label>
                    <input
                      type="text"
                      required
                      value={newProduct.price}
                      onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full bg-black border border-white/10 text-white px-3 py-2 text-sm rounded-sm focus:border-red-600 outline-none"
                      placeholder="e.g. ₹15,000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={newProduct.image}
                      onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                      className="w-full bg-black border border-white/10 text-white px-3 py-2 text-sm rounded-sm focus:border-red-600 outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={newProduct.description}
                      onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full bg-black border border-white/10 text-white px-3 py-2 text-sm rounded-sm focus:border-red-600 outline-none"
                      placeholder="Short description..."
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 text-xs font-bold uppercase rounded-sm">
                      Save Product
                    </button>
                    <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs font-bold uppercase rounded-sm">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Main App & Navigation ---

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: string) => void, currentPage: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'trinity', label: 'Trinity Parts' },
    { id: 'torque', label: 'Torque Shift' },
    { id: 'parts', label: 'Used Parts' },
    { id: 'merch', label: 'Merch' },
    { id: 'about', label: 'About' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentPage !== 'home' ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Image
                src="/pgtc-logo.png"
                alt="PGTC Logo"
                width={48}
                height={48}
                className="object-contain relative z-10"
              />
              <div className="hidden absolute inset-0 bg-red-600 rounded-sm items-center justify-center transform skew-x-[-10deg] group-hover:bg-white transition-colors">
                <span className="font-display font-bold text-white text-xl skew-x-[10deg] group-hover:text-black">P</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white leading-none tracking-wider">PGTC</span>
              <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-body">Mumbai</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors font-body uppercase tracking-wide whitespace-nowrap ${currentPage === item.id ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
              {/* Admin Link (Secret-ish) */}
              <button
                onClick={() => onNavigate('admin')}
                className={`px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors font-body uppercase tracking-wide whitespace-nowrap ${currentPage === 'admin' ? 'text-red-500' : 'text-gray-600 hover:text-gray-400'}`}
              >
                <Lock size={12} />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button className="bg-[#E7222E] hover:bg-red-700 text-white px-6 py-2 rounded-sm font-display text-xs font-bold uppercase tracking-wider skew-x-[-10deg] transition-all hover:scale-105">
              <span className="block skew-x-[10deg]">Join Club</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsOpen(false); }}
                className="text-gray-300 hover:text-white block w-full text-left px-3 py-4 rounded-md text-base font-bold font-display uppercase border-b border-white/5"
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => { onNavigate('admin'); setIsOpen(false); }} className="text-gray-500 hover:text-white block w-full text-left px-3 py-4 rounded-md text-base font-bold font-display uppercase border-b border-white/5">Admin</button>
            <button className="text-red-500 w-full text-left px-3 py-4 font-bold font-display uppercase">Join Club</button>
          </div>
        </div>
      )}
    </nav>
  );
};


// --- Home Components ---

const Hero = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img src={ASSETS.heroBg} alt="Polo GT Night Drive" className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom" style={{ objectPosition: 'center 70%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-600/30 bg-red-600/10 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-red-500 text-xs font-bold tracking-widest uppercase font-body">Est. 2014 • Mumbai</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter mb-6">
            OWN THE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">STREETS.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl font-body mb-10 leading-relaxed border-l-2 border-red-600 pl-6">
            The definitive community for GT enthusiasts in the Maximum City. 300+ Members. 1000s of Mods. One Family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group relative px-8 py-4 bg-[#E7222E] overflow-hidden rounded-sm skew-x-[-10deg] transition-all hover:bg-white">
              <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-white group-hover:text-black font-display font-bold uppercase tracking-widest text-sm flex items-center gap-2 skew-x-[10deg]">
                Become a Member <ArrowRight size={16} />
              </span>
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('garage-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-white/20 hover:border-white/60 bg-black/30 backdrop-blur-sm rounded-sm skew-x-[-10deg] transition-all"
            >
              <span className="block text-white font-display font-bold uppercase tracking-widest text-sm skew-x-[10deg]">Explore Garage</span>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

const StoreCard = ({ title, subtitle, bg, icon: Icon, tag, cta, onClick }: { title: string, subtitle: string, bg: string, icon: any, tag: string, cta: string, onClick: () => void }) => (
  <div onClick={onClick} className={`relative group overflow-hidden rounded-md border border-white/10 bg-[#1A1A1A] min-h-[400px] cursor-pointer`}>
    <div className="absolute inset-0">
      <img src={bg} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
    </div>
    <div className="absolute inset-0 p-8 flex flex-col justify-end">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm">{tag}</span>
          <Icon size={16} className="text-gray-400" />
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-none uppercase">{title}</h3>
        <p className="text-gray-400 font-body text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300 line-clamp-2">{subtitle}</p>
        <div className="flex items-center text-white text-xs font-bold uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
          {cta} <ArrowRight size={12} className="text-red-500" />
        </div>
      </div>
    </div>
  </div>
);

const GarageSection = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <section id="garage-section" className="bg-[#0A0A0A] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-red-600 font-body font-bold tracking-widest uppercase text-sm">The Ecosystem</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-2">PGTC GARAGE</h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm leading-relaxed text-right md:text-right">
            Access our exclusive network of parts, merch, and verified vehicles. From stage 1 tunes to full engine rebuilds.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StoreCard title="Trinity Car Parts" subtitle="Official Performance Partner. ECU Remaps, Suspension, Exhausts & Big Turbo Kits." bg={ASSETS.trinityBg} icon={Gauge} tag="Performance" cta="Shop Upgrades" onClick={() => onNavigate('trinity')} />
          <StoreCard title="Torque Shift Motors" subtitle="Verified GTs for sale. Member-owned, enthusiast maintained. Find your next project." bg={ASSETS.carsBg} icon={Tag} tag="Motors" cta="View Showroom" onClick={() => onNavigate('torque')} />
          <StoreCard title="Used Parts Classifieds" subtitle="The Parts Bin. Buy & Sell pre-loved mods. From Intakes to Spoilers to Wheels." bg={ASSETS.partsBg} icon={Wrench} tag="Buy & Sell" cta="Browse Listings" onClick={() => onNavigate('parts')} />
          <StoreCard title="Club Merch" subtitle="Limited edition drops. Hoodies, tees, and keytags. Wear the badge with pride." bg={ASSETS.merchBg} icon={ShoppingBag} tag="Lifestyle" cta="View Collection" onClick={() => onNavigate('merch')} />
        </div>
      </div>
    </section>
  );
};

const CommunitySection = () => {
  return (
    <section className="bg-[#0F0F0F] border-t border-white/5 py-24 px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[2px] w-12 bg-red-600"></div>
          <h2 className="text-3xl font-display text-white uppercase tracking-tight">Latest Meets</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-md cursor-pointer">
            <img src={ASSETS.meet1} alt="Bandra Meet" className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase mb-2">
                <Calendar size={12} /> <span>12 Oct 2025</span>
                <MapPin size={12} className="ml-2" /> <span>Ballard Estate</span>
              </div>
              <h3 className="text-2xl font-display text-white">Midnight Run: South Bombay</h3>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-md cursor-pointer">
            <img src={ASSETS.meet2} alt="Lonavala Drive" className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase mb-2">
                <Calendar size={12} /> <span>05 Nov 2025</span>
                <MapPin size={12} className="ml-2" /> <span>Lonavala Ghats</span>
              </div>
              <h3 className="text-2xl font-display text-white">Monsoon Drive 2.0</h3>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-6 font-body">Join our WhatsApp community to get notified about the next drive.</p>
          <button className="text-white border-b border-red-600 pb-1 hover:text-red-500 transition-colors uppercase font-bold tracking-widest text-sm font-display">Join Community Group</button>
        </div>
      </div>
    </section>
  );
};

const SocialSection = () => {
  return (
    <section className="bg-black py-24 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12 justify-center">
          <div className="h-[2px] w-12 bg-red-600"></div>
          <h2 className="text-3xl font-display text-white uppercase tracking-tight">Follow Our Journey</h2>
          <div className="h-[2px] w-12 bg-red-600"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Instagram Card */}
          <div className="bg-[#1A1A1A] border border-white/10 rounded-md p-6 group hover:border-red-600/50 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 rounded-full p-[2px]">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                    <Instagram size={16} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-sm">pgtcmumbai</h3>
                  <p className="text-xs text-gray-500 font-body">Official Polo GT Club</p>
                </div>
              </div>
              <a href="https://instagram.com/pgtcmumbai" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-4 py-1 text-xs font-bold uppercase rounded-sm hover:bg-gray-200">Follow</a>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square bg-gray-800 rounded-sm overflow-hidden"><img src={ASSETS.meet1} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="post1" /></div>
              <div className="aspect-square bg-gray-800 rounded-sm overflow-hidden"><img src={ASSETS.carsBg} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="post2" /></div>
              <div className="aspect-square bg-gray-800 rounded-sm overflow-hidden"><img src={ASSETS.meet2} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="post3" /></div>
            </div>
            <div className="mt-4 flex justify-between items-center text-gray-500 text-xs font-body">
              <span>12.5k Followers</span>
              <a href="https://instagram.com/pgtcmumbai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-red-500 cursor-pointer hover:text-white transition-colors">View Profile <ArrowRight size={12} /></a>
            </div>
          </div>
          {/* YouTube Card */}
          <div className="bg-[#1A1A1A] border border-white/10 rounded-md p-6 group hover:border-red-600/50 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"><Youtube size={20} className="text-white" /></div>
                <div>
                  <h3 className="font-display text-sm">PGTC TV</h3>
                  <p className="text-xs text-gray-500 font-body">Cinematic Drives & Reviews</p>
                </div>
              </div>
              <a href="https://youtube.com/@pgtcmumbai" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-4 py-1 text-xs font-bold uppercase rounded-sm hover:bg-red-700">Subscribe</a>
            </div>
            <div className="relative aspect-video bg-black rounded-sm overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 cursor-pointer">
              <img src={ASSETS.heroBg} className="w-full h-full object-cover opacity-60" alt="Video thumbnail" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/80 px-2 py-1 text-[10px] font-bold rounded text-white">4:20</div>
            </div>
            <div className="mt-4 flex justify-between items-center text-gray-500 text-xs font-body">
              <span>Latest Drop: &quot;Midnight Run 2025&quot;</span>
              <span className="flex items-center gap-1 text-red-500 cursor-pointer hover:text-white transition-colors">Watch Now <ArrowRight size={12} /></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/pgtc-logo.png" alt="PGTC" width={40} height={40} className="object-contain" />
              <span className="font-display font-bold text-white tracking-widest text-xl">PGTC MUMBAI</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-body">
              The heartbeat of Mumbai's tuner culture. We don't just drive; we build, we race, and we inspire.
            </p>
          </div>
          <div>
            <h4 className="text-white font-display uppercase font-bold mb-6">The Garage</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-body">
              <li><button onClick={() => onNavigate('trinity')} className="hover:text-red-500 transition-colors">Trinity Performance</button></li>
              <li><button onClick={() => onNavigate('torque')} className="hover:text-red-500 transition-colors">Torque Shift Motors</button></li>
              <li><button onClick={() => onNavigate('parts')} className="hover:text-red-500 transition-colors">Used Parts</button></li>
              <li><button onClick={() => onNavigate('merch')} className="hover:text-red-500 transition-colors">Merch Store</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-display uppercase font-bold mb-6">Clubhouse</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-body">
              <li><button onClick={() => onNavigate('about')} className="hover:text-red-500 transition-colors">About Us</button></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Events Calendar</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Membership</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-display uppercase font-bold mb-6">Stay Tuned</h4>
            <p className="text-gray-500 text-xs mb-4 font-body">Get the latest on drops and meets.</p>
            <div className="flex">
              <input type="email" placeholder="ENTER EMAIL" className="bg-[#1A1A1A] border border-white/10 text-white px-4 py-2 text-xs w-full focus:border-red-600 outline-none uppercase placeholder:text-gray-700" />
              <button className="bg-red-600 px-4 py-2 text-white"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-10">
          <p className="text-gray-600 text-xs font-body uppercase tracking-wider">© 2024 Polo GT Club Mumbai. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Instagram size={18} className="text-gray-500 hover:text-white cursor-pointer" />
            <Youtube size={18} className="text-gray-500 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- App Content ---

const AppContent = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setActivePage} />
            <GarageSection onNavigate={setActivePage} />
            <CommunitySection />
            <SocialSection />
          </>
        );
      case 'trinity':
        return <TrinityPage onNavigate={setActivePage} />;
      case 'torque':
        return <TorqueShiftPage onNavigate={setActivePage} />;
      case 'parts':
        return <UsedPartsPage onNavigate={setActivePage} />;
      case 'merch':
        return <MerchPage onNavigate={setActivePage} />;
      case 'about':
      case 'contact':
        return <AboutPage onNavigate={setActivePage} />;
      case 'admin':
        return <AdminPanel onBack={() => setActivePage('home')} />;
      default:
        return (
          <>
            <Hero onNavigate={setActivePage} />
            <GarageSection onNavigate={setActivePage} />
            <CommunitySection />
            <SocialSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white">
      {/* Navbar is hidden in Admin Mode for cleaner UI, or we can keep it. Let's hide it in Admin. */}
      {activePage !== 'admin' && <Navbar onNavigate={setActivePage} currentPage={activePage} />}

      <main>
        {renderPage()}
      </main>

      {/* Footer hidden in Admin Mode */}
      {activePage !== 'admin' && <Footer onNavigate={setActivePage} />}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
