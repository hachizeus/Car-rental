export const sendContactEmail = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  const emailData = {
    to: 'Pattrentalservices@gmail.com',
    subject: `Contact Form: ${formData.subject}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
    `
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: 'gmail',
      template_id: 'contact_form',
      user_id: 'your_emailjs_user_id',
      template_params: {
        to_email: 'Pattrentalservices@gmail.com',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        phone: formData.phone
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }

  return response.json();
};