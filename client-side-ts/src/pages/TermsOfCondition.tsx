import { useNavigate } from 'react-router';
import {
  FileText,
  UserCheck,
  AlertCircle,
  Scale,
  PenTool,
  ExternalLink,
  Mail,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TermsOfCondition = () => {
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
            Terms of Service
          </h1>
          <p className="info-text">Last Updated: {lastUpdated}</p>
        </div>

        <div className="space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">1. Acceptance of Terms</h2>
            </div>
            <p className="body-text">
              By accessing and using this website and the services provided by
              the Philippine Society of Information Technology Students (PSITS)
              Student Chapter, you agree to be bound by these Terms and
              Conditions and all applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">2. Membership & Registration</h2>
            </div>
            <div className="space-y-4 body-text">
              <p>
                To access certain features of the platform, you may be required
                to register as a member.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You must provide accurate and complete information during
                  registration.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account credentials.
                </li>
                <li>
                  Membership is subject to verification of student status within
                  the relevant IT department.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">3. User Conduct</h2>
            </div>
            <p className="body-text">
              Users agree to use the platform for lawful purposes only and in a
              manner that does not infringe the rights of, or restrict the use
              of this site by any third party. Harassment, inappropriate content
              sharing, and any form of cyberbullying are strictly prohibited and
              may lead to immediate termination of membership.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <PenTool className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">4. Intellectual Property</h2>
            </div>
            <p className="body-text">
              All content provided on this website, including but not limited to
              branding, graphics, and event materials, is the property of PSITS
              Student Chapter or its content suppliers and is protected by
              intellectual property laws. Users may not reproduce, distribute,
              or create derivative works without explicit permission.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">5. Limitation of Liability</h2>
            </div>
            <p className="body-text">
              PSITS Student Chapter provides this platform as-is. We do not
              guarantee that the website will be error-free or uninterrupted. In
              no event shall the organization be liable for any damages arising
              out of the use or inability to use the materials on the website.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <ExternalLink className="h-5 w-5 text-primary" />
              </div>
              <h2 className="heading-3 mb-0">6. Third-Party Links</h2>
            </div>
            <p className="body-text">
              Our website may contain links to external sites that are not
              operated by us. We have no control over the content and practices
              of these sites and cannot accept responsibility or liability for
              their respective privacy policies or terms.
            </p>
          </section>

          <section className="space-y-6 pt-6 border-t">
            <div className="flex flex-col gap-4">
              <h2 className="heading-3 mb-0">Contact Information</h2>
              <p className="body-text">
                If you have any questions regarding these Terms of Service,
                please contact the organization's leadership at:
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-darker">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>legal.psits@example.com</span>
                </div>
                <div className="text-info-text italic">
                  PSITS Student Chapter Governance Board
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
