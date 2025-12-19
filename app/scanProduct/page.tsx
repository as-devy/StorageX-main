'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { DecodeHintType, BarcodeFormat } from '@zxing/library';
import { X, Loader2, CheckCircle2, AlertCircle, ScanLine, Camera } from 'lucide-react';

export default function ScanProductPage() {
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerControlsRef = useRef<IScannerControls | null>(null);

  const stopScanner = useCallback(() => {
    if (scannerControlsRef.current) {
      scannerControlsRef.current.stop();
      scannerControlsRef.current = null;
    }
  }, []);

  const handleStartScan = useCallback(() => {
    setError(null);
    setBarcodeResult(null);
    setIsInitializing(false);
    setIsScanning(true);
    // Clear any previous scanner controls
    if (scannerControlsRef.current) {
      scannerControlsRef.current.stop();
      scannerControlsRef.current = null;
    }
  }, []);

  const handleStopScan = useCallback(() => {
    stopScanner();
    setIsScanning(false);
    setIsInitializing(false);
  }, [stopScanner]);

  const lastScannedCodeRef = useRef<string | null>(null);
  
  const handleScannerResult = useCallback((value: string) => {
    const barcodeText = value.trim();
    // Avoid processing the same barcode multiple times
    if (barcodeText && barcodeText !== lastScannedCodeRef.current) {
      lastScannedCodeRef.current = barcodeText;
      setBarcodeResult(barcodeText);
      setError(null);
    }
  }, []);

  const handleCopyBarcode = () => {
    if (barcodeResult) {
      navigator.clipboard.writeText(barcodeResult);
      // You could add a toast notification here
    }
  };

  const handleScanAgain = () => {
    setBarcodeResult(null);
    setError(null);
    lastScannedCodeRef.current = null; // Reset to allow scanning the same code again
    if (!isScanning) {
      handleStartScan();
    }
  };

  // Camera scanning effect
  useEffect(() => {
    if (!isScanning) {
      return;
    }

    let cancelled = false;
    let isInitialized = false;
    setError(null);
    setIsInitializing(true);
    lastScannedCodeRef.current = null; // Reset last scanned code when starting new scan

    // Configure reader with performance hints for faster scanning
    const hints = new Map();
    // Don't try harder - faster scanning (TRY_HARDER=false means faster but less thorough)
    hints.set(DecodeHintType.TRY_HARDER, false);
    // Limit to common formats for faster processing
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.ITF,
      BarcodeFormat.CODABAR,
    ]);

    const reader = new BrowserMultiFormatReader(hints);

    // Start scanning immediately without delay
    if (!videoRef.current) {
      setIsInitializing(false);
      setError('Video element not available');
      return;
    }

    reader
      .decodeFromVideoDevice(undefined, videoRef.current, (result, err, controls) => {
        if (cancelled) {
          controls.stop();
          return;
        }

        scannerControlsRef.current = controls;

        // Mark as initialized once we get the first callback (camera is working)
        if (!isInitialized) {
          isInitialized = true;
          setIsInitializing(false);
          // Clear any errors once camera is initialized and working
          setError(null);
        }

        if (result) {
          handleScannerResult(result.getText());
        } else if (err) {
          // NotFoundException is completely normal - it just means no barcode in this frame
          // Only log/show errors for actual problems, not NotFoundException
          if (err.name !== 'NotFoundException') {
            // Only log real errors, don't show them to user unless they're critical
            console.error('Barcode scanning error:', err);
            // Only show error for critical issues that prevent scanning
            if (err.name === 'NotAllowedError' || err.name === 'NotFoundError') {
              setError('Camera access denied. Please allow camera permissions and try again.');
            }
          }
          // NotFoundException is expected during scanning, so we don't show it as an error
        }
      })
      .catch((err: any) => {
        if (cancelled) {
          return;
        }
        console.error('Camera access error', err);
        setError(err?.message || 'Unable to access camera. Please check permissions.');
        setIsInitializing(false);
      });

    return () => {
      cancelled = true;
      stopScanner();
      setIsInitializing(false);
    };
  }, [handleScannerResult, isScanning, stopScanner]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              EAN Barcode Scanner
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Point your camera at a barcode to scan and extract the code
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Camera Scanner Section */}
            <div className="space-y-4">
              {!isScanning ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
                    <Camera className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Ready to scan barcodes
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                      Click the button below to start your camera
                    </p>
                    <button
                      onClick={handleStartScan}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Camera className="h-5 w-5" />
                      <span>Start Camera</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-blue-500 dark:border-blue-400 bg-black">
                    <video
                      ref={videoRef}
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      playsInline
                    />
                    {isInitializing && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-black/60 text-white">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <p className="text-sm">Initializing camera...</p>
                      </div>
                    )}
                    {/* Scanning overlay frame */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-3/4 h-1/3 border-2 border-blue-400 rounded-lg shadow-lg">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-lg"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={handleStopScan}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Stop Camera</span>
                    </button>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 justify-center">
                    <ScanLine className="mr-2 h-4 w-4" />
                    Hold steady and ensure good lighting for the best results.
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            {(barcodeResult || error) && (
              <div className="space-y-4">
                {barcodeResult && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">
                          Barcode Scanned Successfully
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <code className="flex-1 bg-white dark:bg-gray-800 px-4 py-2 rounded border border-green-200 dark:border-green-700 text-green-900 dark:text-green-100 font-mono text-lg">
                            {barcodeResult}
                          </code>
                          <button
                            onClick={handleCopyBarcode}
                            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                        {isScanning && (
                          <button
                            onClick={handleScanAgain}
                            className="text-xs text-green-700 dark:text-green-300 hover:underline"
                          >
                            Scan another barcode
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
                          Error
                        </h3>
                        <p className="text-sm text-red-700 dark:text-red-400">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tips Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ScanLine className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                    Tips for Best Results
                  </h3>
                  <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
                    <li>Position the barcode within the scanning frame</li>
                    <li>Ensure the barcode is clearly visible and in focus</li>
                    <li>Use good lighting to avoid shadows on the barcode</li>
                    <li>Hold your device steady while scanning</li>
                    <li>Make sure the barcode is not damaged or obscured</li>
                    <li>Supported formats: EAN-8, EAN-13, UPC-A, UPC-E, Code 128, and more</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

