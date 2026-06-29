import { getChannels } from "@/lib/serverApi";
import SubscriptionList from "@/components/ui/SubscriptionList";
import Container from "@/components/ui/Container";

export default function SubscriptionsPage() {
  return (
    <Container className="py-8">
      <ChannelData />
    </Container>
  );
}

async function ChannelData() {
  let channels = [];

  try {
    channels = await getChannels();
  } catch (error) {
    console.error("Error fetching channels:", error);
  }

  return <SubscriptionList initialChannels={channels} />;
}

