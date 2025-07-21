import { toast } from "sonner";

/**
 * Handles API errors gracefully
 * @param error The error object
 * @param fallbackMessage A fallback message if error doesn't have a message
 */
export const handleApiError = (error: any, fallbackMessage = "An error occurred") => {
  console.error("API Error:", error);
  
  // Extract the most useful error message
  let errorMessage = fallbackMessage;
  
  if (error?.response?.data?.error) {
    errorMessage = error.response.data.error;
  } else if (error?.message) {
    errorMessage = error.message;
  }
  
  // Show toast notification
  toast.error(errorMessage);
  
  // Return the error message for further handling if needed
  return errorMessage;
};

/**
 * Wraps an API call with error handling
 * @param apiCall The API function to call
 * @param errorMessage Custom error message
 */
export const withErrorHandling = async (apiCall: () => Promise<any>, errorMessage?: string) => {
  try {
    return await apiCall();
  } catch (error) {
    handleApiError(error, errorMessage);
    throw error;
  }
};