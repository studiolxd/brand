'use client';
import './data-table.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Skeleton as n } from "./skeleton.js";
import { t as r } from "./_shared/pagination.js";
import { a as i, n as a, o, r as s, s as c, t as l } from "./_shared/table.js";
import { t as u } from "./_shared/inputfield.js";
import { EmptyState as d } from "./empty-state.js";
import { useId as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
import { flexRender as g, getCoreRowModel as _, getFilteredRowModel as v, getPaginationRowModel as y, getSortedRowModel as b, useReactTable as x } from "@tanstack/react-table";
//#region src/stories/messages/es/dataTable.ts
var S = {
	empty: "Sin resultados",
	search: "Buscar…"
};
//#endregion
//#region src/stories/organisms/DataTable/DataTable.tsx
function C(e, t) {
	let n = t.columnDef.meta?.align;
	return n && n !== "start" ? `data-table__${e}--${n}` : "";
}
function w({ columns: w, data: T, ariaLabel: E, ariaLabelledBy: D, searchColumnId: O, search: k, searchPlaceholder: A, searchClearLabel: j, toolbar: M, footerActions: N, pageSize: P = 10, emptyMessage: F, emptyDescription: I, isLoading: L, pagination: R, headerLabels: z, paginationLabels: B, className: V }) {
	"use no memo";
	let H = e("dataTable", S), [U, W] = p([]), [G, K] = p([]), q = x({
		data: T,
		columns: w,
		state: {
			sorting: U,
			columnFilters: G
		},
		onSortingChange: W,
		onColumnFiltersChange: K,
		getCoreRowModel: _(),
		getSortedRowModel: b(),
		getFilteredRowModel: v(),
		...R ? { manualPagination: !0 } : {
			getPaginationRowModel: y(),
			initialState: { pagination: { pageSize: P } }
		}
	}), J = R?.pageSize ?? P, Y = O || k ? H("search", A) : "", X = `${f()}-search`;
	return /* @__PURE__ */ h("div", {
		className: ["data-table", V].filter(Boolean).join(" "),
		children: [
			(O || k || M) && /* @__PURE__ */ h("div", {
				className: "data-table__toolbar",
				children: [k ? /* @__PURE__ */ m(u, {
					className: "data-table__search",
					id: X,
					kind: "search",
					clearable: !0,
					label: Y,
					labelHidden: !0,
					...j ? { clearLabel: j } : {},
					value: k.value,
					onChange: (e) => k.onChange(e.target.value)
				}) : O && /* @__PURE__ */ m(u, {
					className: "data-table__search",
					id: X,
					kind: "search",
					clearable: !0,
					label: Y,
					labelHidden: !0,
					...j ? { clearLabel: j } : {},
					value: q.getColumn(O)?.getFilterValue() ?? "",
					onChange: (e) => q.getColumn(O)?.setFilterValue(e.target.value)
				}), M && /* @__PURE__ */ m("div", {
					className: "data-table__toolbar-actions",
					children: M
				})]
			}),
			/* @__PURE__ */ m("div", {
				className: "data-table__scroll",
				children: /* @__PURE__ */ h(l, {
					"aria-label": E,
					"aria-labelledby": D,
					"aria-busy": L || void 0,
					children: [/* @__PURE__ */ m(i, { children: q.getHeaderGroups().map((e) => /* @__PURE__ */ m(c, { children: e.headers.map((e) => {
						let n = e.column.getIsSorted(), r = e.column.getCanSort(), i = C("header-cell", e.column), a = e.column.columnDef.meta?.headerHidden === !0, s = e.isPlaceholder ? null : g(e.column.columnDef.header, e.getContext());
						return /* @__PURE__ */ m(o, {
							className: ["data-table__header-cell", i].filter(Boolean).join(" "),
							sortable: r,
							sorted: n === "asc" || n === "desc" ? n : !1,
							onSort: r ? () => e.column.toggleSorting() : void 0,
							sticky: e.column.columnDef.meta?.sticky,
							...z,
							children: a ? /* @__PURE__ */ m(t, { children: s }) : s
						}, e.id);
					}) }, e.id)) }), /* @__PURE__ */ m(a, { children: L ? Array.from({ length: J }).map((e, t) => /* @__PURE__ */ m(c, {
						"aria-hidden": "true",
						children: w.map((e, t) => /* @__PURE__ */ m(s, { children: /* @__PURE__ */ m(n, {}) }, t))
					}, t)) : q.getRowModel().rows.length === 0 ? /* @__PURE__ */ m(c, { children: /* @__PURE__ */ m(s, {
						colSpan: w.length,
						children: /* @__PURE__ */ m(d, {
							size: "sm",
							title: H("empty", F),
							description: I
						})
					}) }) : q.getRowModel().rows.map((e) => /* @__PURE__ */ m(c, {
						selected: e.getIsSelected(),
						children: e.getVisibleCells().map((e) => /* @__PURE__ */ m(s, {
							className: ["data-table__cell", C("cell", e.column)].filter(Boolean).join(" "),
							sticky: e.column.columnDef.meta?.sticky,
							children: g(e.column.columnDef.cell, e.getContext())
						}, e.id))
					}, e.id)) })]
				})
			}),
			/* @__PURE__ */ m("div", {
				className: "data-table__footer",
				children: R ? /* @__PURE__ */ m(r, {
					total: R.total,
					page: R.page,
					pageSize: R.pageSize,
					onPageChange: R.onPageChange,
					onPageSizeChange: R.onPageSizeChange,
					showTotal: !0,
					afterPageSize: N,
					...B
				}) : /* @__PURE__ */ m(r, {
					total: q.getFilteredRowModel().rows.length,
					page: q.getState().pagination.pageIndex + 1,
					pageSize: q.getState().pagination.pageSize,
					onPageChange: (e) => q.setPageIndex(e - 1),
					afterPageSize: N,
					...B
				})
			})
		]
	});
}
//#endregion
export { w as DataTable };
