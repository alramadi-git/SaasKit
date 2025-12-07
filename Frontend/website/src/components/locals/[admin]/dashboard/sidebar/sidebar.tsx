import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/shadcn/sidebar";

import SidebarHeader from "./sidebar-header";
import SidebarFooter from "./sidebar-footer";

export default function Sidebar() {
  return (
    <ShadcnSidebar >
      <SidebarHeader />
      <SidebarContent>{/* <SidebarContentMain /> */}</SidebarContent>

      <SidebarSeparator />
      <SidebarFooter />
    </ShadcnSidebar>
  );
}
