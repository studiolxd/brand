'use client';
import './command-palette.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Modal as t } from "./modal.js";
import { useCallback as n, useEffect as r, useRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { Autocomplete as s } from "@base-ui/react/autocomplete";
//#region src/stories/molecules/CommandPalette/CommandPalette.tsx
function c({ open: c, onOpenChange: l, groups: u, title: d, placeholder: f, emptyLabel: p, listLabel: m, closeLabel: h, shortcut: g = "k", locale: _, filter: v = "internal", query: y, onQueryChange: b, className: x }) {
	let S = e("commandPalette"), C = i(c);
	r(() => {
		C.current && !c && b?.(""), C.current = c;
	}, [c, b]), r(() => {
		if (g === !1) return;
		let e = (e) => {
			typeof e.key == "string" && e.key.toLowerCase() === g && (e.metaKey || e.ctrlKey) && (e.preventDefault(), l(!c));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		g,
		c,
		l
	]);
	let w = s.useFilter({
		sensitivity: "base",
		locale: _
	}), T = n((e, t) => (u.find((t) => t.items.includes(e))?.filter ?? v) === "none" ? !0 : w.contains(e.label, t) || (e.keywords ?? []).some((e) => w.contains(e, t)), [
		w,
		u,
		v
	]);
	return /* @__PURE__ */ a(t, {
		open: c,
		onClose: () => l(!1),
		title: S("title", d),
		...h ? { closeLabel: h } : {},
		children: /* @__PURE__ */ a(s.Root, {
			inline: !0,
			open: !0,
			items: u,
			filter: T,
			autoHighlight: "always",
			...y === void 0 ? {} : { value: y },
			onValueChange: (e) => b?.(e),
			children: /* @__PURE__ */ o("div", {
				className: ["command-palette", x].filter(Boolean).join(" "),
				children: [
					/* @__PURE__ */ a(s.Input, {
						className: "command-palette__input",
						placeholder: S("placeholder", f),
						autoFocus: !0
					}),
					/* @__PURE__ */ a(s.List, {
						className: "command-palette__list",
						"aria-label": S("list", m),
						children: (e) => /* @__PURE__ */ o(s.Group, {
							items: e.items,
							className: "command-palette__group",
							children: [/* @__PURE__ */ a(s.GroupLabel, {
								className: "command-palette__heading",
								children: e.heading
							}), /* @__PURE__ */ a(s.Collection, { children: (e) => /* @__PURE__ */ o(s.Item, {
								value: e,
								disabled: e.disabled,
								className: "command-palette__item",
								onClick: () => {
									l(!1), e.onSelect();
								},
								children: [e.icon && /* @__PURE__ */ a("span", {
									className: "command-palette__item-icon",
									"aria-hidden": "true",
									children: e.icon
								}), e.label]
							}, e.id) })]
						}, e.id)
					}),
					/* @__PURE__ */ a(s.Empty, {
						className: "command-palette__empty",
						children: S("empty", p)
					})
				]
			})
		})
	});
}
//#endregion
export { c as CommandPalette };
