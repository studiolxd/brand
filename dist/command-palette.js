'use client';
import './command-palette.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Modal as t } from "./modal.js";
import { useCallback as n, useEffect as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { Autocomplete as o } from "@base-ui/react/autocomplete";
//#region src/stories/molecules/CommandPalette/CommandPalette.tsx
function s({ open: s, onOpenChange: c, groups: l, title: u, placeholder: d, emptyLabel: f, listLabel: p, closeLabel: m, shortcut: h = "k", locale: g, className: _ }) {
	let v = e("commandPalette");
	r(() => {
		if (h === !1) return;
		let e = (e) => {
			typeof e.key == "string" && e.key.toLowerCase() === h && (e.metaKey || e.ctrlKey) && (e.preventDefault(), c(!s));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		h,
		s,
		c
	]);
	let y = o.useFilter({
		sensitivity: "base",
		locale: g
	}), b = n((e, t) => y.contains(e.label, t) || (e.keywords ?? []).some((e) => y.contains(e, t)), [y]);
	return /* @__PURE__ */ i(t, {
		open: s,
		onClose: () => c(!1),
		title: v("title", u),
		...m ? { closeLabel: m } : {},
		children: /* @__PURE__ */ i(o.Root, {
			inline: !0,
			open: !0,
			items: l,
			filter: b,
			autoHighlight: "always",
			children: /* @__PURE__ */ a("div", {
				className: ["command-palette", _].filter(Boolean).join(" "),
				children: [
					/* @__PURE__ */ i(o.Input, {
						className: "command-palette__input",
						placeholder: v("placeholder", d),
						autoFocus: !0
					}),
					/* @__PURE__ */ i(o.List, {
						className: "command-palette__list",
						"aria-label": v("list", p),
						children: (e) => /* @__PURE__ */ a(o.Group, {
							items: e.items,
							className: "command-palette__group",
							children: [/* @__PURE__ */ i(o.GroupLabel, {
								className: "command-palette__heading",
								children: e.heading
							}), /* @__PURE__ */ i(o.Collection, { children: (e) => /* @__PURE__ */ a(o.Item, {
								value: e,
								disabled: e.disabled,
								className: "command-palette__item",
								onClick: () => {
									c(!1), e.onSelect();
								},
								children: [e.icon && /* @__PURE__ */ i("span", {
									className: "command-palette__item-icon",
									"aria-hidden": "true",
									children: e.icon
								}), e.label]
							}, e.id) })]
						}, e.id)
					}),
					/* @__PURE__ */ i(o.Empty, {
						className: "command-palette__empty",
						children: v("empty", f)
					})
				]
			})
		})
	});
}
//#endregion
export { s as CommandPalette };
