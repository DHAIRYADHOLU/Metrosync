import React, { useState } from "react";

const TicketPurchaseModal = ({ isOpen, onClose }) => {
  const [passengerName, setPassengerName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const errors = {};

    // Validate Passenger Name
    if (!passengerName.trim()) {
      errors.passengerName = "Name is required.";
    }

    // Validate Card Number
    if (!/^\d{16}$/.test(cardNumber)) {
      errors.cardNumber = "Card number must be 16 digits.";
    }

    // Validate Expiry Date
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      errors.expiry = "Expiry must be in MM/YY format.";
    }

    // Validate CVC
    if (!/^\d{3}$/.test(cvc)) {
      errors.cvc = "CVC must be exactly 3 digits.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // No errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      alert("Payment successful!");
      onClose();
    }
  };

  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Buy City Bus Ticket</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Passenger Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Passenger Name
            </label>
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className={`w-full border ${
                errors.passengerName ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your name"
            />
            {errors.passengerName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passengerName}
              </p>
            )}
          </div>

          {/* Select Transit Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Transit Mode
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500">
              <option>TTC (Toronto Transit Comission)</option>
              <option>Go Transit</option>
            </select>
          </div>

          {/* Ticket Summary */}
          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-lg font-medium">Ticket Summary</h3>

            <p className="text-sm text-gray-700">
              <strong>Price:</strong> $3.30
            </p>
          </div>

          {/* Payment Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Information
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={`w-full border ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Card Number"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className={`w-1/2 border ${
                  errors.expiry ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="MM/YY"
              />
              <input
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className={`w-1/2 border ${
                  errors.cvc ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="CVC"
              />
            </div>
            {errors.expiry && (
              <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
            )}
            {errors.cvc && (
              <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-500 text-white rounded-lg px-4 py-2 mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg px-4 py-2"
            >
              Pay $3.30
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketPurchaseModal;
