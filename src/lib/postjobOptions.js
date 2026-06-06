// Dropdown option lists have been centralized to /dropdown/School_module/postjob.json
// and /dropdown/common/common.json. See dropdown-migration-plan.md.
//
// PUBLISH_OPTIONS stays here because it is UI config coupled to lucide icons
// (icons cannot live in JSON). Its text labels also exist in the dropdown catalog.
import { Zap, CalendarClock } from "lucide-react";

export const PUBLISH_OPTIONS = [
  { val: "Publish Immediately", icon: Zap, sub: "Job goes live right away" },
  {
    val: "Publish Later",
    icon: CalendarClock,
    sub: "Schedule for a future date & time",
  },
];
