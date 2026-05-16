import { createContext as e, useContext as t } from "react";
//#region src/stories/sections/AppShell/SidebarContext.tsx
var n = e(null);
function r() {
	let e = t(n);
	if (!e) throw Error("useSidebar must be used within AppShell");
	return e;
}
//#endregion
export { r as n, n as t };
