const SubscriptionModal = ({ isOpen, onClose, onSubscribe }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Unlock Premium Features 🚀</h2>
        <p className="text-gray-600 text-center mb-4">
          Subscribe now to get access to powerful tools and premium articles!
        </p>

        <ul className="space-y-2 mb-6">
          <li className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="checkbox checkbox-success" />
            <span>Access to exclusive premium articles</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="checkbox checkbox-success" />
            <span>Add unlimited articles to your profile</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="checkbox checkbox-success" />
            <span>Stay ahead with curated content</span>
          </li>
        </ul>

        <button
        onClick={onSubscribe}
          className="btn btn-primary w-full mb-2"
        >
          View Subscription Plans
        </button>
        <button
          onClick={onClose}
          className="btn btn-ghost w-full"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
