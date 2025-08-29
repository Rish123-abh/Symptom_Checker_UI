
import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Activity className="h-10 w-10 text-blue-600 mr-3" />
        <h1 className="text-4xl font-bold text-gray-800">Disease Prediction Tool</h1>
      </div>
      <p className="text-gray-600 text-lg">
        Enter your symptoms to get possible disease predictions
      </p>
    </header>
  );
};

export default Header;