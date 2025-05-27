import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2 sm:space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-card">
                <ApperIcon name="Shield" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gradient">POSHSafe</h1>
                <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 hidden sm:block">Compliance Training Platform</p>
              </div>
            </motion.div>

            <motion.button
              onClick={toggleDarkMode}
              className="p-2 sm:p-3 rounded-xl bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-4 h-4 sm:w-5 sm:h-5 text-surface-700 dark:text-surface-300" 
              />
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6 sm:mb-8">
              <ApperIcon name="Star" className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-2" />
              <span className="text-xs sm:text-sm font-medium text-primary">Interactive Learning Experience</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-900 dark:text-surface-100 mb-4 sm:mb-6 leading-tight">
              Master POSH Compliance with
              <span className="block text-gradient mt-2">Interactive Quizzes</span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-surface-600 dark:text-surface-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              Comprehensive prevention of sexual harassment training through engaging scenario-based assessments and real-time feedback.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto mb-8 sm:mb-12">
              {[
                { icon: "BookOpen", title: "Interactive Learning", desc: "Scenario-based questions" },
                { icon: "Trophy", title: "Real-time Scoring", desc: "Instant feedback system" },
                { icon: "Award", title: "Certification", desc: "Compliance certificates" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="card text-center hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ApperIcon name={feature.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-surface-900 dark:text-surface-100 mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Quiz Component */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="container mx-auto">
          <MainFeature />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <ApperIcon name="Shield" className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-surface-900 dark:text-surface-100">POSHSafe</span>
            </div>
            <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 text-center sm:text-right">
              Ensuring workplace safety through compliance training
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home