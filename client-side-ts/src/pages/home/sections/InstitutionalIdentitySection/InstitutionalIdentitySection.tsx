import { CCSIdentity } from "./CCSIdentity";
import { UCIdentity } from "./UCIdentity";
import { institutionalIdentityData } from "@/data/sections-data";

interface Props {
  department: "uc" | "ccs";
}

export const InstitutionalIdentitySection = ({ department }: Props) => {
  if (department === "uc") {
    return <UCIdentity data={institutionalIdentityData.uc} />;
  }
  return <CCSIdentity data={institutionalIdentityData.ccs} />;
};
