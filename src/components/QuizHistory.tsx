import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp,
  ArrowLeft,
  Filter,
  Download
} from "lucide-react";

interface QuizAttempt {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  category: string;
  difficulty: string;
  percentage: number;
}

interface QuizHistoryProps {
  attempts: QuizAttempt[];
  onBack: () => void;
  onViewDetails: (attemptId: string) => void;
}

export function QuizHistory({ attempts, onBack, onViewDetails }: QuizHistoryProps) {
  const totalAttempts = attempts.length;
  const averageScore = attempts.length > 0 
    ? Math.round(attempts.reduce((acc, attempt) => acc + attempt.percentage, 0) / attempts.length)
    : 0;
  const bestScore = attempts.length > 0 
    ? Math.max(...attempts.map(attempt => attempt.percentage))
    : 0;
  const totalTimeSpent = attempts.reduce((acc, attempt) => acc + attempt.timeSpent, 0);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 75) return "text-primary";
    if (percentage >= 60) return "text-warning";
    return "text-accent";
  };

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) return { text: "Excellent", variant: "default" as const };
    if (percentage >= 75) return { text: "Good", variant: "secondary" as const };
    if (percentage >= 60) return { text: "Average", variant: "outline" as const };
    return { text: "Poor", variant: "destructive" as const };
  };

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
              <h1 className="text-2xl font-bold">Quiz History</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold mb-1">{totalAttempts}</p>
                <p className="text-sm text-muted-foreground">Total Quizzes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <p className="text-3xl font-bold mb-1">{averageScore}%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-warning" />
                </div>
                <p className="text-3xl font-bold mb-1">{bestScore}%</p>
                <p className="text-sm text-muted-foreground">Best Score</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-info" />
                </div>
                <p className="text-3xl font-bold mb-1">{formatTime(totalTimeSpent)}</p>
                <p className="text-sm text-muted-foreground">Total Time</p>
              </CardContent>
            </Card>
          </div>

          {/* Quiz History List */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Recent Attempts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {attempts.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Quiz History</h3>
                  <p className="text-muted-foreground mb-6">
                    Take your first quiz to see your progress here!
                  </p>
                  <Button onClick={onBack}>
                    Start Your First Quiz
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {attempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="border rounded-lg p-6 hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => onViewDetails(attempt.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="font-semibold text-lg">
                              {new Date(attempt.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </h3>
                            <Badge variant={getPerformanceBadge(attempt.percentage).variant}>
                              {getPerformanceBadge(attempt.percentage).text}
                            </Badge>
                            <Badge variant="outline">{attempt.category}</Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Target className="w-4 h-4 text-muted-foreground" />
                              <span>
                                {attempt.score}/{attempt.totalQuestions} correct
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-muted-foreground" />
                              <span className={getPerformanceColor(attempt.percentage)}>
                                {attempt.percentage}% accuracy
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{formatTime(attempt.timeSpent)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Trophy className="w-4 h-4 text-muted-foreground" />
                              <span className="capitalize">{attempt.difficulty}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${getPerformanceColor(attempt.percentage)}`}>
                            {attempt.percentage}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(attempt.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}