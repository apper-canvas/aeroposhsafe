import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes
  const [showFeedback, setShowFeedback] = useState(false)

  const quizData = {
    title: "POSH Compliance Assessment",
    description: "Test your knowledge of prevention of sexual harassment policies and procedures",
    timeLimit: 600,
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        text: "What is the primary objective of the POSH Act?",
        options: [
          "To increase workplace productivity",
          "To prevent and address sexual harassment at workplace",
          "To improve gender diversity in organizations",
          "To establish HR departments in companies"
        ],
        correctAnswer: 1,
        explanation: "The POSH Act aims to prevent sexual harassment at workplace and provide a mechanism for redressal of complaints.",
        points: 10
      },
      {
        id: 2,
        type: "multiple-choice",
        text: "A colleague repeatedly makes unwelcome comments about your appearance. What should you do?",
        options: [
          "Ignore it and hope it stops",
          "Document the incidents and report to the Internal Committee",
          "Confront the colleague aggressively",
          "Discuss it only with friends"
        ],
        correctAnswer: 1,
        explanation: "Documenting incidents and reporting to the Internal Committee is the proper procedure under POSH Act.",
        points: 15
      },
      {
        id: 3,
        type: "multiple-choice",
        text: "Which of the following constitutes sexual harassment under POSH Act?",
        options: [
          "Unwelcome sexually determined behavior",
          "Demand for sexual favors",
          "Showing pornography or sexually explicit material",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "Sexual harassment includes all forms of unwelcome sexually determined behavior, demands for favors, and showing explicit material.",
        points: 10
      },
      {
        id: 4,
        type: "multiple-choice",
        text: "What is the composition requirement for an Internal Committee?",
        options: [
          "All male members for objectivity",
          "At least 50% women members including the Presiding Officer",
          "Only HR representatives",
          "Equal representation from all departments"
        ],
        correctAnswer: 1,
        explanation: "The Internal Committee must have at least 50% women members, with a woman as the Presiding Officer.",
        points: 15
      },
      {
        id: 5,
        type: "multiple-choice",
        text: "Your manager promises you a promotion in exchange for personal favors. This is an example of:",
        options: [
          "Quid pro quo harassment",
          "Hostile work environment",
          "Workplace bullying",
          "Performance management"
        ],
        correctAnswer: 0,
        explanation: "This is a clear example of quid pro quo harassment where professional benefits are tied to sexual favors.",
        points: 20
      }
    ]
  }

  useEffect(() => {
    let interval
    if (quizStarted && timeRemaining > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [quizStarted, timeRemaining, showResults])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setTimeRemaining(quizData.timeLimit)
    toast.success('Quiz started! Good luck!')
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true)
      setTimeout(() => {
        setShowFeedback(false)
        if (currentQuestion < quizData.questions.length - 1) {
          setCurrentQuestion(prev => prev + 1)
          setSelectedAnswer(null)
        } else {
          handleSubmitQuiz()
        }
      }, 2000)
    } else {
      toast.warning('Please select an answer before proceeding')
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setSelectedAnswer(answers[currentQuestion - 1] || null)
      setShowFeedback(false)
    }
  }

  const calculateScore = () => {
    let totalScore = 0
    let maxScore = 0
    
    quizData.questions.forEach((question, index) => {
      maxScore += question.points
      if (answers[index] === question.correctAnswer) {
        totalScore += question.points
      }
    })
    
    return {
      score: totalScore,
      maxScore,
      percentage: Math.round((totalScore / maxScore) * 100),
      passed: (totalScore / maxScore) * 100 >= quizData.passingScore
    }
  }

  const handleSubmitQuiz = () => {
    const results = calculateScore()
    setShowResults(true)
    setQuizStarted(false)
    
    if (results.passed) {
      toast.success(`Congratulations! You passed with ${results.percentage}%`)
    } else {
      toast.error(`You scored ${results.percentage}%. Minimum required: ${quizData.passingScore}%`)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers({})
    setShowResults(false)
    setQuizStarted(false)
    setTimeRemaining(quizData.timeLimit)
    setShowFeedback(false)
  }

  const currentQuestionData = quizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100

  if (!quizStarted && !showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="card text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <ApperIcon name="ClipboardCheck" className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </div>
          
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-100 mb-4 sm:mb-6">
            {quizData.title}
          </h3>
          
          <p className="text-base sm:text-lg text-surface-600 dark:text-surface-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
            {quizData.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 sm:p-6">
              <ApperIcon name="Clock" className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
              <div className="text-lg sm:text-xl font-bold text-surface-900 dark:text-surface-100">{formatTime(quizData.timeLimit)}</div>
              <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Time Limit</div>
            </div>
            
            <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 sm:p-6">
              <ApperIcon name="FileText" className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
              <div className="text-lg sm:text-xl font-bold text-surface-900 dark:text-surface-100">{quizData.questions.length}</div>
              <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Questions</div>
            </div>
            
            <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 sm:p-6">
              <ApperIcon name="Target" className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
              <div className="text-lg sm:text-xl font-bold text-surface-900 dark:text-surface-100">{quizData.passingScore}%</div>
              <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Passing Score</div>
            </div>
          </div>

          <motion.button
            onClick={startQuiz}
            className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 inline-flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ApperIcon name="Play" className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Start Assessment</span>
          </motion.button>
        </div>
      </motion.div>
    )
  }

  if (showResults) {
    const results = calculateScore()
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="card text-center">
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 ${
            results.passed 
              ? 'bg-gradient-to-br from-accent/20 to-accent/10' 
              : 'bg-gradient-to-br from-secondary/20 to-secondary/10'
          }`}>
            <ApperIcon 
              name={results.passed ? "Award" : "AlertCircle"} 
              className={`w-10 h-10 sm:w-12 sm:h-12 ${results.passed ? 'text-accent' : 'text-secondary'}`} 
            />
          </div>
          
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-100 mb-4 sm:mb-6">
            {results.passed ? 'Congratulations!' : 'Assessment Complete'}
          </h3>
          
          <div className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-6">
            <span className={results.passed ? 'text-accent' : 'text-secondary'}>
              {results.percentage}%
            </span>
          </div>
          
          <p className="text-base sm:text-lg text-surface-600 dark:text-surface-400 mb-8 sm:mb-10">
            You scored {results.score} out of {results.maxScore} points
            {results.passed ? '. You have successfully completed the POSH compliance training!' : '. Please review the material and try again.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
              <div className="text-lg sm:text-xl font-bold text-surface-900 dark:text-surface-100">{results.score}</div>
              <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Your Score</div>
            </div>
            <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
              <div className="text-lg sm:text-xl font-bold text-surface-900 dark:text-surface-100">{results.maxScore}</div>
              <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Total Points</div>
            </div>
            <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
              <div className="text-lg sm:text-xl font-bold text-surface-900 dark:text-surface-100">{Object.keys(answers).length}</div>
              <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Answered</div>
            </div>
            <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
              <div className={`text-lg sm:text-xl font-bold ${results.passed ? 'text-accent' : 'text-secondary'}`}>
                {results.passed ? 'PASSED' : 'FAILED'}
              </div>
              <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Status</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              onClick={resetQuiz}
              className="btn-secondary inline-flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="RotateCcw" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Retake Assessment</span>
            </motion.button>
            
            {results.passed && (
              <motion.button
                className="btn-primary inline-flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.success('Certificate generation feature coming soon!')}
              >
                <ApperIcon name="Download" className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Download Certificate</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Quiz Header */}
      <div className="card mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-surface-900 dark:text-surface-100 mb-1">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </h3>
            <p className="text-sm text-surface-600 dark:text-surface-400">
              {currentQuestionData.points} points
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Clock" className="w-4 h-4 text-primary" />
              <span className={`text-sm font-medium ${timeRemaining < 60 ? 'text-secondary' : 'text-surface-900 dark:text-surface-100'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="card mb-6 sm:mb-8"
        >
          <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6 sm:mb-8 leading-relaxed">
            {currentQuestionData.text}
          </h4>
          
          <div className="space-y-3 sm:space-y-4">
            {currentQuestionData.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => !showFeedback && handleAnswerSelect(index)}
                className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} ${
                  showFeedback ? (
                    index === currentQuestionData.correctAnswer ? 'correct' : 
                    (selectedAnswer === index && index !== currentQuestionData.correctAnswer ? 'incorrect' : '')
                  ) : ''
                }`}
                disabled={showFeedback}
                whileHover={!showFeedback ? { scale: 1.01 } : {}}
                whileTap={!showFeedback ? { scale: 0.99 } : {}}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-3 sm:mr-4 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    selectedAnswer === index 
                      ? 'border-primary bg-primary' 
                      : 'border-surface-300 dark:border-surface-600 group-hover:border-primary'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-sm sm:text-base text-surface-900 dark:text-surface-100 group-hover:text-primary transition-colors duration-200">
                    {option}
                  </span>
                </div>
                
                {showFeedback && index === currentQuestionData.correctAnswer && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto"
                  >
                    <ApperIcon name="Check" className="w-5 h-5 text-accent" />
                  </motion.div>
                )}
                
                {showFeedback && selectedAnswer === index && index !== currentQuestionData.correctAnswer && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto"
                  >
                    <ApperIcon name="X" className="w-5 h-5 text-secondary" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
          
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 bg-surface-50 dark:bg-surface-700 rounded-xl"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selectedAnswer === currentQuestionData.correctAnswer 
                    ? 'bg-accent/20' 
                    : 'bg-secondary/20'
                }`}>
                  <ApperIcon 
                    name={selectedAnswer === currentQuestionData.correctAnswer ? "Check" : "X"} 
                    className={`w-3 h-3 ${
                      selectedAnswer === currentQuestionData.correctAnswer ? 'text-accent' : 'text-secondary'
                    }`} 
                  />
                </div>
                <div>
                  <h5 className="font-medium text-surface-900 dark:text-surface-100 mb-2">
                    {selectedAnswer === currentQuestionData.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </h5>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    {currentQuestionData.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <motion.button
          onClick={previousQuestion}
          disabled={currentQuestion === 0 || showFeedback}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center space-x-2 order-2 sm:order-1"
          whileHover={currentQuestion > 0 && !showFeedback ? { scale: 1.02 } : {}}
          whileTap={currentQuestion > 0 && !showFeedback ? { scale: 0.98 } : {}}
        >
          <ApperIcon name="ChevronLeft" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Previous</span>
        </motion.button>
        
        <motion.button
          onClick={currentQuestion === quizData.questions.length - 1 ? handleSubmitQuiz : nextQuestion}
          disabled={selectedAnswer === null && !showFeedback}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center space-x-2 order-1 sm:order-2"
          whileHover={selectedAnswer !== null || showFeedback ? { scale: 1.02 } : {}}
          whileTap={selectedAnswer !== null || showFeedback ? { scale: 0.98 } : {}}
        >
          <span>
            {currentQuestion === quizData.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </span>
          <ApperIcon 
            name={currentQuestion === quizData.questions.length - 1 ? "Send" : "ChevronRight"} 
            className="w-4 h-4 sm:w-5 sm:h-5" 
          />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default MainFeature