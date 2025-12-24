import { useNavigate } from 'react-router';
import {
  Shield,
  Lock,
  Eye,
  Share2,
  Bell,
  Mail,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PrivacyPolicy = () => {
  const lastUpdated = 'December 23, 2024';
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow container max-w-4xl py-12 md:py-20">
        <Button
          variant="ghost"
          className="mb-8 -ml-4 text-muted-foreground hover:text-primary transition-colors"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="flex flex-col gap-2 mb-12">
          <h1 className="heading-1 bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="info-text">Last Updated: {lastUpdated}</p>
        </div>

        <div className="space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">Introduction</h2>
            </div>
            <p className="body-text">
              The Philippine Society of Information Technology Students (PSITS)
              Student Chapter is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or
              participate in our events and activities.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">Information We Collect</h2>
            </div>
            <div className="space-y-4 body-text">
              <p>
                We may collect information about you in a variety of ways,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-semibold">Personal Data:</span> Name,
                  email address, student number, course, and year level that you
                  voluntarily give to us when you register for membership or
                  events.
                </li>
                <li>
                  <span className="font-semibold">Usage Data:</span> Information
                  collected automatically when accessing the website, such as IP
                  address, browser type, and operating system.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">How We Use Your Information</h2>
            </div>
            <div className="space-y-4 body-text">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Manage your membership and event registrations.</li>
                <li>
                  Communicate with you about upcoming events, news, and
                  opportunities.
                </li>
                <li>Improve our website and community services.</li>
                <li>
                  Comply with university and organizational transparency
                  requirements.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">Disclosure of Your Information</h2>
            </div>
            <p className="body-text">
              We do not sell or rent your personal data to third parties. We may
              share information with university authorities or partner
              organizations only when necessary for official school activities
              or legal compliance.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">Data Security</h2>
            </div>
            <p className="body-text">
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that no security measures are perfect or
              impenetrable.
            </p>
          </section>

          <section className="space-y-6 pt-6 border-t">
            <div className="flex flex-col gap-4">
              <h2 className="heading-3 mb-0">Contact Us</h2>
              <p className="body-text">
                If you have questions or comments about this Privacy Policy,
                please contact us at:
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-darker">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>psits.studentchapter@example.com</span>
                </div>
                <div className="text-info-text italic">
                  Philippine Society of Information Technology Students
                  <br />
                  Sanciangko St., Cebu City, Central Visayas
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
