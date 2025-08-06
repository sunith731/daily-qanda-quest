import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, X } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function AdminPanel() {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    category: "",
    difficulty: "easy"
  });

  const addQuestion = () => {
    if (!currentQuestion.question || !currentQuestion.category || currentQuestion.options.some(opt => !opt.trim())) {
      toast({
        title: "Error",
        description: "Please fill in all fields including all options",
        variant: "destructive"
      });
      return;
    }

    setQuestions([...questions, { ...currentQuestion }]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      category: "",
      difficulty: "easy"
    });

    toast({
      title: "Question Added",
      description: "Question added to batch. Click Save All to persist to database."
    });
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const saveAllQuestions = async () => {
    if (questions.length === 0) {
      toast({
        title: "No Questions",
        description: "Add some questions before saving",
        variant: "destructive"
      });
      return;
    }

    try {
      const questionsToInsert = questions.map(q => ({
        question: q.question,
        options: q.options,
        correct_answer: q.correctAnswer,
        explanation: q.explanation,
        category: q.category,
        difficulty: q.difficulty,
        is_active: true
      }));

      const { error } = await supabase
        .from('questions')
        .insert(questionsToInsert);

      if (error) {
        toast({
          title: "Error",
          description: `Failed to save questions: ${error.message}`,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: `${questions.length} questions saved successfully!`
      });

      setQuestions([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save questions to database",
        variant: "destructive"
      });
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel - Add Questions</CardTitle>
          <p className="text-muted-foreground">
            Paste questions from your ChatGPT prompt and add them to the database.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Input Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Question</label>
              <Textarea
                placeholder="Enter your question here..."
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Options</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                      {String.fromCharCode(65 + index)}
                    </Badge>
                    <Input
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Correct Answer</label>
                <Select 
                  value={currentQuestion.correctAnswer.toString()} 
                  onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, correctAnswer: parseInt(value) })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currentQuestion.options.map((_, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        Option {String.fromCharCode(65 + index)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  placeholder="e.g., Current Affairs, Politics"
                  value={currentQuestion.category}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, category: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Difficulty</label>
                <Select 
                  value={currentQuestion.difficulty} 
                  onValueChange={(value: 'easy' | 'medium' | 'hard') => setCurrentQuestion({ ...currentQuestion, difficulty: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Explanation</label>
              <Textarea
                placeholder="Provide an explanation for the correct answer..."
                value={currentQuestion.explanation}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                className="mt-1"
              />
            </div>

            <Button onClick={addQuestion} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add to Batch ({questions.length} questions)
            </Button>
          </div>

          {/* Questions Batch Preview */}
          {questions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Questions to Save ({questions.length})</h3>
                <Button onClick={saveAllQuestions} variant="default">
                  <Save className="w-4 h-4 mr-2" />
                  Save All to Database
                </Button>
              </div>

              <div className="space-y-3">
                {questions.map((q, index) => (
                  <Card key={index} className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => removeQuestion(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Q{index + 1}</Badge>
                          <Badge variant={q.difficulty === 'easy' ? 'secondary' : q.difficulty === 'medium' ? 'default' : 'destructive'}>
                            {q.difficulty}
                          </Badge>
                          <Badge variant="outline">{q.category}</Badge>
                        </div>
                        <p className="font-medium">{q.question}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {q.options.map((option, optIndex) => (
                            <div key={optIndex} className={`p-2 rounded border ${optIndex === q.correctAnswer ? 'bg-success/10 border-success' : ''}`}>
                              <span className="font-semibold">{String.fromCharCode(65 + optIndex)}:</span> {option}
                            </div>
                          ))}
                        </div>
                        {q.explanation && (
                          <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                            <strong>Explanation:</strong> {q.explanation}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}