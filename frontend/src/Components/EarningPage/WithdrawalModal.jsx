import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const WithdrawModal = ({ isOpen, onClose, availableBalance, onWithdrawSuccess }) => {
  const {user} = useAuth();
  const [method, setMethod] = useState('UPI'); 
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState(user?.upiId || "");
  const [bankDetails, setBankDetails] = useState({
    accountHolder: user?.accountHolderName || "",
    accountNumber: user?.accountNumber || "",
    ifsc: user?.ifscCode || ""
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const numericAmount = parseFloat(amount) || 0;
  const fee = numericAmount > 0 ? +(numericAmount * 0.01).toFixed(2) : 0; // 1% mock platform fee
  const netReceivable = numericAmount > 0 ? +(numericAmount - fee).toFixed(2) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (numericAmount <= 0) {
      setError('Please enter a valid withdrawal amount.');
      return;
    }
    if (numericAmount > availableBalance) {
      setError('Withdrawal amount cannot exceed available balance.');
      return;
    }

    if (method === 'UPI' && !upiId.includes('@')) {
      setError('Please enter a valid UPI ID (e.g., farmer@oksbi).');
      return;
    }

    if (
      method === 'BANK' &&
      (!bankDetails.accountHolder || !bankDetails.accountNumber || !bankDetails.ifsc)
    ) {
      setError('Please fill in all bank account details.');
      return;
    }

    setIsProcessing(true);

    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      const destination =
        method === 'UPI' ? upiId : `A/C ending in ${bankDetails.accountNumber.slice(-4)}`;

      // Trigger parent callback to update balance/history
      if (onWithdrawSuccess) {
        onWithdrawSuccess({
          amount: numericAmount,
          netReceivable,
          method,
          destination,
          date: new Date().toISOString()
        });
      }

      // Reset form & close
      setAmount('');
      setUpiId('');
      setBankDetails({ accountHolder: '', accountNumber: '', ifsc: '' });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Withdraw Funds</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Available Balance */}
          <div className="flex justify-between items-center bg-green-50 border border-green-100 px-4 py-3 rounded-xl">
            <span className="text-sm font-medium text-green-800">Available Balance</span>
            <span className="text-xl font-bold text-green-700">
              ₹{availableBalance.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Method Toggle Tabs */}
          <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setMethod('UPI');
                setError('');
              }}
              className={`py-2 text-sm font-semibold rounded-lg transition ${
                method === 'UPI'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              UPI Transfer
            </button>
            <button
              type="button"
              onClick={() => {
                setMethod('BANK');
                setError('');
              }}
              className={`py-2 text-sm font-semibold rounded-lg transition ${
                method === 'BANK'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Bank Transfer
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold uppercase text-gray-600">
                Withdrawal Amount
              </label>
              <button
                type="button"
                onClick={() => setAmount(availableBalance.toString())}
                className="text-xs font-semibold text-green-600 hover:underline"
              >
                Withdraw Max
              </button>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-500 font-semibold">₹</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
              />
            </div>
          </div>

          {/* Conditional Destination Fields */}
          {method === 'UPI' ? (
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="e.g., farmer.name@okaxis"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  placeholder="Full name as per bank records"
                  value={bankDetails.accountHolder}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, accountHolder: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="XXXXXXXX1234"
                    value={bankDetails.accountNumber}
                    onChange={(e) =>
                      setBankDetails({ ...bankDetails, accountNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    placeholder="SBIN0001234"
                    value={bankDetails.ifsc}
                    onChange={(e) =>
                      setBankDetails({ ...bankDetails, ifsc: e.target.value.toUpperCase() })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Fee & Payout Summary Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Processing Fee (1%)</span>
              <span>- ₹{fee.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-200">
              <span>You will receive</span>
              <span className="text-green-600">₹{netReceivable.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || availableBalance <= 0}
              className="w-2/3 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition shadow-sm"
            >
              {isProcessing ? 'Processing...' : 'Proceed with Transfer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawModal;