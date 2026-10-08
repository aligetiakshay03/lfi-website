import { Automation, AutomationQuery } from "../tina/__generated__/types";

export interface IAutomationPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: AutomationQuery;
}