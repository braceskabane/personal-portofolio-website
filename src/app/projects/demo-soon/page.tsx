'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

export default function DemoSoonPage() {
  const searchParams = useSearchParams();
  const project = searchParams.get('project') || 'project';

  const projectNames: Record<string, string> = {
    'baki': 'BAKI: Sport Motion Detector',
    'dogvision': 'DogVision: Dog Breed Classifier',
    'mini-game': 'Mini Game: Playing Card Classification'
  };

  const projectName = projectNames[project] || 'Project';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Icon */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
            <ExternalLink className="w-16 h-16 text-white" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Coming Soon
        </h1>
        
        <div className="space-y-4 mb-8">
          <h2 className="text-xl md:text-2xl text-purple-300 font-semibold">
            {projectName}
          </h2>
          
          <p className="text-lg text-slate-300 leading-relaxed max-w-lg mx-auto">
            Live demo sedang dalam pengembangan. Sementara itu, Anda dapat melihat source code dan dokumentasi lengkap di repository GitHub.
          </p>
        </div>

        {/* Feature List */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Yang Akan Datang:</h3>
          <ul className="text-slate-300 space-y-2 text-left">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
              Interactive demo interface
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
              Live project showcase
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
              Real-time functionality testing
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
              Performance metrics dashboard
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/portofolio">
            <Button 
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Portfolio
            </Button>
          </Link>
          
          <Link href="https://github.com/braceskabane" target="_blank">
            <Button
              variant="primary"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              <Github className="w-4 h-4 mr-2" />
              Lihat di GitHub
            </Button>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-slate-400 text-sm">
          <p>Demo akan segera tersedia • Follow untuk update terbaru</p>
        </div>
      </div>
    </div>
  );
}
