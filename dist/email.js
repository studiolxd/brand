import { Body as e, Button as t, Column as n, Container as r, Font as i, Head as a, Heading as o, Hr as s, Html as c, Img as l, Link as u, Preview as d, Row as f, Section as p, Text as m } from "react-email";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
import { Children as v, isValidElement as y } from "react";
//#region src/stories/email/emailTokens.ts
var b = {
	"--email-max-width": "600px",
	"--email-font-family": "\"Google Sans Flex\", system-ui, sans-serif",
	"--email-font-size": "20px",
	"--email-font-weight": "300",
	"--email-font-weight-range": "1 1000",
	"--email-line-height": "1.5",
	"--email-border-width": "1px",
	"--email-canvas-padding-block": "24px",
	"--email-canvas-padding-inline": "12px",
	"--email-padding-block": "24px",
	"--email-padding-inline": "24px",
	"--email-brand-padding-block": "16px",
	"--email-brand-padding-inline": "16px",
	"--email-opt-out-margin-block-start": "16px",
	"--email-heading-font-size": "32px",
	"--email-heading-font-weight": "500",
	"--email-heading-line-height": "1.1",
	"--email-heading-margin-block-end": "12px",
	"--email-text-margin-block-end": "16px",
	"--email-note-font-size": "16px",
	"--email-note-line-height": "1.65",
	"--email-text-emphasis-font-weight": "500",
	"--email-section-title-font-size": "24px",
	"--email-section-title-font-weight": "500",
	"--email-section-title-line-height": "1.3",
	"--email-section-title-margin-block-start": "24px",
	"--email-section-title-margin-block-end": "12px",
	"--email-section-title-color": "#111e30",
	"--email-list-margin-block-end": "16px",
	"--email-list-padding-inline-start": "24px",
	"--email-list-item-margin-block-end": "8px",
	"--email-quote-border-width": "2px",
	"--email-quote-border-color": "#4a4a4a",
	"--email-quote-padding-inline-start": "12px",
	"--email-quote-margin-block-end": "16px",
	"--email-callout-padding-block": "16px",
	"--email-callout-padding-inline": "16px",
	"--email-callout-margin-block-end": "16px",
	"--email-columns-margin-block-end": "16px",
	"--email-column-gutter": "16px",
	"--email-divider-width": "1px",
	"--email-divider-color": "#d0d0d0",
	"--email-divider-margin-block": "24px",
	"--email-key-value-margin-block-end": "12px",
	"--email-key-value-label-font-size": "16px",
	"--email-key-value-label-font-weight": "500",
	"--email-key-value-label-color": "#4a4a4a",
	"--email-code-font-family": "\"Google Sans Code\", ui-monospace, monospace",
	"--email-code-font-size": "16px",
	"--email-code-bg": "#f2f2f2",
	"--email-code-color": "#111e30",
	"--email-code-padding-block": "12px",
	"--email-code-padding-inline": "12px",
	"--email-code-margin-block-end": "16px",
	"--email-tag-font-size": "16px",
	"--email-tag-font-weight": "500",
	"--email-tag-border-radius": "9999px",
	"--email-tag-padding-block": "4px",
	"--email-tag-padding-inline": "12px",
	"--email-tag-margin-block-end": "16px",
	"--email-tone-info-bg": "#111e30",
	"--email-tone-info-color": "#ffffff",
	"--email-tone-success-bg": "#006616",
	"--email-tone-success-color": "#ffffff",
	"--email-tone-warning-bg": "#ffcd00",
	"--email-tone-warning-color": "#111e30",
	"--email-tone-error-bg": "#b30000",
	"--email-tone-error-color": "#ffffff",
	"--email-button-bg": "#baabff",
	"--email-button-color": "#111e30",
	"--email-button-hover-bg": "#ffcd00",
	"--email-button-hover-color": "#111e30",
	"--email-button-font-size": "20px",
	"--email-button-font-weight": "300",
	"--email-button-padding-block": "16px",
	"--email-button-width": "100%",
	"--email-button-fallback-margin-block-start": "12px",
	"--email-button-margin-block-end": "24px",
	"--email-logo-mark-size": "48px",
	"--email-logo-padding": "8px",
	"--email-canvas-bg": "#ffffff",
	"--email-bg": "#ffffff",
	"--email-color": "#111e30",
	"--email-muted-color": "#4a4a4a",
	"--email-border-color": "#111e30"
};
//#endregion
//#region src/stories/email/emailTheme.ts
function x(e) {
	return b[e];
}
var S = {
	canvas: x("--email-canvas-bg"),
	background: x("--email-bg"),
	text: x("--email-color"),
	muted: x("--email-muted-color"),
	border: x("--email-border-color")
}, C = x("--email-font-family"), w = x("--email-font-weight-range"), T = x("--email-max-width"), E = {
	size: Number.parseFloat(x("--email-logo-mark-size")) + Number.parseFloat(x("--email-logo-padding")) * 2,
	filename: "logo-v1.png"
}, D = "https://slxd.app/brand/email", O = "google-sans-flex-normal-latin-v1.woff2", k = {
	heading: {
		color: S.text,
		fontFamily: C,
		fontSize: x("--email-heading-font-size"),
		fontWeight: Number(x("--email-heading-font-weight")),
		lineHeight: x("--email-heading-line-height"),
		margin: `0 0 ${x("--email-heading-margin-block-end")}`
	},
	text: {
		color: S.text,
		fontFamily: C,
		fontWeight: Number(x("--email-font-weight")),
		fontSize: x("--email-font-size"),
		lineHeight: x("--email-line-height"),
		margin: `0 0 ${x("--email-text-margin-block-end")}`
	},
	textEmphasis: { fontWeight: Number(x("--email-text-emphasis-font-weight")) },
	muted: {
		color: S.muted,
		fontFamily: C,
		fontWeight: Number(x("--email-font-weight")),
		fontSize: x("--email-note-font-size"),
		lineHeight: x("--email-note-line-height"),
		margin: 0
	},
	footnote: {
		color: S.text,
		fontFamily: C,
		fontWeight: Number(x("--email-font-weight")),
		fontSize: x("--email-note-font-size"),
		lineHeight: x("--email-note-line-height"),
		margin: 0
	},
	button: {
		backgroundColor: x("--email-button-bg"),
		color: x("--email-button-color"),
		display: "block",
		width: x("--email-button-width"),
		textAlign: "center",
		fontFamily: C,
		fontSize: x("--email-button-font-size"),
		fontWeight: Number(x("--email-button-font-weight")),
		padding: `${x("--email-button-padding-block")} 0`,
		textDecoration: "none",
		marginBottom: x("--email-button-margin-block-end")
	},
	buttonFallback: {
		color: S.muted,
		fontFamily: C,
		fontSize: x("--email-font-size"),
		fontWeight: Number(x("--email-font-weight")),
		lineHeight: x("--email-line-height"),
		margin: `${x("--email-button-fallback-margin-block-start")} 0 ${x("--email-button-margin-block-end")}`
	},
	buttonFallbackUrl: {
		color: S.text,
		wordBreak: "break-all",
		wordWrap: "break-word"
	},
	link: {
		color: S.text,
		fontFamily: C,
		fontWeight: Number(x("--email-font-weight")),
		textDecoration: "underline"
	},
	sectionTitle: {
		color: x("--email-section-title-color"),
		fontFamily: C,
		fontSize: x("--email-section-title-font-size"),
		fontWeight: Number(x("--email-section-title-font-weight")),
		lineHeight: x("--email-section-title-line-height"),
		margin: `${x("--email-section-title-margin-block-start")} 0 ${x("--email-section-title-margin-block-end")}`
	},
	list: {
		color: S.text,
		fontFamily: C,
		fontSize: x("--email-font-size"),
		fontWeight: Number(x("--email-font-weight")),
		lineHeight: x("--email-line-height"),
		margin: `0 0 ${x("--email-list-margin-block-end")}`,
		paddingLeft: x("--email-list-padding-inline-start")
	},
	listItem: { margin: `0 0 ${x("--email-list-item-margin-block-end")}` },
	quote: {
		borderLeft: `${x("--email-quote-border-width")} solid ${x("--email-quote-border-color")}`,
		margin: `0 0 ${x("--email-quote-margin-block-end")}`,
		paddingLeft: x("--email-quote-padding-inline-start")
	},
	callout: {
		fontFamily: C,
		fontSize: x("--email-font-size"),
		fontWeight: Number(x("--email-font-weight")),
		lineHeight: x("--email-line-height"),
		margin: `0 0 ${x("--email-callout-margin-block-end")}`,
		padding: `${x("--email-callout-padding-block")} ${x("--email-callout-padding-inline")}`
	},
	tag: {
		borderRadius: x("--email-tag-border-radius"),
		display: "inline-block",
		fontFamily: C,
		fontSize: x("--email-tag-font-size"),
		fontWeight: Number(x("--email-tag-font-weight")),
		padding: `${x("--email-tag-padding-block")} ${x("--email-tag-padding-inline")}`
	},
	divider: {
		border: 0,
		borderTop: `${x("--email-divider-width")} solid ${x("--email-divider-color")}`,
		margin: `${x("--email-divider-margin-block")} 0`,
		width: "100%"
	},
	keyValue: {
		color: S.text,
		fontFamily: C,
		fontSize: x("--email-font-size"),
		fontWeight: Number(x("--email-font-weight")),
		lineHeight: x("--email-line-height"),
		margin: `0 0 ${x("--email-key-value-margin-block-end")}`
	},
	keyValueLabel: {
		color: x("--email-key-value-label-color"),
		fontSize: x("--email-key-value-label-font-size"),
		fontWeight: Number(x("--email-key-value-label-font-weight"))
	},
	code: {
		backgroundColor: x("--email-code-bg"),
		color: x("--email-code-color"),
		fontFamily: x("--email-code-font-family"),
		fontSize: x("--email-code-font-size"),
		lineHeight: x("--email-line-height"),
		margin: `0 0 ${x("--email-code-margin-block-end")}`,
		padding: `${x("--email-code-padding-block")} ${x("--email-code-padding-inline")}`,
		wordBreak: "break-all",
		wordWrap: "break-word"
	},
	columns: {
		marginBottom: x("--email-columns-margin-block-end"),
		width: "100%"
	},
	column: {
		color: S.text,
		fontFamily: C,
		fontSize: x("--email-font-size"),
		fontWeight: Number(x("--email-font-weight")),
		lineHeight: x("--email-line-height"),
		verticalAlign: "top"
	}
}, A = {
	info: {
		backgroundColor: x("--email-tone-info-bg"),
		color: x("--email-tone-info-color")
	},
	success: {
		backgroundColor: x("--email-tone-success-bg"),
		color: x("--email-tone-success-color")
	},
	warning: {
		backgroundColor: x("--email-tone-warning-bg"),
		color: x("--email-tone-warning-color")
	},
	error: {
		backgroundColor: x("--email-tone-error-bg"),
		color: x("--email-tone-error-color")
	}
}, j = "email-button", M = `
  a:hover { text-decoration: none !important; }
  a.${j}:hover {
    background-color: ${x("--email-button-hover-bg")} !important;
    color: ${x("--email-button-hover-color")} !important;
  }
`;
//#endregion
//#region src/stories/email/EmailLayout.tsx
function N(e) {
	if (e.reasonLabel !== void 0) return /* @__PURE__ */ _(m, {
		style: k.footnote,
		children: [
			e.reasonLabel,
			" ",
			/* @__PURE__ */ g(u, {
				href: e.unsubscribeUrl,
				style: k.link,
				children: e.unsubscribeLabel
			})
		]
	});
	let { unsubscribeUrl: t, preferencesUrl: n, manageLabel: r = "Para dejar de recibir estos avisos,", unsubscribeLabel: i = n ? "Darse de baja" : "date de baja", manageBeforeLabel: a = " o ", managePreferencesLabel: o = "gestiona tus preferencias", manageAfterLabel: s = "." } = e, c = /* @__PURE__ */ g(u, {
		href: t,
		style: k.link,
		children: i
	});
	return n ? /* @__PURE__ */ _(m, {
		style: k.footnote,
		children: [
			c,
			a,
			/* @__PURE__ */ g(u, {
				href: n,
				style: k.link,
				children: o
			}),
			s
		]
	}) : /* @__PURE__ */ _(m, {
		style: k.footnote,
		children: [
			r,
			" ",
			c
		]
	});
}
function P({ preview: t, appName: n, locale: o = "es", assetsBaseUrl: s = D, logoAlt: u, optOut: f, children: m }) {
	let h = s.replace(/\/$/, "");
	return /* @__PURE__ */ _(c, {
		lang: o,
		children: [
			/* @__PURE__ */ _(a, { children: [/* @__PURE__ */ g(i, {
				fontFamily: "Google Sans Flex",
				fallbackFontFamily: "sans-serif",
				webFont: {
					url: `${h}/${O}`,
					format: "woff2"
				},
				fontWeight: w,
				fontStyle: "normal"
			}), /* @__PURE__ */ g("style", { dangerouslySetInnerHTML: { __html: M } })] }),
			/* @__PURE__ */ g(d, { children: t }),
			/* @__PURE__ */ g(e, {
				style: {
					backgroundColor: S.canvas,
					color: S.text,
					fontFamily: k.text.fontFamily,
					fontSize: k.text.fontSize,
					fontWeight: k.text.fontWeight,
					lineHeight: k.text.lineHeight,
					margin: 0,
					padding: 0
				},
				children: /* @__PURE__ */ _(p, {
					style: {
						backgroundColor: S.canvas,
						padding: `${x("--email-canvas-padding-block")} ${x("--email-canvas-padding-inline")}`,
						width: "100%"
					},
					children: [
						/* @__PURE__ */ g(r, {
							style: {
								backgroundColor: S.background,
								margin: "0 auto",
								maxWidth: T,
								padding: `${x("--email-brand-padding-block")} ${x("--email-brand-padding-inline")}`
							},
							children: /* @__PURE__ */ g(l, {
								src: `${h}/${E.filename}`,
								alt: u ?? n,
								width: E.size,
								height: E.size,
								style: {
									border: 0,
									display: "block"
								}
							})
						}),
						/* @__PURE__ */ g(r, {
							style: {
								backgroundColor: S.background,
								border: `${x("--email-border-width")} solid ${S.border}`,
								borderRadius: 0,
								margin: "0 auto",
								maxWidth: T,
								padding: `${x("--email-padding-block")} ${x("--email-padding-inline")}`
							},
							children: /* @__PURE__ */ g(p, { children: m })
						}),
						f && /* @__PURE__ */ g(r, {
							style: {
								backgroundColor: S.canvas,
								margin: "0 auto",
								maxWidth: T,
								padding: `${x("--email-opt-out-margin-block-start")} 0 0`
							},
							children: /* @__PURE__ */ g(N, { ...f })
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/stories/email/EmailPrimitives.tsx
function F({ children: e, style: t }) {
	return /* @__PURE__ */ g(o, {
		style: {
			...k.heading,
			...t
		},
		children: e
	});
}
function I({ children: e, emphasis: t = !1, style: n }) {
	return /* @__PURE__ */ g(m, {
		style: {
			...k.text,
			...t && k.textEmphasis,
			...n
		},
		children: e
	});
}
function L({ children: e, style: t }) {
	return /* @__PURE__ */ g(o, {
		as: "h2",
		style: {
			...k.sectionTitle,
			...t
		},
		children: e
	});
}
function R({ children: e, ordered: t = !1, style: n }) {
	return /* @__PURE__ */ g(t ? "ol" : "ul", {
		style: {
			...k.list,
			...n
		},
		children: e
	});
}
function z({ children: e, style: t }) {
	return /* @__PURE__ */ g("li", {
		style: {
			...k.listItem,
			...t
		},
		children: e
	});
}
function B({ children: e, style: t }) {
	return /* @__PURE__ */ g(p, {
		style: {
			...k.quote,
			...t
		},
		children: e
	});
}
function V({ children: e, tone: t = "info", style: n }) {
	return /* @__PURE__ */ g(p, {
		style: {
			...k.callout,
			...A[t],
			...n
		},
		children: e
	});
}
function H({ children: e, tone: t = "info", style: n }) {
	return /* @__PURE__ */ g("span", {
		style: {
			...k.tag,
			...A[t],
			...n
		},
		children: e
	});
}
function U({ style: e }) {
	return /* @__PURE__ */ g(s, { style: {
		...k.divider,
		...e
	} });
}
function W({ children: e, style: t }) {
	let r = v.toArray(e).filter(y), i = r.length - 1;
	return /* @__PURE__ */ g(f, {
		style: {
			...k.columns,
			...t
		},
		children: r.map((e, t) => /* @__PURE__ */ g(n, {
			style: {
				...k.column,
				paddingRight: t === i ? 0 : x("--email-column-gutter")
			},
			children: e
		}, e.key ?? t))
	});
}
function G({ children: e, width: t, style: n }) {
	return /* @__PURE__ */ g("div", {
		style: {
			width: t,
			...n
		},
		children: e
	});
}
function K({ label: e, children: t, style: n }) {
	return /* @__PURE__ */ _(m, {
		style: {
			...k.keyValue,
			...n
		},
		children: [
			/* @__PURE__ */ g("span", {
				style: k.keyValueLabel,
				children: e
			}),
			/* @__PURE__ */ g("br", {}),
			t
		]
	});
}
function q({ children: e, style: t }) {
	return /* @__PURE__ */ g(m, {
		style: {
			...k.code,
			...t
		},
		children: e
	});
}
function J({ children: e, tone: t = "muted", style: n }) {
	return /* @__PURE__ */ g(m, {
		style: {
			...t === "muted" ? k.muted : k.footnote,
			...n
		},
		children: e
	});
}
function Y({ href: e, children: t, style: n }) {
	return /* @__PURE__ */ g(u, {
		href: e,
		style: {
			...k.link,
			...n
		},
		children: t
	});
}
function X({ href: e, children: n, fallbackLabel: r, style: i }) {
	return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(t, {
		href: e,
		className: j,
		style: {
			...k.button,
			marginBottom: 0,
			...i
		},
		children: n
	}), /* @__PURE__ */ _(m, {
		style: k.buttonFallback,
		children: [
			r,
			/* @__PURE__ */ g("br", {}),
			/* @__PURE__ */ g("span", {
				style: k.buttonFallbackUrl,
				children: e
			})
		]
	})] });
}
//#endregion
export { X as EmailButton, V as EmailCallout, q as EmailCode, G as EmailColumn, W as EmailColumns, U as EmailDivider, F as EmailHeading, K as EmailKeyValue, P as EmailLayout, Y as EmailLink, R as EmailList, z as EmailListItem, J as EmailNote, B as EmailQuote, L as EmailSectionTitle, H as EmailTag, I as EmailText, D as emailAssetsBaseUrl, C as emailFontFamily, O as emailFontFilename, E as emailLogo, T as emailMaxWidth, S as emailPalette, M as emailStyleSheet, k as emailStyles, A as emailTones };
