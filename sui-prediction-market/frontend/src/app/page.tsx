'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  const [phase, setPhase] = useState<'intro' | 'countdown' | 'title' | 'content'>('intro');
  const [countdown, setCountdown] = useState(3);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Phase 1: Show "PREDICTION MARKET" for 1 second
    if (phase === 'intro') {
      const timer = setTimeout(() => {
        setPhase('countdown');
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Phase 2: Countdown 3-2-1 (0.8 seconds each = 2.4 seconds total)
    if (phase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => {
        if (countdown === 1) {
          setPhase('title');
        } else {
          setCountdown(countdown - 1);
        }
      }, 800);
      return () => clearTimeout(timer);
    }

    // Phase 3: Show "SUI ARENA" title for 1.2 seconds
    if (phase === 'title') {
      const timer = setTimeout(() => {
        setPhase('content');
        setTimeout(() => setFadeIn(true), 50);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, countdown]);

  // Countdown screen (like cinema)
  if (phase !== 'content') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="text-center">
          {phase === 'intro' && (
            <div className="animate-fade-in">
              <div className="text-6xl font-bold text-white tracking-widest">
                PREDICTION MARKET
              </div>
            </div>
          )}

          {phase === 'countdown' && (
            <div className="animate-scale-in" key={countdown}>
              <div className="text-[20rem] font-bold text-white leading-none">
                {countdown}
              </div>
            </div>
          )}

          {phase === 'title' && (
            <div className="animate-fade-in">
              <div className="text-9xl font-bold text-white mb-6 tracking-wider">
                SUI ARENA
              </div>
              <div className="text-3xl text-gray-400 tracking-wide">
                Where Predictions Meet Profit
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes scaleIn {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            50% {
              transform: scale(1.2);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }

          .animate-scale-in {
            animation: scaleIn 1s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Main content
  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'} scroll-smooth`}>
      <Header />

      <main className="container mx-auto px-4 py-16 pt-24">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl font-bold mb-6 text-gray-900 animate-fade-in">
            Predict the Future on Sui
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Your predictions. Real profits. Instant settlements.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/arena"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-gray-900 to-black rounded-full transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                Enter Arena
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/markets"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-900 bg-white border-2 border-gray-200 rounded-full transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg hover:border-gray-400 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                Explore Markets
                <svg className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <div className="group relative bg-white rounded-3xl p-8 transition-all duration-500 ease-out hover:shadow-2xl border border-gray-100 overflow-hidden">
            {/* Animated gradient background - Black gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 via-gray-800/5 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-black transition-all duration-300">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Sub-second finality. Minimal fees. Pure speed.
              </p>
            </div>

            {/* Bottom accent line - Black gradient */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gray-800 to-black group-hover:w-full transition-all duration-500 ease-out"></div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 transition-all duration-500 ease-out hover:shadow-2xl border border-gray-100 overflow-hidden">
            {/* Animated gradient background - Black gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 via-gray-800/5 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out delay-75 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-black transition-all duration-300">Always Liquid</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Trade anytime. Fair prices. Guaranteed execution.
              </p>
            </div>

            {/* Bottom accent line - Black gradient */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gray-800 to-black group-hover:w-full transition-all duration-500 ease-out"></div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 transition-all duration-500 ease-out hover:shadow-2xl border border-gray-100 overflow-hidden">
            {/* Animated gradient background - Black gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 via-gray-800/5 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out delay-150 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-black transition-all duration-300">Fully Decentralized</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Your keys. Your positions. Your profits.
              </p>
            </div>

            {/* Bottom accent line - Black gradient */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gray-800 to-black group-hover:w-full transition-all duration-500 ease-out"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          <div className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg">
            <div className="text-5xl font-bold text-gray-900 mb-2 transition-transform duration-300 group-hover:scale-110">$2.5M+</div>
            <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">Total Volume</div>
          </div>
          <div className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg">
            <div className="text-5xl font-bold text-gray-900 mb-2 transition-transform duration-300 group-hover:scale-110">156</div>
            <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">Active Markets</div>
          </div>
          <div className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg">
            <div className="text-5xl font-bold text-gray-900 mb-2 transition-transform duration-300 group-hover:scale-110">3.2K+</div>
            <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">Traders</div>
          </div>
          <div className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg">
            <div className="text-5xl font-bold text-gray-900 mb-2 transition-transform duration-300 group-hover:scale-110">892</div>
            <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">Markets Resolved</div>
          </div>
        </div>

        {/* How it Works */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 perspective-container">
            <div className="group text-center p-8 rounded-3xl transition-all duration-500 hover:bg-white hover:shadow-2xl preserve-3d hover-rotate-y">
              <div className="relative w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-all duration-700 group-hover:rotate-spin-3d">
                <svg className="w-20 h-20 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="font-bold mb-3 text-xl text-gray-900 group-hover:text-black transition-colors">Choose a Market</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                Browse markets on crypto, politics, sports, and more. Find an event you have insights on.
              </p>
            </div>
            <div className="group text-center p-8 rounded-3xl transition-all duration-500 hover:bg-white hover:shadow-2xl preserve-3d hover-rotate-y" style={{ animationDelay: '0.1s' }}>
              <div className="relative w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-all duration-700 group-hover:rotate-spin-3d">
                <svg className="w-20 h-20 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="font-bold mb-3 text-xl text-gray-900 group-hover:text-black transition-colors">Trade Your Prediction</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                Buy YES or NO shares. Prices reflect current market odds. Trade anytime before expiry.
              </p>
            </div>
            <div className="group text-center p-8 rounded-3xl transition-all duration-500 hover:bg-white hover:shadow-2xl preserve-3d hover-rotate-y" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-all duration-700 group-hover:rotate-spin-3d">
                <svg className="w-20 h-20 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="font-bold mb-3 text-xl text-gray-900 group-hover:text-black transition-colors">Claim Winnings</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                After resolution, winning shares pay out 1 SUI each. Claim your profits instantly.
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .perspective-container {
            perspective: 1500px;
          }

          .preserve-3d {
            transform-style: preserve-3d;
          }

          .hover-rotate-y:hover {
            transform: rotateY(10deg) rotateX(5deg);
            transition: transform 0.6s ease-out;
          }

          @keyframes arrowFly {
            0% {
              transform: translateX(0) translateZ(0) rotateZ(0deg);
              opacity: 1;
            }
            30% {
              transform: translateX(100px) translateZ(50px) rotateZ(360deg);
              opacity: 0.7;
            }
            50% {
              transform: translateX(150px) translateZ(80px) rotateZ(540deg);
              opacity: 0;
            }
            51% {
              transform: translateX(-150px) translateZ(-80px) rotateZ(540deg);
              opacity: 0;
            }
            70% {
              transform: translateX(-100px) translateZ(-50px) rotateZ(720deg);
              opacity: 0.7;
            }
            100% {
              transform: translateX(0) translateZ(0) rotateZ(1080deg);
              opacity: 1;
            }
          }

          .group-hover\:rotate-spin-3d {
            transition: transform 0.3s ease-in-out;
            transform-style: preserve-3d;
          }

          .group:hover .group-hover\:rotate-spin-3d {
            animation: arrowFly 2s ease-in-out infinite;
          }

          /* Marvel-style Logo Animations - Moving across the box */
          .marvel-logo-1 {
            animation: flyAcross1 4s ease-in-out infinite;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
          }

          .marvel-logo-2 {
            animation: flyAcross2 4s ease-in-out infinite 0.7s;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
          }

          .marvel-logo-3 {
            animation: flyAcross3 4s ease-in-out infinite 1.4s;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
          }

          .marvel-logo-4 {
            animation: flyAcross4 4s ease-in-out infinite 2.1s;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
          }

          .marvel-logo-5 {
            animation: flyAcross5 4s ease-in-out infinite 2.8s;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
          }

          .marvel-logo-6 {
            animation: flyAcross6 4s ease-in-out infinite 3.5s;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
          }

          /* Logo 1: Top left to bottom right */
          @keyframes flyAcross1 {
            0% {
              top: -10%;
              left: -10%;
              transform: scale(0.5) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              top: 50%;
              left: 50%;
              transform: scale(1.2) rotate(360deg);
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: 110%;
              left: 110%;
              transform: scale(0.5) rotate(720deg);
              opacity: 0;
            }
          }

          /* Logo 2: Top right to bottom left */
          @keyframes flyAcross2 {
            0% {
              top: -10%;
              right: -10%;
              left: auto;
              transform: scale(0.5) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              top: 50%;
              right: 50%;
              transform: scale(1.2) rotate(-360deg);
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: 110%;
              right: 110%;
              transform: scale(0.5) rotate(-720deg);
              opacity: 0;
            }
          }

          /* Logo 3: Left to right */
          @keyframes flyAcross3 {
            0% {
              top: 50%;
              left: -10%;
              transform: scale(0.5) rotate(0deg) translateY(-50%);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              left: 50%;
              transform: scale(1.3) rotate(540deg) translateY(-50%);
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              left: 110%;
              transform: scale(0.5) rotate(1080deg) translateY(-50%);
              opacity: 0;
            }
          }

          /* Logo 4: Bottom left to top right */
          @keyframes flyAcross4 {
            0% {
              bottom: -10%;
              left: -10%;
              top: auto;
              transform: scale(0.5) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              bottom: 50%;
              left: 50%;
              transform: scale(1.2) rotate(360deg);
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              bottom: 110%;
              left: 110%;
              transform: scale(0.5) rotate(720deg);
              opacity: 0;
            }
          }

          /* Logo 5: Right to left */
          @keyframes flyAcross5 {
            0% {
              top: 30%;
              right: -10%;
              left: auto;
              transform: scale(0.5) rotate(0deg) translateY(-50%);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              right: 50%;
              transform: scale(1.3) rotate(-540deg) translateY(-50%);
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              right: 110%;
              transform: scale(0.5) rotate(-1080deg) translateY(-50%);
              opacity: 0;
            }
          }

          /* Logo 6: Bottom right to top left */
          @keyframes flyAcross6 {
            0% {
              bottom: -10%;
              right: -10%;
              top: auto;
              left: auto;
              transform: scale(0.5) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              bottom: 50%;
              right: 50%;
              transform: scale(1.2) rotate(-360deg);
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              bottom: 110%;
              right: 110%;
              transform: scale(0.5) rotate(-720deg);
              opacity: 0;
            }
          }

          /* Radial burst effect */
          .group\/cta:hover::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            animation: burstEffect 4s ease-out infinite;
            pointer-events: none;
            z-index: 1;
          }

          @keyframes burstEffect {
            0% {
              width: 0;
              height: 0;
              opacity: 0;
            }
            25% {
              width: 600px;
              height: 600px;
              opacity: 0.4;
            }
            50% {
              width: 800px;
              height: 800px;
              opacity: 0.2;
            }
            100% {
              width: 1000px;
              height: 1000px;
              opacity: 0;
            }
          }
        `}</style>

        {/* CTA Section */}
        <div className="group/cta relative mt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white rounded-3xl p-16 text-center overflow-hidden cursor-pointer">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-transparent to-gray-800/20 opacity-50"></div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>

          {/* Marvel-style SUI Logo Animation */}
          <div className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
            {/* Multiple SUI logos moving across the box */}
            <div className="marvel-logo-1 absolute">
              <svg className="w-32 h-32 text-white" viewBox="0 0 200 200" fill="currentColor">
                <path d="M100 20 C 100 20, 140 70, 140 100 C 140 122, 122 140, 100 140 C 78 140, 60 122, 60 100 C 60 70, 100 20, 100 20 Z M 100 60 C 85 75, 80 85, 80 100 C 80 111, 89 120, 100 120 C 111 120, 120 111, 120 100 C 120 85, 115 75, 100 60 Z"/>
              </svg>
            </div>
            <div className="marvel-logo-2 absolute">
              <svg className="w-32 h-32 text-white" viewBox="0 0 200 200" fill="currentColor">
                <path d="M100 20 C 100 20, 140 70, 140 100 C 140 122, 122 140, 100 140 C 78 140, 60 122, 60 100 C 60 70, 100 20, 100 20 Z M 100 60 C 85 75, 80 85, 80 100 C 80 111, 89 120, 100 120 C 111 120, 120 111, 120 100 C 120 85, 115 75, 100 60 Z"/>
              </svg>
            </div>
            <div className="marvel-logo-3 absolute">
              <svg className="w-32 h-32 text-white" viewBox="0 0 200 200" fill="currentColor">
                <path d="M100 20 C 100 20, 140 70, 140 100 C 140 122, 122 140, 100 140 C 78 140, 60 122, 60 100 C 60 70, 100 20, 100 20 Z M 100 60 C 85 75, 80 85, 80 100 C 80 111, 89 120, 100 120 C 111 120, 120 111, 120 100 C 120 85, 115 75, 100 60 Z"/>
              </svg>
            </div>
            <div className="marvel-logo-4 absolute">
              <svg className="w-32 h-32 text-white" viewBox="0 0 200 200" fill="currentColor">
                <path d="M100 20 C 100 20, 140 70, 140 100 C 140 122, 122 140, 100 140 C 78 140, 60 122, 60 100 C 60 70, 100 20, 100 20 Z M 100 60 C 85 75, 80 85, 80 100 C 80 111, 89 120, 100 120 C 111 120, 120 111, 120 100 C 120 85, 115 75, 100 60 Z"/>
              </svg>
            </div>
            <div className="marvel-logo-5 absolute">
              <svg className="w-32 h-32 text-white" viewBox="0 0 200 200" fill="currentColor">
                <path d="M100 20 C 100 20, 140 70, 140 100 C 140 122, 122 140, 100 140 C 78 140, 60 122, 60 100 C 60 70, 100 20, 100 20 Z M 100 60 C 85 75, 80 85, 80 100 C 80 111, 89 120, 100 120 C 111 120, 120 111, 120 100 C 120 85, 115 75, 100 60 Z"/>
              </svg>
            </div>
            <div className="marvel-logo-6 absolute">
              <svg className="w-32 h-32 text-white" viewBox="0 0 200 200" fill="currentColor">
                <path d="M100 20 C 100 20, 140 70, 140 100 C 140 122, 122 140, 100 140 C 78 140, 60 122, 60 100 C 60 70, 100 20, 100 20 Z M 100 60 C 85 75, 80 85, 80 100 C 80 111, 89 120, 100 120 C 111 120, 120 111, 120 100 C 120 85, 115 75, 100 60 Z"/>
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Ready to Start Trading?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of traders predicting the future
            </p>
            <Link
              href="/arena"
              className="group inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            >
              <span>Enter the Arena</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>Built on Sui • Open Source • Decentralized</p>
        </div>
      </footer>
    </div>
  );
}
