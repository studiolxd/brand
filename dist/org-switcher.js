'use client';
import './org-switcher.css';
import { t as e } from "./_shared/useControlled.js";
import { t } from "./_shared/useRenderElement.js";
import { O as n, R as r, x as i } from "./_shared/floating-ui.utils.dom.js";
import { n as a } from "./_shared/useCompositeListItem.js";
import { t as o } from "./_shared/useBaseUiId.js";
import { Icon as s } from "./icon.js";
import { Avatar as c } from "./avatar.js";
import { t as l } from "./_shared/Separator.js";
import { a as u, c as d, d as f, f as p, i as m, l as h, n as g, o as _, p as v, r as y, s as b, t as x, u as S } from "./_shared/dropdownItems.js";
import { n as C } from "./_shared/SidebarContext.js";
import * as w from "react";
import { Fragment as T, jsx as E, jsxs as D } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItemContext.js
var O = /* @__PURE__ */ w.createContext(void 0);
process.env.NODE_ENV !== "production" && (O.displayName = "MenuCheckboxItemContext");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItem.js
var k = /* @__PURE__ */ w.forwardRef(function(s, c) {
	let { render: l, className: u, id: d, label: m, nativeButton: g = !1, disabled: _ = !1, closeOnClick: y = !1, checked: b, defaultChecked: x, onCheckedChange: C, ...T } = s, D = a({ label: m }), k = v(!0), A = o(d), { store: j } = p(), M = j.useState("isActive", D.index), N = j.useState("itemProps"), [P, F] = e({
		controlled: b,
		default: x ?? !1,
		name: "MenuCheckboxItem",
		state: "checked"
	}), { getItemProps: I, itemRef: L } = f({
		closeOnClick: y,
		disabled: _,
		highlighted: M,
		id: A,
		store: j,
		nativeButton: g,
		nodeId: k?.nodeId,
		itemMetadata: S
	}), R = w.useMemo(() => ({
		disabled: _,
		highlighted: M,
		checked: P
	}), [
		_,
		M,
		P
	]), z = r((e) => {
		let t = {
			...i(n, e.nativeEvent),
			preventUnmountOnClose: () => {}
		};
		C?.(!P, t), !t.isCanceled && F((e) => !e);
	}), B = t("div", s, {
		state: R,
		stateAttributesMapping: h,
		props: [
			N,
			{
				role: "menuitemcheckbox",
				"aria-checked": P,
				onClick: z
			},
			T,
			I
		],
		ref: [
			L,
			c,
			D.ref
		]
	});
	return /* @__PURE__ */ E(O.Provider, {
		value: R,
		children: B
	});
});
process.env.NODE_ENV !== "production" && (k.displayName = "MenuCheckboxItem");
//#endregion
//#region src/stories/molecules/OrgSwitcher/OrgSwitcher.tsx
function A({ label: e, block: t = !1, compact: n, current: r, organizations: i, onOrgChange: a, defaultOpen: o, items: f, renderLink: p = x }) {
	let h = i.filter((e) => e.id !== r.id), v = C(), S = n ?? v.rail;
	return /* @__PURE__ */ D(m, {
		defaultOpen: o,
		children: [/* @__PURE__ */ D(y, {
			className: [
				"org-switcher__trigger",
				t && !S ? "org-switcher__trigger--block" : "",
				S ? "org-switcher__trigger--compact" : ""
			].filter(Boolean).join(" "),
			"aria-label": e ?? `Organización: ${r.name}`,
			children: [
				/* @__PURE__ */ E(c, {
					src: r.logoUrl,
					name: r.name,
					alt: "",
					size: "sm",
					shape: "square"
				}),
				!S && /* @__PURE__ */ E("span", {
					className: "org-switcher__name",
					children: r.name
				}),
				!S && /* @__PURE__ */ E(s, {
					name: "chevron",
					size: "sm",
					className: "org-switcher__chevron"
				})
			]
		}), /* @__PURE__ */ E(_, { children: /* @__PURE__ */ E(u, {
			className: "org-switcher__positioner",
			sideOffset: 4,
			align: "start",
			children: /* @__PURE__ */ D(b, {
				className: "org-switcher__content",
				children: [
					/* @__PURE__ */ D(k, {
						className: "org-switcher__item org-switcher__item--active",
						checked: !0,
						onCheckedChange: () => void 0,
						children: [/* @__PURE__ */ E(c, {
							src: r.logoUrl,
							name: r.name,
							alt: "",
							size: "sm",
							shape: "square"
						}), /* @__PURE__ */ E("span", { children: r.name })]
					}),
					h.map((e) => /* @__PURE__ */ D(d, {
						className: "org-switcher__item",
						onClick: () => a(e.id),
						children: [/* @__PURE__ */ E(c, {
							src: e.logoUrl,
							name: e.name,
							alt: "",
							size: "sm",
							shape: "square"
						}), /* @__PURE__ */ E("span", { children: e.name })]
					}, e.id)),
					f && f.length > 0 && /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E(l, { className: "org-switcher__separator" }), g({
						items: f,
						itemClass: (e) => ["org-switcher__item", e ? "org-switcher__item--destructive" : ""].filter(Boolean).join(" "),
						separatorClass: "org-switcher__separator",
						renderLink: p
					})] })
				]
			})
		}) })]
	});
}
//#endregion
export { A as OrgSwitcher };
