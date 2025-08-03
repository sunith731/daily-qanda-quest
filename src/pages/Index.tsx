import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { Dashboard } from "@/components/Dashboard";
import { QuizInterface } from "@/components/QuizInterface";
import { QuizResults } from "@/components/QuizResults";
import { QuizHistory } from "@/components/QuizHistory";
import { mockQuestions, mockUser, mockQuizHistory, type User, type QuizAttempt } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type AppState = 'auth' | 'dashboard' | 'quiz' | 'results' | 'history';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    answers: number[];
    timeSpent: number;
  } | null>(null);
  const { toast } = useToast();

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, this would validate against backend
    setUser(mockUser);
    setCurrentState('dashboard');
    toast({
      title: "Welcome back!",
      description: "Successfully logged in to QuizMaster.",
    });
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock signup - in real app, this would create new user
    const newUser: User = {
      id: "new_user",
      name,
      email,
      stats: {
        totalQuestions: 0,
        correctAnswers: 0,
        streak: 0,
        averageScore: 0
      }
    };
    setUser(newUser);
    setCurrentState('dashboard');
    toast({
      title: "Account created!",
      description: "Welcome to QuizMaster. Ready to start learning?",
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentState('auth');
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const handleStartQuiz = () => {
    setCurrentState('quiz');
  };

  const handleQuizComplete = (results: { score: number; answers: number[]; timeSpent: number }) => {
    setQuizResults(results);
    setCurrentState('results');
    
    // Update user stats (mock)
    if (user) {
      const newStats = {
        ...user.stats,
        totalQuestions: user.stats.totalQuestions + mockQuestions.length,
        correctAnswers: user.stats.correctAnswers + results.score,
        streak: results.score >= 7 ? user.stats.streak + 1 : 0
      };
      newStats.averageScore = Math.round((newStats.correctAnswers / newStats.totalQuestions) * 100);
      
      setUser({
        ...user,
        stats: newStats
      });
    }

    toast({
      title: "Quiz completed!",
      description: `You scored ${results.score} out of ${mockQuestions.length}!`,
    });
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
  };

  const handleViewHistory = () => {
    setCurrentState('history');
  };

  const handleRetakeQuiz = () => {
    setCurrentState('quiz');
  };

  const handleViewDetails = (attemptId: string) => {
    // In a real app, this would fetch and display detailed results
    toast({
      title: "Feature Coming Soon",
      description: "Detailed quiz review will be available soon!",
    });
  };

  if (!user && currentState === 'auth') {
    return <AuthForm onLogin={handleLogin} onSignup={handleSignup} />;
  }

  if (!user) {
    return null;
  }

  switch (currentState) {
    case 'dashboard':
      return (
        <Dashboard
          user={user}
          onStartQuiz={handleStartQuiz}
          onViewHistory={handleViewHistory}
          onLogout={handleLogout}
        />
      );
    
    case 'quiz':
      return (
        <QuizInterface
          questions={mockQuestions}
          onComplete={handleQuizComplete}
          onBack={handleBackToDashboard}
        />
      );
    
    case 'results':
      if (!quizResults) return null;
      return (
        <QuizResults
          questions={mockQuestions}
          userAnswers={quizResults.answers}
          score={quizResults.score}
          timeSpent={quizResults.timeSpent}
          onBackToDashboard={handleBackToDashboard}
          onRetakeQuiz={handleRetakeQuiz}
          onViewHistory={handleViewHistory}
        />
      );
    
    case 'history':
      return (
        <QuizHistory
          attempts={mockQuizHistory}
          onBack={handleBackToDashboard}
          onViewDetails={handleViewDetails}
        />
      );
    
    default:
      return null;
  }
};

export default Index;
