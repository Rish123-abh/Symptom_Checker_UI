import React, { useCallback, useState ,useEffect} from 'react';
import { Loader } from 'lucide-react';
import axios from 'axios';
import debounce from 'lodash.debounce';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
type Proptype = {
    symptoms: string;
    setSymptoms: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
}


const SymptomInput = ({ symptoms, setSymptoms, onSubmit, loading }: Proptype) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
   

    // This is function to fetch symptom suggestions from the API
    const fetchSuggestion = async (input: string) => {
        if (!input) {
            setSuggestions([]);
            return;
        }

        const response = await axios.get(`${API_BASE_URL}/symptoms/search`, {
            params: { q: input }
        });
        setSuggestions(response.data);
    };

    // This function debounces the API call to avoid excessive requests
    const debouncedFetch = useCallback(
        debounce((value: string) => {
            fetchSuggestion(value);
        }, 500),
        []
    );

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSymptoms(value);
        debouncedFetch(value);
    };

    useEffect(() => {
  return () => {
    debouncedFetch.cancel();
  };
}, []);


// This function handles when a user clicks on a suggestion it handles removal of partially typed symptom and add clicked symptom and then close the suggestion list 
const handleSuggestionChange=(s:string)=>{
 const parts = symptoms.split(',').map(s => s.trim());

  // Replace the last item (the one being typed) with the selected symptom
  parts[parts.length - 1] = s;

  setSymptoms(parts.join(', '));
  setSuggestions([]);
}
    return (
        <div className="mb-6">
            <div className="mb-4">
                <label htmlFor="symptoms" className="block text-lg font-semibold text-gray-700 mb-2">
                    Enter Your Symptoms
                </label>
                <div className="relative">
                    <input
                        type="text"
                        id="symptoms"
                        value={symptoms}
                        onChange={handleInputChange}
                        onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
                        placeholder="e.g., fever, headache, cough (separate with commas)"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-black"
                    />
                    {suggestions.length > 0 && (
                        <ul className="border mt-2 rounded bg-white">
                            {suggestions.map((s: string, index) => (
                                <li key={index} onClick={() => handleSuggestionChange(s)} className="p-2 hover:bg-gray-100 cursor-pointer text-black">
                                    {s}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Separate multiple symptoms with commas
                </p>
            </div>

            <button
                onClick={submitHandler}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
            >
                {loading ? (
                    <>
                        <Loader className="animate-spin h-5 w-5 mr-2" />
                        Analyzing Symptoms...
                    </>
                ) : (
                    'Predict Diseases'
                )}
            </button>
        </div>
    );
};

export default SymptomInput;