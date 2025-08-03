import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight,
  Flag,
  Brain
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizInterfaceProps {
  questions: Question[];
  onComplete: (results: { score: number; answers: number[]; timeSpent: number }) => void;
  onBack: () => void;
}

export function QuizInterface({ questions, onComplete, onBack }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    onComplete({ score, answers: selectedAnswers, timeSpent });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = selectedAnswers.filter(answer => answer !== -1).length;

  if (!questions.length) return null;

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">Daily Quiz</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Time Remaining</p>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className={`font-mono font-bold ${timeLeft < 300 ? 'text-accent' : 'text-foreground'}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="font-bold">
                  {currentQuestion + 1} of {questions.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Card */}
            <div className="lg:col-span-3">
              <Card className="shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant={question.difficulty === 'easy' ? 'secondary' : question.difficulty === 'medium' ? 'default' : 'destructive'}>
                        {question.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {question.category}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestion + 1}
                    </span>
                  </div>
                  <CardTitle className="text-xl leading-relaxed">
                    {question.question}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-all hover:border-primary/50 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border'
                        }`}>
                          {selectedAnswers[currentQuestion] === index && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          {selectedAnswers[currentQuestion] !== index && (
                            <span className="text-sm font-semibold">
                              {String.fromCharCode(65 + index)}
                            </span>
                          )}
                        </div>
                        <span className="text-base">{option}</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex space-x-3">
                  {currentQuestion === questions.length - 1 ? (
                    <Button 
                      onClick={handleComplete}
                      disabled={answeredCount === 0}
                      className="bg-success hover:bg-success/90"
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNext}
                      disabled={currentQuestion === questions.length - 1}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Question Navigator */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-8 h-8 rounded text-sm font-semibold transition-all ${
                          index === currentQuestion
                            ? 'bg-primary text-primary-foreground'
                            : selectedAnswers[index] !== -1
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded"></div>
                      <span>Answered ({answeredCount})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-muted rounded"></div>
                      <span>Not Answered ({questions.length - answeredCount})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded"></div>
                      <span>Current</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quiz Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Questions</span>
                    <span className="font-semibold">{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Answered</span>
                    <span className="font-semibold text-success">{answeredCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Remaining</span>
                    <span className="font-semibold text-accent">{questions.length - answeredCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Time Left</span>
                    <span className={`font-semibold ${timeLeft < 300 ? 'text-accent' : 'text-foreground'}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}