import SymptomTag from './SymptomTag';

const SymptomReference = ({ onSymptomClick}:{onSymptomClick:(symptom:string)=>void}) => {
  const availableSymptoms = [
    'fever', 'headache', 'cough', 'sore throat', 'fatigue', 'nausea', 
    'vomiting', 'diarrhea', 'abdominal pain', 'chest pain', 'shortness of breath',
    'dizziness', 'muscle pain', 'joint pain', 'rash', 'runny nose',
    'congestion', 'constipation', 'weight loss', 'night sweats'
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Common Symptoms Reference</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {availableSymptoms.map((symptom, index) => (
          <SymptomTag 
            key={index}
            symptom={symptom}
            onClick={() => onSymptomClick(symptom)}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Click on any symptom above to add it to your search
      </p>
    </div>
  );
};

export default SymptomReference;