import { SidebarRoutes } from "./sidebar-routes";


export const Sidebar = () => {
    return (
        <aside className="h-full flex flex-col overflow-y-auto shadow-sm">
            <SidebarRoutes/>
        </aside>
    )
}
