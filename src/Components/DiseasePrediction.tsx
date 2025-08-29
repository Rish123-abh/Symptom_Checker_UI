import React, { useState } from 'react';
import Header from './Header';
import SymptomInput from './SymptomInput';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import PredictionResults from './PredictionResults';
import SymptomReference from './SymptomReference';
import Footer from './Footer';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type DiseasePredictionResponse = {
  symptoms: string[];
  possibleDiseases: Prediction[];
};
interface Prediction {
  disease: string;
  probability: number | string; // API might return number or formatted string
}

const DiseasePredictionApp: React.FC = () => {
  const [symptoms, setSymptoms] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (): Promise<void> => {

    setLoading(true);
    setError('');
    setHasSearched(true); // mark that a search attempt was made

    try {
      if (!symptoms.trim()) {
        setError('Please enter at least one symptom.');
        return
      }

      const response = await axios.get<DiseasePredictionResponse>(
        `${API_BASE_URL}/predictDisease`,
        { params: { symptoms } }
      );

      setPredictions(response.data.possibleDiseases || []);
      setSymptoms('');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data?.error || err.message || 'An error occurred');
      } else {
        setError('An unknown error occurred');
      }
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };


  // This function adds a clicked symptom from the reference list to the input field
  const handleSymptomClick = (symptom: string): void => {
    const symptomwithoutSpaces = symptom.replace(/\s+/g, '').trim();
    setSymptoms((prev) => (prev ? `${prev}, ${symptomwithoutSpaces}` : symptomwithoutSpaces));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Header />

        <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
          <SymptomInput
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {error && <ErrorMessage message={error} />}
          {loading && <LoadingSpinner />}


          {hasSearched && !error && predictions.length === 0 && (
            <ErrorMessage message="Don't have information for this symptom" />
          )}
          {!error && predictions.length > 0 && (
            <PredictionResults predictions={predictions} />
          )}
        </div>

        <SymptomReference onSymptomClick={handleSymptomClick} />
        <Footer />
      </div>
    </div>
  );
};

export default DiseasePredictionApp;
