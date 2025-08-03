import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Target, 
  Trophy, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  XCircle,
  Brain,
  ChevronRight
} from "lucide-react";

interface DashboardProps {
  user: {
    name: string;
    email: string;
    stats: {
      totalQuestions: number;
      correctAnswers: number;
      streak: number;
      averageScore: number;
    };
  };
  onStartQuiz: () => void;
  onViewHistory: () => void;
  onLogout: () => void;
}

export function Dashboard({ user, onStartQuiz, onViewHistory, onLogout }: DashboardProps) {
  const accuracy = user.stats.totalQuestions > 0 
    ? Math.round((user.stats.correctAnswers / user.stats.totalQuestions) * 100)
    : 0;

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">QuizMaster</h1>
              <p className="text-sm text-muted-foreground">{todayDate}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Quiz Card */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-r from-primary via-primary to-primary-glow text-primary-foreground border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Today's Challenge</CardTitle>
                    <p className="text-primary-foreground/80">
                      10 questions on current affairs • Est. 15 minutes
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Daily</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-primary-foreground hover:bg-white/30">
                      New Questions Available
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>15 min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>10 questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Current Affairs</span>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full bg-white text-primary hover:bg-white/90" 
                    onClick={onStartQuiz}
                  >
                    Start Today's Quiz
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 mx-auto text-warning mb-2" />
                  <p className="text-2xl font-bold">{user.stats.streak}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">{accuracy}%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto text-success mb-2" />
                  <p className="text-2xl font-bold">{user.stats.correctAnswers}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <XCircle className="w-8 h-8 mx-auto text-accent mb-2" />
                  <p className="text-2xl font-bold">{user.stats.totalQuestions - user.stats.correctAnswers}</p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Accuracy</span>
                    <span className="font-semibold">{accuracy}%</span>
                  </div>
                  <Progress value={accuracy} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Questions Answered</span>
                    <span className="font-semibold">{user.stats.totalQuestions}</span>
                  </div>
                  <Progress value={Math.min(user.stats.totalQuestions * 2, 100)} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Current Streak</span>
                    <span className="font-semibold">{user.stats.streak} days</span>
                  </div>
                  <Progress value={Math.min(user.stats.streak * 10, 100)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={onViewHistory}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View Quiz History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Trophy className="w-4 h-4 mr-2" />
                  Leaderboard
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Practice Mode
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}