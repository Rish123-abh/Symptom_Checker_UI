import { CheckCircle } from 'lucide-react';
import PredictionCard from './PredictionCard';


type prediction ={
  disease: string;
  probability: number | string; // API might return number or formatted string
}
type propType={
    predictions:prediction[]
}
const PredictionResults = ( {predictions} :propType) => {

    // Function to determine color based on probability
const getProbabilityColor = (probability: number | string) => {
  const value = typeof probability === 'string' ? parseFloat(probability) : probability;
  if (value >= 70) return 'text-red-600';
  if (value >= 50) return 'text-yellow-600';
  return 'text-green-600';
};

// This is main card of all disease predictions
//  Inside PredictionCard component have details for each disease  
  return (
    <div className="border-t pt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
        Possible Conditions
      </h2>
      
        <div className="space-y-4">
      {predictions.length > 0 ? (
        predictions.map((prediction, index) => (
          <PredictionCard
            key={index}
            prediction={prediction}
            getProbabilityColor={getProbabilityColor}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">No possible conditions found.</p>
      )}
    </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 font-medium">
          💡 Recommendation: Please consult with a healthcare professional for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
};

export default PredictionResults;