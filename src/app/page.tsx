"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  ShoppingBag,
  ArrowRight,
  Gauge,
  Wrench,
  Tag,
  MapPin,
  Calendar,
  Instagram,
  Youtube,
  ArrowLeft
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

// --- Home Components ---

const Hero = () => {
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
            <span className="text-red-500 text-xs font-bold tracking-widest uppercase font-body">Est. 2021 • Mumbai</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter mb-6">
            OWN THE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">STREETS.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl font-body mb-10 leading-relaxed border-l-2 border-red-600 pl-6">
            The definitive community for GT enthusiasts in the Maximum City. 300+ Members. 1000s of Mods. One Family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <button className="group relative px-8 py-4 bg-[#E7222E] overflow-hidden rounded-sm skew-x-[-10deg] transition-all hover:bg-white">
                <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-white group-hover:text-black font-display font-bold uppercase tracking-widest text-sm flex items-center gap-2 skew-x-[10deg]">
                  Become a Member <ArrowRight size={16} />
                </span>
              </button>
            </Link>
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

const StoreCard = ({ title, subtitle, bg, icon: Icon, tag, cta, href }: { title: string, subtitle: string, bg: string, icon: any, tag: string, cta: string, href: string }) => (
  <Link href={href} className={`relative group overflow-hidden rounded-md border border-white/10 bg-[#1A1A1A] min-h-[400px] cursor-pointer block`}>
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
  </Link>
);

const GarageSection = () => {
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
          <StoreCard title="Trinity Car Parts" subtitle="Official Performance Partner. ECU Remaps, Suspension, Exhausts & Big Turbo Kits." bg={ASSETS.trinityBg} icon={Gauge} tag="Performance" cta="Shop Upgrades" href="/partners" />
          <StoreCard title="Torque Shift Motors" subtitle="Verified GTs for sale. Member-owned, enthusiast maintained. Find your next project." bg={ASSETS.carsBg} icon={Tag} tag="Motors" cta="View Showroom" href="/classifieds/cars" />
          <StoreCard title="Used Parts Classifieds" subtitle="The Parts Bin. Buy & Sell pre-loved mods. From Intakes to Spoilers to Wheels." bg={ASSETS.partsBg} icon={Wrench} tag="Buy & Sell" cta="Browse Listings" href="/classifieds/parts" />
          <StoreCard title="Club Merch" subtitle="Limited edition drops. Hoodies, tees, and keytags. Wear the badge with pride." bg={ASSETS.merchBg} icon={ShoppingBag} tag="Lifestyle" cta="View Collection" href="/store" />
        </div>
      </div>
    </section>
  );
};

const CommunitySection = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          // Take only the top 2 active events for the homepage
          setEvents(data.slice(0, 2));
        }
      } catch (e) {
        console.error("Failed to fetch events", e);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="bg-[#0F0F0F] border-t border-white/5 py-24 px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[2px] w-12 bg-red-600"></div>
          <h2 className="text-3xl font-display text-white uppercase tracking-tight">Latest Meets</h2>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12 border border-white/5 rounded-md bg-[#1A1A1A]">
            <p className="text-gray-400 font-body mb-4">No upcoming events scheduled yet.</p>
            <p className="text-sm text-gray-500">Stay tuned to our WhatsApp group for spontaneous drives!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="relative group overflow-hidden rounded-md cursor-pointer">
                {event.imageUrl ? (
                  <img src={event.imageUrl} alt={event.title} className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                ) : (
                  <div className="w-full h-80 bg-[#1A1A1A] flex items-center justify-center border border-white/10">
                    <Calendar size={48} className="text-gray-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase mb-2">
                    <Calendar size={12} /> <span>{new Date(event.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <MapPin size={12} className="ml-2" /> <span>{event.location}</span>
                  </div>
                  <h3 className="text-2xl font-display text-white">{event.title}</h3>
                  {event.registrationLink && (
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-white text-xs font-bold uppercase tracking-wider border-b border-red-600 pb-1 hover:text-red-500 transition-colors">
                      Register Now
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

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
                  <h3 className="font-display text-sm">pologtclubmumbai</h3>
                  <p className="text-xs text-gray-500 font-body">Official Polo GT Club</p>
                </div>
              </div>
              <a href="https://www.instagram.com/pologtclubmumbai/" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-4 py-1 text-xs font-bold uppercase rounded-sm hover:bg-gray-200">Follow</a>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square bg-gray-800 rounded-sm overflow-hidden"><img src={ASSETS.meet1} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="post1" /></div>
              <div className="aspect-square bg-gray-800 rounded-sm overflow-hidden"><img src={ASSETS.carsBg} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="post2" /></div>
              <div className="aspect-square bg-gray-800 rounded-sm overflow-hidden"><img src={ASSETS.meet2} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="post3" /></div>
            </div>
            <div className="mt-4 flex justify-between items-center text-gray-500 text-xs font-body">
              <span>1.5k+ Followers</span>
              <a href="https://www.instagram.com/pologtclubmumbai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-red-500 cursor-pointer hover:text-white transition-colors">View Profile <ArrowRight size={12} /></a>
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
              <a href="https://www.youtube.com/@pologtclubmumbai" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-4 py-1 text-xs font-bold uppercase rounded-sm hover:bg-red-700">Subscribe</a>
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
              <span>Latest Drop: &quot;Monsoon Drive | Mumbai to Karjat&quot;</span>
              <a href="https://www.youtube.com/@pologtclubmumbai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-red-500 cursor-pointer hover:text-white transition-colors">Watch Now <ArrowRight size={12} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <GarageSection />
        <CommunitySection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
}
