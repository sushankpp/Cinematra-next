import { Heading } from "../ui/Heading";
import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  return (
    <section>
      <Heading
        level={2}
        text="Subscribe to our Newsletter"
        className="text-2xl font-bold mb-4 text-gold-100"
      />
      <p className="text-charcoal-100 mb-2">
        Get the latest updates on movies, reviews, and exclusive content
        delivered straight to your inbox.
      </p>
      <NewsletterForm />
    </section>
  );
}
