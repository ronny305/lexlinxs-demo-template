import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Question, FormState } from './types';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';

const questions: Question[] = [
  {
    id: 'name',
    type: 'text',
    question: '👋 What\'s your name?',
    placeholder: 'Type your name...',
  },
  {
    id: 'email',
    type: 'email',
    question: '📧 What\'s your email address?',
    placeholder: 'name@example.com',
  },
  {
    id: 'role',
    type: 'select',
    question: '💼 What describes your role best?',
    options: ['Developer', 'Designer', 'Product Manager', 'Other'],
  },
  {
    id: 'message',
    type: 'multiline',
    question: '💭 What\'s on your mind?',
    placeholder: 'Share your thoughts...',
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formState, setFormState] = useState<FormState>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = useCallback((value: string) => {
    setFormState(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
      // Here you would typically submit the form data
      console.log('Form submitted:', formState);
    }
  }, [currentQuestion, formState]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent, value: string) => {
    if (e.key === 'Enter' && value.trim()) {
      handleNext(value);
    }
  }, [handleNext]);

  const progress = (currentQuestion / questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="text-center text-white space-y-6">
          <Sparkles className="w-16 h-16 mx-auto text-yellow-400 animate-pulse" />
          <h1 className="text-4xl font-bold">Thank you!</h1>
          <p className="text-xl text-gray-300">Your response has been recorded.</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-6">
      <ProgressBar progress={progress} />
      
      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQ.id}
          question={currentQ.question}
          currentIndex={currentQuestion}
          totalQuestions={questions.length}
        >
          {currentQ.type === 'select' ? (
            <div className="grid gap-3">
              {currentQ.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleNext(option)}
                  className="w-full text-left px-6 py-4 rounded-lg bg-white/10 hover:bg-white/20 
                           text-white transition-colors duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <input
              type={currentQ.type}
              placeholder={currentQ.placeholder}
              className="w-full bg-transparent border-b-2 border-white/20 px-2 py-4 text-2xl 
                       text-white placeholder-white/50 focus:border-white focus:outline-none
                       transition-colors duration-200"
              autoFocus
              onKeyPress={(e) => {
                const target = e.target as HTMLInputElement;
                handleKeyPress(e, target.value);
              }}
            />
          )}
        </QuestionCard>
      </AnimatePresence>
    </div>
  );
}

export default App;