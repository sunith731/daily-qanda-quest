import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Home,
  RotateCcw,
  Share2,
  Calendar
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

interface QuizResultsProps {
  questions: Question[];
  userAnswers: number[];
  score: number;
  timeSpent: number;
  onBackToDashboard: () => void;
  onRetakeQuiz: () => void;
  onViewHistory: () => void;
}

export function QuizResults({ 
  questions, 
  userAnswers, 
  score, 
  timeSpent, 
  onBackToDashboard, 
  onRetakeQuiz,
  onViewHistory 
}: QuizResultsProps) {
  const percentage = Math.round((score / questions.length) * 100);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: "Excellent", color: "text-success", bg: "bg-success/10" };
    if (percentage >= 75) return { level: "Good", color: "text-primary", bg: "bg-primary/10" };
    if (percentage >= 60) return { level: "Average", color: "text-warning", bg: "bg-warning/10" };
    return { level: "Needs Improvement", color: "text-accent", bg: "bg-accent/10" };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Quiz Results</h1>
            <Button variant="outline" onClick={onBackToDashboard}>
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Results Overview */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className={`w-10 h-10 ${performance.color}`} />
              </div>
              <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
              <div className={`inline-flex px-4 py-2 rounded-full ${performance.bg}`}>
                <span className={`font-semibold ${performance.color}`}>
                  {performance.level}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-success" />
                  </div>
                  <p className="text-3xl font-bold text-success">{score}</p>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <XCircle className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-3xl font-bold text-accent">{questions.length - score}</p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-primary">{percentage}%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-3xl font-bold">{formatTime(timeSpent)}</p>
                  <p className="text-sm text-muted-foreground">Time Taken</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Overall Performance</span>
                  <span className="text-sm font-semibold">{percentage}%</span>
                </div>
                <Progress value={percentage} className="h-3" />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={onBackToDashboard} className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </Button>
                <Button variant="outline" onClick={onViewHistory} className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>View History</span>
                </Button>
                <Button variant="outline" onClick={onRetakeQuiz} className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share Results</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Review */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Detailed Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {questions.map((question, index) => {
                  const userAnswer = userAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="outline">Q{index + 1}</Badge>
                            <Badge variant={question.difficulty === 'easy' ? 'secondary' : question.difficulty === 'medium' ? 'default' : 'destructive'}>
                              {question.difficulty}
                            </Badge>
                            <Badge variant="outline">{question.category}</Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-3">{question.question}</h3>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect ? 'bg-success text-success-foreground' : 'bg-accent text-accent-foreground'
                        }`}>
                          {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded border-2 ${
                              optionIndex === question.correctAnswer
                                ? 'border-success bg-success/5'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'border-accent bg-accent/5'
                                : 'border-border'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                                optionIndex === question.correctAnswer
                                  ? 'border-success bg-success text-success-foreground'
                                  : optionIndex === userAnswer && !isCorrect
                                  ? 'border-accent bg-accent text-accent-foreground'
                                  : 'border-border'
                              }`}>
                                {String.fromCharCode(65 + optionIndex)}
                              </span>
                              <span>{option}</span>
                              {optionIndex === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 text-success ml-auto" />
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <XCircle className="w-4 h-4 text-accent ml-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {question.explanation && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Explanation:</h4>
                          <p className="text-muted-foreground">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}