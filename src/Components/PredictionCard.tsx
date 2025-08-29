type prediction ={
  disease: string;
  probability: number | string; // API might return number or formatted string
}
type propType={
    prediction:prediction,
    getProbabilityColor:(probability:number | string)=>string
}
const PredictionCard = ({ prediction,getProbabilityColor }:propType) => {
const probabilityValue =
    typeof prediction.probability === 'string'
      ? parseFloat(prediction.probability)
      : prediction.probability;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold text-gray-800">
          {prediction.disease}
        </h3>
        <span className={`text-lg font-bold ${getProbabilityColor(prediction.probability)}`}>
          {prediction.probability}% match
        </span>
      </div>
      
      <div className="flex items-center justify-between">        
        <div className="w-48 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              probabilityValue >= 70 ? 'bg-red-500' :
              probabilityValue >= 50 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${prediction.probability}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;