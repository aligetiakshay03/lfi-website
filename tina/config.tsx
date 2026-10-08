import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";
import {
  defineConfig,
  LocalAuthProvider,
  TinaCloudMediaStoreClass,
} from "tinacms";

import { HomeCollection } from "./collections/home";
import { navbarCollection } from "./collections/navbar";
import { uiuxSchema } from "./collections/services/consulting/uiux";
import { EngineeringPageSchema } from "./collections/services/engineering";
import { ConsultingPage } from "./collections/services/consulting";
import footerCollection from "./collections/footer";
import { PersistentlyInnovativeCollection } from "./collections/persistentlyInnovative";
import { ConstantlyInnovatingCollection } from "./collections/constantlyInnovating";
import { TechnologySchema } from "./collections/services/technology";
import { CloudSchema } from "./collections/services/cloud";
import { TeamsSchema } from "./collections/services/teams";
import { AutomationSchema } from "./collections/services/automation";
import { roboticProcessAutomationSchema } from "./collections/services/automation/robotic-process-automation";
import { digitalTransformationSchema } from "./collections/services/automation/digitalTransformation";
import { ProductDiscoverySchema } from "./collections/services/consulting/productDiscovery";
import { SolutionDiscoverySchema } from "./collections/services/consulting/solutionDiscovery";
import { ApplicationDevelopmentPage } from "./collections/services/engineering/applicationDevelopment";
import { QualityControlPage } from "./collections/services/engineering/qualityControl";
import { DevOpsPage } from "./collections/services/engineering/devOps";
import { TechnologyAdvisorySchema } from "./collections/services/consulting/technologyAdvisory";
import { ManagedTeamSchema } from "./collections/services/teams/managedTeam";
import { CloudConsultingSchema } from "./collections/services/cloud/cloudConsulting";
import { CloudDevelopmentSchema } from "./collections/services/cloud/cloudDevelopment";
import { KubernetesServicesSchema } from "./collections/services/cloud/kubernetesServices";
import { CloudMigrationSchema } from "./collections/services/cloud/cloudMigration";
import { IPaaSSchema } from "./collections/services/cloud/iPaaS";
import { StaffAugmentationSchema } from "./collections/services/teams/staffAugmentation";
import { bigDataSchema } from "./collections/services/technology/bigData";
import { AiMlSchema } from "./collections/services/technology/aiml";
import { blogsCollections } from "./collections/blogs";
import { BankingSchema } from "./collections/industries/banking";
import { TelecomSchema } from "./collections/industries/telecom";
import { FMCGSchema } from "./collections/industries/fmcg";
import { InsuranceSchema } from "./collections/industries/insurance";
import { BuildingsToolsCollection } from "./collections/buildingsTools";
import { FintechSchema } from "./collections/industries/fintech";
import { OilandGasSchema } from "./collections/industries/oilandgas";
import { MiningSchema } from "./collections/industries/mining";
import { CookiesPolicyCollection } from "./collections/policies/cookiesPolicy";
import { PrivacyPolicyCollection } from "./collections/policies/privacyPolicy";
import { TermsOfUseCollection } from "./collections/policies/termsOfUse";
import AuthorsCollection from "./collections/authors";
import { blogsSection } from "./collections/blogsSection";
import { ContactUsCollection } from "./collections/contactUs";
import { MicrosoftDynamicsPage } from "./collections/solutions/microsoftDynamics";
import { OdooPage } from "./collections/solutions/odoo";
import FeaturedBlogs from "./collections/featuredBlogs";
import CategoriesCollection from "./collections/categories";
import GroupsCollection from "./collections/keywords";
import { SAPPage } from "./collections/solutions/sap/sap";
import { SAPHanaPage } from "./collections/solutions/sap/sap-hana";
import { ServiceAndMorePage } from "./collections/solutions/sap/service&more";
import { DataServicesPage } from "./collections/solutions/sap/data-services";
import { OurApproach } from "./collections/company/ourApproach";
import { CoreSapExpertise } from "./collections/solutions/sap/core-sap-expertise";
import { SapSpecialExpertise } from "./collections/solutions/sap/sap-special-expertise";
import { aboutUs } from "./collections/company/aboutUs";
import { CareersPage } from "./collections/Careers";
import { ERPSolutionsPage } from "./collections/solutions/erp-solutions";
import { newsSection } from "./collections/newsSection";
import { ContactCardsbanner } from "./collections/contactusbanner";
import { ManufacturingSchema } from "./collections/industries/manufacturing";
import { ITInfraAndSolutionsSchema } from "./collections/services/itinfraandsolutions";
import { SalesforcePage } from "./collections/solutions/salesforce";
import { InnovationAndTransformationPage } from "./collections/InnovationAndTransformation";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  contentApiUrlOverride: "/api/tina/gql",
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-s3");
      return pack.TinaCloudS3MediaStore as unknown as TinaCloudMediaStoreClass;
    },
  },
  schema: {
    collections: [
      TinaUserCollection,
      navbarCollection,
      HomeCollection,
      uiuxSchema,
      EngineeringPageSchema,
      ConsultingPage,
      footerCollection,
      PersistentlyInnovativeCollection,
      ConstantlyInnovatingCollection,
      TechnologySchema,
      CloudSchema,
      ITInfraAndSolutionsSchema,
      TeamsSchema,
      AutomationSchema,
      roboticProcessAutomationSchema,
      digitalTransformationSchema,
      ProductDiscoverySchema,
      SolutionDiscoverySchema,
      ApplicationDevelopmentPage,
      QualityControlPage,
      DevOpsPage,
      TechnologyAdvisorySchema,
      ManagedTeamSchema,
      CloudConsultingSchema,
      CloudDevelopmentSchema,
      CloudMigrationSchema,
      KubernetesServicesSchema,
      IPaaSSchema,
      StaffAugmentationSchema,
      bigDataSchema,
      AiMlSchema,
      BankingSchema,
      TelecomSchema,
      FMCGSchema,
      InsuranceSchema,
      ManufacturingSchema,
      BuildingsToolsCollection,
      FintechSchema,
      OilandGasSchema,
      MiningSchema,
      CookiesPolicyCollection,
      PrivacyPolicyCollection,
      TermsOfUseCollection,
      blogsCollections,
      AuthorsCollection,
      blogsSection,
      ContactUsCollection,
      MicrosoftDynamicsPage,
      OdooPage,
      FeaturedBlogs,
      CategoriesCollection,
      GroupsCollection,
      SAPPage,
      SAPHanaPage,
      ServiceAndMorePage,
      DataServicesPage,
      SalesforcePage,
      OurApproach,
      CoreSapExpertise,
      SapSpecialExpertise,
      aboutUs,
      CareersPage,
      ERPSolutionsPage,
      newsSection,
      ContactCardsbanner,
      InnovationAndTransformationPage
    ],
  },
});
