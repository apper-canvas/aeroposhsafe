import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="AlertTriangle" className="w-12 h-12 sm:w-16 sm:h-16 text-secondary" />
          </div>
          <h1 className="text-6xl sm:text-8xl font-bold text-surface-300 dark:text-surface-700 mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-surface-900 dark:text-surface-100 mb-4">Page Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 btn-primary"
          >
            <ApperIcon name="Home" className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound