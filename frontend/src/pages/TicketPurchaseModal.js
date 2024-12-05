import React, { useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF

const TicketPurchaseModal = ({ isOpen, onClose }) => {
  const [passengerName, setPassengerName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

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
      setIsProcessing(true);

      // Simulate processing delay
      setTimeout(() => {
        const ticket = {
          passengerName,
          transitMode: "TTC (Toronto Transit Commission)",
          price: "$3.30",
          timestamp: new Date().toLocaleString(),
        };
        setTicketDetails(ticket);
        setIsProcessing(false);
      }, 4000); // 4 seconds delay
    }
  };

  // Function to download the ticket as a PDF
  const downloadTicketAsPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);

    // Add ticket details to the PDF
    doc.text(`Ticket Confirmation`, 20, 20);
    doc.text(`Passenger Name: ${ticketDetails.passengerName}`, 20, 30);
    doc.text(`Transit Mode: ${ticketDetails.transitMode}`, 20, 40);
    doc.text(`Price: ${ticketDetails.price}`, 20, 50);
    doc.text(`Issued At: ${ticketDetails.timestamp}`, 20, 60);

    // Save the generated PDF
    doc.save(`${ticketDetails.passengerName}_ticket.pdf`);
  };

  if (!isOpen) return null;

  if (isProcessing) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-80 text-center">
          <h2 className="text-xl font-bold">Processing Payment...</h2>
          <p className="text-gray-700 mt-2">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (ticketDetails) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-bold mb-4">Ticket Confirmation</h2>
          <p>
            <strong>Passenger Name:</strong> {ticketDetails.passengerName}
          </p>
          <p>
            <strong>Transit Mode:</strong> {ticketDetails.transitMode}
          </p>
          <p>
            <strong>Price:</strong> {ticketDetails.price}
          </p>
          <p>
            <strong>Issued At:</strong> {ticketDetails.timestamp}
          </p>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-green-500 text-white rounded-lg px-4 py-2 mt-4 ml-2"
            onClick={downloadTicketAsPDF} // Trigger PDF download
          >
            Download PDF
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Buy Transit Ticket</h2>
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
              <option>TTC (Toronto Transit Commission)</option>
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
