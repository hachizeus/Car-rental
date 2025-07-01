import logo from "@/assets/images/logo.png";

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-[#141414] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <img 
            src={logo} 
            alt="Pattrentals Logo" 
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 animate-pulse"
          />
        </div>
        <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Pattrentals</div>
        <div className="text-gray-600 dark:text-gray-400">Loading your experience...</div>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-brand-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};