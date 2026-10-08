import { r as e } from "./brandmessagescontext.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/messages/es/legalFooter.ts
var n = { label: "Legal" };
//#endregion
//#region src/stories/sections/LegalFooter/LegalFooterNav.tsx
function r({ label: r, children: i }) {
	let a = e("legalFooter", n);
	return /* @__PURE__ */ t("nav", {
		"aria-label": a("label", r),
		children: i
	});
}
//#endregion
export { r as t };
