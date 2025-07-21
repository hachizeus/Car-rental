interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * Validates email format
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sends contact form data via EmailJS
 */
export const sendContactEmail = async (formData: ContactFormData) => {
  // Validate inputs
  if (!formData.firstName || !formData.lastName) {
    throw new Error('Name is required');
  }
  
  if (!formData.email || !isValidEmail(formData.email)) {
    throw new Error('Valid email is required');
  }
  
  if (!formData.message) {
    throw new Error('Message is required');
  }
  
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'gmail';
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'contact_form';
  const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
  
  if (!USER_ID) {
    console.error('EmailJS user ID not configured');
    throw new Error('Email service not properly configured');
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: USER_ID,
        template_params: {
          to_email: 'Pattrentalservices@gmail.com',
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          subject: formData.subject || 'Car Rental Inquiry',
          message: formData.message,
          phone: formData.phone || 'Not provided'
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Email sending failed:', errorData);
      throw new Error('Failed to send email. Please try again later.');
    }

    return response.json();
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};