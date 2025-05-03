// src/pages/Subscription.jsx
function Subscription() {
    const handleSubscribe = () => {
      window.location.href = "http://localhost:5000/api/subscribe"; // Your Stripe route
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded text-center">
        <h2 className="text-xl font-bold mb-4">Upgrade to Pro</h2>
        <p className="mb-4">Get unlimited todos and premium support.</p>
        <button onClick={handleSubscribe} className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
          Subscribe Now
        </button>
      </div>
    );
  }
  
  export default Subscription;
  