import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }:{message:string}) => {
  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
      <p className="text-red-700">{message}</p>
    </div>
  );
};

export default ErrorMessage;