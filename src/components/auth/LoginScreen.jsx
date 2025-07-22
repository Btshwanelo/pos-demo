import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function LoginScreen() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const correctPin = '123'; // Demo PIN

  const handleNumberClick = (number) => {
    if (pin.length < 6) {
      setPin(prev => prev + number);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleSignIn = async () => {
    if (pin.length === 0) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (pin === correctPin) {
        dispatch({ type: 'LOGIN', payload: { email: 'admin@example.com', role: 'admin' } });
        navigate('/pos');
      } else {
        alert('Invalid PIN. Use 123');
        setPin('');
      }
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key >= '0' && e.key <= '9') {
      handleNumberClick(e.key);
    } else if (e.key === 'Backspace') {
      handleDelete();
    } else if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [pin]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Side - Illustration */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          {/* Illustration */}
          <div className="relative mb-8">
            <div className=" h-64 bg-gradient-to-br from-blue-400 to-teal-400 rounded-3xl flex items-center justify-center relative overflow-hidden">
              {/* Background decorative circles */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/20 rounded-full"></div>
              <div className="absolute top-1/2 right-4 w-6 h-6 bg-white/20 rounded-full"></div>
              
              {/* Main character */}
              <div className="relative z-10">
                {/* Person */}
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  <div className="text-4xl">👤</div>
                </div>
                
                {/* Mobile device */}
                <div className="w-16 h-24 bg-white rounded-lg shadow-lg mx-auto mb-4 relative">
                  <div className="w-full h-2 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-2">
                    <div className="w-full h-3 bg-gray-100 rounded mb-1"></div>
                    <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
                  </div>
                </div>
                
                {/* Success checkmark */}
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Selling made easy</h2>
          <p className="text-gray-600 text-lg">
            Provides various payment methods, perfect for those of you who are very cashless
          </p>
          
          {/* Progress indicator */}
          <div className="flex justify-center mt-8">
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right Side - PIN Entry */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Enter Pin</h1>
            <p className="text-gray-600">Your Pin is required to enable Touch ID</p>
          </div>

          {/* PIN Display */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border-2 ${
                    pin.length > index
                      ? 'bg-gray-800 border-gray-800'
                      : 'border-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <button
                key={number}
                onClick={() => handleNumberClick(number.toString())}
                className="w-16 h-16 flex  items-center justify-center text-2xl font-medium text-gray-800 hover:bg-gray-200 bg-gray-100 rounded-full transition-colors mx-auto"
                disabled={loading}
              >
                {number}
              </button>
            ))}
            
            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="w-16 h-16 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-full transition-colors mx-auto"
              disabled={loading || pin.length === 0}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path>
              </svg>
            </button>
            
            {/* Zero */}
            <button
              onClick={() => handleNumberClick('0')}
              className="w-16 h-16 flex items-center justify-center text-2xl font-medium text-gray-800 hover:bg-gray-50 rounded-full transition-colors mx-auto"
              disabled={loading}
            >
              0
            </button>
            
            {/* Empty space for alignment */}
            <div className="w-16 h-16"></div>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={loading || pin.length === 0}
            className="w-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 font-medium py-4 px-6 rounded-2xl transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800 text-center">
              <strong>Demo PIN:</strong> 123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}