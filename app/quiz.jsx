import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

const App = () => {
  const [numQuestions, setNumQuestions] = useState("10");
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const fetchQuestions = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=${numQuestions}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();
      const formatted = data.results.map((q) => {
        const answers = [...q.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * 4);
        answers.splice(randomIndex, 0, q.correct_answer);
        return {
          question: decodeHTMLEntities(q.question),
          correct: q.correct_answer,
          answers: answers.map(decodeHTMLEntities),
        };
      });
      setQuestions(formatted);
      setQuizStarted(true);
    } catch (error) {
      Alert.alert("Error fetching quiz", error.message);
    }
  };

  const decodeHTMLEntities = (text) => {
    return text.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
  };

  const handleAnswer = (answer) => {
    if (answer === questions[current].correct) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleStart = () => {
    const n = parseInt(numQuestions);
    if (n >= 10 && n <= 30) {
      fetchQuestions();
    } else {
      Alert.alert("Invalid number", "Please enter a number between 10 and 30.");
    }
  };

  const handleRestart = () => {
    setNumQuestions("10");
    setQuizStarted(false);
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setShowResults(false);
  };

  if (!quizStarted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎓 Trivia Quiz</Text>
        <Text style={styles.label}>Enter number of questions (10–30):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={numQuestions}
          onChangeText={setNumQuestions}
        />
        <Button title="Start Quiz" onPress={handleStart} />
      </View>
    );
  }

  if (showResults) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎉 Quiz Complete!</Text>
        <Text style={styles.score}>
          You scored {score} / {questions.length}
        </Text>
        <Button title="Try Again" onPress={handleRestart} />
      </View>
    );
  }

  const q = questions[current];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.questionCount}>
        Question {current + 1} / {questions.length}
      </Text>
      <Text style={styles.question}>{q.question}</Text>
      {q.answers.map((a, i) => (
        <TouchableOpacity
          key={i}
          style={styles.answerButton}
          onPress={() => handleAnswer(a)}
        >
          <Text style={styles.answerText}>{a}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f4f6fc",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#2b2e4a",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#2b2e4a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  questionCount: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "600",
    color: "#1b1b2f",
  },
  answerButton: {
    backgroundColor: "#dbe2ef",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  answerText: {
    fontSize: 16,
    textAlign: "center",
    color: "#112d4e",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#3f72af",
  },
});

export default App;
