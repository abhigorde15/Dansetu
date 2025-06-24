const Receipt = ({filterDonation}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border">
        {/* Company Logo */}
        <div className="flex justify-center">
          <img src="/logo.png" alt="Company Logo" className="h-14" />
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-800 mt-2">
          Payment Receipt
        </h2>

        {/* Payment Details */}
        <div className="mt-4 border-t pt-4">
          <p className="text-gray-700">
            <strong>Order ID:</strong> {filterDonation.orderId}
          </p>
        
          <p className="text-gray-700">
            <strong>Amount Paid:</strong> ₹{(filterDonation.amount)/100}
          </p>
          <p className="text-gray-700">
            <strong>Receipt No:</strong> {filterDonation.receipt}
          </p>
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            <span className="text-green-600 font-semibold">{filterDonation.status}</span>
          </p>
          <p className="text-gray-700">
            <strong>Date:</strong> 15 March 2025, 10:30 AM
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Thank you for your payment!
        </div>

        {/* Print / Download Button */}
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => window.print()}
        >
          Download / Print Receipt
        </button>
      </div>
    </div>
  );
};

export default Receipt;
