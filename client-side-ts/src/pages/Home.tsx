import { HomeBanner } from '@/components/sections/banner/HomeBanner';
import { CoreValuesSection } from '@/components/sections/core-values/CoreValuesSection';
import { DeansMessageSection } from '@/components/sections/deans-message/DeansMessageSection';
// import { Header } from "@/components/common/Header";
import { GetInvolvedSection } from '@/components/sections/get-involved/GetInvolvedSection';
import { GoalSection } from '@/components/sections/goals/GoalSection';
import { InstitutionalIdentitySection } from '@/components/sections/institutional-identity/InstitutionalIdentitySection';

export const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <HomeBanner />
      <DeansMessageSection />
      <InstitutionalIdentitySection department="uc" />
      <InstitutionalIdentitySection department="ccs" />
      <GoalSection />
      <CoreValuesSection />
      <GetInvolvedSection />
    </>
  );
};
