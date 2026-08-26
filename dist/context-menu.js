'use client';
import { DotsButton as e } from "./dots-button.js";
import { Menu as t } from "./menu.js";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/molecules/ContextMenu/ContextMenu.tsx
function r({ items: r, renderLink: i, onOpenChange: a, side: o = "bottom", align: s = "end", minWidth: c, maxWidth: l, triggerSize: u = "md", triggerOrientation: d = "horizontal", label: f = "Más opciones" }) {
	return /* @__PURE__ */ n(t, {
		items: r,
		renderLink: i,
		onOpenChange: a,
		side: o,
		align: s,
		minWidth: c,
		maxWidth: l,
		trigger: /* @__PURE__ */ n(e, {
			size: u,
			orientation: d,
			"aria-label": f
		})
	});
}
//#endregion
export { r as ContextMenu };
