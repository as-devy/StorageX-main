'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { DecodeHintType, BarcodeFormat } from '@zxing/library';
import { X, Loader2, CheckCircle2, AlertCircle, ScanLine, Camera, Flashlight, FlashlightOff, Copy, RotateCcw, Info } from 'lucide-react';
import AuthShield from '../components/AuthShield';


// Define types for the Native Barcode Detector API
interface Barcode {
  rawValue: string;
  format: string;
}

declare global {
  interface Window {
    BarcodeDetector: any;
  }
}

export default function ScanProductPage() {
  const router = useRouter();
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTorch, setHasTorch] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [scanStats, setScanStats] = useState({ fps: 0, lastScanTime: 0 });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerControlsRef = useRef<IScannerControls | null>(null);
  const lastScannedCodeRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio for feedback
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audioRef.current.volume = 0.5;
  }, []);

  const stopScanner = useCallback(() => {
    if (scannerControlsRef.current) {
      scannerControlsRef.current.stop();
      scannerControlsRef.current = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsTorchOn(false);
  }, []);

  const handleStartScan = useCallback(() => {
    setError(null);
    setBarcodeResult(null);
    setIsScanning(true);
    lastScannedCodeRef.current = null;

    // Clear any previous scanner controls
    stopScanner();
  }, [stopScanner]);

  const handleStopScan = useCallback(() => {
    stopScanner();
    setIsScanning(false);
    setIsInitializing(false);
  }, [stopScanner]);

  const provideFeedback = useCallback(() => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
    // Audio feedback
    if (audioRef.current) {
      audioRef.current.play().catch(() => { }); // Ignore interaction errors
    }
  }, []);

  const handleScannerResult = useCallback((value: string) => {
    const barcodeText = value.trim();
    if (barcodeText && barcodeText !== lastScannedCodeRef.current) {
      lastScannedCodeRef.current = barcodeText;
      provideFeedback();
      setBarcodeResult(barcodeText);
      setError(null);
      // Auto-stop scanning after finding a result to prevent accidental repeat scans
      handleStopScan();

      // Redirect to product page
      router.push(`/products/${barcodeText}`);
    }
  }, [provideFeedback, handleStopScan, router]);

  const toggleTorch = async () => {
    if (!scannerControlsRef.current || !hasTorch) return;

    try {
      const videoTrack = (videoRef.current?.srcObject as MediaStream)?.getVideoTracks()[0];
      if (videoTrack) {
        const nextState = !isTorchOn;
        await videoTrack.applyConstraints({
          advanced: [{ torch: nextState } as any]
        });
        setIsTorchOn(nextState);
      }
    } catch (err) {
      console.error('Failed to toggle torch:', err);
    }
  };

  const handleCopyBarcode = () => {
    if (barcodeResult) {
      navigator.clipboard.writeText(barcodeResult);
    }
  };

  const handleScanAgain = () => {
    setBarcodeResult(null);
    setError(null);
    handleStartScan();
  };

  // Main Scanning logic
  useEffect(() => {
    if (!isScanning) return;

    let cancelled = false;
    setIsInitializing(true);

    const initializeScanner = async () => {
      try {
        if (!videoRef.current) throw new Error('Video element not found');

        // Check for native BarcodeDetector API (fastest)
        const supportsNative = 'BarcodeDetector' in window;
        const nativeFormats = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'];

        // Try to get a high-quality stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
            focusMode: 'continuous',
          } as any
        });

        if (cancelled) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        videoRef.current.srcObject = stream;

        // Wait for video to be ready
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve;
          }
        });

        // Check torch support
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities ? track.getCapabilities() : {};
        setHasTorch(!!(capabilities as any).torch);

        setIsInitializing(false);

        if (supportsNative) {
          console.log('Using Native BarcodeDetector');
          const detector = new window.BarcodeDetector({ formats: nativeFormats });

          const scanFrame = async () => {
            if (cancelled || !isScanning || !videoRef.current) return;

            try {
              const barcodes = await detector.detect(videoRef.current);
              if (barcodes.length > 0) {
                handleScannerResult(barcodes[0].rawValue);
              } else {
                requestAnimationFrame(scanFrame);
              }
            } catch (e) {
              console.error('Native detection error:', e);
              requestAnimationFrame(scanFrame);
            }
          };
          requestAnimationFrame(scanFrame);

          // Store controls to stop the stream later
          scannerControlsRef.current = {
            stop: () => stream.getTracks().forEach(track => track.stop())
          } as any;
        } else {
          // Fallback to ZXing (still very good)
          console.log('Using ZXing Library');
          const hints = new Map();
          hints.set(DecodeHintType.TRY_HARDER, true);
          hints.set(DecodeHintType.POSSIBLE_FORMATS, [
            BarcodeFormat.EAN_13,
            BarcodeFormat.EAN_8,
            BarcodeFormat.UPC_A,
            BarcodeFormat.UPC_E,
            BarcodeFormat.CODE_128
          ]);

          const reader = new BrowserMultiFormatReader(hints);
          const controls = await reader.decodeFromVideoElement(videoRef.current, (result, err) => {
            if (result) {
              handleScannerResult(result.getText());
            }
          });

          scannerControlsRef.current = controls;
        }

      } catch (err: any) {
        if (!cancelled) {
          console.error('Scanner init error:', err);
          setError(err?.message || 'Failed to start camera');
          setIsInitializing(false);
          setIsScanning(false);
        }
      }
    };

    initializeScanner();

    return () => {
      cancelled = true;
      stopScanner();
    };
  }, [isScanning, handleScannerResult, stopScanner]);

  return (
    <AuthShield>
      <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8 font-sans">
        <div className="max-w-xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Smart Scan
              </h1>
              <p className="text-slate-400 text-sm">Professional EAN/UPC Scanner</p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700">
              <ScanLine className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          {/* Main Interface */}
          <div className="relative group">
            {/* Glass Card Container */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl transition-all duration-300 group-hover:border-slate-700">

              {!isScanning ? (
                <div className="p-12 flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
                    <div className="relative bg-slate-800 p-8 rounded-full border border-slate-700 shadow-xl">
                      <Camera className="w-16 h-16 text-blue-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-100 italic">Ready to Capture</h2>
                    <p className="text-slate-400 max-w-xs mx-auto text-sm leading-relaxed">
                      Our AI-powered engine is ready to detect barcodes in real-time with extreme precision.
                    </p>
                  </div>
                  <button
                    onClick={handleStartScan}
                    className="w-full max-w-xs group/btn flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/25"
                  >
                    <ScanLine className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span>INITIALIZE SCANNER</span>
                  </button>
                </div>
              ) : (
                <div className="relative aspect-[3/4] sm:aspect-square md:aspect-video bg-black overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover scale-105 transition-transform duration-700 brightness-110"
                    autoPlay
                    muted
                    playsInline
                  />

                  {/* Scanning HUD Overlay */}
                  <div className="absolute inset-0 flex flex-col">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
                      <button
                        onClick={handleStopScan}
                        className="p-2.5 rounded-xl bg-black/40 border border-white/10 hover:bg-black/60 backdrop-blur-md transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-md text-[10px] font-mono tracking-widest text-blue-400 animate-pulse">
                        LIVE ENGINE ACTIVE
                      </div>
                      {hasTorch ? (
                        <button
                          onClick={toggleTorch}
                          className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${isTorchOn ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400 shadow-[0_0_15px_-3px_rgba(250,204,21,0.5)]' : 'bg-black/40 border-white/10 text-white hover:bg-black/60'}`}
                        >
                          {isTorchOn ? <Flashlight className="w-5 h-5" /> : <FlashlightOff className="w-5 h-5" />}
                        </button>
                      ) : <div className="w-10" />}
                    </div>

                    {/* Viewport Frame */}
                    <div className="flex-1 flex items-center justify-center p-8">
                      <div className="relative w-full max-w-sm aspect-[4/3] sm:aspect-square">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-500 rounded-tl-3xl"></div>
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-500 rounded-tr-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-500 rounded-bl-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-500 rounded-br-3xl"></div>

                        {/* Scanning Laser Line */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                          <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_20px_2px_rgba(96,165,250,0.8)] animate-scanner-line opacity-80" />
                        </div>

                        {/* Inner Target Circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full border border-blue-400/30 animate-ping"></div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Tooltip */}
                    <div className="p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-center">
                      <p className="text-[11px] font-medium tracking-wide text-white/70 uppercase">
                        Align barcode within the frame
                      </p>
                    </div>
                  </div>

                  {/* Initializing State */}
                  {isInitializing && (
                    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center space-y-4">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="text-sm font-medium text-slate-400 animate-pulse uppercase tracking-[0.2em]">Calibrating Optics...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Results Modal/Overlay */}
            {barcodeResult && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-500/20 p-2 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-green-400 text-lg">Detection Successful</h3>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">Format: AUTO-IDENTIFIED</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full relative flex-1">
                      <input
                        readOnly
                        value={barcodeResult}
                        className="w-full bg-slate-800/80 border border-slate-700/50 rounded-2xl px-6 py-4 font-mono text-2xl text-center text-white tracking-[0.2em] focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleCopyBarcode}
                        className="flex-1 sm:flex-none p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-colors active:scale-95 group"
                      >
                        <Copy className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />
                      </button>
                      <button
                        onClick={handleScanAgain}
                        className="flex-1 sm:flex-none p-4 bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                      >
                        <RotateCcw className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Feed */}
            {error && !barcodeResult && (
              <div className="mt-6 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-sm text-red-100/80">{error}</p>
              </div>
            )}
          </div>

          {/* Intelligence Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Info className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Detection Logic</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                EAN-13, EAN-8, UPC High-Priority Decoding Enabled
              </p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <ScanLine className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Engine Status</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Native Hardware Acceleration {'BarcodeDetector' in (typeof window !== 'undefined' ? window : {}) ? 'Active' : 'Simulated'}
              </p>
            </div>
          </div>
        </div>

        {/* Styles for scanner animation */}
        <style jsx global>{`
          @keyframes scanner-line {
            0% { top: 0; }
            50% { top: 100%; opacity: 0.8; }
            100% { top: 0; }
          }
          .animate-scanner-line {
            position: absolute;
            left: 0;
            animation: scanner-line 2.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    </AuthShield>
  );

}

