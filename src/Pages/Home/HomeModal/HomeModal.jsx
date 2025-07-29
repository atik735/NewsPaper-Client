import { useEffect, useState } from "react";
import SubscriptionModal from "./SubscriptionModal";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 10000);
    return () => clearTimeout(timer);
  }, []);
 
  
  return (
    <div>
      <SubscriptionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubscribe={() => {
          setShowModal(false);
          window.location.href = "/subscription"; // redirect to subscription page
        }}
      />
    </div>
  );
};

export default HomePage;
