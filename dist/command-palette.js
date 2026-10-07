'use client';
import './command-palette.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { t } from "./_shared/modal.js";
import { useCallback as n, useEffect as r, useRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { Autocomplete as s } from "@base-ui/react/autocomplete";
//#region src/stories/messages/es/commandPalette.ts
var c = {
	title: "Buscar un comando",
	placeholder: "Escribe para buscar…",
	empty: "Sin resultados.",
	list: "Sugerencias"
};
//#endregion
//#region src/stories/molecules/CommandPalette/CommandPalette.tsx
function l({ open: l, onOpenChange: u, groups: d, title: f, placeholder: p, emptyLabel: m, listLabel: h, closeLabel: g, shortcut: _ = "k", locale: v, filter: y = "internal", query: b, onQueryChange: x, className: S }) {
	let C = e("commandPalette", c), w = i(l);
	r(() => {
		w.current && !l && x?.(""), w.current = l;
	}, [l, x]), r(() => {
		if (_ === !1) return;
		let e = (e) => {
			typeof e.key == "string" && e.key.toLowerCase() === _ && (e.metaKey || e.ctrlKey) && (e.preventDefault(), u(!l));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		_,
		l,
		u
	]);
	let T = s.useFilter({
		sensitivity: "base",
		locale: v
	}), E = n((e, t) => (d.find((t) => t.items.includes(e))?.filter ?? y) === "none" ? !0 : T.contains(e.label, t) || (e.keywords ?? []).some((e) => T.contains(e, t)), [
		T,
		d,
		y
	]);
	return /* @__PURE__ */ a(t, {
		open: l,
		onOpenChange: u,
		title: C("title", f),
		...g ? { closeLabel: g } : {},
		children: /* @__PURE__ */ a(s.Root, {
			inline: !0,
			open: !0,
			items: d,
			filter: E,
			autoHighlight: "always",
			...b === void 0 ? {} : { value: b },
			onValueChange: (e) => x?.(e),
			children: /* @__PURE__ */ o("div", {
				className: ["command-palette", S].filter(Boolean).join(" "),
				children: [
					/* @__PURE__ */ a(s.Input, {
						className: "command-palette__input",
						placeholder: C("placeholder", p),
						autoFocus: !0
					}),
					/* @__PURE__ */ a(s.List, {
						className: "command-palette__list",
						"aria-label": C("list", h),
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
									u(!1), e.onSelect();
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
						children: C("empty", m)
					})
				]
			})
		})
	});
}
//#endregion
export { l as CommandPalette };
