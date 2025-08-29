type Prototype = {
  symptom: string;
  onClick: () => void;}
const   SymptomTag = ({ symptom, onClick }:Prototype) => {
  return (
    <span 
      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
      onClick={onClick}
    >
      {symptom}
    </span>
  );
};

export default SymptomTag;