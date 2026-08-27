'use client';
import './command-palette.css';
import { Modal as e } from "./modal.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useCallback as r, useEffect as i } from "react";
import { Autocomplete as a } from "@base-ui-components/react/autocomplete";
//#region src/stories/molecules/CommandPalette/CommandPalette.tsx
function o({ open: o, onOpenChange: s, groups: c, title: l, placeholder: u, emptyLabel: d, listLabel: f, closeLabel: p, shortcut: m = "k", locale: h, className: g }) {
	i(() => {
		if (m === !1) return;
		let e = (e) => {
			e.key.toLowerCase() === m && (e.metaKey || e.ctrlKey) && (e.preventDefault(), s(!o));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		m,
		o,
		s
	]);
	let _ = a.useFilter({
		sensitivity: "base",
		locale: h
	}), v = r((e, t) => _.contains(e.label, t) || (e.keywords ?? []).some((e) => _.contains(e, t)), [_]);
	return /* @__PURE__ */ t(e, {
		open: o,
		onClose: () => s(!1),
		title: l,
		...p ? { closeLabel: p } : {},
		children: /* @__PURE__ */ t(a.Root, {
			inline: !0,
			open: !0,
			items: c,
			filter: v,
			autoHighlight: "always",
			children: /* @__PURE__ */ n("div", {
				className: ["command-palette", g].filter(Boolean).join(" "),
				children: [
					/* @__PURE__ */ t(a.Input, {
						className: "command-palette__input",
						placeholder: u,
						autoFocus: !0
					}),
					/* @__PURE__ */ t(a.List, {
						className: "command-palette__list",
						"aria-label": f,
						children: (e) => /* @__PURE__ */ n(a.Group, {
							items: e.items,
							className: "command-palette__group",
							children: [/* @__PURE__ */ t(a.GroupLabel, {
								className: "command-palette__heading",
								children: e.heading
							}), /* @__PURE__ */ t(a.Collection, { children: (e) => /* @__PURE__ */ n(a.Item, {
								value: e,
								disabled: e.disabled,
								className: "command-palette__item",
								onClick: () => {
									s(!1), e.onSelect();
								},
								children: [e.icon && /* @__PURE__ */ t("span", {
									className: "command-palette__item-icon",
									"aria-hidden": "true",
									children: e.icon
								}), e.label]
							}, e.id) })]
						}, e.id)
					}),
					/* @__PURE__ */ t(a.Empty, {
						className: "command-palette__empty",
						children: d
					})
				]
			})
		})
	});
}
//#endregion
export { o as CommandPalette };
