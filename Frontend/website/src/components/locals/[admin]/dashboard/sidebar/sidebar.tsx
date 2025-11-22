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

      <SidebarSeparator />
      <SidebarContent>{/* <SidebarContentMain /> */}</SidebarContent>

      <SidebarSeparator />
      <SidebarFooter />
    </ShadcnSidebar>
  );
}
