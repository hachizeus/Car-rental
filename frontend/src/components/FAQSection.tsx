import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
}

export const FAQSection = ({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our car rental services",
  faqs = defaultFAQs,
}: FAQSectionProps) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-[#0c0c0c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white py-4 hover:text-brand-600 dark:hover:text-brand-500 transition-all">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300">
            Still have questions? <a href="/contact" className="text-brand-600 hover:text-brand-700 font-medium">Contact us</a> for more information.
          </p>
        </div>
      </div>
    </section>
  );
};

const defaultFAQs: FAQItem[] = [
  {
    question: "What documents do I need to rent a car?",
    answer: "To rent a car, you'll need a valid driver's license, a credit card in your name, and a form of identification (passport or ID card). International customers may need an International Driving Permit depending on their country of origin."
  },
  {
    question: "Is there a security deposit required?",
    answer: "Yes, we require a security deposit which is blocked on your credit card at the time of pickup. The amount varies depending on the vehicle category. The deposit is fully refunded upon return if the car is in the same condition as when it was rented."
  },
  {
    question: "Can I modify or cancel my reservation?",
    answer: "Yes, you can modify or cancel your reservation by contacting us directly via phone or WhatsApp. Cancellations made at least 48 hours before the pickup time are free of charge. Late cancellations may incur a fee."
  },
  {
    question: "Is insurance included in the rental price?",
    answer: "Basic insurance coverage is included in all our rental prices. This includes collision damage waiver (CDW) and theft protection. Additional coverage options are available for purchase at the time of rental."
  },
  {
    question: "Can I return the car to a different location?",
    answer: "Yes, one-way rentals are available for an additional fee. Please specify your desired drop-off location when making your reservation so we can confirm availability and provide you with the exact cost."
  },
  {
    question: "What is your fuel policy?",
    answer: "Our rentals follow a 'full-to-full' fuel policy. This means you'll receive the car with a full tank and are expected to return it with a full tank. If the car is returned with less fuel, a refueling fee will be charged."
  },
  {
    question: "How do I contact you in case of an emergency or breakdown?",
    answer: "In case of emergency or breakdown, please call our 24/7 support line or contact us via WhatsApp. The contact information is provided in your rental agreement and also in the glove compartment of the vehicle."
  }
];