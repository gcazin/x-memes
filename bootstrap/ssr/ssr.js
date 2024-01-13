import { mergeProps, useSSRContext, ref, onMounted, computed, createVNode, resolveDynamicComponent, withCtx, renderSlot, resolveComponent, watch, unref, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, withModifiers, renderList, watchEffect, onUnmounted, toRef, withKeys, withDirectives, vModelSelect, createSSRApp, h as h$1 } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderVNode, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderTeleport } from "vue/server-renderer";
import { usePage, Link, Head, useForm, router, createInertiaApp } from "@inertiajs/vue3";
import Multiselect from "@vueform/multiselect";
import saveAs from "file-saver";
import _ from "lodash";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
const _sfc_main$O = {
  __name: "InputError",
  __ssrInlineRender: true,
  props: {
    message: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.message) {
        _push(`<p${ssrRenderAttrs(mergeProps({ class: "mt-2 text-sm text-red-600 dark:text-red-400" }, _attrs))}>${ssrInterpolate(__props.message)}</p>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Form/InputError.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const _sfc_main$N = {
  __name: "TextInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String
    },
    helpText: {
      type: String
    },
    required: {
      type: Boolean
    },
    maxLength: {
      type: Number
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const input = ref(null);
    onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    __expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "form-control w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<div class="label"><span class="label-text">${ssrInterpolate(__props.label)} <span class="text-red-500">${ssrInterpolate(__props.required ? "*" : null)}</span></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("type", __props.type)} class="${ssrRenderClass([{ "file-input file-input-primary w-full": __props.type === "file" }, "input input-bordered input-primary w-full bg-base-300"])}"${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrRenderAttr("maxlength", __props.maxLength)}>`);
      if (__props.helpText) {
        _push(`<div class="label ms-auto pb-0"><span class="label-text-alt">${ssrInterpolate(__props.helpText)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Form/TextInput.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const _sfc_main$M = {
  __name: "Text",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "text"
    },
    to: {
      type: String
    },
    parameter: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const tagType = computed(() => {
      return {
        link: "a",
        text: "p",
        title: "h1",
        subtitle: "h2",
        sub: "span",
        xs: "span"
      }[props.type];
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tagType.value), mergeProps({
        href: __props.type === "link" ? _ctx.route(__props.to, __props.parameter) : null,
        class: {
          "font-bold uppercase text-primary": __props.type === "heading",
          "text-3xl lg:text-4xl": __props.type === "title",
          "text-xl lg:text-2xl": __props.type === "subtitle",
          "text-base lg:text-lg": __props.type === "text",
          "text-sm lg:text-base": __props.type === "sub",
          "text-xs lg:text-sm": __props.type === "xs",
          "link-hover link": __props.type === "link"
        }
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Misc/Text.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const _sfc_main$L = {
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    outline: {
      type: Boolean,
      default: true
    },
    align: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const sizeClass = computed(() => {
      return {
        "5xl": "text-4xl lg:text-5xl",
        "4xl": "text-3xl lg:text-4xl",
        "3xl": "text-2xl lg:text-3xl",
        "2xl": "text-xl lg:text-2xl",
        xl: "text-lg lg:text-xl",
        lg: "text-base lg:text-lg",
        md: "text-sm lg:text-md",
        sm: "text-xs lg:text-sm"
      }[props.size];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ion_icon = resolveComponent("ion-icon");
      _push(ssrRenderComponent(_component_ion_icon, mergeProps({
        name: `${__props.name}${__props.outline ? "-outline" : ""}`,
        class: [sizeClass.value]
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Misc/Icon.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const _sfc_main$K = {
  __name: "Toast",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      required: false
    },
    message: {
      type: String,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const flash = page.props.flash;
    const show = ref(false);
    const iconColor = computed(() => {
      return {
        success: "text-success",
        info: "text-info",
        error: "text-error"
      }[props.type ? props.type : flash.status.class];
    });
    watch(() => {
      if (page.props.flash.status || props.message) {
        show.value = true;
        setTimeout(() => {
          show.value = false;
        }, 5e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (show.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          id: "toast-success",
          class: "fixed bottom-5 right-5 z-50 mb-4 flex max-w-md items-center justify-center rounded-lg bg-base-300 p-4 shadow",
          role: "alert"
        }, _attrs))}><div class="mr-2">`);
        _push(ssrRenderComponent(_sfc_main$L, {
          name: "checkmark-circle",
          size: "2xl",
          class: [iconColor.value]
        }, null, _parent));
        _push(`</div><div class="mr-2">`);
        _push(ssrRenderComponent(_sfc_main$M, null, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.message ? __props.message : unref(flash).status.message)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.message ? __props.message : unref(flash).status.message), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><button type="button" class="btn btn-ghost btn-xs ms-auto" aria-label="Close"><span class="sr-only">Fermer</span>`);
        _push(ssrRenderComponent(_sfc_main$L, {
          name: "close",
          size: "xl"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Misc/Toast.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$J = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden" }, _attrs))}><div class="flex w-[108rem] flex-none justify-end"><picture><source srcset="/images/background/blur.avif" type="image/avif"><img src="/images/background/blur-2.png" alt="" class="w-[71.75rem] max-w-none flex-none dark:hidden" decoding="async" loading="lazy"></picture><picture><source srcset="/images/background/blur-3.avif" type="image/avif"><img src="/images/background/blur-4.png" alt="" class="hidden w-[90rem] max-w-none flex-none dark:block" decoding="async" loading="lazy"></picture></div></div>`);
}
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Partials/BlobBackground.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const BlobBackground = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$I = {
  __name: "Stack",
  __ssrInlineRender: true,
  props: {
    spacing: {
      type: [String, Number],
      default: 4
    }
  },
  setup(__props) {
    const props = __props;
    const size = computed(() => {
      return `space-y-${props.spacing} gap-y-${props.spacing}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: size.value }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</section>`);
    };
  }
};
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Partials/Stack.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const _sfc_main$H = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer mt-6 border-t border-t-primary/10 bg-base-200 p-4 text-neutral-content" }, _attrs))}><div class="mx-auto flex w-full items-center justify-between px-2 lg:w-9/12 lg:px-0"><aside class="grid-flow-col items-center">`);
      _push(ssrRenderComponent(_sfc_main$I, { spacing: "2" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/images/favicon.png" class="w-12 rounded-full" alt=""${_scopeId}><p${_scopeId}>X-Memes © 2023 - Tous droits réservés</p><p${_scopeId}> Développé avec ❤️ par <a class="font-bold" href="https://guillaume-cazin.fr" target="_blank"${_scopeId}>Guillaume</a></p>`);
          } else {
            return [
              createVNode("img", {
                src: "/images/favicon.png",
                class: "w-12 rounded-full",
                alt: ""
              }),
              createVNode("p", null, "X-Memes © 2023 - Tous droits réservés"),
              createVNode("p", null, [
                createTextVNode(" Développé avec ❤️ par "),
                createVNode("a", {
                  class: "font-bold",
                  href: "https://guillaume-cazin.fr",
                  target: "_blank"
                }, "Guillaume")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</aside><nav class="flex gap-4 md:place-self-center md:justify-self-end"><a href="https://twitter.com/gcazinonx" target="_blank" aria-label="X de Guillaume"><img class="w-6" src="/images/misc/x.svg" alt="X de Guillaume"></a></nav></div></footer>`);
    };
  }
};
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Partials/Footer.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const _sfc_main$G = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({ href: __props.href }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown/DropdownLink.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const _sfc_main$F = {
  __name: "Tag",
  __ssrInlineRender: true,
  props: {
    size: {
      type: String,
      default: "md"
    },
    type: {
      type: String,
      default: "primary"
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["badge", {
          "badge-xs": __props.size === "xs",
          "badge-sm": __props.size === "sm",
          "badge-md": __props.size === "md",
          "badge-lg": __props.size === "lg",
          "badge-success": __props.type === "success",
          "badge-warning": __props.type === "warning",
          "badge-primary": __props.type === "primary",
          "badge-secondary": __props.type === "secondary",
          "badge-neutral": __props.type === "neutral",
          "badge-accent": __props.type === "accent",
          "btn-outline": __props.outline
        }]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Misc/Tag.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const _sfc_main$E = {
  __name: "Avatar",
  __ssrInlineRender: true,
  props: {
    size: {
      type: String,
      default: "md",
      required: false
    },
    user: {
      type: Array,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    let avatar = ref(
      props.user.avatar.includes("avatar-placeholder") ? `/images/${props.user.avatar}` : `/storage/${props.user.avatar}`
    );
    const avatarSizeClass = computed(() => {
      return {
        full: "w-96",
        xl: "w-32",
        lg: "w-24",
        md: "w-16",
        sm: "w-8"
      }[props.size];
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "avatar" }, _attrs))}><div class="${ssrRenderClass([avatarSizeClass.value])}"><img${ssrRenderAttr("src", unref(avatar))}${ssrRenderAttr("alt", `Avatar de ${(_a = __props.user) == null ? void 0 : _a.username}`)} class="rounded-lg object-cover"></div></div>`);
    };
  }
};
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/User/Avatar.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
class HelperService {
  constructor() {
    this.props = {};
    this.localStorage = null;
    this.setTheme();
  }
  setProps(props) {
    this.props = props.initialPage.props;
  }
  /**
   * Checks if the user has the specified role(s) based on the stored authentication roles.
   */
  checkRoles(role) {
    var _a;
    const roles = (_a = this.props.auth) == null ? void 0 : _a.roles;
    if (roles) {
      const roleSplitting = role.split(",");
      if (roleSplitting.length > 1) {
        return roleSplitting.some((r2) => {
          return roles.includes(r2);
        });
      } else {
        return roles.includes(role);
      }
    }
  }
  /**
   * Sets the theme based on the stored localStorage.
   */
  setTheme() {
    if (typeof window !== "undefined") {
      if (typeof localStorage.theme !== "undefined") {
        this.storeTheme(localStorage.theme);
      } else {
        this.storeTheme("dark");
      }
    }
  }
  /**
   * Stores the specified theme in localStorage and updates the body's data-theme attribute.
   */
  storeTheme(theme) {
    if (typeof window !== "undefined") {
      const handleTheme = localStorage.getItem(theme) ? theme : "dark";
      document.querySelector("body").setAttribute("data-theme", handleTheme);
      localStorage.setItem("theme", handleTheme);
    }
  }
  /**
   * Formats a value and word into a pluralized string based on the value.
   */
  plural(value, word) {
    return value > 1 ? `${value} ${word}s` : `${value} ${word}`;
  }
}
const HelperService$1 = new HelperService();
const _sfc_main$D = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const menuItems = [
      {
        icon: "images",
        route: "library.image",
        name: "Images"
      },
      {
        icon: "videocam",
        route: "library.video",
        name: "Vidéos"
      },
      {
        icon: "trending-up",
        route: "leaderboard",
        name: "Classement"
      },
      {
        icon: "dice",
        route: "random",
        name: "Au hasard"
      },
      {
        icon: "search",
        route: "search",
        name: "Rechercher"
      }
    ];
    const page = usePage();
    const showNotification = ref(false);
    const messageNotification = ref(null);
    const notifications = computed(() => {
      var _a2;
      return (_a2 = page.props.auth) == null ? void 0 : _a2.notifications;
    });
    if ((_a = page.props.auth) == null ? void 0 : _a.user) {
      Echo.private("App.Models.User." + page.props.auth.user.id).notification(
        (notification) => {
          showNotification.value = true;
          messageNotification.value = notification.title;
        }
      );
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="sticky top-0 z-50 border-b border-slate-100/5 bg-base-100/40 backdrop-blur-xl"><div class="navbar mx-auto w-full px-2 lg:w-9/12 lg:px-0"><div class="navbar-start"><div class="drawer w-auto"><input id="my-drawer" type="checkbox" class="drawer-toggle"><div class="drawer-content"><label for="my-drawer" class="btn btn-ghost lg:hidden">`);
      _push(ssrRenderComponent(_sfc_main$L, {
        name: "menu",
        size: "4xl"
      }, null, _parent));
      _push(`</label></div><div class="drawer-side z-50"><label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label><ul class="menu min-h-full w-60 bg-base-200 p-4"><!--[-->`);
      ssrRenderList(menuItems, (item, index) => {
        _push(`<li><a${ssrRenderAttr("href", _ctx.route(item.route))}${ssrRenderAttr("active", _ctx.route().current(item.route))}>`);
        _push(ssrRenderComponent(_sfc_main$L, {
          name: item.icon,
          size: "sm"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$M, null, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</a></li>`);
      });
      _push(`<!--]-->`);
      if (unref(HelperService$1).checkRoles(
        "super-admin,admin"
      )) {
        _push(`<li><a${ssrRenderAttr("href", _ctx.route("filament.admin.pages.dashboard"))}${ssrRenderAttr("active", _ctx.route().current("admin.dashboard"))}>`);
        _push(ssrRenderComponent(_sfc_main$L, { name: "construct" }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$M, null, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Administration`);
            } else {
              return [
                createTextVNode("Administration")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</a></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></div></div><a${ssrRenderAttr("href", _ctx.route("index"))} class="text-2xl"><div class="flex w-full items-center gap-x-2"><img class="inline w-8 lg:w-12" src="/images/favicon.png" alt="Logo"><span class="text-xl font-bold lg:text-2xl"> X-Memes `);
      _push(ssrRenderComponent(_sfc_main$F, {
        type: "secondary",
        size: "sm",
        class: "hidden align-middle lg:block"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(page).props.stage)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(page).props.stage), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></a></div><div class="navbar-center hidden lg:flex"><ul class="menu menu-horizontal text-lg"><!--[-->`);
      ssrRenderList(menuItems, (item, index) => {
        _push(`<li><a${ssrRenderAttr("href", _ctx.route(item.route))}${ssrRenderAttr("active", _ctx.route().current(item.route))}>`);
        _push(ssrRenderComponent(_sfc_main$L, {
          name: item.icon,
          size: "xl"
        }, null, _parent));
        _push(` ${ssrInterpolate(item.name)}</a></li>`);
      });
      _push(`<!--]-->`);
      if (unref(HelperService$1).checkRoles("super-admin,admin")) {
        _push(`<li><a${ssrRenderAttr("href", _ctx.route("filament.admin.pages.dashboard"))}${ssrRenderAttr("active", _ctx.route().current("admin.dashboard"))}>`);
        _push(ssrRenderComponent(_sfc_main$L, { name: "construct" }, null, _parent));
        _push(` Administration </a></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></div><div class="navbar-end gap-1">`);
      if (!unref(page).props.auth.isConnected) {
        _push(`<!--[--><div class="hidden space-x-1 lg:block"><a class="btn btn-ghost"${ssrRenderAttr("href", _ctx.route("login"))}>Connexion</a><a class="btn btn-primary"${ssrRenderAttr("href", _ctx.route("register"))}>Inscription</a></div><div class="dropdown dropdown-end block lg:hidden"><div tabindex="0" role="button" class="btn btn-circle btn-ghost">`);
        _push(ssrRenderComponent(_sfc_main$L, {
          class: "text-3xl",
          name: "person-circle",
          outline: false
        }, null, _parent));
        _push(`</div><div tabindex="0" class="dropdown-content z-[1] mt-3 w-96 bg-base-100 shadow"><ul class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"><li>`);
        _push(ssrRenderComponent(_sfc_main$G, {
          href: _ctx.route("login")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Connexion `);
            } else {
              return [
                createTextVNode(" Connexion ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(_sfc_main$G, {
          href: _ctx.route("register")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Inscription `);
            } else {
              return [
                createTextVNode(" Inscription ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul></div></div><!--]-->`);
      } else {
        _push(`<!--[--><a tabindex="0" role="button" class="flex items-center lg:hidden" aria-labelledby="Search"${ssrRenderAttr("href", _ctx.route("search"))}>`);
        _push(ssrRenderComponent(_sfc_main$L, {
          size: "xl",
          name: "search"
        }, null, _parent));
        _push(`</a><div class="dropdown dropdown-end"><div tabindex="0" role="button" class="btn btn-circle btn-ghost" aria-labelledby="Notifications"><div class="indicator">`);
        _push(ssrRenderComponent(_sfc_main$L, {
          size: "xl",
          name: "notifications"
        }, null, _parent));
        if (notifications.value.length) {
          _push(`<span class="badge indicator-item badge-error badge-sm">${ssrInterpolate(notifications.value.length)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div tabindex="0" class="dropdown-content z-[1] mt-3 w-80 rounded-b bg-base-100 shadow lg:w-96">`);
        if (notifications.value.length) {
          _push(`<!--[-->`);
          ssrRenderList(notifications.value.slice(0, 5), (notification, index) => {
            _push(`<div class="divide-y divide-base-100"><a${ssrRenderAttr(
              "href",
              _ctx.route(
                "notification.show",
                notification.id
              )
            )} class="flex px-4 py-3 hover:bg-base-200"><div class="flex-shrink-0">`);
            if (notification.type.includes(
              "NewUserNotification"
            )) {
              _push(ssrRenderComponent(_sfc_main$E, {
                user: notification.data.content,
                class: "!w-10"
              }, null, _parent));
            } else {
              _push(`<img class="w-10 rounded"${ssrRenderAttr("src", `/storage/${notification.data.content.path}`)} alt="Jese image">`);
            }
            _push(`</div><div class="w-full ps-3"><div class="mb-1 text-sm font-bold">${ssrInterpolate(notification.data.title)}</div><div class="text-xs text-primary">${ssrInterpolate(notification.formatted_created_at)}</div></div></a></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<div><p class="p-4"> Aucune notification à afficher </p></div>`);
        }
        _push(`<a${ssrRenderAttr("href", _ctx.route("notification.index"))} class="flex items-center justify-center rounded-b bg-base-300 py-2 text-center hover:bg-base-200">`);
        _push(ssrRenderComponent(_sfc_main$L, {
          name: "eye",
          class: "mr-1"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$M, { type: "xs" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Voir toutes les notifications (${ssrInterpolate(notifications.value.length)}) `);
            } else {
              return [
                createTextVNode(" Voir toutes les notifications (" + toDisplayString(notifications.value.length) + ") ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</a></div></div><div class="dropdown dropdown-end"><div tabindex="0" role="button" class="btn btn-ghost">`);
        _push(ssrRenderComponent(_sfc_main$E, {
          user: _ctx.$page.props.auth.user,
          size: "sm"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$M, {
          class: "hidden lg:inline",
          type: "sub"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$page.props.auth.user.username)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$page.props.auth.user.username), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div tabindex="0" class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"><ul><li>`);
        _push(ssrRenderComponent(_sfc_main$G, {
          href: _ctx.route(
            "user.show",
            _ctx.$page.props.auth.user.username
          )
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$L, {
                name: "person",
                size: "lg"
              }, null, _parent2, _scopeId));
              _push2(` Voir mon profil `);
            } else {
              return [
                createVNode(_sfc_main$L, {
                  name: "person",
                  size: "lg"
                }),
                createTextVNode(" Voir mon profil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(_sfc_main$G, {
          href: _ctx.route("profile.edit")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$L, {
                name: "cog",
                size: "lg"
              }, null, _parent2, _scopeId));
              _push2(` Paramètres `);
            } else {
              return [
                createVNode(_sfc_main$L, {
                  name: "cog",
                  size: "lg"
                }),
                createTextVNode(" Paramètres ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(_sfc_main$G, {
          href: _ctx.route("logout"),
          method: "post"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$L, {
                name: "log-out",
                size: "lg"
              }, null, _parent2, _scopeId));
              _push2(` Déconnexion `);
            } else {
              return [
                createVNode(_sfc_main$L, {
                  name: "log-out",
                  size: "lg"
                }),
                createTextVNode(" Déconnexion ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul></div></div><!--]-->`);
      }
      _push(`</div></div></div>`);
      if (showNotification.value) {
        _push(ssrRenderComponent(_sfc_main$K, {
          type: "success",
          message: messageNotification.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Partials/Navbar.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const _sfc_main$C = {
  __name: "PageLayout",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: false
    },
    isFullSize: {
      type: Boolean,
      default: false
    },
    hasHeader: {
      type: Boolean,
      default: true
    },
    hasNavbar: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const page = usePage();
    const props = page.props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: __props.title }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(props).og) {
              _push2(`<!--[--><meta property="og:url"${ssrRenderAttr("content", unref(props).og.url)}${_scopeId}><meta property="og:type" content="website"${_scopeId}><meta property="og:title"${ssrRenderAttr("content", unref(props).og.title)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", unref(props).seo.description)}${_scopeId}><meta property="og:image"${ssrRenderAttr("content", unref(props).og.image)}${_scopeId}><meta name="twitter:card" content="summary_large_image"${_scopeId}><meta property="twitter:domain" content="x-memes.com"${_scopeId}><meta property="twitter:url"${ssrRenderAttr("content", unref(props).og.url)}${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", unref(props).og.title)}${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", unref(props).seo.description)}${_scopeId}><meta name="twitter:image"${ssrRenderAttr("content", unref(props).og.image)}${_scopeId}><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta head-key="description" name="description"${ssrRenderAttr("content", unref(props).seo.description)}${_scopeId}>`);
          } else {
            return [
              unref(props).og ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("meta", {
                  property: "og:url",
                  content: unref(props).og.url
                }, null, 8, ["content"]),
                createVNode("meta", {
                  property: "og:type",
                  content: "website"
                }),
                createVNode("meta", {
                  property: "og:title",
                  content: unref(props).og.title
                }, null, 8, ["content"]),
                createVNode("meta", {
                  property: "og:description",
                  content: unref(props).seo.description
                }, null, 8, ["content"]),
                createVNode("meta", {
                  property: "og:image",
                  content: unref(props).og.image
                }, null, 8, ["content"]),
                createVNode("meta", {
                  name: "twitter:card",
                  content: "summary_large_image"
                }),
                createVNode("meta", {
                  property: "twitter:domain",
                  content: "x-memes.com"
                }),
                createVNode("meta", {
                  property: "twitter:url",
                  content: unref(props).og.url
                }, null, 8, ["content"]),
                createVNode("meta", {
                  name: "twitter:title",
                  content: unref(props).og.title
                }, null, 8, ["content"]),
                createVNode("meta", {
                  name: "twitter:description",
                  content: unref(props).seo.description
                }, null, 8, ["content"]),
                createVNode("meta", {
                  name: "twitter:image",
                  content: unref(props).og.image
                }, null, 8, ["content"])
              ], 64)) : createCommentVNode("", true),
              createVNode("meta", {
                "head-key": "description",
                name: "description",
                content: unref(props).seo.description
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative min-h-screen bg-base-100 pb-6" style="${ssrRenderStyle({ "background": "url(/images/background/noise.webp)" })}"><div class="relative z-50 bg-base-300 px-2 py-2 lg:px-0"><div class="text-center">`);
      _push(ssrRenderComponent(_sfc_main$M, { type: "sub" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Le site est actuellement au stade <span class="font-bold"${_scopeId}>d&#39;alpha</span>. Si vous rencontrez des bugs, ou si vous avez une suggestion, contactez-moi sur <a class="link link-secondary font-bold" href="https://x.com/gcazinonx" target="_blank"${_scopeId}> @gcazinonx</a>. `);
          } else {
            return [
              createTextVNode(" Le site est actuellement au stade "),
              createVNode("span", { class: "font-bold" }, "d'alpha"),
              createTextVNode(". Si vous rencontrez des bugs, ou si vous avez une suggestion, contactez-moi sur "),
              createVNode("a", {
                class: "link link-secondary font-bold",
                href: "https://x.com/gcazinonx",
                target: "_blank"
              }, " @gcazinonx"),
              createTextVNode(". ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (__props.hasNavbar) {
        _push(ssrRenderComponent(_sfc_main$D, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(BlobBackground, null, null, _parent));
      if (__props.hasHeader) {
        _push(`<header><div class="mx-auto px-4 py-6 lg:w-9/12 lg:px-0"><div class="flex"><div class="flex-1 gap-2">`);
        if (_ctx.$slots.title) {
          _push(`<div class="flex gap-2"><h1 class="text-2xl font-semibold leading-tight">${ssrInterpolate(__props.title)}</h1>`);
          ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
          _push(`</div>`);
        } else {
          _push(`<h1 class="text-2xl font-semibold leading-tight">${ssrInterpolate(__props.title)}</h1>`);
        }
        if (_ctx.$slots.subtitle) {
          _push(`<div class="mt-2">`);
          ssrRenderSlot(_ctx.$slots, "subtitle", {}, null, _push, _parent);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (((_a = _ctx.$page.props.auth) == null ? void 0 : _a.isConnected) && _ctx.$slots.action) {
          _push(`<div class="flex-1 text-right">`);
          ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="${ssrRenderClass([__props.isFullSize ? "w-full" : "mx-auto px-4 lg:w-9/12 lg:px-0", "relative"])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
      _push(ssrRenderComponent(_sfc_main$H, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$K, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/PageLayout.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const _sfc_main$B = {
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      password: ""
    });
    const submit = () => {
      form.post(route("password.confirm"), {
        onFinish: () => form.reset()
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$C, mergeProps({ title: "Confirmation du mot de passe" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> This is a secure area of the application. Please confirm your password before continuing. </div><form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$N, {
              label: "Mot de passe",
              type: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$O, {
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 flex justify-end"${_scopeId}><button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-primary ms-4"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Confirm </button></div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-gray-600 dark:text-gray-400" }, " This is a secure area of the application. Please confirm your password before continuing. "),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$N, {
                    label: "Mot de passe",
                    type: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$O, {
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 flex justify-end" }, [
                  createVNode("button", {
                    class: ["btn btn-primary ms-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, " Confirm ", 10, ["disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$B
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$A = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "primary",
      required: false
    },
    outline: {
      type: Boolean,
      default: false,
      required: false
    },
    circle: {
      type: Boolean,
      default: false,
      required: false
    },
    size: {
      type: String,
      default: "md",
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    submit: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const buttonColor = () => {
      return {
        primary: "btn-primary",
        secondary: "btn-secondary",
        error: "btn-error",
        info: "btn-info"
      }[props.type];
    };
    const buttonSize = () => {
      return {
        lg: "btn-lg",
        md: "",
        sm: "btn-sm"
      }[props.size];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.submit ? "submit" : "button",
        class: ["btn", [
          buttonColor(),
          {
            "btn-outline": __props.outline,
            "btn-disabled": __props.disabled,
            "btn-circle": __props.circle
          },
          buttonSize()
        ]]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Button/Button.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const _sfc_main$z = {
  __name: "LoadingButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "primary"
    },
    loading: {
      type: Boolean
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$A, mergeProps({
        submit: "",
        disabled: __props.loading
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.loading) {
              _push2(`<span class="loading loading-spinner"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              __props.loading ? (openBlock(), createBlock("span", {
                key: 0,
                class: "loading loading-spinner"
              })) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Button/LoadingButton.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const _sfc_main$y = {
  __name: "Section",
  __ssrInlineRender: true,
  props: {
    hasBackground: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["z-10 mb-4 rounded-lg px-4 py-2 lg:px-6 lg:py-4", __props.hasBackground ? "bg-base-200 shadow-lg" : ""]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</section>`);
    };
  }
};
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Partials/Section.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const _sfc_main$x = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const form = useForm({
      email: ""
    });
    const submit = () => {
      form.post(route("password.email"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$C, mergeProps({ title: "Mot de passe oublié" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$y, null, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$M, null, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Tu as oublié ton mot de passe ? Pas de problème. Indique-nous ton adresse mail et on t&#39;enverra un email qui te permettra d&#39;en choisir un nouveau. `);
                      } else {
                        return [
                          createTextVNode(" Tu as oublié ton mot de passe ? Pas de problème. Indique-nous ton adresse mail et on t'enverra un email qui te permettra d'en choisir un nouveau. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (__props.status) {
                    _push3(`<div class="mb-4 text-sm font-medium text-green-600 dark:text-green-400"${_scopeId2}>${ssrInterpolate(__props.status)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<form${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$N, {
                    label: "Adresse mail",
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$O, {
                    message: unref(form).errors.email
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-4 flex items-center justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$z, {
                    loading: unref(form).processing,
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Recevoir le mail `);
                      } else {
                        return [
                          createTextVNode(" Recevoir le mail ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode(_sfc_main$M, null, {
                      default: withCtx(() => [
                        createTextVNode(" Tu as oublié ton mot de passe ? Pas de problème. Indique-nous ton adresse mail et on t'enverra un email qui te permettra d'en choisir un nouveau. ")
                      ]),
                      _: 1
                    }),
                    __props.status ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-4 text-sm font-medium text-green-600 dark:text-green-400"
                    }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode(_sfc_main$N, {
                        label: "Adresse mail",
                        id: "email",
                        type: "email",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: "",
                        autofocus: "",
                        autocomplete: "username"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.email
                      }, null, 8, ["message"]),
                      createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                        createVNode(_sfc_main$z, {
                          loading: unref(form).processing,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Recevoir le mail ")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$y, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$M, null, {
                    default: withCtx(() => [
                      createTextVNode(" Tu as oublié ton mot de passe ? Pas de problème. Indique-nous ton adresse mail et on t'enverra un email qui te permettra d'en choisir un nouveau. ")
                    ]),
                    _: 1
                  }),
                  __props.status ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4 text-sm font-medium text-green-600 dark:text-green-400"
                  }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode(_sfc_main$N, {
                      label: "Adresse mail",
                      id: "email",
                      type: "email",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      required: "",
                      autofocus: "",
                      autocomplete: "username"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$O, {
                      message: unref(form).errors.email
                    }, null, 8, ["message"]),
                    createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                      createVNode(_sfc_main$z, {
                        loading: unref(form).processing,
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Recevoir le mail ")
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
                    ])
                  ], 32)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$x
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$w = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      required: true
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "checkbox-primary checkbox checkbox-sm"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Form/Checkbox.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    const form = useForm({
      username: "",
      password: "",
      remember: true
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$C, mergeProps({ title: "Connexion" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$y, null, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$N, {
                    label: "Nom d'utilisateur / Adresse e-mail",
                    id: "username",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).username,
                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$O, {
                    message: unref(form).errors.username
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$N, {
                    label: "Mot de passe",
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$O, {
                    message: unref(form).errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-4 block"${_scopeId2}><label class="flex items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$w, {
                    name: "remember",
                    checked: unref(form).remember,
                    "onUpdate:checked": ($event) => unref(form).remember = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="ms-2 text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>Se souvenir de moi</span></label></div><div class="mt-4 flex items-center justify-end"${_scopeId2}>`);
                  if (__props.canResetPassword) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: _ctx.route("password.request"),
                      class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    }, {
                      default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Mot de passe oublié? `);
                        } else {
                          return [
                            createTextVNode(" Mot de passe oublié? ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_sfc_main$z, {
                    class: "ms-4",
                    disabled: unref(form).processing,
                    loading: unref(form).processing
                  }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Connexion `);
                      } else {
                        return [
                          createTextVNode(" Connexion ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode(_sfc_main$N, {
                        label: "Nom d'utilisateur / Adresse e-mail",
                        id: "username",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).username,
                        "onUpdate:modelValue": ($event) => unref(form).username = $event,
                        required: "",
                        autofocus: "",
                        autocomplete: "username"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.username
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$N, {
                        label: "Mot de passe",
                        id: "password",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: "",
                        autocomplete: "current-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.password
                      }, null, 8, ["message"]),
                      createVNode("div", { class: "mt-4 block" }, [
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode(_sfc_main$w, {
                            name: "remember",
                            checked: unref(form).remember,
                            "onUpdate:checked": ($event) => unref(form).remember = $event
                          }, null, 8, ["checked", "onUpdate:checked"]),
                          createVNode("span", { class: "ms-2 text-sm text-gray-600 dark:text-gray-400" }, "Se souvenir de moi")
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                        __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: _ctx.route("password.request"),
                          class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Mot de passe oublié? ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        createVNode(_sfc_main$z, {
                          class: "ms-4",
                          disabled: unref(form).processing,
                          loading: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Connexion ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "loading"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$y, null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode(_sfc_main$N, {
                      label: "Nom d'utilisateur / Adresse e-mail",
                      id: "username",
                      type: "text",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).username,
                      "onUpdate:modelValue": ($event) => unref(form).username = $event,
                      required: "",
                      autofocus: "",
                      autocomplete: "username"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$O, {
                      message: unref(form).errors.username
                    }, null, 8, ["message"]),
                    createVNode(_sfc_main$N, {
                      label: "Mot de passe",
                      id: "password",
                      type: "password",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      required: "",
                      autocomplete: "current-password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$O, {
                      message: unref(form).errors.password
                    }, null, 8, ["message"]),
                    createVNode("div", { class: "mt-4 block" }, [
                      createVNode("label", { class: "flex items-center" }, [
                        createVNode(_sfc_main$w, {
                          name: "remember",
                          checked: unref(form).remember,
                          "onUpdate:checked": ($event) => unref(form).remember = $event
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("span", { class: "ms-2 text-sm text-gray-600 dark:text-gray-400" }, "Se souvenir de moi")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                      __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: _ctx.route("password.request"),
                        class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Mot de passe oublié? ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true),
                      createVNode(_sfc_main$z, {
                        class: "ms-4",
                        disabled: unref(form).processing,
                        loading: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Connexion ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "loading"])
                    ])
                  ], 32)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$v
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$u = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$C, mergeProps({ title: "Inscription" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex w-full flex-col gap-4 lg:flex-row lg:gap-x-16"${_scopeId}><div class="order-1 w-full lg:w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$I, { spacing: "4" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$M, { type: "subtitle" }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Principales fonctionnalités`);
                      } else {
                        return [
                          createTextVNode("Principales fonctionnalités")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$I, { spacing: "2" }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$M, { class: "space-x-2" }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$L, {
                                name: "apps",
                                size: "xl"
                              }, null, _parent5, _scopeId4));
                              _push5(`<span${_scopeId4}>Avoir accès à la totalité des mèmes présent sur le site.</span>`);
                            } else {
                              return [
                                createVNode(_sfc_main$L, {
                                  name: "apps",
                                  size: "xl"
                                }),
                                createVNode("span", null, "Avoir accès à la totalité des mèmes présent sur le site.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$M, { class: "space-x-2" }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$L, {
                                name: "search",
                                size: "xl"
                              }, null, _parent5, _scopeId4));
                              _push5(`<span${_scopeId4}>Enfin trouver les mèmes que tu mets si longtemps à retrouver.</span>`);
                            } else {
                              return [
                                createVNode(_sfc_main$L, {
                                  name: "search",
                                  size: "xl"
                                }),
                                createVNode("span", null, "Enfin trouver les mèmes que tu mets si longtemps à retrouver.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$M, { class: "space-x-2" }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$L, {
                                name: "heart",
                                size: "xl"
                              }, null, _parent5, _scopeId4));
                              _push5(`<span${_scopeId4}>Pouvoir aimer tes mèmes préférés pour ne plus jamais les perdre.</span>`);
                            } else {
                              return [
                                createVNode(_sfc_main$L, {
                                  name: "heart",
                                  size: "xl"
                                }),
                                createVNode("span", null, "Pouvoir aimer tes mèmes préférés pour ne plus jamais les perdre.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$M, { class: "space-x-2" }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$L, {
                                name: "person-add",
                                size: "xl"
                              }, null, _parent5, _scopeId4));
                              _push5(`<span${_scopeId4}>Suivre les personnes que tu préfères.</span>`);
                            } else {
                              return [
                                createVNode(_sfc_main$L, {
                                  name: "person-add",
                                  size: "xl"
                                }),
                                createVNode("span", null, "Suivre les personnes que tu préfères.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$M, { class: "space-x-2" }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$L, {
                                name: "bar-chart",
                                size: "xl"
                              }, null, _parent5, _scopeId4));
                              _push5(`<span${_scopeId4}>Un classement des personnes les plus actives</span>`);
                            } else {
                              return [
                                createVNode(_sfc_main$L, {
                                  name: "bar-chart",
                                  size: "xl"
                                }),
                                createVNode("span", null, "Un classement des personnes les plus actives")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$M, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$L, {
                                name: "apps",
                                size: "xl"
                              }),
                              createVNode("span", null, "Avoir accès à la totalité des mèmes présent sur le site.")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$M, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$L, {
                                name: "search",
                                size: "xl"
                              }),
                              createVNode("span", null, "Enfin trouver les mèmes que tu mets si longtemps à retrouver.")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$M, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$L, {
                                name: "heart",
                                size: "xl"
                              }),
                              createVNode("span", null, "Pouvoir aimer tes mèmes préférés pour ne plus jamais les perdre.")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$M, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$L, {
                                name: "person-add",
                                size: "xl"
                              }),
                              createVNode("span", null, "Suivre les personnes que tu préfères.")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$M, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$L, {
                                name: "bar-chart",
                                size: "xl"
                              }),
                              createVNode("span", null, "Un classement des personnes les plus actives")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$M, { type: "subtitle" }, {
                      default: withCtx(() => [
                        createTextVNode("Principales fonctionnalités")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$I, { spacing: "2" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$M, { class: "space-x-2" }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              name: "apps",
                              size: "xl"
                            }),
                            createVNode("span", null, "Avoir accès à la totalité des mèmes présent sur le site.")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$M, { class: "space-x-2" }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              name: "search",
                              size: "xl"
                            }),
                            createVNode("span", null, "Enfin trouver les mèmes que tu mets si longtemps à retrouver.")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$M, { class: "space-x-2" }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              name: "heart",
                              size: "xl"
                            }),
                            createVNode("span", null, "Pouvoir aimer tes mèmes préférés pour ne plus jamais les perdre.")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$M, { class: "space-x-2" }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              name: "person-add",
                              size: "xl"
                            }),
                            createVNode("span", null, "Suivre les personnes que tu préfères.")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$M, { class: "space-x-2" }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              name: "bar-chart",
                              size: "xl"
                            }),
                            createVNode("span", null, "Un classement des personnes les plus actives")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$y, { class: "w-full lg:order-1 lg:flex-1" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$N, {
                    label: "Nom d'utilisateur",
                    id: "username",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).username,
                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$O, {
                    message: unref(form).errors.username
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$N, {
                    label: "Adresse email",
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autocomplete: "email"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$O, {
                    message: unref(form).errors.email
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$N, {
                    label: "Mot de passe",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$O, {
                    message: unref(form).errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$N, {
                    label: "Confirmation du mot de passe",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$O, {
                    message: unref(form).errors.password_confirmation
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-4 flex items-center justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("login"),
                    class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                  }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Déjà inscrit? `);
                      } else {
                        return [
                          createTextVNode(" Déjà inscrit? ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-primary ms-4"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId2}> S&#39;inscrire </button></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode(_sfc_main$N, {
                        label: "Nom d'utilisateur",
                        id: "username",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).username,
                        "onUpdate:modelValue": ($event) => unref(form).username = $event,
                        required: "",
                        autofocus: "",
                        autocomplete: "username"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.username
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$N, {
                        label: "Adresse email",
                        id: "email",
                        type: "email",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: "",
                        autocomplete: "email"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.email
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$N, {
                        label: "Mot de passe",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: "",
                        autocomplete: "new-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.password
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$N, {
                        label: "Confirmation du mot de passe",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password_confirmation,
                        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                        required: "",
                        autocomplete: "new-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.password_confirmation
                      }, null, 8, ["message"]),
                      createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("login"),
                          class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Déjà inscrit? ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          class: ["btn btn-primary ms-4", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, " S'inscrire ", 10, ["disabled"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex w-full flex-col gap-4 lg:flex-row lg:gap-x-16" }, [
                createVNode("div", { class: "order-1 w-full lg:w-1/3" }, [
                  createVNode(_sfc_main$I, { spacing: "4" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$M, { type: "subtitle" }, {
                        default: withCtx(() => [
                          createTextVNode("Principales fonctionnalités")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$I, { spacing: "2" }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$M, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$L, {
                                name: "apps",
                                size: "xl"
                              }),
                              createVNode("span", null, "Avoir accès à la totalité des mèmes présent sur le site.")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$M, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$L, {
                                name: "search",
                                size: "xl"
                              }),
                              createVNode("span", null, "Enfin trouver les mèmes que tu mets si longtemps à retrouver.")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$M, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$L, {
                                name: "heart",
                                size: "xl"
                              }),
                              createVNode("span", null, "Pouvoir aimer tes mèmes préférés pour ne plus jamais les perdre.")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$M, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$L, {
                                name: "person-add",
                                size: "xl"
                              }),
                              createVNode("span", null, "Suivre les personnes que tu préfères.")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$M, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$L, {
                                name: "bar-chart",
                                size: "xl"
                              }),
                              createVNode("span", null, "Un classement des personnes les plus actives")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_sfc_main$y, { class: "w-full lg:order-1 lg:flex-1" }, {
                  default: withCtx(() => [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode(_sfc_main$N, {
                        label: "Nom d'utilisateur",
                        id: "username",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).username,
                        "onUpdate:modelValue": ($event) => unref(form).username = $event,
                        required: "",
                        autofocus: "",
                        autocomplete: "username"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.username
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$N, {
                        label: "Adresse email",
                        id: "email",
                        type: "email",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: "",
                        autocomplete: "email"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.email
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$N, {
                        label: "Mot de passe",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: "",
                        autocomplete: "new-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.password
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$N, {
                        label: "Confirmation du mot de passe",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password_confirmation,
                        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                        required: "",
                        autocomplete: "new-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$O, {
                        message: unref(form).errors.password_confirmation
                      }, null, 8, ["message"]),
                      createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("login"),
                          class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Déjà inscrit? ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          class: ["btn btn-primary ms-4", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, " S'inscrire ", 10, ["disabled"])
                      ])
                    ], 32)
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$u
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$t = {
  __name: "InputLabel",
  __ssrInlineRender: true,
  props: {
    value: {
      type: String
    },
    required: {
      type: Boolean
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300" }, _attrs))}>`);
      if (__props.value) {
        _push(`<span>${ssrInterpolate(__props.value)} <span class="text-red-500">${ssrInterpolate(__props.required ? "*" : null)}</span></span>`);
      } else {
        _push(`<span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Form/InputLabel.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const _sfc_main$s = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("password.store"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$C, mergeProps({ title: "Reset mot de passe" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$t, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$N, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$O, {
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$t, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$N, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$O, {
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$t, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$N, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$O, {
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 flex items-center justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$z, {
              loading: unref(form).processing
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Réinitialiser le mot de passe `);
                } else {
                  return [
                    createTextVNode(" Réinitialiser le mot de passe ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$t, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$N, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$O, {
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$t, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$N, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$O, {
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$t, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  createVNode(_sfc_main$N, {
                    id: "password_confirmation",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$O, {
                    message: unref(form).errors.password_confirmation
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                  createVNode(_sfc_main$z, {
                    loading: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Réinitialiser le mot de passe ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const submit = () => {
      form.post(route("verification.send"));
    };
    const verificationLinkSent = computed(
      () => props.status === "verification-link-sent"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$C, mergeProps({ title: "Vérification email" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Merci de vous être inscrit ! Avant de commencer, pourriez-vous vérifier votre adresse électronique en cliquant sur le lien que nous venons de vous envoyer par courrier électronique ? Si vous n&#39;avez pas reçu l&#39;e-mail, nous vous en enverrons un autre avec plaisir. </div>`);
            if (verificationLinkSent.value) {
              _push2(`<div class="mb-4 text-sm font-medium text-green-600 dark:text-green-400"${_scopeId}> Un nouveau lien de vérification a été envoyé à l&#39;adresse électronique que vous avez fournie lors de votre inscription. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="mt-4 flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$z, {
              loading: unref(form).processing
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Renvoyer l&#39;e-mail de vérification `);
                } else {
                  return [
                    createTextVNode(" Renvoyer l'e-mail de vérification ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Déconnexion`);
                } else {
                  return [
                    createTextVNode("Déconnexion")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-gray-600 dark:text-gray-400" }, " Merci de vous être inscrit ! Avant de commencer, pourriez-vous vérifier votre adresse électronique en cliquant sur le lien que nous venons de vous envoyer par courrier électronique ? Si vous n'avez pas reçu l'e-mail, nous vous en enverrons un autre avec plaisir. "),
              verificationLinkSent.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-sm font-medium text-green-600 dark:text-green-400"
              }, " Un nouveau lien de vérification a été envoyé à l'adresse électronique que vous avez fournie lors de votre inscription. ")) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                  createVNode(_sfc_main$z, {
                    loading: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Renvoyer l'e-mail de vérification ")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("logout"),
                    method: "post",
                    as: "button",
                    class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Déconnexion")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$r
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = {
  __name: "Error",
  __ssrInlineRender: true,
  props: { status: Number },
  setup(__props) {
    const props = __props;
    const description = computed(() => {
      return {
        503: "Désolé, nous effectuons des travaux de maintenance. Veuillez revenir bientôt.",
        500: "Oups, un problème est survenu sur nos serveurs.",
        404: "Désolé, la page que vous recherchez n'a pu être trouvée.",
        403: "Désolé, l'accès à cette page vous est interdit."
      }[props.status];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: __props.status }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$C, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mt-16 text-center lg:mt-32"${_scopeId}><h1 class="text-9xl font-black"${_scopeId}>${ssrInterpolate(__props.status)}</h1><p class="text-2xl font-bold tracking-tight sm:text-4xl"${_scopeId}>Oops!</p><p class="mt-4"${_scopeId}>${ssrInterpolate(description.value)}</p><a${ssrRenderAttr("href", _ctx.route("index"))} class="btn btn-primary mt-4"${_scopeId}> Retour à l&#39;accueil </a></div>`);
          } else {
            return [
              createVNode("div", { class: "mt-16 text-center lg:mt-32" }, [
                createVNode("h1", { class: "text-9xl font-black" }, toDisplayString(__props.status), 1),
                createVNode("p", { class: "text-2xl font-bold tracking-tight sm:text-4xl" }, "Oops!"),
                createVNode("p", { class: "mt-4" }, toDisplayString(description.value), 1),
                createVNode("a", {
                  href: _ctx.route("index"),
                  class: "btn btn-primary mt-4"
                }, " Retour à l'accueil ", 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$q
}, Symbol.toStringTag, { value: "Module" }));
class FormService {
  constructor() {
    this.form = null;
    this.routeName = null;
    this.props = null;
    this.modalName = null;
    return this;
  }
  setProps(props) {
    this.props = props.initialPage.props;
    return this;
  }
  setForm(form) {
    this.form = form;
    return this;
  }
  setModalName(name) {
    this.modalName = name;
    return this;
  }
  setRouteName(routeName) {
    this.routeName = routeName;
    return this;
  }
  setProperties(item) {
    console.log(this.form);
    Object.keys(this.form.data()).map((property) => {
      if (property in item) {
        if (Array.isArray(item[property])) {
          this.form[property] = item[property].map((p2) => p2.name);
        } else {
          this.form[property] = item[property];
        }
      }
    });
  }
  getRouteName() {
    return this.routeName;
  }
  openModal(name, item = null) {
    let selector = this.handleSelector(name, item);
    this.setModalName(selector);
    if (item) {
      this.setProperties(item);
    }
    document.querySelector(this.modalName).showModal();
  }
  closeModal() {
    const modal = document.querySelector(this.modalName);
    if (modal) {
      modal.close();
    }
    if (this.form) {
      this.form.reset().clearErrors();
    }
  }
  handleSelector(name, item = null) {
    let selector = `#${name}Modal`;
    if (item) {
      selector = `#${name}Modal${item.id}`;
    }
    return selector;
  }
  handle(action, item = null, method = "put") {
    const routeName = this.getRouteName();
    switch (action) {
      case "store":
        this.form.post(route(`${routeName}.store`), {
          preserveScroll: true,
          onSuccess: () => {
            this.closeModal();
          }
        });
        break;
      case "update":
        this.form.put(route(`${routeName}.update`, item == null ? void 0 : item.id), {
          preserveScroll: true,
          onSuccess: () => this.closeModal()
        });
        break;
      case "destroy":
        this.form.delete(route(`${routeName}.destroy`, item == null ? void 0 : item.id), {
          preserveScroll: true,
          onBefore: () => confirm("Es-tu sûr de supprimer cet élément ?")
        });
        break;
      case action:
        this.form[method](
          route(
            routeName ? `${routeName}.${action}` : action,
            item == null ? void 0 : item.id
          ),
          {
            preserveScroll: true,
            onSuccess: () => this.closeModal()
          }
        );
    }
  }
}
const FormService$1 = new FormService();
const _sfc_main$p = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    stage: {
      type: String
    },
    waitlist: {
      type: Array
    }
  },
  setup(__props) {
    const form = useForm({
      email: null
    });
    FormService$1.setForm(form).setRouteName("waitlist");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Accueil" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$C, { "is-full-size": "" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="hero relative flex flex-col justify-center dark:border-b dark:border-slate-100/5 dark:bg-bottom"${_scopeId}><div class="hero-content pt-12 text-center lg:pt-24"${_scopeId}><div class="flex flex-col"${_scopeId}><img class="mask mask-squircle mx-auto mb-8 w-32 shadow" src="images/favicon-with-background.jpg" alt=""${_scopeId}><h1 class="text-3xl font-bold lg:text-5xl"${_scopeId}> La plateforme qui te permet de retrouver tes mèmes préférés! </h1><p class="py-6 lg:text-xl"${_scopeId}> X-Memes est une plateforme où tu peux t&#39;inscrire, publier et voir les mèmes que la communauté a posté. </p><div class="space-x-2"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("library.image"))} class="btn btn-primary btn-lg"${_scopeId}> Découvrir </a><a${ssrRenderAttr("href", _ctx.route("login"))} class="btn btn-outline btn-primary btn-lg"${_scopeId}> Se connecter </a></div></div></div><div class="w-full px-4"${_scopeId}><div class="wow fadeInUp relative z-10 mx-auto max-w-[850px]" data-wow-delay=".25s" style="${ssrRenderStyle({ "visibility": "visible", "animation-delay": "0.25s" })}"${_scopeId}><div class="mt-16"${_scopeId}><img src="/images/home.png" alt="hero" class="mx-auto max-w-full"${_scopeId}></div><div class="absolute -left-9 bottom-0 z-[-1]"${_scopeId}><img src="/images/misc/blob.svg" alt=""${_scopeId}></div><div class="absolute -right-6 -top-6 z-[-1]"${_scopeId}><img src="/images/misc/blob.svg" alt=""${_scopeId}></div></div></div></div><div class="relative bg-base-300 px-8 pb-16 pt-20 text-center lg:px-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$I, null, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="font-bold uppercase text-primary"${_scopeId2}>Services</p><h2 class="text-4xl"${_scopeId2}>Fonctionnalités</h2><p class="text-xl"${_scopeId2}> X-Memes t&#39;offre une variété de fonctionnalités te permettant de poster, télécharger et suivre les personnes que tu aimes. </p><div class="mx-auto grid grid-cols-1 gap-16 py-16 lg:w-9/12 lg:grid-cols-5"${_scopeId2}><div class="flex-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$I, null, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$L, {
                          class: "rounded-full bg-primary p-4",
                          size: "5xl",
                          name: "add"
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xl"${_scopeId3}>Poste tes mèmes préférés.</p>`);
                      } else {
                        return [
                          createVNode(_sfc_main$L, {
                            class: "rounded-full bg-primary p-4",
                            size: "5xl",
                            name: "add"
                          }),
                          createVNode("p", { class: "text-xl" }, "Poste tes mèmes préférés.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$I, null, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$L, {
                          class: "rounded-full bg-primary p-4",
                          size: "5xl",
                          name: "image"
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xl"${_scopeId3}> Retrouve tes mèmes préférés à un seul et même endroit. </p>`);
                      } else {
                        return [
                          createVNode(_sfc_main$L, {
                            class: "rounded-full bg-primary p-4",
                            size: "5xl",
                            name: "image"
                          }),
                          createVNode("p", { class: "text-xl" }, " Retrouve tes mèmes préférés à un seul et même endroit. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$I, null, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$L, {
                          class: "rounded-full bg-primary p-4",
                          size: "5xl",
                          name: "eye"
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xl"${_scopeId3}> Suis les personnes que tu as envie. </p>`);
                      } else {
                        return [
                          createVNode(_sfc_main$L, {
                            class: "rounded-full bg-primary p-4",
                            size: "5xl",
                            name: "eye"
                          }),
                          createVNode("p", { class: "text-xl" }, " Suis les personnes que tu as envie. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$I, null, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$L, {
                          class: "rounded-full bg-primary p-4",
                          size: "5xl",
                          name: "diamond"
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xl"${_scopeId3}> Des badges décernés en fonction de ton activité sur le site. </p>`);
                      } else {
                        return [
                          createVNode(_sfc_main$L, {
                            class: "rounded-full bg-primary p-4",
                            size: "5xl",
                            name: "diamond"
                          }),
                          createVNode("p", { class: "text-xl" }, " Des badges décernés en fonction de ton activité sur le site. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$I, null, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$L, {
                          class: "rounded-full bg-primary p-4",
                          size: "5xl",
                          name: "people"
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xl"${_scopeId3}> Un classement des utilisateurs les plus actifs. </p>`);
                      } else {
                        return [
                          createVNode(_sfc_main$L, {
                            class: "rounded-full bg-primary p-4",
                            size: "5xl",
                            name: "people"
                          }),
                          createVNode("p", { class: "text-xl" }, " Un classement des utilisateurs les plus actifs. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("p", { class: "font-bold uppercase text-primary" }, "Services"),
                    createVNode("h2", { class: "text-4xl" }, "Fonctionnalités"),
                    createVNode("p", { class: "text-xl" }, " X-Memes t'offre une variété de fonctionnalités te permettant de poster, télécharger et suivre les personnes que tu aimes. "),
                    createVNode("div", { class: "mx-auto grid grid-cols-1 gap-16 py-16 lg:w-9/12 lg:grid-cols-5" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode(_sfc_main$I, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              class: "rounded-full bg-primary p-4",
                              size: "5xl",
                              name: "add"
                            }),
                            createVNode("p", { class: "text-xl" }, "Poste tes mèmes préférés.")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode(_sfc_main$I, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              class: "rounded-full bg-primary p-4",
                              size: "5xl",
                              name: "image"
                            }),
                            createVNode("p", { class: "text-xl" }, " Retrouve tes mèmes préférés à un seul et même endroit. ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode(_sfc_main$I, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              class: "rounded-full bg-primary p-4",
                              size: "5xl",
                              name: "eye"
                            }),
                            createVNode("p", { class: "text-xl" }, " Suis les personnes que tu as envie. ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode(_sfc_main$I, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              class: "rounded-full bg-primary p-4",
                              size: "5xl",
                              name: "diamond"
                            }),
                            createVNode("p", { class: "text-xl" }, " Des badges décernés en fonction de ton activité sur le site. ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode(_sfc_main$I, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              class: "rounded-full bg-primary p-4",
                              size: "5xl",
                              name: "people"
                            }),
                            createVNode("p", { class: "text-xl" }, " Un classement des utilisateurs les plus actifs. ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="relative px-8 pb-16 pt-20 text-center lg:px-0"${_scopeId}><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$I, { class: "mb-16" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="font-bold uppercase text-primary"${_scopeId2}>FAQ</p><h2 class="text-4xl"${_scopeId2}>Une question ?</h2><p class="text-xl"${_scopeId2}> Si tu trouves pas la réponse à ta question, ou si tu as une suggestion, tu peux me contacter sur X <a class="link-primary" href="https://twitter.com/gcazinonx"${_scopeId2}>ici</a>. </p>`);
                } else {
                  return [
                    createVNode("p", { class: "font-bold uppercase text-primary" }, "FAQ"),
                    createVNode("h2", { class: "text-4xl" }, "Une question ?"),
                    createVNode("p", { class: "text-xl" }, [
                      createTextVNode(" Si tu trouves pas la réponse à ta question, ou si tu as une suggestion, tu peux me contacter sur X "),
                      createVNode("a", {
                        class: "link-primary",
                        href: "https://twitter.com/gcazinonx"
                      }, "ici"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mx-auto flex flex-wrap lg:w-9/12"${_scopeId}><div class="w-full px-4"${_scopeId}><div class="mb-12 flex lg:mb-[70px]"${_scopeId}><div class="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$L, {
              class: "text-4xl",
              name: "help-circle"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="w-full text-left"${_scopeId}><h3 class="mb-6 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"${_scopeId}> J&#39;ai rencontré un bug </h3><p${_scopeId}> Tu peux me contacter sur X <a class="link-primary" href="https://twitter.com/gcazinonx" target="_blank"${_scopeId}>ici</a> si jamais tu as trouvé un bug. </p></div></div><div class="mb-12 flex lg:mb-[70px]"${_scopeId}><div class="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$L, {
              class: "text-4xl",
              name: "help-circle"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="w-full text-left"${_scopeId}><h3 class="mb-6 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"${_scopeId}> Le site est en alpha? </h3><p${_scopeId}> Effectivement, le site est encore en alpha pour l&#39;instant, les fonctionnalités de base y sont présentes, mais encore de nombreuses nouveautés sont en préparation. 🤫 </p></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "hero relative flex flex-col justify-center dark:border-b dark:border-slate-100/5 dark:bg-bottom" }, [
                createVNode("div", { class: "hero-content pt-12 text-center lg:pt-24" }, [
                  createVNode("div", { class: "flex flex-col" }, [
                    createVNode("img", {
                      class: "mask mask-squircle mx-auto mb-8 w-32 shadow",
                      src: "images/favicon-with-background.jpg",
                      alt: ""
                    }),
                    createVNode("h1", { class: "text-3xl font-bold lg:text-5xl" }, " La plateforme qui te permet de retrouver tes mèmes préférés! "),
                    createVNode("p", { class: "py-6 lg:text-xl" }, " X-Memes est une plateforme où tu peux t'inscrire, publier et voir les mèmes que la communauté a posté. "),
                    createVNode("div", { class: "space-x-2" }, [
                      createVNode("a", {
                        href: _ctx.route("library.image"),
                        class: "btn btn-primary btn-lg"
                      }, " Découvrir ", 8, ["href"]),
                      createVNode("a", {
                        href: _ctx.route("login"),
                        class: "btn btn-outline btn-primary btn-lg"
                      }, " Se connecter ", 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "w-full px-4" }, [
                  createVNode("div", {
                    class: "wow fadeInUp relative z-10 mx-auto max-w-[850px]",
                    "data-wow-delay": ".25s",
                    style: { "visibility": "visible", "animation-delay": "0.25s" }
                  }, [
                    createVNode("div", { class: "mt-16" }, [
                      createVNode("img", {
                        src: "/images/home.png",
                        alt: "hero",
                        class: "mx-auto max-w-full"
                      })
                    ]),
                    createVNode("div", { class: "absolute -left-9 bottom-0 z-[-1]" }, [
                      createVNode("img", {
                        src: "/images/misc/blob.svg",
                        alt: ""
                      })
                    ]),
                    createVNode("div", { class: "absolute -right-6 -top-6 z-[-1]" }, [
                      createVNode("img", {
                        src: "/images/misc/blob.svg",
                        alt: ""
                      })
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "relative bg-base-300 px-8 pb-16 pt-20 text-center lg:px-0" }, [
                createVNode(_sfc_main$I, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "font-bold uppercase text-primary" }, "Services"),
                    createVNode("h2", { class: "text-4xl" }, "Fonctionnalités"),
                    createVNode("p", { class: "text-xl" }, " X-Memes t'offre une variété de fonctionnalités te permettant de poster, télécharger et suivre les personnes que tu aimes. "),
                    createVNode("div", { class: "mx-auto grid grid-cols-1 gap-16 py-16 lg:w-9/12 lg:grid-cols-5" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode(_sfc_main$I, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              class: "rounded-full bg-primary p-4",
                              size: "5xl",
                              name: "add"
                            }),
                            createVNode("p", { class: "text-xl" }, "Poste tes mèmes préférés.")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode(_sfc_main$I, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              class: "rounded-full bg-primary p-4",
                              size: "5xl",
                              name: "image"
                            }),
                            createVNode("p", { class: "text-xl" }, " Retrouve tes mèmes préférés à un seul et même endroit. ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode(_sfc_main$I, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              class: "rounded-full bg-primary p-4",
                              size: "5xl",
                              name: "eye"
                            }),
                            createVNode("p", { class: "text-xl" }, " Suis les personnes que tu as envie. ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode(_sfc_main$I, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              class: "rounded-full bg-primary p-4",
                              size: "5xl",
                              name: "diamond"
                            }),
                            createVNode("p", { class: "text-xl" }, " Des badges décernés en fonction de ton activité sur le site. ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode(_sfc_main$I, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$L, {
                              class: "rounded-full bg-primary p-4",
                              size: "5xl",
                              name: "people"
                            }),
                            createVNode("p", { class: "text-xl" }, " Un classement des utilisateurs les plus actifs. ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "relative px-8 pb-16 pt-20 text-center lg:px-0" }, [
                createVNode("div", { class: "relative" }, [
                  createVNode(_sfc_main$I, { class: "mb-16" }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "font-bold uppercase text-primary" }, "FAQ"),
                      createVNode("h2", { class: "text-4xl" }, "Une question ?"),
                      createVNode("p", { class: "text-xl" }, [
                        createTextVNode(" Si tu trouves pas la réponse à ta question, ou si tu as une suggestion, tu peux me contacter sur X "),
                        createVNode("a", {
                          class: "link-primary",
                          href: "https://twitter.com/gcazinonx"
                        }, "ici"),
                        createTextVNode(". ")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "mx-auto flex flex-wrap lg:w-9/12" }, [
                    createVNode("div", { class: "w-full px-4" }, [
                      createVNode("div", { class: "mb-12 flex lg:mb-[70px]" }, [
                        createVNode("div", { class: "mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]" }, [
                          createVNode(_sfc_main$L, {
                            class: "text-4xl",
                            name: "help-circle"
                          })
                        ]),
                        createVNode("div", { class: "w-full text-left" }, [
                          createVNode("h3", { class: "mb-6 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl" }, " J'ai rencontré un bug "),
                          createVNode("p", null, [
                            createTextVNode(" Tu peux me contacter sur X "),
                            createVNode("a", {
                              class: "link-primary",
                              href: "https://twitter.com/gcazinonx",
                              target: "_blank"
                            }, "ici"),
                            createTextVNode(" si jamais tu as trouvé un bug. ")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mb-12 flex lg:mb-[70px]" }, [
                        createVNode("div", { class: "mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]" }, [
                          createVNode(_sfc_main$L, {
                            class: "text-4xl",
                            name: "help-circle"
                          })
                        ]),
                        createVNode("div", { class: "w-full text-left" }, [
                          createVNode("h3", { class: "mb-6 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl" }, " Le site est en alpha? "),
                          createVNode("p", null, " Effectivement, le site est encore en alpha pour l'instant, les fonctionnalités de base y sont présentes, mais encore de nombreuses nouveautés sont en préparation. 🤫 ")
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$p
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$o = {
  __name: "FollowButton",
  __ssrInlineRender: true,
  props: {
    user: {
      type: Array,
      required: true
    },
    inline: {
      type: Boolean,
      required: false
    },
    size: {
      type: String,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const checkIfAuthIsFollowing = () => {
      var _a, _b;
      return (_b = props.user) == null ? void 0 : _b.followers.map((follower) => follower.username).includes((_a = page.props.auth.user) == null ? void 0 : _a.username);
    };
    const form = useForm({});
    const submit = () => {
      form.post(route("user.follow", props.user.id), {
        onSuccess: () => {
          checkIfAuthIsFollowing();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      if (((_a = unref(page).props.auth) == null ? void 0 : _a.user) && unref(page).props.auth.user.id !== __props.user.id) {
        _push(ssrRenderComponent(_sfc_main$A, mergeProps({
          size: __props.size,
          type: !__props.inline ? "secondary" : "primary",
          outline: checkIfAuthIsFollowing(),
          onClick: submit
        }, _attrs), {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(checkIfAuthIsFollowing() ? "Ne plus suivre" : "Suivre")}`);
            } else {
              return [
                createTextVNode(toDisplayString(checkIfAuthIsFollowing() ? "Ne plus suivre" : "Suivre"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Button/FollowButton.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = {
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: false
    },
    routeTo: {
      type: String,
      required: false
    },
    isLink: {
      type: Boolean,
      default: true
    },
    hasBackground: {
      type: Boolean,
      default: false
    },
    hasMedia: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["card w-full !rounded-lg bg-base-300 shadow", {
          "bg-base-300": __props.hasBackground,
          "card-compact": __props.hasMedia
        }]
      }, _attrs))}>`);
      if (__props.hasMedia) {
        _push(`<figure>`);
        ssrRenderSlot(_ctx.$slots, "media", {}, null, _push, _parent);
        _push(`</figure>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.isLink ? "a" : "div"), {
        href: __props.routeTo ? _ctx.route(__props.routeTo) : null,
        class: "card-body"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.title) {
              _push2(ssrRenderComponent(_sfc_main$M, { type: "subtitle" }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.title), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$M, { class: "font-bold" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (_ctx.$slots.action) {
              _push2(`<div class="card-actions justify-end"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "action", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.title ? (openBlock(), createBlock(_sfc_main$M, {
                key: 0,
                type: "subtitle"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.title), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_sfc_main$M, { class: "font-bold" }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              _ctx.$slots.action ? (openBlock(), createBlock("div", {
                key: 1,
                class: "card-actions justify-end"
              }, [
                renderSlot(_ctx.$slots, "action")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }), _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Misc/Card.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = {
  __name: "Table",
  __ssrInlineRender: true,
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    properties: {
      type: Array,
      required: true
    },
    hasAction: {
      type: Boolean,
      required: false,
      default: false
    },
    hasBackground: {
      type: Boolean,
      required: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x" }, _attrs))}><table class="${ssrRenderClass([{ "bg-base-300": __props.hasBackground }, "table table-xs rounded-lg lg:table-lg"])}"><thead><tr><!--[-->`);
      ssrRenderList(__props.headers, (header, index) => {
        _push(`<th>${ssrInterpolate(header)}</th>`);
      });
      _push(`<!--]-->`);
      if (__props.hasAction) {
        _push(`<th class="text-right">Actions</th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr></thead><tbody>`);
      if (__props.items.length) {
        _push(`<!--[-->`);
        ssrRenderList(__props.items, (item, index) => {
          _push(`<tr>`);
          if (__props.properties) {
            _push(`<!--[-->`);
            ssrRenderList(__props.properties, (property) => {
              _push(`<td>`);
              if (property === "increment") {
                ssrRenderSlot(_ctx.$slots, property, { index }, () => {
                  _push(`${ssrInterpolate(index + 1)}`);
                }, _push, _parent);
              } else {
                ssrRenderSlot(_ctx.$slots, property, item, () => {
                  _push(`${ssrInterpolate(property in item ? item[property] : item)}`);
                }, _push, _parent);
              }
              _push(`</td>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<td>${ssrInterpolate(item)}</td>`);
          }
          if (__props.hasAction) {
            _push(`<td class="text-right">`);
            if (__props.properties) {
              ssrRenderSlot(_ctx.$slots, "actions", item, null, _push, _parent);
            } else {
              ssrRenderSlot(_ctx.$slots, "actions", item, null, _push, _parent);
            }
            _push(`</td>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<tr class="px-6 py-4"><td class="">Aucune donnée à afficher.</td></tr>`);
      }
      _push(`</tbody></table></div>`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Table/Table.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = {
  __name: "RoleBadge",
  __ssrInlineRender: true,
  props: {
    user: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    usePage();
    const role = props.user.roles;
    const badgeColor = computed(() => {
      if (role.length) {
        return {
          "super-admin": "text-secondary",
          admin: "text-primary",
          moderator: "text-accent"
        }[role[0].name];
      }
    });
    const tooltipText = computed(() => {
      if (role.length) {
        return {
          "super-admin": "Ce compte est certifié car il appartient à un super-administrateur.",
          admin: "Ce compte est certifié car il appartient à un administrateur.",
          moderator: "Ce compte est certifié car il appartient à un modérateur."
        }[role[0].name];
      }
      return null;
    });
    const tooltipColor = computed(() => {
      if (role.length) {
        return {
          "super-admin": "lg:tooltip-secondary",
          admin: "lg:tooltip-primary",
          moderator: "lg:tooltip-accent"
        }[role[0].name];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["inline lg:tooltip", [tooltipColor.value]],
        "data-tip": tooltipText.value
      }, _attrs))}>`);
      if (unref(role).length) {
        _push(ssrRenderComponent(_sfc_main$L, {
          class: ["align-top", [badgeColor.value]],
          name: "checkmark-circle",
          outline: false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/User/RoleBadge.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = {
  __name: "Leaderboard",
  __ssrInlineRender: true,
  props: {
    leaderboard: {
      type: Array
    },
    users: {
      type: Object
    },
    medias: {
      type: Object
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$C, mergeProps({ title: "Classement des meilleurs contributeurs" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 flex flex-col gap-2 lg:flex-row lg:gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.leaderboard.slice(0, 3), (member, index) => {
              _push2(ssrRenderComponent(_sfc_main$n, { key: index }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-col items-center justify-center gap-4"${_scopeId2}><a${ssrRenderAttr("href", _ctx.route("user.show", member.username))} class="text-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$E, {
                      size: "lg",
                      user: member
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$M, { type: "subtitle" }, {
                      default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(member.username)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(member.username), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</a><div class="badge badge-lg bg-secondary/10 text-secondary"${_scopeId2}>${ssrInterpolate(member.medias_count)} médias postés </div>`);
                    _push3(ssrRenderComponent(_sfc_main$o, { user: member }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-col items-center justify-center gap-4" }, [
                        createVNode("a", {
                          href: _ctx.route("user.show", member.username),
                          class: "text-center"
                        }, [
                          createVNode(_sfc_main$E, {
                            size: "lg",
                            user: member
                          }, null, 8, ["user"]),
                          createVNode(_sfc_main$M, { type: "subtitle" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(member.username), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ], 8, ["href"]),
                        createVNode("div", { class: "badge badge-lg bg-secondary/10 text-secondary" }, toDisplayString(member.medias_count) + " médias postés ", 1),
                        createVNode(_sfc_main$o, { user: member }, null, 8, ["user"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
            _push2(ssrRenderComponent(_sfc_main$m, {
              headers: ["Rang", `Nom d'utilisateur`, "Nombre de médias postés"],
              items: __props.leaderboard.slice(3),
              properties: ["increment", "username", "medias_count"],
              "has-background": ""
            }, {
              increment: withCtx(({ index }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$M, { class: "font-bold !text-secondary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(index + 1)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(index + 1), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$M, { class: "font-bold !text-secondary" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(index + 1), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              username: withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a${ssrRenderAttr("href", _ctx.route("user.show", item.username))}${_scopeId2}><div class="flex items-center gap-x-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$E, { user: item }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>${ssrInterpolate(item.username)} `);
                  _push3(ssrRenderComponent(_sfc_main$l, {
                    class: "!align-text-top",
                    user: item
                  }, null, _parent3, _scopeId2));
                  _push3(`</span></div></a>`);
                } else {
                  return [
                    createVNode("a", {
                      href: _ctx.route("user.show", item.username)
                    }, [
                      createVNode("div", { class: "flex items-center gap-x-4" }, [
                        createVNode(_sfc_main$E, { user: item }, null, 8, ["user"]),
                        createVNode("span", null, [
                          createTextVNode(toDisplayString(item.username) + " ", 1),
                          createVNode(_sfc_main$l, {
                            class: "!align-text-top",
                            user: item
                          }, null, 8, ["user"])
                        ])
                      ])
                    ], 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "mb-4 flex flex-col gap-2 lg:flex-row lg:gap-4" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.leaderboard.slice(0, 3), (member, index) => {
                  return openBlock(), createBlock(_sfc_main$n, { key: index }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-col items-center justify-center gap-4" }, [
                        createVNode("a", {
                          href: _ctx.route("user.show", member.username),
                          class: "text-center"
                        }, [
                          createVNode(_sfc_main$E, {
                            size: "lg",
                            user: member
                          }, null, 8, ["user"]),
                          createVNode(_sfc_main$M, { type: "subtitle" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(member.username), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ], 8, ["href"]),
                        createVNode("div", { class: "badge badge-lg bg-secondary/10 text-secondary" }, toDisplayString(member.medias_count) + " médias postés ", 1),
                        createVNode(_sfc_main$o, { user: member }, null, 8, ["user"])
                      ])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ]),
              createVNode(_sfc_main$m, {
                headers: ["Rang", `Nom d'utilisateur`, "Nombre de médias postés"],
                items: __props.leaderboard.slice(3),
                properties: ["increment", "username", "medias_count"],
                "has-background": ""
              }, {
                increment: withCtx(({ index }) => [
                  createVNode(_sfc_main$M, { class: "font-bold !text-secondary" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(index + 1), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                username: withCtx((item) => [
                  createVNode("a", {
                    href: _ctx.route("user.show", item.username)
                  }, [
                    createVNode("div", { class: "flex items-center gap-x-4" }, [
                      createVNode(_sfc_main$E, { user: item }, null, 8, ["user"]),
                      createVNode("span", null, [
                        createTextVNode(toDisplayString(item.username) + " ", 1),
                        createVNode(_sfc_main$l, {
                          class: "!align-text-top",
                          user: item
                        }, null, 8, ["user"])
                      ])
                    ])
                  ], 8, ["href"])
                ]),
                _: 1
              }, 8, ["items"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Leaderboard.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    isClosable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    watchEffect(
      () => props.show,
      () => {
        if (props.show) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = null;
        }
      }
    );
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const closeOnEscape = (e2) => {
      if (e2.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = null;
    });
    const maxWidthClass = computed(() => {
      return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl"
      }[props.maxWidth];
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<dialog${ssrRenderAttr("id", __props.id)} class="modal"><div class="${ssrRenderClass([[maxWidthClass.value], "modal-box border border-base-200 shadow-lg"])}"><p class="mb-2 text-lg font-bold">${ssrInterpolate(__props.title)}</p>`);
        if (_ctx.$slots.description) {
          _push2(`<p class="py-4">`);
          ssrRenderSlot(_ctx.$slots, "description", {}, null, _push2, _parent);
          _push2(`</p>`);
        } else {
          _push2(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        _push2(`</div>`);
        if (__props.isClosable) {
          _push2(`<form method="dialog" class="modal-backdrop"><button>close</button></form>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</dialog>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal/Modal.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = {
  __name: "MediaItem",
  __ssrInlineRender: true,
  props: {
    media: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const form = useForm({
      media_id: props.media.id
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="relative"><a${ssrRenderAttr("href", _ctx.route("media.show", __props.media.slug))}><img class="h-96 w-full rounded-lg object-cover shadow"${ssrRenderAttr("src", `/storage/${__props.media.extension === "mp4" ? __props.media.thumbnail_path : __props.media.path}`)}${ssrRenderAttr("alt", __props.media.name)} loading="lazy"></a><div class="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-slate-900/80 from-5% to-transparent p-4"><div class="flex-1">`);
      _push(ssrRenderComponent(_sfc_main$M, { class: "font-bold" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.media.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.media.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$M, { type: "xs" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`publié ${ssrInterpolate(__props.media.created_at)}`);
          } else {
            return [
              createTextVNode("publié " + toDisplayString(__props.media.created_at), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex-1 text-right"><button${ssrIncludeBooleanAttr(unref(form).processing || !((_a = unref(page).props.auth) == null ? void 0 : _a.user)) ? " disabled" : ""} class="${ssrRenderClass([
        ((_b = unref(page).props.auth) == null ? void 0 : _b.user) ? ((_c = __props.media.likers) == null ? void 0 : _c.map((liker) => liker.id).includes(_ctx.$page.props.auth.user.id)) ? "btn-outline btn-error" : "btn-ghost" : "",
        "btn btn-circle btn-sm w-10"
      ])}">`);
      _push(ssrRenderComponent(_sfc_main$L, {
        size: "xl",
        name: "heart"
      }, null, _parent));
      _push(`</button></div></div></div><div class="flex items-center pt-2">`);
      _push(ssrRenderComponent(_sfc_main$M, {
        type: "link",
        to: "user.show",
        parameter: __props.media.user.username,
        class: "flex items-center gap-x-2"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$E, {
              size: "sm",
              user: __props.media.user
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(__props.media.user.username)}</span>`);
            _push2(ssrRenderComponent(_sfc_main$l, {
              user: __props.media.user
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$E, {
                size: "sm",
                user: __props.media.user
              }, null, 8, ["user"]),
              createVNode("span", null, toDisplayString(__props.media.user.username), 1),
              createVNode(_sfc_main$l, {
                user: __props.media.user
              }, null, 8, ["user"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex-1"><div class="flex justify-end gap-x-2">`);
      if (__props.media.likers.length) {
        _push(`<div class="flex items-center justify-end">`);
        _push(ssrRenderComponent(_sfc_main$L, {
          name: "heart",
          size: "xl",
          class: "mr-0.5"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$M, { type: "xs" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.media.likers.length)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.media.likers.length), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-end">`);
      _push(ssrRenderComponent(_sfc_main$L, {
        name: "download",
        size: "xl",
        class: "mr-0.5"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$M, { type: "xs" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.media.download_count)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.media.download_count), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Media/MediaItem.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = {
  __name: "MediaGallery",
  __ssrInlineRender: true,
  props: {
    medias: {
      type: Array,
      required: true
    },
    numberOfCols: {
      type: Number,
      default: 3
    },
    tags: {
      type: Array
    },
    sortBy: {
      type: Array
    },
    defaultSort: {
      type: String
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const page = usePage();
    const allPosts = ref(((_a = props.medias) == null ? void 0 : _a.data) ? [...props.medias.data] : null);
    const pagination = toRef(props.medias);
    const wrapper = ref(null);
    const loadMoreIntersect = ref(null);
    const loading = ref(false);
    const selectedFilters = ref({
      filters: {
        tags: []
      },
      sort: props.defaultSort
    });
    const urlParams = new URLSearchParams(window.location.search);
    onMounted(() => {
      addQueryTagsToSelectedTags();
      infiniteScrolling();
      getSortTitle();
    });
    const infiniteScrolling = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.isIntersecting && loadMorePosts();
        });
      });
      if (loadMoreIntersect.value) {
        observer.observe(loadMoreIntersect.value);
      }
    };
    const loadMorePosts = () => {
      if (props.medias.next_page_url === null) {
        return;
      }
      fetchData(
        pagination.value.next_page_url,
        selectedFilters.value.filters.tags.length || selectedFilters.value.sort ? getFiltersToSend() : {}
      );
    };
    const getSortTitle = () => {
      const selector = selectedFilters.value.sort;
      let title = "";
      if (selector) {
        if (selector.charAt(0) === "-") {
          switch (selector.slice(1)) {
            case "name":
              title += "Par ordre alphabétique (Z-A)";
              break;
            case "download_count":
              title += "Les plus populaires 🔥";
              break;
            case "created_at":
              title += "Les plus récents";
          }
        } else {
          switch (selector) {
            case "name":
              title += "Par ordre alphabétique (A-Z)";
              break;
            case "download_count":
              title += "Les moins populaires";
              break;
            case "created_at":
              title += "Les plus anciens";
          }
        }
      }
      return title;
    };
    const checkIfTagIsSelected = (tag) => {
      return selectedFilters.value.filters.tags.includes(tag);
    };
    const checkIfSortIsSelected = (sort) => {
      const selector = selectedFilters.value.sort;
      if (selector && selector === sort) {
        return selector.charAt(0) === "-" ? "down" : "up";
      }
      return "down";
    };
    const addQueryTagsToSelectedTags = () => {
      if (urlParams.get("tags")) {
        const tags = urlParams.get("tags").split(",");
        tags.forEach((tag) => {
          addSelectedTag(tag);
        });
      }
    };
    const getFiltersToSend = () => {
      return {
        filters: {
          ...selectedFilters.value.filters.tags.length && {
            tags: selectedFilters.value.filters.tags.join(",")
          }
        },
        ...selectedFilters.value.sort && {
          sort: selectedFilters.value.sort
        }
      };
    };
    const addSelectedTag = (tag) => {
      const selected = selectedFilters.value.filters.tags;
      if (selected.includes(tag)) {
        selected.splice(selected.indexOf(tag), 1);
      } else {
        selected.push(tag);
      }
      return getFiltersToSend();
    };
    const addSelectedSort = (index, sort) => {
      const selected = selectedFilters.value.sort;
      let value = sort;
      if (selected && selected === sort) {
        value = `-${sort}`;
      }
      selectedFilters.value.sort = value;
      return getFiltersToSend();
    };
    const filterByTags = (tag) => {
      fetchData(pagination.value.first_page_url, addSelectedTag(tag));
    };
    const sortByProperty = (index, sorting) => {
      fetchData(pagination.value.first_page_url, addSelectedSort(index, sorting));
    };
    const fetchData = (url, filters = null) => {
      loading.value = true;
      if (url) {
        router.visit(url, {
          data: filters ?? {},
          only: ["medias"],
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => {
            if (url === pagination.value.first_page_url) {
              allPosts.value = [...props.medias.data];
            } else {
              allPosts.value = [...allPosts.value, ...props.medias.data];
            }
            window.history.replaceState({}, "", pagination.value.path);
            pagination.value = props.medias;
            loading.value = false;
          }
        });
      } else {
        loading.value = false;
      }
    };
    watch(
      () => pagination.value,
      (newQuery) => {
        if (!page.props.auth.isConnected && newQuery && newQuery.current_page === 3) {
          FormService$1.openModal("shouldRegister");
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$I, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (selectedFilters.value.filters.tags.length) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$I, { spacing: "1" }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$M, null, {
                      default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Tags sélectionnés`);
                        } else {
                          return [
                            createTextVNode("Tags sélectionnés")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="space-x-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(selectedFilters.value.filters.tags, (tag, index) => {
                      _push3(ssrRenderComponent(_sfc_main$F, {
                        key: index,
                        size: "lg",
                        type: "secondary"
                      }, {
                        default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(__props.tags.find((t4) => t4.id === tag).name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(__props.tags.find((t4) => t4.id === tag).name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode(_sfc_main$M, null, {
                        default: withCtx(() => [
                          createTextVNode("Tags sélectionnés")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "space-x-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(selectedFilters.value.filters.tags, (tag, index) => {
                          return openBlock(), createBlock(_sfc_main$F, {
                            key: index,
                            size: "lg",
                            type: "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.tags.find((t4) => t4.id === tag).name), 1)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex flex-col lg:flex-row lg:items-center"${_scopeId}>`);
            if (allPosts.value && allPosts.value.length && selectedFilters.value.sort) {
              _push2(`<div class="flex-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$M, null, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(getSortTitle())}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(getSortTitle()), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.tags && __props.tags.length || __props.sortBy) {
              _push2(`<div class="mt-4 flex-1 space-x-2 text-right lg:mt-0"${_scopeId}>`);
              if (__props.sortBy) {
                _push2(`<div class="dropdown border-r border-gray-500 pe-2"${_scopeId}><div tabindex="0" role="button" class="btn btn-ghost btn-sm"${_scopeId}> Trier `);
                _push2(ssrRenderComponent(_sfc_main$L, { name: "chevron-down" }, null, _parent2, _scopeId));
                _push2(`</div><ul tabindex="0" class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow" aria-labelledby="dropdownSortButton"${_scopeId}><!--[-->`);
                ssrRenderList(__props.sortBy, (sort, index) => {
                  _push2(`<li${_scopeId}><a${_scopeId}>${ssrInterpolate(sort.name)} `);
                  _push2(ssrRenderComponent(_sfc_main$L, {
                    class: "ms-auto inline",
                    name: `arrow-${checkIfSortIsSelected(
                      sort.value
                    )}`
                  }, null, _parent2, _scopeId));
                  _push2(`</a></li>`);
                });
                _push2(`<!--]--></ul></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.tags.length) {
                _push2(`<div class="dropdown dropdown-end"${_scopeId}><div tabindex="0" role="button" class="btn btn-ghost btn-sm"${_scopeId}> Filter par tags `);
                _push2(ssrRenderComponent(_sfc_main$L, { name: "chevron-down" }, null, _parent2, _scopeId));
                _push2(`</div><ul tabindex="0" class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow" aria-labelledby="dropdownTagsButton"${_scopeId}><!--[-->`);
                ssrRenderList(__props.tags, (tag, index) => {
                  _push2(`<li${_scopeId}><a${_scopeId}><input${ssrRenderAttr("id", `checkbox-item-${tag.name}`)} type="checkbox"${ssrRenderAttr("value", tag.id)} class="checkbox-primary checkbox checkbox-sm"${ssrIncludeBooleanAttr(checkIfTagIsSelected(tag.id)) ? " checked" : ""}${_scopeId}><label for="checkbox-item-1" class="label"${_scopeId}>${ssrInterpolate(tag.name)}</label></a></li>`);
                });
                _push2(`<!--]--></ul></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (allPosts.value && allPosts.value.length) {
              _push2(`<div class="${ssrRenderClass([`grid-cols-1 md:grid-cols-${__props.numberOfCols}`, "grid grid-cols-1 gap-6 md:grid-cols-3"])}"${_scopeId}><!--[-->`);
              ssrRenderList(allPosts.value, (media, index) => {
                _push2(`<div class="animate-[pulse_0.5s_ease-in-out]"${_scopeId}>`);
                if (unref(page).props.auth.isConnected || !unref(page).props.auth.isConnected && pagination.value.current_page !== 3) {
                  _push2(ssrRenderComponent(_sfc_main$i, { media }, null, _parent2, _scopeId));
                } else {
                  _push2(`<div class="space-y-6"${_scopeId}><div class="skeleton h-96"${_scopeId}></div><div class="skeleton h-96"${_scopeId}></div><div class="skeleton h-96"${_scopeId}></div><div class="skeleton h-96"${_scopeId}></div><div class="skeleton h-96"${_scopeId}></div><div class="skeleton h-96"${_scopeId}></div></div>`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$M, null, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Aucun résultat n&#39;a été trouvé, mais tu peux y remédier, j&#39;dis ça j&#39;dis rien... `);
                  } else {
                    return [
                      createTextVNode("Aucun résultat n'a été trouvé, mais tu peux y remédier, j'dis ça j'dis rien... ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`<div${_scopeId}>`);
            if (loading.value) {
              _push2(`<div class="mt-8 flex items-center justify-center py-4"${_scopeId}><span class="loading loading-infinity loading-lg text-5xl"${_scopeId}></span><div class="font-bold"${_scopeId}>Chargement...</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$j, {
              id: "shouldRegisterModal",
              "is-closable": false,
              "max-width": "3xl"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$I, {
                    spacing: "8",
                    class: "text-center"
                  }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$M, { type: "title" }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Envie d&#39;en voir plus ?`);
                            } else {
                              return [
                                createTextVNode("Envie d'en voir plus ?")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$M, null, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Crée un compte ou connecte-toi pour voir d&#39;autres résultats de recherche, ajouter des mèmes à tes favoris et bien plus encore ! `);
                            } else {
                              return [
                                createTextVNode(" Crée un compte ou connecte-toi pour voir d'autres résultats de recherche, ajouter des mèmes à tes favoris et bien plus encore ! ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="space-x-2"${_scopeId3}><a${ssrRenderAttr("href", _ctx.route("register"))} class="btn btn-primary"${_scopeId3}>Inscription</a><a${ssrRenderAttr("href", _ctx.route("login"))} class="btn btn-outline btn-primary"${_scopeId3}>Connexion</a></div>`);
                      } else {
                        return [
                          createVNode(_sfc_main$M, { type: "title" }, {
                            default: withCtx(() => [
                              createTextVNode("Envie d'en voir plus ?")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$M, null, {
                            default: withCtx(() => [
                              createTextVNode(" Crée un compte ou connecte-toi pour voir d'autres résultats de recherche, ajouter des mèmes à tes favoris et bien plus encore ! ")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "space-x-2" }, [
                            createVNode("a", {
                              href: _ctx.route("register"),
                              class: "btn btn-primary"
                            }, "Inscription", 8, ["href"]),
                            createVNode("a", {
                              href: _ctx.route("login"),
                              class: "btn btn-outline btn-primary"
                            }, "Connexion", 8, ["href"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$I, {
                      spacing: "8",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$M, { type: "title" }, {
                          default: withCtx(() => [
                            createTextVNode("Envie d'en voir plus ?")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$M, null, {
                          default: withCtx(() => [
                            createTextVNode(" Crée un compte ou connecte-toi pour voir d'autres résultats de recherche, ajouter des mèmes à tes favoris et bien plus encore ! ")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "space-x-2" }, [
                          createVNode("a", {
                            href: _ctx.route("register"),
                            class: "btn btn-primary"
                          }, "Inscription", 8, ["href"]),
                          createVNode("a", {
                            href: _ctx.route("login"),
                            class: "btn btn-outline btn-primary"
                          }, "Connexion", 8, ["href"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              selectedFilters.value.filters.tags.length ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode(_sfc_main$I, { spacing: "1" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$M, null, {
                      default: withCtx(() => [
                        createTextVNode("Tags sélectionnés")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-x-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(selectedFilters.value.filters.tags, (tag, index) => {
                        return openBlock(), createBlock(_sfc_main$F, {
                          key: index,
                          size: "lg",
                          type: "secondary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.tags.find((t4) => t4.id === tag).name), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ])
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "flex flex-col lg:flex-row lg:items-center" }, [
                allPosts.value && allPosts.value.length && selectedFilters.value.sort ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex-1"
                }, [
                  createVNode(_sfc_main$M, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getSortTitle()), 1)
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true),
                __props.tags && __props.tags.length || __props.sortBy ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mt-4 flex-1 space-x-2 text-right lg:mt-0"
                }, [
                  __props.sortBy ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "dropdown border-r border-gray-500 pe-2"
                  }, [
                    createVNode("div", {
                      tabindex: "0",
                      role: "button",
                      class: "btn btn-ghost btn-sm"
                    }, [
                      createTextVNode(" Trier "),
                      createVNode(_sfc_main$L, { name: "chevron-down" })
                    ]),
                    createVNode("ul", {
                      tabindex: "0",
                      class: "menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow",
                      "aria-labelledby": "dropdownSortButton"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.sortBy, (sort, index) => {
                        return openBlock(), createBlock("li", { key: index }, [
                          createVNode("a", {
                            onClick: ($event) => sortByProperty(index, sort.value)
                          }, [
                            createTextVNode(toDisplayString(sort.name) + " ", 1),
                            createVNode(_sfc_main$L, {
                              class: "ms-auto inline",
                              name: `arrow-${checkIfSortIsSelected(
                                sort.value
                              )}`
                            }, null, 8, ["name"])
                          ], 8, ["onClick"])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  __props.tags.length ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "dropdown dropdown-end"
                  }, [
                    createVNode("div", {
                      tabindex: "0",
                      role: "button",
                      class: "btn btn-ghost btn-sm"
                    }, [
                      createTextVNode(" Filter par tags "),
                      createVNode(_sfc_main$L, { name: "chevron-down" })
                    ]),
                    createVNode("ul", {
                      tabindex: "0",
                      class: "menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow",
                      "aria-labelledby": "dropdownTagsButton"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.tags, (tag, index) => {
                        return openBlock(), createBlock("li", { key: index }, [
                          createVNode("a", {
                            onClick: ($event) => filterByTags(tag.id)
                          }, [
                            createVNode("input", {
                              id: `checkbox-item-${tag.name}`,
                              type: "checkbox",
                              value: tag.id,
                              class: "checkbox-primary checkbox checkbox-sm",
                              checked: checkIfTagIsSelected(tag.id)
                            }, null, 8, ["id", "value", "checked"]),
                            createVNode("label", {
                              for: "checkbox-item-1",
                              class: "label"
                            }, toDisplayString(tag.name), 1)
                          ], 8, ["onClick"])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ]),
              allPosts.value && allPosts.value.length ? (openBlock(), createBlock("div", {
                key: 1,
                ref_key: "wrapper",
                ref: wrapper,
                class: ["grid grid-cols-1 gap-6 md:grid-cols-3", `grid-cols-1 md:grid-cols-${__props.numberOfCols}`]
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(allPosts.value, (media, index) => {
                  return openBlock(), createBlock("div", {
                    key: index,
                    class: "animate-[pulse_0.5s_ease-in-out]"
                  }, [
                    unref(page).props.auth.isConnected || !unref(page).props.auth.isConnected && pagination.value.current_page !== 3 ? (openBlock(), createBlock(_sfc_main$i, {
                      key: 0,
                      media
                    }, null, 8, ["media"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "skeleton h-96" }),
                      createVNode("div", { class: "skeleton h-96" }),
                      createVNode("div", { class: "skeleton h-96" }),
                      createVNode("div", { class: "skeleton h-96" }),
                      createVNode("div", { class: "skeleton h-96" }),
                      createVNode("div", { class: "skeleton h-96" })
                    ]))
                  ]);
                }), 128))
              ], 2)) : (openBlock(), createBlock("div", { key: 2 }, [
                createVNode(_sfc_main$M, null, {
                  default: withCtx(() => [
                    createTextVNode("Aucun résultat n'a été trouvé, mais tu peux y remédier, j'dis ça j'dis rien... ")
                  ]),
                  _: 1
                })
              ])),
              createVNode("div", {
                ref_key: "loadMoreIntersect",
                ref: loadMoreIntersect
              }, [
                loading.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-8 flex items-center justify-center py-4"
                }, [
                  createVNode("span", { class: "loading loading-infinity loading-lg text-5xl" }),
                  createVNode("div", { class: "font-bold" }, "Chargement...")
                ])) : createCommentVNode("", true)
              ], 512),
              createVNode(_sfc_main$j, {
                id: "shouldRegisterModal",
                "is-closable": false,
                "max-width": "3xl"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$I, {
                    spacing: "8",
                    class: "text-center"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$M, { type: "title" }, {
                        default: withCtx(() => [
                          createTextVNode("Envie d'en voir plus ?")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$M, null, {
                        default: withCtx(() => [
                          createTextVNode(" Crée un compte ou connecte-toi pour voir d'autres résultats de recherche, ajouter des mèmes à tes favoris et bien plus encore ! ")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "space-x-2" }, [
                        createVNode("a", {
                          href: _ctx.route("register"),
                          class: "btn btn-primary"
                        }, "Inscription", 8, ["href"]),
                        createVNode("a", {
                          href: _ctx.route("login"),
                          class: "btn btn-outline btn-primary"
                        }, "Connexion", 8, ["href"])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Medias/Partials/MediaGallery.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const Library_vue_vue_type_style_index_0_lang = "";
const defaultProgressLabel = `Upload en cours...`;
const _sfc_main$g = {
  __name: "Library",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String
    },
    medias: {
      type: Array
    },
    tags: {
      type: Array
    },
    sortBy: {
      type: Array
    },
    defaultSort: {
      type: String
    },
    duplicatedImage: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const tagsOptions = computed(() => {
      return props.tags.map((tag) => {
        return {
          value: tag.name,
          label: tag.name
        };
      });
    });
    const form = useForm({
      name: null,
      media_id: null,
      tags: []
    });
    let progressLabel = defaultProgressLabel;
    const duplicated = ref(null);
    const media_preview_url = ref(null);
    const checkIfMediaIsDuplicated = async (event) => {
      form.media_id = event.target.files[0];
      if (form.media_id.type !== "video/mp4") {
        media_preview_url.value = URL.createObjectURL(form.media_id);
      }
      duplicated.value = null;
      if (form.media_id.type !== "video/mp4") {
        progressLabel = "Vérification des doublons...";
        form.post(route("media.duplicate", form.media_id), {
          onSuccess: (page) => {
            if (page.props.duplicatedImage) {
              duplicated.value = page.props.duplicatedImage;
            } else {
              duplicated.value = null;
            }
            progressLabel = defaultProgressLabel;
          }
        });
      } else {
        progressLabel = defaultProgressLabel;
        duplicated.value = null;
      }
    };
    const uploadMedia = () => {
      form.post(route("media.store"), {
        onSuccess: () => {
          FormService$1.closeModal();
          form.name = null;
          form.media_id = null;
          form.tags = [];
          duplicated.value = null;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$C, mergeProps({ title: __props.title }, _attrs), {
        action: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$A, {
              onClick: ($event) => unref(FormService$1).openModal("addMedia")
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Ajouter un mème`);
                } else {
                  return [
                    createTextVNode("Ajouter un mème")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$A, {
                onClick: ($event) => unref(FormService$1).openModal("addMedia")
              }, {
                default: withCtx(() => [
                  createTextVNode("Ajouter un mème")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$j, {
              id: "addMediaModal",
              title: "Ajouter un mème",
              "max-width": "4xl"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form enctype="multipart/form-data"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$I, null, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$N, {
                          label: "Titre",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          "help-text": "50 caractères maximum.",
                          "max-length": "50",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$O, {
                          message: unref(form).errors.name
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="form-control"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$I, null, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$t, {
                                for: "name",
                                value: "Image",
                                required: ""
                              }, null, _parent5, _scopeId4));
                              if (media_preview_url.value) {
                                _push5(`<img class="mx-auto h-60 rounded"${ssrRenderAttr("src", media_preview_url.value)}${_scopeId4}>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<input type="file" class="file-input file-input-bordered file-input-primary w-full" id="media_id"${_scopeId4}>`);
                            } else {
                              return [
                                createVNode(_sfc_main$t, {
                                  for: "name",
                                  value: "Image",
                                  required: ""
                                }),
                                media_preview_url.value ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  class: "mx-auto h-60 rounded",
                                  src: media_preview_url.value
                                }, null, 8, ["src"])) : createCommentVNode("", true),
                                createVNode("input", {
                                  type: "file",
                                  class: "file-input file-input-bordered file-input-primary w-full",
                                  id: "media_id",
                                  onInput: checkIfMediaIsDuplicated
                                }, null, 32)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="label ms-auto pb-0"${_scopeId3}><span class="label-text-alt"${_scopeId3}> Types de fichier acceptés: <span class="font-bold"${_scopeId3}>.mp4, .jpg, .jpeg, .png, .gif, .webp</span> - Taille maximale: <span class="font-bold"${_scopeId3}>25mo</span></span></div>`);
                        _push4(ssrRenderComponent(_sfc_main$O, {
                          message: unref(form).errors.media_id
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$t, {
                          for: "tags",
                          value: "Tags",
                          class: "my-2"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Multiselect), {
                          id: "tags",
                          modelValue: unref(form).tags,
                          "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                          mode: "tags",
                          "close-on-select": false,
                          searchable: true,
                          "create-option": true,
                          options: tagsOptions.value
                        }, {
                          noresults: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="p-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_sfc_main$M, { type: "sub" }, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Plus aucun élémént a afficher. `);
                                  } else {
                                    return [
                                      createTextVNode(" Plus aucun élémént a afficher. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "p-2" }, [
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Plus aucun élémént a afficher. ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (duplicated.value) {
                          _push4(`<div class="flex gap-4"${_scopeId3}><div${_scopeId3}><img class="mx-auto w-40 rounded-xl"${ssrRenderAttr("src", `/storage/${duplicated.value}`)} alt=""${_scopeId3}></div>`);
                          _push4(ssrRenderComponent(_sfc_main$y, { class: "h-full w-full lg:flex lg:flex-col" }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_sfc_main$M, { class: "font-bold text-info" }, {
                                  default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`1 image similaire a été trouvé!`);
                                    } else {
                                      return [
                                        createTextVNode("1 image similaire a été trouvé!")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_sfc_main$M, { type: "sub" }, {
                                  default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`S&#39;il s&#39;agit d&#39;une erreur, tu peux quand même la poster, elle sera vérifié dans tout les cas`);
                                    } else {
                                      return [
                                        createTextVNode("S'il s'agit d'une erreur, tu peux quand même la poster, elle sera vérifié dans tout les cas")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_sfc_main$M, { class: "font-bold text-info" }, {
                                    default: withCtx(() => [
                                      createTextVNode("1 image similaire a été trouvé!")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode("S'il s'agit d'une erreur, tu peux quand même la poster, elle sera vérifié dans tout les cas")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(form).progress) {
                          _push4(`<div class="flex flex-col text-center"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_sfc_main$I, null, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<progress class="progress progress-primary"${ssrRenderAttr("value", unref(form).progress.percentage)} max="100"${_scopeId4}></progress>`);
                                _push5(ssrRenderComponent(_sfc_main$M, { type: "sub" }, {
                                  default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(unref(progressLabel))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(unref(progressLabel)), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode("progress", {
                                    class: "progress progress-primary",
                                    value: unref(form).progress.percentage,
                                    max: "100"
                                  }, null, 8, ["value"]),
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(progressLabel)), 1)
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_sfc_main$z, {
                          class: ["btn", duplicated.value ? "btn-warning" : "btn-primary"],
                          loading: unref(form).processing,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(duplicated.value ? `La poster quand même?` : "Ajouter")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(duplicated.value ? `La poster quand même?` : "Ajouter"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$M, {
                          type: "xs",
                          class: "italic"
                        }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` * Le mème sera en attente d&#39;approbation par un administrateur avant d&#39;être publié sur le site. Les administrateurs du site se réserve le droit de refuser toute image qui ne serait pas conforme. `);
                            } else {
                              return [
                                createTextVNode(" * Le mème sera en attente d'approbation par un administrateur avant d'être publié sur le site. Les administrateurs du site se réserve le droit de refuser toute image qui ne serait pas conforme. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode(_sfc_main$N, {
                              label: "Titre",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              "help-text": "50 caractères maximum.",
                              "max-length": "50",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$O, {
                              message: unref(form).errors.name
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "form-control" }, [
                            createVNode(_sfc_main$I, null, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$t, {
                                  for: "name",
                                  value: "Image",
                                  required: ""
                                }),
                                media_preview_url.value ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  class: "mx-auto h-60 rounded",
                                  src: media_preview_url.value
                                }, null, 8, ["src"])) : createCommentVNode("", true),
                                createVNode("input", {
                                  type: "file",
                                  class: "file-input file-input-bordered file-input-primary w-full",
                                  id: "media_id",
                                  onInput: checkIfMediaIsDuplicated
                                }, null, 32)
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "label ms-auto pb-0" }, [
                              createVNode("span", { class: "label-text-alt" }, [
                                createTextVNode(" Types de fichier acceptés: "),
                                createVNode("span", { class: "font-bold" }, ".mp4, .jpg, .jpeg, .png, .gif, .webp"),
                                createTextVNode(" - Taille maximale: "),
                                createVNode("span", { class: "font-bold" }, "25mo")
                              ])
                            ]),
                            createVNode(_sfc_main$O, {
                              message: unref(form).errors.media_id
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$t, {
                              for: "tags",
                              value: "Tags",
                              class: "my-2"
                            }),
                            createVNode(unref(Multiselect), {
                              id: "tags",
                              modelValue: unref(form).tags,
                              "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                              mode: "tags",
                              "close-on-select": false,
                              searchable: true,
                              "create-option": true,
                              options: tagsOptions.value
                            }, {
                              noresults: withCtx(() => [
                                createVNode("div", { class: "p-2" }, [
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Plus aucun élémént a afficher. ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                          ]),
                          duplicated.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex gap-4"
                          }, [
                            createVNode("div", null, [
                              createVNode("img", {
                                class: "mx-auto w-40 rounded-xl",
                                src: `/storage/${duplicated.value}`,
                                alt: ""
                              }, null, 8, ["src"])
                            ]),
                            createVNode(_sfc_main$y, { class: "h-full w-full lg:flex lg:flex-col" }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$M, { class: "font-bold text-info" }, {
                                  default: withCtx(() => [
                                    createTextVNode("1 image similaire a été trouvé!")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$M, { type: "sub" }, {
                                  default: withCtx(() => [
                                    createTextVNode("S'il s'agit d'une erreur, tu peux quand même la poster, elle sera vérifié dans tout les cas")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true),
                          unref(form).progress ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex flex-col text-center"
                          }, [
                            createVNode(_sfc_main$I, null, {
                              default: withCtx(() => [
                                createVNode("progress", {
                                  class: "progress progress-primary",
                                  value: unref(form).progress.percentage,
                                  max: "100"
                                }, null, 8, ["value"]),
                                createVNode(_sfc_main$M, { type: "sub" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(progressLabel)), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true),
                          createVNode(_sfc_main$z, {
                            class: ["btn", duplicated.value ? "btn-warning" : "btn-primary"],
                            loading: unref(form).processing,
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(duplicated.value ? `La poster quand même?` : "Ajouter"), 1)
                            ]),
                            _: 1
                          }, 8, ["class", "loading", "disabled"]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$M, {
                              type: "xs",
                              class: "italic"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" * Le mème sera en attente d'approbation par un administrateur avant d'être publié sur le site. Les administrateurs du site se réserve le droit de refuser toute image qui ne serait pas conforme. ")
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode("form", {
                      enctype: "multipart/form-data",
                      onSubmit: withModifiers(($event) => uploadMedia(), ["prevent"])
                    }, [
                      createVNode(_sfc_main$I, null, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(_sfc_main$N, {
                              label: "Titre",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              "help-text": "50 caractères maximum.",
                              "max-length": "50",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$O, {
                              message: unref(form).errors.name
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "form-control" }, [
                            createVNode(_sfc_main$I, null, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$t, {
                                  for: "name",
                                  value: "Image",
                                  required: ""
                                }),
                                media_preview_url.value ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  class: "mx-auto h-60 rounded",
                                  src: media_preview_url.value
                                }, null, 8, ["src"])) : createCommentVNode("", true),
                                createVNode("input", {
                                  type: "file",
                                  class: "file-input file-input-bordered file-input-primary w-full",
                                  id: "media_id",
                                  onInput: checkIfMediaIsDuplicated
                                }, null, 32)
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "label ms-auto pb-0" }, [
                              createVNode("span", { class: "label-text-alt" }, [
                                createTextVNode(" Types de fichier acceptés: "),
                                createVNode("span", { class: "font-bold" }, ".mp4, .jpg, .jpeg, .png, .gif, .webp"),
                                createTextVNode(" - Taille maximale: "),
                                createVNode("span", { class: "font-bold" }, "25mo")
                              ])
                            ]),
                            createVNode(_sfc_main$O, {
                              message: unref(form).errors.media_id
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$t, {
                              for: "tags",
                              value: "Tags",
                              class: "my-2"
                            }),
                            createVNode(unref(Multiselect), {
                              id: "tags",
                              modelValue: unref(form).tags,
                              "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                              mode: "tags",
                              "close-on-select": false,
                              searchable: true,
                              "create-option": true,
                              options: tagsOptions.value
                            }, {
                              noresults: withCtx(() => [
                                createVNode("div", { class: "p-2" }, [
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Plus aucun élémént a afficher. ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                          ]),
                          duplicated.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex gap-4"
                          }, [
                            createVNode("div", null, [
                              createVNode("img", {
                                class: "mx-auto w-40 rounded-xl",
                                src: `/storage/${duplicated.value}`,
                                alt: ""
                              }, null, 8, ["src"])
                            ]),
                            createVNode(_sfc_main$y, { class: "h-full w-full lg:flex lg:flex-col" }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$M, { class: "font-bold text-info" }, {
                                  default: withCtx(() => [
                                    createTextVNode("1 image similaire a été trouvé!")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$M, { type: "sub" }, {
                                  default: withCtx(() => [
                                    createTextVNode("S'il s'agit d'une erreur, tu peux quand même la poster, elle sera vérifié dans tout les cas")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true),
                          unref(form).progress ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex flex-col text-center"
                          }, [
                            createVNode(_sfc_main$I, null, {
                              default: withCtx(() => [
                                createVNode("progress", {
                                  class: "progress progress-primary",
                                  value: unref(form).progress.percentage,
                                  max: "100"
                                }, null, 8, ["value"]),
                                createVNode(_sfc_main$M, { type: "sub" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(progressLabel)), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true),
                          createVNode(_sfc_main$z, {
                            class: ["btn", duplicated.value ? "btn-warning" : "btn-primary"],
                            loading: unref(form).processing,
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(duplicated.value ? `La poster quand même?` : "Ajouter"), 1)
                            ]),
                            _: 1
                          }, 8, ["class", "loading", "disabled"]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$M, {
                              type: "xs",
                              class: "italic"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" * Le mème sera en attente d'approbation par un administrateur avant d'être publié sur le site. Les administrateurs du site se réserve le droit de refuser toute image qui ne serait pas conforme. ")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ], 40, ["onSubmit"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$h, {
              medias: __props.medias,
              tags: __props.tags,
              "sort-by": __props.sortBy,
              "default-sort": __props.defaultSort
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$j, {
                id: "addMediaModal",
                title: "Ajouter un mème",
                "max-width": "4xl"
              }, {
                default: withCtx(() => [
                  createVNode("form", {
                    enctype: "multipart/form-data",
                    onSubmit: withModifiers(($event) => uploadMedia(), ["prevent"])
                  }, [
                    createVNode(_sfc_main$I, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode(_sfc_main$N, {
                            label: "Titre",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            "help-text": "50 caractères maximum.",
                            "max-length": "50",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$O, {
                            message: unref(form).errors.name
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "form-control" }, [
                          createVNode(_sfc_main$I, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$t, {
                                for: "name",
                                value: "Image",
                                required: ""
                              }),
                              media_preview_url.value ? (openBlock(), createBlock("img", {
                                key: 0,
                                class: "mx-auto h-60 rounded",
                                src: media_preview_url.value
                              }, null, 8, ["src"])) : createCommentVNode("", true),
                              createVNode("input", {
                                type: "file",
                                class: "file-input file-input-bordered file-input-primary w-full",
                                id: "media_id",
                                onInput: checkIfMediaIsDuplicated
                              }, null, 32)
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "label ms-auto pb-0" }, [
                            createVNode("span", { class: "label-text-alt" }, [
                              createTextVNode(" Types de fichier acceptés: "),
                              createVNode("span", { class: "font-bold" }, ".mp4, .jpg, .jpeg, .png, .gif, .webp"),
                              createTextVNode(" - Taille maximale: "),
                              createVNode("span", { class: "font-bold" }, "25mo")
                            ])
                          ]),
                          createVNode(_sfc_main$O, {
                            message: unref(form).errors.media_id
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$t, {
                            for: "tags",
                            value: "Tags",
                            class: "my-2"
                          }),
                          createVNode(unref(Multiselect), {
                            id: "tags",
                            modelValue: unref(form).tags,
                            "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                            mode: "tags",
                            "close-on-select": false,
                            searchable: true,
                            "create-option": true,
                            options: tagsOptions.value
                          }, {
                            noresults: withCtx(() => [
                              createVNode("div", { class: "p-2" }, [
                                createVNode(_sfc_main$M, { type: "sub" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Plus aucun élémént a afficher. ")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                        ]),
                        duplicated.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex gap-4"
                        }, [
                          createVNode("div", null, [
                            createVNode("img", {
                              class: "mx-auto w-40 rounded-xl",
                              src: `/storage/${duplicated.value}`,
                              alt: ""
                            }, null, 8, ["src"])
                          ]),
                          createVNode(_sfc_main$y, { class: "h-full w-full lg:flex lg:flex-col" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$M, { class: "font-bold text-info" }, {
                                default: withCtx(() => [
                                  createTextVNode("1 image similaire a été trouvé!")
                                ]),
                                _: 1
                              }),
                              createVNode(_sfc_main$M, { type: "sub" }, {
                                default: withCtx(() => [
                                  createTextVNode("S'il s'agit d'une erreur, tu peux quand même la poster, elle sera vérifié dans tout les cas")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true),
                        unref(form).progress ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex flex-col text-center"
                        }, [
                          createVNode(_sfc_main$I, null, {
                            default: withCtx(() => [
                              createVNode("progress", {
                                class: "progress progress-primary",
                                value: unref(form).progress.percentage,
                                max: "100"
                              }, null, 8, ["value"]),
                              createVNode(_sfc_main$M, { type: "sub" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(progressLabel)), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true),
                        createVNode(_sfc_main$z, {
                          class: ["btn", duplicated.value ? "btn-warning" : "btn-primary"],
                          loading: unref(form).processing,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(duplicated.value ? `La poster quand même?` : "Ajouter"), 1)
                          ]),
                          _: 1
                        }, 8, ["class", "loading", "disabled"]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$M, {
                            type: "xs",
                            class: "italic"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" * Le mème sera en attente d'approbation par un administrateur avant d'être publié sur le site. Les administrateurs du site se réserve le droit de refuser toute image qui ne serait pas conforme. ")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ], 40, ["onSubmit"])
                ]),
                _: 1
              }),
              createVNode(_sfc_main$h, {
                medias: __props.medias,
                tags: __props.tags,
                "sort-by": __props.sortBy,
                "default-sort": __props.defaultSort
              }, null, 8, ["medias", "tags", "sort-by", "default-sort"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Library.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$g
}, Symbol.toStringTag, { value: "Module" }));
const Show_vue_vue_type_style_index_0_lang = "";
const _sfc_main$f = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    media: {
      type: Object
    },
    tags: {
      type: Array
    },
    downloadedFile: {
      type: Array
    },
    related: {
      type: Array
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const page = usePage();
    const auth = (_a = page.props.auth) == null ? void 0 : _a.user;
    const form = useForm({
      name: null,
      tags: [],
      media_id: props.media.id
    });
    const downloadItem = async (item) => {
      const response = await axios.get(route("media.download", item.id), {
        responseType: "blob"
      });
      saveAs(response.data, item.path);
    };
    const canPerformAction = HelperService$1.checkRoles("super-admin", "admin") || auth && auth.id === props.media.user_id;
    const tagsOptions = computed(() => {
      return props.tags.map((tag) => {
        return {
          value: tag.name,
          label: tag.name
        };
      });
    });
    const getTags = () => {
      return _.map(props.media.tags, _.partialRight(_.pick, ["id", "name"]));
    };
    FormService$1.setForm(form).setRouteName("media");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${__props.media.name} - ${unref(_).map(getTags(), "name").join(", ")}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$C, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$I, { spacing: "2" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$M, {
                    type: "subtitle",
                    class: "text-3xl"
                  }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.media.name)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.media.name), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-x-1"${_scopeId2}><!--[-->`);
                  ssrRenderList(getTags(), (tag, index) => {
                    _push3(ssrRenderComponent(_sfc_main$F, { key: index }, {
                      default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(tag.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(tag.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div><div class="flex items-center"${_scopeId2}><div class="flex-1"${_scopeId2}><div class="flex items-center gap-x-4"${_scopeId2}><div class=""${_scopeId2}><a${ssrRenderAttr("href", _ctx.route("user.show", __props.media.user.username))}${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$E, {
                    user: __props.media.user
                  }, null, _parent3, _scopeId2));
                  _push3(`</a></div><div class="flex flex-col gap-2"${_scopeId2}><a${ssrRenderAttr("href", _ctx.route("user.show", __props.media.user.username))}${_scopeId2}>${ssrInterpolate(__props.media.user.username)} `);
                  _push3(ssrRenderComponent(_sfc_main$l, {
                    class: "!align-text-top",
                    user: __props.media.user
                  }, null, _parent3, _scopeId2));
                  _push3(`</a>`);
                  _push3(ssrRenderComponent(_sfc_main$o, {
                    size: "sm",
                    user: __props.media.user
                  }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Suivre `);
                      } else {
                        return [
                          createTextVNode(" Suivre ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="flex-1 text-right"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$I, { spacing: "1" }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      var _a2, _b;
                      if (_push4) {
                        _push4(`<div class="space-x-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$A, {
                          outline: "",
                          circle: "",
                          onClick: ($event) => unref(FormService$1).handle("like", __props.media, "get"),
                          disabled: unref(form).processing || !unref(auth),
                          type: unref(auth) ? ((_a2 = __props.media.likers) == null ? void 0 : _a2.map((liker) => liker.id).includes(
                            _ctx.$page.props.auth.user.id
                          )) ? "error" : "" : ""
                        }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$L, {
                                size: "xl",
                                name: "heart"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$L, {
                                  size: "xl",
                                  name: "heart"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$z, {
                          onClick: ($event) => downloadItem(__props.media),
                          disabled: unref(form).processing || !unref(auth),
                          class: "btn btn-circle btn-primary"
                        }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$L, {
                                size: "xl",
                                name: "arrow-down"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$L, {
                                  size: "xl",
                                  name: "arrow-down"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(canPerformAction)) {
                          _push4(ssrRenderComponent(_sfc_main$A, {
                            circle: "",
                            type: "info",
                            onClick: ($event) => unref(FormService$1).openModal("editMedia", __props.media),
                            disabled: unref(form).processing || !unref(auth)
                          }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_sfc_main$L, {
                                  size: "xl",
                                  name: "create"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_sfc_main$L, {
                                    size: "xl",
                                    name: "create"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_sfc_main$j, {
                          id: `editMediaModal${__props.media.id}`,
                          title: "Modification de ton mème"
                        }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$I, null, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$N, {
                                      label: "Nouveau titre",
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$t, {
                                      for: "tags",
                                      value: "Tags",
                                      class: "my-2"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(Multiselect), {
                                      id: "tags",
                                      modelValue: unref(form).tags,
                                      "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                      mode: "tags",
                                      "close-on-select": false,
                                      searchable: true,
                                      "create-option": true,
                                      options: tagsOptions.value
                                    }, {
                                      noresults: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="p-2"${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_sfc_main$M, { type: "sub" }, {
                                            default: withCtx((_8, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` Plus aucun élémént a afficher. `);
                                              } else {
                                                return [
                                                  createTextVNode(" Plus aucun élémént a afficher. ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`</div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "p-2" }, [
                                              createVNode(_sfc_main$M, { type: "sub" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Plus aucun élémént a afficher. ")
                                                ]),
                                                _: 1
                                              })
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="text-right"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$M, { type: "xs" }, {
                                      default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Les tags seront synchronisés après modification.`);
                                        } else {
                                          return [
                                            createTextVNode("Les tags seront synchronisés après modification.")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div></div>`);
                                    _push6(ssrRenderComponent(_sfc_main$z, {
                                      onClick: ($event) => unref(FormService$1).handle("update", __props.media),
                                      loading: unref(form).processing
                                    }, {
                                      default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Modifier ton mème `);
                                        } else {
                                          return [
                                            createTextVNode(" Modifier ton mème ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$N, {
                                        label: "Nouveau titre",
                                        modelValue: unref(form).name,
                                        "onUpdate:modelValue": ($event) => unref(form).name = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$t, {
                                          for: "tags",
                                          value: "Tags",
                                          class: "my-2"
                                        }),
                                        createVNode(unref(Multiselect), {
                                          id: "tags",
                                          modelValue: unref(form).tags,
                                          "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                          mode: "tags",
                                          "close-on-select": false,
                                          searchable: true,
                                          "create-option": true,
                                          options: tagsOptions.value
                                        }, {
                                          noresults: withCtx(() => [
                                            createVNode("div", { class: "p-2" }, [
                                              createVNode(_sfc_main$M, { type: "sub" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Plus aucun élémént a afficher. ")
                                                ]),
                                                _: 1
                                              })
                                            ])
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                                        createVNode("div", { class: "text-right" }, [
                                          createVNode(_sfc_main$M, { type: "xs" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Les tags seront synchronisés après modification.")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      createVNode(_sfc_main$z, {
                                        onClick: ($event) => unref(FormService$1).handle("update", __props.media),
                                        loading: unref(form).processing
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Modifier ton mème ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick", "loading"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$I, null, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$N, {
                                      label: "Nouveau titre",
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", null, [
                                      createVNode(_sfc_main$t, {
                                        for: "tags",
                                        value: "Tags",
                                        class: "my-2"
                                      }),
                                      createVNode(unref(Multiselect), {
                                        id: "tags",
                                        modelValue: unref(form).tags,
                                        "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                        mode: "tags",
                                        "close-on-select": false,
                                        searchable: true,
                                        "create-option": true,
                                        options: tagsOptions.value
                                      }, {
                                        noresults: withCtx(() => [
                                          createVNode("div", { class: "p-2" }, [
                                            createVNode(_sfc_main$M, { type: "sub" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Plus aucun élémént a afficher. ")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                                      createVNode("div", { class: "text-right" }, [
                                        createVNode(_sfc_main$M, { type: "xs" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Les tags seront synchronisés après modification.")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    createVNode(_sfc_main$z, {
                                      onClick: ($event) => unref(FormService$1).handle("update", __props.media),
                                      loading: unref(form).processing
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Modifier ton mème ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick", "loading"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(canPerformAction)) {
                          _push4(ssrRenderComponent(_sfc_main$z, {
                            onClick: ($event) => unref(FormService$1).setForm(unref(form)).setRouteName("media").handle("destroy", __props.media),
                            class: "btn btn-circle btn-error"
                          }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_sfc_main$L, {
                                  size: "xl",
                                  name: "trash"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_sfc_main$L, {
                                    size: "xl",
                                    name: "trash"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(_sfc_main$M, null, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(HelperService$1).plural(
                                __props.media.download_count,
                                "téléchargement"
                              ))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                  __props.media.download_count,
                                  "téléchargement"
                                )), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$M, null, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(HelperService$1).plural(
                                __props.media.likers.length,
                                "j'aime"
                              ))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                  __props.media.likers.length,
                                  "j'aime"
                                )), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "space-x-1" }, [
                            createVNode(_sfc_main$A, {
                              outline: "",
                              circle: "",
                              onClick: ($event) => unref(FormService$1).handle("like", __props.media, "get"),
                              disabled: unref(form).processing || !unref(auth),
                              type: unref(auth) ? ((_b = __props.media.likers) == null ? void 0 : _b.map((liker) => liker.id).includes(
                                _ctx.$page.props.auth.user.id
                              )) ? "error" : "" : ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$L, {
                                  size: "xl",
                                  name: "heart"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled", "type"]),
                            createVNode(_sfc_main$z, {
                              onClick: ($event) => downloadItem(__props.media),
                              disabled: unref(form).processing || !unref(auth),
                              class: "btn btn-circle btn-primary"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$L, {
                                  size: "xl",
                                  name: "arrow-down"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"]),
                            unref(canPerformAction) ? (openBlock(), createBlock(_sfc_main$A, {
                              key: 0,
                              circle: "",
                              type: "info",
                              onClick: ($event) => unref(FormService$1).openModal("editMedia", __props.media),
                              disabled: unref(form).processing || !unref(auth)
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$L, {
                                  size: "xl",
                                  name: "create"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"])) : createCommentVNode("", true),
                            createVNode(_sfc_main$j, {
                              id: `editMediaModal${__props.media.id}`,
                              title: "Modification de ton mème"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$I, null, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$N, {
                                      label: "Nouveau titre",
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", null, [
                                      createVNode(_sfc_main$t, {
                                        for: "tags",
                                        value: "Tags",
                                        class: "my-2"
                                      }),
                                      createVNode(unref(Multiselect), {
                                        id: "tags",
                                        modelValue: unref(form).tags,
                                        "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                        mode: "tags",
                                        "close-on-select": false,
                                        searchable: true,
                                        "create-option": true,
                                        options: tagsOptions.value
                                      }, {
                                        noresults: withCtx(() => [
                                          createVNode("div", { class: "p-2" }, [
                                            createVNode(_sfc_main$M, { type: "sub" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Plus aucun élémént a afficher. ")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                                      createVNode("div", { class: "text-right" }, [
                                        createVNode(_sfc_main$M, { type: "xs" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Les tags seront synchronisés après modification.")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    createVNode(_sfc_main$z, {
                                      onClick: ($event) => unref(FormService$1).handle("update", __props.media),
                                      loading: unref(form).processing
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Modifier ton mème ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick", "loading"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["id"]),
                            unref(canPerformAction) ? (openBlock(), createBlock(_sfc_main$z, {
                              key: 1,
                              onClick: ($event) => unref(FormService$1).setForm(unref(form)).setRouteName("media").handle("destroy", __props.media),
                              class: "btn btn-circle btn-error"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$L, {
                                  size: "xl",
                                  name: "trash"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          createVNode(_sfc_main$M, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                __props.media.download_count,
                                "téléchargement"
                              )), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$M, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                __props.media.likers.length,
                                "j'aime"
                              )), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="max-w-full"${_scopeId2}>`);
                  if (__props.media.extension === "mp4") {
                    _push3(`<video controls class="mx-auto h-full w-96 rounded-lg shadow"${ssrRenderAttr("src", `/storage/${__props.media.path}`)}${_scopeId2}></video>`);
                  } else {
                    _push3(`<img class="mx-auto h-96 w-full rounded-lg object-contain"${ssrRenderAttr("src", `/storage/${__props.media.path}`)}${ssrRenderAttr("alt", __props.media.name)} loading="lazy"${_scopeId2}>`);
                  }
                  _push3(`</div>`);
                  if (__props.related && __props.related.length) {
                    _push3(`<div class="mt-8"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$I, null, {
                      default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$M, { type: "subtitle" }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Images similaires`);
                              } else {
                                return [
                                  createTextVNode("Images similaires")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<div class="grid grid-cols-1 gap-4 lg:grid-cols-4"${_scopeId3}><!--[-->`);
                          ssrRenderList(__props.related, (related, index) => {
                            _push4(ssrRenderComponent(_sfc_main$i, { media: related }, null, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          return [
                            createVNode(_sfc_main$M, { type: "subtitle" }, {
                              default: withCtx(() => [
                                createTextVNode("Images similaires")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "grid grid-cols-1 gap-4 lg:grid-cols-4" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.related, (related, index) => {
                                return openBlock(), createBlock(_sfc_main$i, {
                                  key: index,
                                  media: related
                                }, null, 8, ["media"]);
                              }), 128))
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_sfc_main$M, {
                      type: "subtitle",
                      class: "text-3xl"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.media.name), 1)
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-x-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(getTags(), (tag, index) => {
                        return openBlock(), createBlock(_sfc_main$F, { key: index }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(tag.name), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("div", { class: "flex items-center gap-x-4" }, [
                          createVNode("div", { class: "" }, [
                            createVNode("a", {
                              href: _ctx.route("user.show", __props.media.user.username)
                            }, [
                              createVNode(_sfc_main$E, {
                                user: __props.media.user
                              }, null, 8, ["user"])
                            ], 8, ["href"])
                          ]),
                          createVNode("div", { class: "flex flex-col gap-2" }, [
                            createVNode("a", {
                              href: _ctx.route("user.show", __props.media.user.username)
                            }, [
                              createTextVNode(toDisplayString(__props.media.user.username) + " ", 1),
                              createVNode(_sfc_main$l, {
                                class: "!align-text-top",
                                user: __props.media.user
                              }, null, 8, ["user"])
                            ], 8, ["href"]),
                            createVNode(_sfc_main$o, {
                              size: "sm",
                              user: __props.media.user
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Suivre ")
                              ]),
                              _: 1
                            }, 8, ["user"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex-1 text-right" }, [
                        createVNode(_sfc_main$I, { spacing: "1" }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createVNode("div", { class: "space-x-1" }, [
                                createVNode(_sfc_main$A, {
                                  outline: "",
                                  circle: "",
                                  onClick: ($event) => unref(FormService$1).handle("like", __props.media, "get"),
                                  disabled: unref(form).processing || !unref(auth),
                                  type: unref(auth) ? ((_a2 = __props.media.likers) == null ? void 0 : _a2.map((liker) => liker.id).includes(
                                    _ctx.$page.props.auth.user.id
                                  )) ? "error" : "" : ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$L, {
                                      size: "xl",
                                      name: "heart"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled", "type"]),
                                createVNode(_sfc_main$z, {
                                  onClick: ($event) => downloadItem(__props.media),
                                  disabled: unref(form).processing || !unref(auth),
                                  class: "btn btn-circle btn-primary"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$L, {
                                      size: "xl",
                                      name: "arrow-down"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"]),
                                unref(canPerformAction) ? (openBlock(), createBlock(_sfc_main$A, {
                                  key: 0,
                                  circle: "",
                                  type: "info",
                                  onClick: ($event) => unref(FormService$1).openModal("editMedia", __props.media),
                                  disabled: unref(form).processing || !unref(auth)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$L, {
                                      size: "xl",
                                      name: "create"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"])) : createCommentVNode("", true),
                                createVNode(_sfc_main$j, {
                                  id: `editMediaModal${__props.media.id}`,
                                  title: "Modification de ton mème"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$I, null, {
                                      default: withCtx(() => [
                                        createVNode(_sfc_main$N, {
                                          label: "Nouveau titre",
                                          modelValue: unref(form).name,
                                          "onUpdate:modelValue": ($event) => unref(form).name = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode("div", null, [
                                          createVNode(_sfc_main$t, {
                                            for: "tags",
                                            value: "Tags",
                                            class: "my-2"
                                          }),
                                          createVNode(unref(Multiselect), {
                                            id: "tags",
                                            modelValue: unref(form).tags,
                                            "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                            mode: "tags",
                                            "close-on-select": false,
                                            searchable: true,
                                            "create-option": true,
                                            options: tagsOptions.value
                                          }, {
                                            noresults: withCtx(() => [
                                              createVNode("div", { class: "p-2" }, [
                                                createVNode(_sfc_main$M, { type: "sub" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Plus aucun élémént a afficher. ")
                                                  ]),
                                                  _: 1
                                                })
                                              ])
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                                          createVNode("div", { class: "text-right" }, [
                                            createVNode(_sfc_main$M, { type: "xs" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Les tags seront synchronisés après modification.")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        createVNode(_sfc_main$z, {
                                          onClick: ($event) => unref(FormService$1).handle("update", __props.media),
                                          loading: unref(form).processing
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Modifier ton mème ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick", "loading"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["id"]),
                                unref(canPerformAction) ? (openBlock(), createBlock(_sfc_main$z, {
                                  key: 1,
                                  onClick: ($event) => unref(FormService$1).setForm(unref(form)).setRouteName("media").handle("destroy", __props.media),
                                  class: "btn btn-circle btn-error"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$L, {
                                      size: "xl",
                                      name: "trash"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true)
                              ]),
                              createVNode(_sfc_main$M, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                    __props.media.download_count,
                                    "téléchargement"
                                  )), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(_sfc_main$M, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                    __props.media.likers.length,
                                    "j'aime"
                                  )), 1)
                                ]),
                                _: 1
                              })
                            ];
                          }),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "max-w-full" }, [
                      __props.media.extension === "mp4" ? (openBlock(), createBlock("video", {
                        key: 0,
                        controls: "",
                        class: "mx-auto h-full w-96 rounded-lg shadow",
                        src: `/storage/${__props.media.path}`
                      }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                        key: 1,
                        class: "mx-auto h-96 w-full rounded-lg object-contain",
                        src: `/storage/${__props.media.path}`,
                        alt: __props.media.name,
                        loading: "lazy"
                      }, null, 8, ["src", "alt"]))
                    ]),
                    __props.related && __props.related.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-8"
                    }, [
                      createVNode(_sfc_main$I, null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$M, { type: "subtitle" }, {
                            default: withCtx(() => [
                              createTextVNode("Images similaires")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "grid grid-cols-1 gap-4 lg:grid-cols-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.related, (related, index) => {
                              return openBlock(), createBlock(_sfc_main$i, {
                                key: index,
                                media: related
                              }, null, 8, ["media"]);
                            }), 128))
                          ])
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$I, { spacing: "2" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$M, {
                    type: "subtitle",
                    class: "text-3xl"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.media.name), 1)
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-x-1" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(getTags(), (tag, index) => {
                      return openBlock(), createBlock(_sfc_main$F, { key: index }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(tag.name), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]),
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("div", { class: "flex items-center gap-x-4" }, [
                        createVNode("div", { class: "" }, [
                          createVNode("a", {
                            href: _ctx.route("user.show", __props.media.user.username)
                          }, [
                            createVNode(_sfc_main$E, {
                              user: __props.media.user
                            }, null, 8, ["user"])
                          ], 8, ["href"])
                        ]),
                        createVNode("div", { class: "flex flex-col gap-2" }, [
                          createVNode("a", {
                            href: _ctx.route("user.show", __props.media.user.username)
                          }, [
                            createTextVNode(toDisplayString(__props.media.user.username) + " ", 1),
                            createVNode(_sfc_main$l, {
                              class: "!align-text-top",
                              user: __props.media.user
                            }, null, 8, ["user"])
                          ], 8, ["href"]),
                          createVNode(_sfc_main$o, {
                            size: "sm",
                            user: __props.media.user
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Suivre ")
                            ]),
                            _: 1
                          }, 8, ["user"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex-1 text-right" }, [
                      createVNode(_sfc_main$I, { spacing: "1" }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createVNode("div", { class: "space-x-1" }, [
                              createVNode(_sfc_main$A, {
                                outline: "",
                                circle: "",
                                onClick: ($event) => unref(FormService$1).handle("like", __props.media, "get"),
                                disabled: unref(form).processing || !unref(auth),
                                type: unref(auth) ? ((_a2 = __props.media.likers) == null ? void 0 : _a2.map((liker) => liker.id).includes(
                                  _ctx.$page.props.auth.user.id
                                )) ? "error" : "" : ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$L, {
                                    size: "xl",
                                    name: "heart"
                                  })
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled", "type"]),
                              createVNode(_sfc_main$z, {
                                onClick: ($event) => downloadItem(__props.media),
                                disabled: unref(form).processing || !unref(auth),
                                class: "btn btn-circle btn-primary"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$L, {
                                    size: "xl",
                                    name: "arrow-down"
                                  })
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"]),
                              unref(canPerformAction) ? (openBlock(), createBlock(_sfc_main$A, {
                                key: 0,
                                circle: "",
                                type: "info",
                                onClick: ($event) => unref(FormService$1).openModal("editMedia", __props.media),
                                disabled: unref(form).processing || !unref(auth)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$L, {
                                    size: "xl",
                                    name: "create"
                                  })
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"])) : createCommentVNode("", true),
                              createVNode(_sfc_main$j, {
                                id: `editMediaModal${__props.media.id}`,
                                title: "Modification de ton mème"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$I, null, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$N, {
                                        label: "Nouveau titre",
                                        modelValue: unref(form).name,
                                        "onUpdate:modelValue": ($event) => unref(form).name = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$t, {
                                          for: "tags",
                                          value: "Tags",
                                          class: "my-2"
                                        }),
                                        createVNode(unref(Multiselect), {
                                          id: "tags",
                                          modelValue: unref(form).tags,
                                          "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                          mode: "tags",
                                          "close-on-select": false,
                                          searchable: true,
                                          "create-option": true,
                                          options: tagsOptions.value
                                        }, {
                                          noresults: withCtx(() => [
                                            createVNode("div", { class: "p-2" }, [
                                              createVNode(_sfc_main$M, { type: "sub" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Plus aucun élémént a afficher. ")
                                                ]),
                                                _: 1
                                              })
                                            ])
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                                        createVNode("div", { class: "text-right" }, [
                                          createVNode(_sfc_main$M, { type: "xs" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Les tags seront synchronisés après modification.")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      createVNode(_sfc_main$z, {
                                        onClick: ($event) => unref(FormService$1).handle("update", __props.media),
                                        loading: unref(form).processing
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Modifier ton mème ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick", "loading"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["id"]),
                              unref(canPerformAction) ? (openBlock(), createBlock(_sfc_main$z, {
                                key: 1,
                                onClick: ($event) => unref(FormService$1).setForm(unref(form)).setRouteName("media").handle("destroy", __props.media),
                                class: "btn btn-circle btn-error"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$L, {
                                    size: "xl",
                                    name: "trash"
                                  })
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true)
                            ]),
                            createVNode(_sfc_main$M, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                  __props.media.download_count,
                                  "téléchargement"
                                )), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$M, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                  __props.media.likers.length,
                                  "j'aime"
                                )), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", { class: "max-w-full" }, [
                    __props.media.extension === "mp4" ? (openBlock(), createBlock("video", {
                      key: 0,
                      controls: "",
                      class: "mx-auto h-full w-96 rounded-lg shadow",
                      src: `/storage/${__props.media.path}`
                    }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                      key: 1,
                      class: "mx-auto h-96 w-full rounded-lg object-contain",
                      src: `/storage/${__props.media.path}`,
                      alt: __props.media.name,
                      loading: "lazy"
                    }, null, 8, ["src", "alt"]))
                  ]),
                  __props.related && __props.related.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-8"
                  }, [
                    createVNode(_sfc_main$I, null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$M, { type: "subtitle" }, {
                          default: withCtx(() => [
                            createTextVNode("Images similaires")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 lg:grid-cols-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.related, (related, index) => {
                            return openBlock(), createBlock(_sfc_main$i, {
                              key: index,
                              media: related
                            }, null, 8, ["media"]);
                          }), 128))
                        ])
                      ]),
                      _: 1
                    })
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Medias/Show.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$f
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = {
  __name: "ChangeTheme",
  __ssrInlineRender: true,
  setup(__props) {
    const availableThemes = [
      {
        label: "Foncé",
        name: "dark",
        type: "dark"
      },
      {
        label: "Noir",
        name: "black",
        type: "dark"
      },
      {
        label: "Synthwave",
        name: "synthwave",
        type: "dark"
      },
      {
        label: "Clair",
        name: "light",
        type: "light"
      },
      {
        label: "Froid",
        name: "nord",
        type: "light"
      },
      {
        label: "Pastel",
        name: "pastel",
        type: "light"
      }
    ];
    onMounted(() => {
      HelperService$1.setTheme();
      currentTheme();
    });
    const currentTheme = () => {
      return localStorage.getItem("theme");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header><h2 class="text-lg font-medium">Changer le thème global du site</h2><p class="mt-1 text-sm text-gray-600 dark:text-gray-400"> Mettez le site à votre image en changeant de thème. </p></header><div class="mt-6 flex flex-col gap-10 lg:flex-row"><div class="flex-1"><p class="mb-2 font-bold">Thème foncé</p><!--[-->`);
      ssrRenderList(availableThemes.filter(
        (t4) => t4.type === "dark"
      ), (theme) => {
        _push(`<div class="form-control"><label class="label cursor-pointer gap-4"><span class="label-text">${ssrInterpolate(theme.label)}</span><input type="radio" name="theme-radios" class="theme-controller radio"${ssrRenderAttr("value", theme.name)}${ssrIncludeBooleanAttr(currentTheme() === theme.name) ? " checked" : ""}></label></div>`);
      });
      _push(`<!--]--></div><div class="flex-1"><p class="mb-2 font-bold">Thème clair</p><!--[-->`);
      ssrRenderList(availableThemes.filter(
        (t4) => t4.type === "light"
      ), (theme) => {
        _push(`<div class="form-control"><label class="label cursor-pointer gap-4"><span class="label-text">${ssrInterpolate(theme.label)}</span><input type="radio" name="theme-radios" class="theme-controller radio"${ssrRenderAttr("value", theme.name)}${ssrIncludeBooleanAttr(currentTheme() === theme.name) ? " checked" : ""}></label></div>`);
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/ChangeTheme.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = {
  __name: "DeleteUserForm",
  __ssrInlineRender: true,
  setup(__props) {
    const passwordInput = ref(null);
    const form = useForm({
      password: ""
    });
    const deleteUser = () => {
      form.delete(route("profile.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset()
      });
    };
    const closeModal = () => {
      confirmingUserDeletion.value = false;
      form.reset();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header><h2 class="text-lg font-medium text-error">Supprimer le compte</h2><p class="mt-4 text-sm text-gray-600 dark:text-gray-400"> Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées. Avant de supprimer votre compte, veuillez télécharger toutes les données ou informations que vous souhaitez conserver. </p></header><button class="btn btn-error mt-4"> Supprimer le compte </button>`);
      _push(ssrRenderComponent(_sfc_main$j, {
        id: "deleteAccountModal",
        onClose: closeModal
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h2 class="text-lg font-medium text-gray-900 dark:text-gray-100"${_scopeId}> Êtes-vous sûr de vouloir supprimer votre compte ? </h2><p class="mt-1 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées. Veuillez saisir votre mot de passe pour confirmer que vous souhaitez supprimer définitivement votre compte. </p>`);
            _push2(ssrRenderComponent(_sfc_main$N, {
              label: "Mot de passe",
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-3/4",
              placeholder: "Password",
              onKeyup: deleteUser
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$O, {
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-6 flex justify-end"${_scopeId}><button class="btn btn-secondary"${_scopeId}> Annuler </button><button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-error ms-3"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Supprimer le compte </button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h2", { class: "text-lg font-medium text-gray-900 dark:text-gray-100" }, " Êtes-vous sûr de vouloir supprimer votre compte ? "),
                createVNode("p", { class: "mt-1 text-sm text-gray-600 dark:text-gray-400" }, " Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées. Veuillez saisir votre mot de passe pour confirmer que vous souhaitez supprimer définitivement votre compte. "),
                createVNode(_sfc_main$N, {
                  label: "Mot de passe",
                  ref_key: "passwordInput",
                  ref: passwordInput,
                  modelValue: unref(form).password,
                  "onUpdate:modelValue": ($event) => unref(form).password = $event,
                  type: "password",
                  class: "mt-1 block w-3/4",
                  placeholder: "Password",
                  onKeyup: withKeys(deleteUser, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$O, {
                  message: unref(form).errors.password
                }, null, 8, ["message"]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode("button", {
                    class: "btn btn-secondary",
                    onClick: ($event) => unref(FormService$1).closeModal("deleteAccount")
                  }, " Annuler ", 8, ["onClick"]),
                  createVNode("button", {
                    class: ["btn btn-error ms-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: deleteUser
                  }, " Supprimer le compte ", 10, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$d
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = {
  __name: "UpdatePasswordForm",
  __ssrInlineRender: true,
  setup(__props) {
    const passwordInput = ref(null);
    const currentPasswordInput = ref(null);
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header><h2 class="text-lg font-medium">Mise à jour du mot de passe</h2><p class="mt-1 text-sm text-gray-600 dark:text-gray-400"> Veillez à ce que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé. </p></header><form class="mt-6 space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$N, {
        label: "Mot de passe actuel",
        ref_key: "currentPasswordInput",
        ref: currentPasswordInput,
        modelValue: unref(form).current_password,
        "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
        type: "password",
        autocomplete: "current-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$O, {
        message: unref(form).errors.current_password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$N, {
        label: "Nouveau mot de passe",
        ref_key: "passwordInput",
        ref: passwordInput,
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "new-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$O, {
        message: unref(form).errors.password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$N, {
        label: "Confirmation du mot de passe",
        id: "password_confirmation",
        modelValue: unref(form).password_confirmation,
        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "new-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$O, {
        message: unref(form).errors.password_confirmation
      }, null, _parent));
      _push(`<div class="flex items-center gap-4"><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}> Sauvegarder </button>`);
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-sm text-gray-600 dark:text-gray-400"> Saved. </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form><!--]-->`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$c
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = {
  __name: "UpdateProfileInformationForm",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    const user = usePage().props.auth.user;
    const form = useForm({
      email: user.email
    });
    FormService$1.setForm(form).setRouteName("profile");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header><h2 class="text-lg font-medium">Informations du profil</h2><p class="mt-1 text-sm text-gray-600 dark:text-gray-400"> Mettez à jour les informations de profil et l&#39;adresse email de votre compte. </p></header><form class="mt-6 space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$N, {
        label: "Adresse e-mail",
        type: "email",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        required: "",
        autocomplete: "username"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$O, {
        message: unref(form).errors.email
      }, null, _parent));
      if (__props.mustVerifyEmail && unref(user).email_verified_at === null) {
        _push(`<div><p class="mt-2 text-sm text-gray-800 dark:text-gray-200"> Votre adresse email n&#39;est pas vérifiée. `);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("verification.send"),
          method: "post",
          as: "button",
          class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Cliquez ici pour renvoyer l&#39;e-mail de vérification. `);
            } else {
              return [
                createTextVNode(" Cliquez ici pour renvoyer l'e-mail de vérification. ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><div style="${ssrRenderStyle(__props.status === "verification-link-sent" ? null : { display: "none" })}" class="mt-2 text-sm font-medium text-green-600 dark:text-green-400"> Un nouveau lien de vérification a été envoyé à votre adresse email. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-4"><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}> Sauvegarder </button></div></form><!--]-->`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$C, mergeProps({ title: "Mon compte" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$y, null, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$e, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$e)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$y, null, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$b, {
                    "must-verify-email": __props.mustVerifyEmail,
                    status: __props.status
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$b, {
                      "must-verify-email": __props.mustVerifyEmail,
                      status: __props.status
                    }, null, 8, ["must-verify-email", "status"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$y, null, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$c, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$c)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$y, null, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$d, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$d)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$y, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$e)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$y, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$b, {
                    "must-verify-email": __props.mustVerifyEmail,
                    status: __props.status
                  }, null, 8, ["must-verify-email", "status"])
                ]),
                _: 1
              }),
              createVNode(_sfc_main$y, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$c)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$y, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$d)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {
  __name: "UserCard",
  __ssrInlineRender: true,
  props: {
    user: {
      type: Array
    },
    hasBackground: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card w-96 bg-base-300 shadow-xl" }, _attrs))}><figure class="px-10 pt-10">`);
      _push(ssrRenderComponent(_sfc_main$E, {
        size: "xl",
        user: __props.user
      }, null, _parent));
      _push(`</figure><div class="card-body items-center text-center"><a${ssrRenderAttr("href", _ctx.route("user.show", __props.user.username))} class="card-title">${ssrInterpolate(__props.user.username)} `);
      _push(ssrRenderComponent(_sfc_main$l, { user: __props.user }, null, _parent));
      _push(`</a>`);
      if (__props.user.description) {
        _push(`<p>${ssrInterpolate(__props.user.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card-actions">`);
      _push(ssrRenderComponent(_sfc_main$o, { user: __props.user }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/User/UserCard.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
  __name: "Search",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String
    },
    query: {
      type: String
    },
    result: {
      type: Array
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      query: props.query ?? null,
      type: props.type ?? "medias"
    });
    const title = computed(() => {
      var _a;
      if ((_a = props.result) == null ? void 0 : _a.total) {
        return `${HelperService$1.plural(
          props.result.total,
          "résultat"
        )} pour la recherche '${props.query}'`;
      }
      return "Recherche un mème, un tag, ou un utilisateur";
    });
    const searchByType = [
      {
        name: "medias",
        label: "Mèmes"
      },
      {
        name: "users",
        label: "Utilisateurs"
      }
    ];
    const search = () => {
      form.get(route("search"), {
        onSuccess: () => {
          router.reload({
            only: ["result"]
          });
        }
      });
    };
    const queryPlaceholder = computed(() => {
      switch (form.type) {
        case "users":
          return `Rechercher par nom d'utilisateur (ex: john, jack...)`;
        case "medias":
          return "Rechercher par titre, tags... (ex: paqueta, snap...)";
      }
      return null;
    });
    FormService$1.setForm(form).setRouteName(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Recherche" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$C, { title: title.value }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$I, { spacing: "8" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form${_scopeId2}><div class="flex flex-col items-center gap-4 lg:flex-row"${_scopeId2}><label class="form-control w-full lg:w-1/4"${_scopeId2}><select class="select select-bordered bg-base-300"${_scopeId2}><!--[-->`);
                  ssrRenderList(searchByType, (option, index) => {
                    _push3(`<option${ssrRenderAttr("value", option.name)}${_scopeId2}>${ssrInterpolate(option.label)}</option>`);
                  });
                  _push3(`<!--]--></select></label>`);
                  _push3(ssrRenderComponent(_sfc_main$N, {
                    modelValue: unref(form).query,
                    "onUpdate:modelValue": ($event) => unref(form).query = $event,
                    type: unref(form).type,
                    placeholder: queryPlaceholder.value
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$z, {
                    loading: unref(form).processing,
                    class: "ms-auto lg:m-auto"
                  }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Rechercher `);
                      } else {
                        return [
                          createTextVNode(" Rechercher ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                  if (__props.type === "medias" && !unref(form).processing) {
                    _push3(ssrRenderComponent(_sfc_main$h, { medias: __props.result }, null, _parent3, _scopeId2));
                  } else if (__props.type === "users" && !unref(form).processing) {
                    _push3(`<div class="flex gap-4"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.result.data, (user, index) => {
                      _push3(ssrRenderComponent(_sfc_main$9, {
                        key: index,
                        user
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!__props.query) {
                    _push3(`<img src="/images/assets/wait.jpg" class="mx-auto w-80 rounded-lg shadow-lg"${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(form).processing) {
                    _push3(`<!--[--><div class="flex flex-col gap-4"${_scopeId2}><div class="skeleton h-32 w-full"${_scopeId2}></div><div class="skeleton h-4 w-28"${_scopeId2}></div><div class="skeleton h-4 w-full"${_scopeId2}></div><div class="skeleton h-4 w-full"${_scopeId2}></div></div><div class="flex flex-col gap-4"${_scopeId2}><div class="skeleton h-32 w-full"${_scopeId2}></div><div class="skeleton h-4 w-28"${_scopeId2}></div><div class="skeleton h-4 w-full"${_scopeId2}></div><div class="skeleton h-4 w-full"${_scopeId2}></div></div><!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.result && __props.result.data && __props.result.data.length === 0 && !unref(form).processing) {
                    _push3(`<div class="alert alert-info"${_scopeId2}> Aucun résultat a afficher. Essayer avec un autre terme. </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(search, ["prevent"])
                    }, [
                      createVNode("div", { class: "flex flex-col items-center gap-4 lg:flex-row" }, [
                        createVNode("label", { class: "form-control w-full lg:w-1/4" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).type = $event,
                            class: "select select-bordered bg-base-300"
                          }, [
                            (openBlock(), createBlock(Fragment, null, renderList(searchByType, (option, index) => {
                              return createVNode("option", {
                                key: index,
                                value: option.name
                              }, toDisplayString(option.label), 9, ["value"]);
                            }), 64))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).type]
                          ])
                        ]),
                        createVNode(_sfc_main$N, {
                          modelValue: unref(form).query,
                          "onUpdate:modelValue": ($event) => unref(form).query = $event,
                          type: unref(form).type,
                          placeholder: queryPlaceholder.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "placeholder"]),
                        createVNode(_sfc_main$z, {
                          loading: unref(form).processing,
                          class: "ms-auto lg:m-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Rechercher ")
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ])
                    ], 32),
                    __props.type === "medias" && !unref(form).processing ? (openBlock(), createBlock(_sfc_main$h, {
                      key: 0,
                      medias: __props.result
                    }, null, 8, ["medias"])) : __props.type === "users" && !unref(form).processing ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex gap-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.result.data, (user, index) => {
                        return openBlock(), createBlock(_sfc_main$9, {
                          key: index,
                          user
                        }, null, 8, ["user"]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    !__props.query ? (openBlock(), createBlock("img", {
                      key: 2,
                      src: "/images/assets/wait.jpg",
                      class: "mx-auto w-80 rounded-lg shadow-lg"
                    })) : createCommentVNode("", true),
                    unref(form).processing ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                      createVNode("div", { class: "flex flex-col gap-4" }, [
                        createVNode("div", { class: "skeleton h-32 w-full" }),
                        createVNode("div", { class: "skeleton h-4 w-28" }),
                        createVNode("div", { class: "skeleton h-4 w-full" }),
                        createVNode("div", { class: "skeleton h-4 w-full" })
                      ]),
                      createVNode("div", { class: "flex flex-col gap-4" }, [
                        createVNode("div", { class: "skeleton h-32 w-full" }),
                        createVNode("div", { class: "skeleton h-4 w-28" }),
                        createVNode("div", { class: "skeleton h-4 w-full" }),
                        createVNode("div", { class: "skeleton h-4 w-full" })
                      ])
                    ], 64)) : createCommentVNode("", true),
                    __props.result && __props.result.data && __props.result.data.length === 0 && !unref(form).processing ? (openBlock(), createBlock("div", {
                      key: 4,
                      class: "alert alert-info"
                    }, " Aucun résultat a afficher. Essayer avec un autre terme. ")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$I, { spacing: "8" }, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(search, ["prevent"])
                  }, [
                    createVNode("div", { class: "flex flex-col items-center gap-4 lg:flex-row" }, [
                      createVNode("label", { class: "form-control w-full lg:w-1/4" }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).type = $event,
                          class: "select select-bordered bg-base-300"
                        }, [
                          (openBlock(), createBlock(Fragment, null, renderList(searchByType, (option, index) => {
                            return createVNode("option", {
                              key: index,
                              value: option.name
                            }, toDisplayString(option.label), 9, ["value"]);
                          }), 64))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).type]
                        ])
                      ]),
                      createVNode(_sfc_main$N, {
                        modelValue: unref(form).query,
                        "onUpdate:modelValue": ($event) => unref(form).query = $event,
                        type: unref(form).type,
                        placeholder: queryPlaceholder.value
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "placeholder"]),
                      createVNode(_sfc_main$z, {
                        loading: unref(form).processing,
                        class: "ms-auto lg:m-auto"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Rechercher ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ])
                  ], 32),
                  __props.type === "medias" && !unref(form).processing ? (openBlock(), createBlock(_sfc_main$h, {
                    key: 0,
                    medias: __props.result
                  }, null, 8, ["medias"])) : __props.type === "users" && !unref(form).processing ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex gap-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.result.data, (user, index) => {
                      return openBlock(), createBlock(_sfc_main$9, {
                        key: index,
                        user
                      }, null, 8, ["user"]);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  !__props.query ? (openBlock(), createBlock("img", {
                    key: 2,
                    src: "/images/assets/wait.jpg",
                    class: "mx-auto w-80 rounded-lg shadow-lg"
                  })) : createCommentVNode("", true),
                  unref(form).processing ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                    createVNode("div", { class: "flex flex-col gap-4" }, [
                      createVNode("div", { class: "skeleton h-32 w-full" }),
                      createVNode("div", { class: "skeleton h-4 w-28" }),
                      createVNode("div", { class: "skeleton h-4 w-full" }),
                      createVNode("div", { class: "skeleton h-4 w-full" })
                    ]),
                    createVNode("div", { class: "flex flex-col gap-4" }, [
                      createVNode("div", { class: "skeleton h-32 w-full" }),
                      createVNode("div", { class: "skeleton h-4 w-28" }),
                      createVNode("div", { class: "skeleton h-4 w-full" }),
                      createVNode("div", { class: "skeleton h-4 w-full" })
                    ])
                  ], 64)) : createCommentVNode("", true),
                  __props.result && __props.result.data && __props.result.data.length === 0 && !unref(form).processing ? (openBlock(), createBlock("div", {
                    key: 4,
                    class: "alert alert-info"
                  }, " Aucun résultat a afficher. Essayer avec un autre terme. ")) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Search.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const Badge_vue_vue_type_style_index_0_scoped_27e29a1f_lang = "";
const _sfc_main$7 = {
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    badge: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const iconType = computed(() => {
      return {
        // 'create': 'add',
        role: "icon-blue",
        media: "icon-grey",
        seniority: "icon"
      }[props.badge.type.name];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center" }, _attrs))} data-v-27e29a1f><div class="badge-hover" data-v-27e29a1f><div class="${ssrRenderClass([`badge-${iconType.value}`, "badge-icon"])}" data-v-27e29a1f><img${ssrRenderAttr("src", `/images/${__props.badge.path}`)} class="mx-auto" width="80" data-v-27e29a1f></div></div><div class="mt-2" data-v-27e29a1f><div class="text-lg" data-v-27e29a1f>${ssrInterpolate(__props.badge.name)}</div><div data-v-27e29a1f>${ssrInterpolate(__props.badge.description)}</div></div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Misc/Badge.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const Badge = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-27e29a1f"]]);
const _sfc_main$6 = {
  __name: "Textarea",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    value: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const input = ref(null);
    onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    __expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "form-control mb-2" }, _attrs))}><div class="label"><span class="label-text">${ssrInterpolate(__props.label)}</span></div><textarea class="textarea textarea-bordered textarea-primary h-24 bg-base-300">${ssrInterpolate(__props.modelValue)}</textarea></label>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Form/Textarea.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "UserLayout",
  __ssrInlineRender: true,
  props: {
    user: {
      type: Array
    },
    medias: {
      type: Array
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const page = usePage();
    const auth = (_a = page.props.auth) == null ? void 0 : _a.user;
    const form = useForm({
      username: auth == null ? void 0 : auth.username,
      description: auth == null ? void 0 : auth.description,
      avatar: null
    });
    const downloadMediaCount = props.user.medias && props.user.medias.length ? props.user.medias.map((media) => media.download_count).reduce((accumulator, media) => accumulator + media) : 0;
    const updateUser = () => {
      form.post(route("user.update"), {
        onSuccess: () => {
          FormService$1.closeModal();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Profil de ${__props.user.username}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$C, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$I, { spacing: "4" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$I, { spacing: "8" }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col items-center lg:flex-row"${_scopeId3}><div${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$E, {
                          user: __props.user,
                          size: "lg",
                          class: "lg:mr-4",
                          rounded: false
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(_sfc_main$I, {
                          spacing: "2",
                          class: "mb-4 lg:mb-0"
                        }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-center lg:text-left"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_sfc_main$M, { type: "title" }, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(__props.user.username)} `);
                                    _push6(ssrRenderComponent(_sfc_main$l, { user: __props.user }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(__props.user.username) + " ", 1),
                                      createVNode(_sfc_main$l, { user: __props.user }, null, 8, ["user"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(_sfc_main$M, null, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(__props.user.description)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(__props.user.description), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="flex gap-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_sfc_main$M, { type: "sub" }, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(unref(HelperService$1).plural(
                                      "total" in __props.medias ? __props.medias.total : __props.medias.length,
                                      "publication"
                                    ))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                        "total" in __props.medias ? __props.medias.total : __props.medias.length,
                                        "publication"
                                      )), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_sfc_main$M, { type: "sub" }, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(unref(HelperService$1).plural(
                                      unref(downloadMediaCount),
                                      "téléchargement"
                                    ))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                        unref(downloadMediaCount),
                                        "téléchargement"
                                      )), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_sfc_main$M, { type: "sub" }, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(unref(HelperService$1).plural(
                                      __props.user.followers.length,
                                      "abonné"
                                    ))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                        __props.user.followers.length,
                                        "abonné"
                                      )), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-center lg:text-left" }, [
                                  createVNode(_sfc_main$M, { type: "title" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(__props.user.username) + " ", 1),
                                      createVNode(_sfc_main$l, { user: __props.user }, null, 8, ["user"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(_sfc_main$M, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.user.description), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex gap-4" }, [
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                        "total" in __props.medias ? __props.medias.total : __props.medias.length,
                                        "publication"
                                      )), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                        unref(downloadMediaCount),
                                        "téléchargement"
                                      )), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                        __props.user.followers.length,
                                        "abonné"
                                      )), 1)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex-1 text-right"${_scopeId3}>`);
                        if (unref(auth) && __props.user.id !== unref(auth).id) {
                          _push4(ssrRenderComponent(_sfc_main$o, { user: __props.user }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(_sfc_main$A, {
                            type: "secondary",
                            outline: "",
                            size: "sm",
                            onClick: ($event) => unref(FormService$1).openModal("editProfile")
                          }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Modifier le profil `);
                              } else {
                                return [
                                  createTextVNode(" Modifier le profil ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                        _push4(ssrRenderComponent(_sfc_main$j, {
                          id: "editProfileModal",
                          title: "Modifier le profil",
                          "max-width": "2xl"
                        }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<form${_scopeId4}>`);
                              _push5(ssrRenderComponent(_sfc_main$I, null, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$N, {
                                      label: "Nom d'utilisateur",
                                      modelValue: unref(form).username,
                                      "onUpdate:modelValue": ($event) => unref(form).username = $event
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_sfc_main$O, {
                                      message: unref(form).errors.username
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div><div class="flex items-center gap-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$E, {
                                      user: _ctx.$page.props.auth.user,
                                      size: "lg"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<input type="file" class="file-input file-input-bordered w-full"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$O, {
                                      message: unref(form).errors.avatar
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div><div${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$6, {
                                      label: "Description",
                                      modelValue: unref(form).description,
                                      "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                      autofocus: "",
                                      autocomplete: "description"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_sfc_main$O, {
                                      message: unref(form).errors.description
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div><div${_scopeId5}>`);
                                    if (unref(form).progress) {
                                      _push6(`<progress class="progress progress-primary w-full"${ssrRenderAttr("value", unref(form).progress.percentage)} max="100"${_scopeId5}>${ssrInterpolate(unref(form).progress.percentage)}% </progress>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`</div>`);
                                    _push6(ssrRenderComponent(_sfc_main$z, {
                                      loading: unref(form).processing
                                    }, {
                                      default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Modifier le profil `);
                                        } else {
                                          return [
                                            createTextVNode(" Modifier le profil ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$N, {
                                          label: "Nom d'utilisateur",
                                          modelValue: unref(form).username,
                                          "onUpdate:modelValue": ($event) => unref(form).username = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(_sfc_main$O, {
                                          message: unref(form).errors.username
                                        }, null, 8, ["message"])
                                      ]),
                                      createVNode("div", { class: "flex items-center gap-4" }, [
                                        createVNode(_sfc_main$E, {
                                          user: _ctx.$page.props.auth.user,
                                          size: "lg"
                                        }, null, 8, ["user"]),
                                        createVNode("input", {
                                          type: "file",
                                          class: "file-input file-input-bordered w-full",
                                          onInput: ($event) => unref(form).avatar = $event.target.files[0]
                                        }, null, 40, ["onInput"]),
                                        createVNode(_sfc_main$O, {
                                          message: unref(form).errors.avatar
                                        }, null, 8, ["message"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$6, {
                                          label: "Description",
                                          modelValue: unref(form).description,
                                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                          autofocus: "",
                                          autocomplete: "description"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(_sfc_main$O, {
                                          message: unref(form).errors.description
                                        }, null, 8, ["message"])
                                      ]),
                                      createVNode("div", null, [
                                        unref(form).progress ? (openBlock(), createBlock("progress", {
                                          key: 0,
                                          class: "progress progress-primary w-full",
                                          value: unref(form).progress.percentage,
                                          max: "100"
                                        }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true)
                                      ]),
                                      createVNode(_sfc_main$z, {
                                        loading: unref(form).processing
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Modifier le profil ")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</form>`);
                            } else {
                              return [
                                createVNode("form", {
                                  onSubmit: withModifiers(($event) => updateUser(), ["prevent"])
                                }, [
                                  createVNode(_sfc_main$I, null, {
                                    default: withCtx(() => [
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$N, {
                                          label: "Nom d'utilisateur",
                                          modelValue: unref(form).username,
                                          "onUpdate:modelValue": ($event) => unref(form).username = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(_sfc_main$O, {
                                          message: unref(form).errors.username
                                        }, null, 8, ["message"])
                                      ]),
                                      createVNode("div", { class: "flex items-center gap-4" }, [
                                        createVNode(_sfc_main$E, {
                                          user: _ctx.$page.props.auth.user,
                                          size: "lg"
                                        }, null, 8, ["user"]),
                                        createVNode("input", {
                                          type: "file",
                                          class: "file-input file-input-bordered w-full",
                                          onInput: ($event) => unref(form).avatar = $event.target.files[0]
                                        }, null, 40, ["onInput"]),
                                        createVNode(_sfc_main$O, {
                                          message: unref(form).errors.avatar
                                        }, null, 8, ["message"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$6, {
                                          label: "Description",
                                          modelValue: unref(form).description,
                                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                          autofocus: "",
                                          autocomplete: "description"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(_sfc_main$O, {
                                          message: unref(form).errors.description
                                        }, null, 8, ["message"])
                                      ]),
                                      createVNode("div", null, [
                                        unref(form).progress ? (openBlock(), createBlock("progress", {
                                          key: 0,
                                          class: "progress progress-primary w-full",
                                          value: unref(form).progress.percentage,
                                          max: "100"
                                        }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true)
                                      ]),
                                      createVNode(_sfc_main$z, {
                                        loading: unref(form).processing
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Modifier le profil ")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ]),
                                    _: 1
                                  })
                                ], 40, ["onSubmit"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div><div role="tablist" class="tabs tabs-lifted tabs-lg"${_scopeId3}><a${ssrRenderAttr("href", _ctx.route("user.show", __props.user.username))} role="tab" class="${ssrRenderClass([{
                          "bg-primary/30 font-bold": _ctx.route().current("user.show")
                        }, "tab"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$L, {
                          name: "document",
                          size: "lg",
                          class: "mr-1"
                        }, null, _parent4, _scopeId3));
                        _push4(`</a><a${ssrRenderAttr("href", _ctx.route("user.media.liked", __props.user.username))} role="tab" class="${ssrRenderClass([{
                          "bg-primary/30 font-bold": _ctx.route().current("user.media.liked")
                        }, "tab"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$L, {
                          name: "heart",
                          size: "lg",
                          class: "mr-1"
                        }, null, _parent4, _scopeId3));
                        _push4(`</a><a${ssrRenderAttr("href", _ctx.route("user.badge.index", __props.user.username))} role="tab" class="${ssrRenderClass([{
                          "bg-primary/30 font-bold": _ctx.route().current("user.badge.index")
                        }, "tab"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$L, {
                          name: "apps",
                          size: "lg",
                          class: "mr-1"
                        }, null, _parent4, _scopeId3));
                        _push4(`</a></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col items-center lg:flex-row" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$E, {
                                user: __props.user,
                                size: "lg",
                                class: "lg:mr-4",
                                rounded: false
                              }, null, 8, ["user"])
                            ]),
                            createVNode(_sfc_main$I, {
                              spacing: "2",
                              class: "mb-4 lg:mb-0"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-center lg:text-left" }, [
                                  createVNode(_sfc_main$M, { type: "title" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(__props.user.username) + " ", 1),
                                      createVNode(_sfc_main$l, { user: __props.user }, null, 8, ["user"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(_sfc_main$M, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.user.description), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex gap-4" }, [
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                        "total" in __props.medias ? __props.medias.total : __props.medias.length,
                                        "publication"
                                      )), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                        unref(downloadMediaCount),
                                        "téléchargement"
                                      )), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$M, { type: "sub" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                        __props.user.followers.length,
                                        "abonné"
                                      )), 1)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex-1 text-right" }, [
                              unref(auth) && __props.user.id !== unref(auth).id ? (openBlock(), createBlock(_sfc_main$o, {
                                key: 0,
                                user: __props.user
                              }, null, 8, ["user"])) : (openBlock(), createBlock(_sfc_main$A, {
                                key: 1,
                                type: "secondary",
                                outline: "",
                                size: "sm",
                                onClick: ($event) => unref(FormService$1).openModal("editProfile")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Modifier le profil ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])),
                              createVNode(_sfc_main$j, {
                                id: "editProfileModal",
                                title: "Modifier le profil",
                                "max-width": "2xl"
                              }, {
                                default: withCtx(() => [
                                  createVNode("form", {
                                    onSubmit: withModifiers(($event) => updateUser(), ["prevent"])
                                  }, [
                                    createVNode(_sfc_main$I, null, {
                                      default: withCtx(() => [
                                        createVNode("div", null, [
                                          createVNode(_sfc_main$N, {
                                            label: "Nom d'utilisateur",
                                            modelValue: unref(form).username,
                                            "onUpdate:modelValue": ($event) => unref(form).username = $event
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                          createVNode(_sfc_main$O, {
                                            message: unref(form).errors.username
                                          }, null, 8, ["message"])
                                        ]),
                                        createVNode("div", { class: "flex items-center gap-4" }, [
                                          createVNode(_sfc_main$E, {
                                            user: _ctx.$page.props.auth.user,
                                            size: "lg"
                                          }, null, 8, ["user"]),
                                          createVNode("input", {
                                            type: "file",
                                            class: "file-input file-input-bordered w-full",
                                            onInput: ($event) => unref(form).avatar = $event.target.files[0]
                                          }, null, 40, ["onInput"]),
                                          createVNode(_sfc_main$O, {
                                            message: unref(form).errors.avatar
                                          }, null, 8, ["message"])
                                        ]),
                                        createVNode("div", null, [
                                          createVNode(_sfc_main$6, {
                                            label: "Description",
                                            modelValue: unref(form).description,
                                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                            autofocus: "",
                                            autocomplete: "description"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                          createVNode(_sfc_main$O, {
                                            message: unref(form).errors.description
                                          }, null, 8, ["message"])
                                        ]),
                                        createVNode("div", null, [
                                          unref(form).progress ? (openBlock(), createBlock("progress", {
                                            key: 0,
                                            class: "progress progress-primary w-full",
                                            value: unref(form).progress.percentage,
                                            max: "100"
                                          }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true)
                                        ]),
                                        createVNode(_sfc_main$z, {
                                          loading: unref(form).processing
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Modifier le profil ")
                                          ]),
                                          _: 1
                                        }, 8, ["loading"])
                                      ]),
                                      _: 1
                                    })
                                  ], 40, ["onSubmit"])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", {
                            role: "tablist",
                            class: "tabs tabs-lifted tabs-lg"
                          }, [
                            createVNode("a", {
                              href: _ctx.route("user.show", __props.user.username),
                              role: "tab",
                              class: ["tab", {
                                "bg-primary/30 font-bold": _ctx.route().current("user.show")
                              }]
                            }, [
                              createVNode(_sfc_main$L, {
                                name: "document",
                                size: "lg",
                                class: "mr-1"
                              })
                            ], 10, ["href"]),
                            createVNode("a", {
                              href: _ctx.route("user.media.liked", __props.user.username),
                              role: "tab",
                              class: ["tab", {
                                "bg-primary/30 font-bold": _ctx.route().current("user.media.liked")
                              }]
                            }, [
                              createVNode(_sfc_main$L, {
                                name: "heart",
                                size: "lg",
                                class: "mr-1"
                              })
                            ], 10, ["href"]),
                            createVNode("a", {
                              href: _ctx.route("user.badge.index", __props.user.username),
                              role: "tab",
                              class: ["tab", {
                                "bg-primary/30 font-bold": _ctx.route().current("user.badge.index")
                              }]
                            }, [
                              createVNode(_sfc_main$L, {
                                name: "apps",
                                size: "lg",
                                class: "mr-1"
                              })
                            ], 10, ["href"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    createVNode(_sfc_main$I, { spacing: "8" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col items-center lg:flex-row" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$E, {
                              user: __props.user,
                              size: "lg",
                              class: "lg:mr-4",
                              rounded: false
                            }, null, 8, ["user"])
                          ]),
                          createVNode(_sfc_main$I, {
                            spacing: "2",
                            class: "mb-4 lg:mb-0"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center lg:text-left" }, [
                                createVNode(_sfc_main$M, { type: "title" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.user.username) + " ", 1),
                                    createVNode(_sfc_main$l, { user: __props.user }, null, 8, ["user"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(_sfc_main$M, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.user.description), 1)
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "flex gap-4" }, [
                                createVNode(_sfc_main$M, { type: "sub" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                      "total" in __props.medias ? __props.medias.total : __props.medias.length,
                                      "publication"
                                    )), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$M, { type: "sub" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                      unref(downloadMediaCount),
                                      "téléchargement"
                                    )), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$M, { type: "sub" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                      __props.user.followers.length,
                                      "abonné"
                                    )), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex-1 text-right" }, [
                            unref(auth) && __props.user.id !== unref(auth).id ? (openBlock(), createBlock(_sfc_main$o, {
                              key: 0,
                              user: __props.user
                            }, null, 8, ["user"])) : (openBlock(), createBlock(_sfc_main$A, {
                              key: 1,
                              type: "secondary",
                              outline: "",
                              size: "sm",
                              onClick: ($event) => unref(FormService$1).openModal("editProfile")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Modifier le profil ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])),
                            createVNode(_sfc_main$j, {
                              id: "editProfileModal",
                              title: "Modifier le profil",
                              "max-width": "2xl"
                            }, {
                              default: withCtx(() => [
                                createVNode("form", {
                                  onSubmit: withModifiers(($event) => updateUser(), ["prevent"])
                                }, [
                                  createVNode(_sfc_main$I, null, {
                                    default: withCtx(() => [
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$N, {
                                          label: "Nom d'utilisateur",
                                          modelValue: unref(form).username,
                                          "onUpdate:modelValue": ($event) => unref(form).username = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(_sfc_main$O, {
                                          message: unref(form).errors.username
                                        }, null, 8, ["message"])
                                      ]),
                                      createVNode("div", { class: "flex items-center gap-4" }, [
                                        createVNode(_sfc_main$E, {
                                          user: _ctx.$page.props.auth.user,
                                          size: "lg"
                                        }, null, 8, ["user"]),
                                        createVNode("input", {
                                          type: "file",
                                          class: "file-input file-input-bordered w-full",
                                          onInput: ($event) => unref(form).avatar = $event.target.files[0]
                                        }, null, 40, ["onInput"]),
                                        createVNode(_sfc_main$O, {
                                          message: unref(form).errors.avatar
                                        }, null, 8, ["message"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$6, {
                                          label: "Description",
                                          modelValue: unref(form).description,
                                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                          autofocus: "",
                                          autocomplete: "description"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(_sfc_main$O, {
                                          message: unref(form).errors.description
                                        }, null, 8, ["message"])
                                      ]),
                                      createVNode("div", null, [
                                        unref(form).progress ? (openBlock(), createBlock("progress", {
                                          key: 0,
                                          class: "progress progress-primary w-full",
                                          value: unref(form).progress.percentage,
                                          max: "100"
                                        }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true)
                                      ]),
                                      createVNode(_sfc_main$z, {
                                        loading: unref(form).processing
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Modifier le profil ")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ]),
                                    _: 1
                                  })
                                ], 40, ["onSubmit"])
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("div", {
                          role: "tablist",
                          class: "tabs tabs-lifted tabs-lg"
                        }, [
                          createVNode("a", {
                            href: _ctx.route("user.show", __props.user.username),
                            role: "tab",
                            class: ["tab", {
                              "bg-primary/30 font-bold": _ctx.route().current("user.show")
                            }]
                          }, [
                            createVNode(_sfc_main$L, {
                              name: "document",
                              size: "lg",
                              class: "mr-1"
                            })
                          ], 10, ["href"]),
                          createVNode("a", {
                            href: _ctx.route("user.media.liked", __props.user.username),
                            role: "tab",
                            class: ["tab", {
                              "bg-primary/30 font-bold": _ctx.route().current("user.media.liked")
                            }]
                          }, [
                            createVNode(_sfc_main$L, {
                              name: "heart",
                              size: "lg",
                              class: "mr-1"
                            })
                          ], 10, ["href"]),
                          createVNode("a", {
                            href: _ctx.route("user.badge.index", __props.user.username),
                            role: "tab",
                            class: ["tab", {
                              "bg-primary/30 font-bold": _ctx.route().current("user.badge.index")
                            }]
                          }, [
                            createVNode(_sfc_main$L, {
                              name: "apps",
                              size: "lg",
                              class: "mr-1"
                            })
                          ], 10, ["href"])
                        ])
                      ]),
                      _: 1
                    }),
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$I, { spacing: "4" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$I, { spacing: "8" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-col items-center lg:flex-row" }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$E, {
                            user: __props.user,
                            size: "lg",
                            class: "lg:mr-4",
                            rounded: false
                          }, null, 8, ["user"])
                        ]),
                        createVNode(_sfc_main$I, {
                          spacing: "2",
                          class: "mb-4 lg:mb-0"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-center lg:text-left" }, [
                              createVNode(_sfc_main$M, { type: "title" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.user.username) + " ", 1),
                                  createVNode(_sfc_main$l, { user: __props.user }, null, 8, ["user"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(_sfc_main$M, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.user.description), 1)
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex gap-4" }, [
                              createVNode(_sfc_main$M, { type: "sub" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                    "total" in __props.medias ? __props.medias.total : __props.medias.length,
                                    "publication"
                                  )), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(_sfc_main$M, { type: "sub" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                    unref(downloadMediaCount),
                                    "téléchargement"
                                  )), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(_sfc_main$M, { type: "sub" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(HelperService$1).plural(
                                    __props.user.followers.length,
                                    "abonné"
                                  )), 1)
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex-1 text-right" }, [
                          unref(auth) && __props.user.id !== unref(auth).id ? (openBlock(), createBlock(_sfc_main$o, {
                            key: 0,
                            user: __props.user
                          }, null, 8, ["user"])) : (openBlock(), createBlock(_sfc_main$A, {
                            key: 1,
                            type: "secondary",
                            outline: "",
                            size: "sm",
                            onClick: ($event) => unref(FormService$1).openModal("editProfile")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Modifier le profil ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])),
                          createVNode(_sfc_main$j, {
                            id: "editProfileModal",
                            title: "Modifier le profil",
                            "max-width": "2xl"
                          }, {
                            default: withCtx(() => [
                              createVNode("form", {
                                onSubmit: withModifiers(($event) => updateUser(), ["prevent"])
                              }, [
                                createVNode(_sfc_main$I, null, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode(_sfc_main$N, {
                                        label: "Nom d'utilisateur",
                                        modelValue: unref(form).username,
                                        "onUpdate:modelValue": ($event) => unref(form).username = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(_sfc_main$O, {
                                        message: unref(form).errors.username
                                      }, null, 8, ["message"])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-4" }, [
                                      createVNode(_sfc_main$E, {
                                        user: _ctx.$page.props.auth.user,
                                        size: "lg"
                                      }, null, 8, ["user"]),
                                      createVNode("input", {
                                        type: "file",
                                        class: "file-input file-input-bordered w-full",
                                        onInput: ($event) => unref(form).avatar = $event.target.files[0]
                                      }, null, 40, ["onInput"]),
                                      createVNode(_sfc_main$O, {
                                        message: unref(form).errors.avatar
                                      }, null, 8, ["message"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode(_sfc_main$6, {
                                        label: "Description",
                                        modelValue: unref(form).description,
                                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                        autofocus: "",
                                        autocomplete: "description"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(_sfc_main$O, {
                                        message: unref(form).errors.description
                                      }, null, 8, ["message"])
                                    ]),
                                    createVNode("div", null, [
                                      unref(form).progress ? (openBlock(), createBlock("progress", {
                                        key: 0,
                                        class: "progress progress-primary w-full",
                                        value: unref(form).progress.percentage,
                                        max: "100"
                                      }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true)
                                    ]),
                                    createVNode(_sfc_main$z, {
                                      loading: unref(form).processing
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Modifier le profil ")
                                      ]),
                                      _: 1
                                    }, 8, ["loading"])
                                  ]),
                                  _: 1
                                })
                              ], 40, ["onSubmit"])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", {
                        role: "tablist",
                        class: "tabs tabs-lifted tabs-lg"
                      }, [
                        createVNode("a", {
                          href: _ctx.route("user.show", __props.user.username),
                          role: "tab",
                          class: ["tab", {
                            "bg-primary/30 font-bold": _ctx.route().current("user.show")
                          }]
                        }, [
                          createVNode(_sfc_main$L, {
                            name: "document",
                            size: "lg",
                            class: "mr-1"
                          })
                        ], 10, ["href"]),
                        createVNode("a", {
                          href: _ctx.route("user.media.liked", __props.user.username),
                          role: "tab",
                          class: ["tab", {
                            "bg-primary/30 font-bold": _ctx.route().current("user.media.liked")
                          }]
                        }, [
                          createVNode(_sfc_main$L, {
                            name: "heart",
                            size: "lg",
                            class: "mr-1"
                          })
                        ], 10, ["href"]),
                        createVNode("a", {
                          href: _ctx.route("user.badge.index", __props.user.username),
                          role: "tab",
                          class: ["tab", {
                            "bg-primary/30 font-bold": _ctx.route().current("user.badge.index")
                          }]
                        }, [
                          createVNode(_sfc_main$L, {
                            name: "apps",
                            size: "lg",
                            class: "mr-1"
                          })
                        ], 10, ["href"])
                      ])
                    ]),
                    _: 1
                  }),
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/UserLayout.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "Badges",
  __ssrInlineRender: true,
  props: {
    user: {
      type: Array
    },
    medias: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$5, mergeProps({
        user: __props.user,
        medias: __props.medias
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-2 gap-4 py-4 text-center lg:grid-cols-6"${_scopeId}>`);
            if (__props.user.badges.length) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.user.badges, (badge, index) => {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(Badge, { badge }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<div${_scopeId}>Aucun badges</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-2 gap-4 py-4 text-center lg:grid-cols-6" }, [
                __props.user.badges.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.user.badges, (badge, index) => {
                  return openBlock(), createBlock("div", { key: index }, [
                    createVNode(Badge, { badge }, null, 8, ["badge"])
                  ]);
                }), 128)) : (openBlock(), createBlock("div", { key: 1 }, "Aucun badges"))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Badges.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "LikedMedias",
  __ssrInlineRender: true,
  props: {
    user: {
      type: Array
    },
    medias: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$5, mergeProps({
        user: __props.user,
        medias: __props.medias
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$h, { medias: __props.medias }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$h, { medias: __props.medias }, null, 8, ["medias"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/LikedMedias.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.item.total > __props.item.per_page) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "join mx-auto my-6 grid w-1/4 grid-cols-2" }, _attrs))}><a${ssrRenderAttr("href", __props.item.prev_page_url)} class="${ssrRenderClass([{ "btn-disabled": !__props.item.prev_page_url }, "btn btn-outline join-item btn-neutral"])}">`);
        _push(ssrRenderComponent(_sfc_main$L, { name: "chevron-back" }, null, _parent));
        _push(`</a><a${ssrRenderAttr("href", __props.item.next_page_url)} class="${ssrRenderClass([{ "btn-disabled": !__props.item.next_page_url }, "btn btn-outline join-item btn-neutral"])}">`);
        _push(ssrRenderComponent(_sfc_main$L, { name: "chevron-forward" }, null, _parent));
        _push(`</a></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Table/Pagination.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Notifications",
  __ssrInlineRender: true,
  props: {
    notifications: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    var _a;
    const page = usePage();
    const form = useForm({
      notifications: null
    });
    const unreadNotifications = (_a = page.props.auth) == null ? void 0 : _a.notifications;
    FormService$1.setForm(form).setRouteName("notification");
    const markAllAsRead = () => {
      form.notifications = _.flattenDeep(
        _.map(unreadNotifications, _.partialRight(_.pick, "id"))
      );
      FormService$1.handle("markAllAsRead");
    };
    watch(
      form,
      () => {
        if (form.wasSuccessful) {
          router.reload();
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$C, mergeProps({ title: "Notifications" }, _attrs), {
        action: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="link link-secondary"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$M, {
              onClick: markAllAsRead,
              type: "xs"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Tout marquer comme lu`);
                } else {
                  return [
                    createTextVNode("Tout marquer comme lu")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", { class: "link link-secondary" }, [
                createVNode(_sfc_main$M, {
                  onClick: markAllAsRead,
                  type: "xs"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Tout marquer comme lu")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$I, { spacing: "6" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(unreadNotifications).length > 0) {
                    _push3(ssrRenderComponent(_sfc_main$I, { spacing: "3" }, {
                      default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$M, { type: "subtitle" }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Nouveau `);
                              } else {
                                return [
                                  createTextVNode(" Nouveau ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          if (unref(unreadNotifications).length) {
                            _push4(`<!--[-->`);
                            ssrRenderList(unref(unreadNotifications), (notification, index) => {
                              _push4(`<div class="relative rounded-lg bg-base-300 p-4"${_scopeId3}><div class="flex items-center"${_scopeId3}><div class="absolute -left-1.5 -top-2"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_sfc_main$L, {
                                name: "ellipse",
                                outline: false,
                                class: "text-secondary"
                              }, null, _parent4, _scopeId3));
                              _push4(`</div><div class="ml-2 mr-6"${_scopeId3}>`);
                              if (notification.type.includes(
                                "NewUserNotification"
                              )) {
                                _push4(ssrRenderComponent(_sfc_main$E, {
                                  user: notification.data.content
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<img${ssrRenderAttr("src", `/storage/${notification.data.content.path}`)} alt="" class="mx-auto w-16 rounded"${_scopeId3}>`);
                              }
                              _push4(`</div><div class="flex-1"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_sfc_main$M, null, {
                                default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`<a class="link"${ssrRenderAttr(
                                      "href",
                                      _ctx.route(
                                        "notification.show",
                                        notification.id
                                      )
                                    )}${_scopeId4}>${ssrInterpolate(notification.data.title)}</a>`);
                                  } else {
                                    return [
                                      createVNode("a", {
                                        class: "link",
                                        href: _ctx.route(
                                          "notification.show",
                                          notification.id
                                        )
                                      }, toDisplayString(notification.data.title), 9, ["href"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(ssrRenderComponent(_sfc_main$M, { type: "xs" }, {
                                default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`${ssrInterpolate(notification.formatted_created_at)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(notification.formatted_created_at), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(`</div><div class="relative z-50 hidden lg:block"${_scopeId3}><button class="btn btn-ghost btn-sm"${_scopeId3}> Marquer comme lu </button></div></div></div>`);
                            });
                            _push4(`<!--]-->`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode(_sfc_main$M, { type: "subtitle" }, {
                              default: withCtx(() => [
                                createTextVNode(" Nouveau ")
                              ]),
                              _: 1
                            }),
                            unref(unreadNotifications).length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(unreadNotifications), (notification, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "relative rounded-lg bg-base-300 p-4"
                              }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "absolute -left-1.5 -top-2" }, [
                                    createVNode(_sfc_main$L, {
                                      name: "ellipse",
                                      outline: false,
                                      class: "text-secondary"
                                    })
                                  ]),
                                  createVNode("div", { class: "ml-2 mr-6" }, [
                                    notification.type.includes(
                                      "NewUserNotification"
                                    ) ? (openBlock(), createBlock(_sfc_main$E, {
                                      key: 0,
                                      user: notification.data.content
                                    }, null, 8, ["user"])) : (openBlock(), createBlock("img", {
                                      key: 1,
                                      src: `/storage/${notification.data.content.path}`,
                                      alt: "",
                                      class: "mx-auto w-16 rounded"
                                    }, null, 8, ["src"]))
                                  ]),
                                  createVNode("div", { class: "flex-1" }, [
                                    createVNode(_sfc_main$M, null, {
                                      default: withCtx(() => [
                                        createVNode("a", {
                                          class: "link",
                                          href: _ctx.route(
                                            "notification.show",
                                            notification.id
                                          )
                                        }, toDisplayString(notification.data.title), 9, ["href"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_sfc_main$M, { type: "xs" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(notification.formatted_created_at), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  createVNode("div", { class: "relative z-50 hidden lg:block" }, [
                                    createVNode("button", {
                                      onClick: ($event) => unref(FormService$1).handle("update", notification),
                                      class: "btn btn-ghost btn-sm"
                                    }, " Marquer comme lu ", 8, ["onClick"])
                                  ])
                                ])
                              ]);
                            }), 128)) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_sfc_main$I, null, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$M, { type: "subtitle" }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Ancien`);
                            } else {
                              return [
                                createTextVNode("Ancien")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (__props.notifications.data.filter(
                          (notification) => notification.read_at !== null
                        ).length) {
                          _push4(`<!--[--><!--[-->`);
                          ssrRenderList(__props.notifications.data.filter(
                            (n2) => n2.read_at !== null
                          ), (notification, index) => {
                            _push4(`<div class="rounded-lg bg-base-300 p-4"${_scopeId3}><div class="flex items-center"${_scopeId3}><div class="ml-2 mr-6"${_scopeId3}><img${ssrRenderAttr("src", `/storage/${notification.data.content.path}`)} alt="" class="mx-auto w-20 rounded"${_scopeId3}></div><div class="flex-1"${_scopeId3}>`);
                            _push4(ssrRenderComponent(_sfc_main$M, null, {
                              default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<a class="link"${ssrRenderAttr(
                                    "href",
                                    _ctx.route(
                                      "media.show",
                                      notification.data.content.slug
                                    )
                                  )}${_scopeId4}>${ssrInterpolate(notification.data.title)}</a>`);
                                } else {
                                  return [
                                    createVNode("a", {
                                      class: "link",
                                      href: _ctx.route(
                                        "media.show",
                                        notification.data.content.slug
                                      )
                                    }, toDisplayString(notification.data.title), 9, ["href"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div><div${_scopeId3}>`);
                            _push4(ssrRenderComponent(_sfc_main$M, null, {
                              default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(notification.formatted_created_at)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(notification.formatted_created_at), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div></div></div>`);
                          });
                          _push4(`<!--]-->`);
                          _push4(ssrRenderComponent(_sfc_main$2, { item: __props.notifications }, null, _parent4, _scopeId3));
                          _push4(`<!--]-->`);
                        } else {
                          _push4(ssrRenderComponent(_sfc_main$y, { class: "!bg-base-300" }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_sfc_main$M, null, {
                                  default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Aucune notification a afficher.`);
                                    } else {
                                      return [
                                        createTextVNode("Aucune notification a afficher.")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_sfc_main$M, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Aucune notification a afficher.")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          createVNode(_sfc_main$M, { type: "subtitle" }, {
                            default: withCtx(() => [
                              createTextVNode("Ancien")
                            ]),
                            _: 1
                          }),
                          __props.notifications.data.filter(
                            (notification) => notification.read_at !== null
                          ).length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.notifications.data.filter(
                              (n2) => n2.read_at !== null
                            ), (notification, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "rounded-lg bg-base-300 p-4"
                              }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "ml-2 mr-6" }, [
                                    createVNode("img", {
                                      src: `/storage/${notification.data.content.path}`,
                                      alt: "",
                                      class: "mx-auto w-20 rounded"
                                    }, null, 8, ["src"])
                                  ]),
                                  createVNode("div", { class: "flex-1" }, [
                                    createVNode(_sfc_main$M, null, {
                                      default: withCtx(() => [
                                        createVNode("a", {
                                          class: "link",
                                          href: _ctx.route(
                                            "media.show",
                                            notification.data.content.slug
                                          )
                                        }, toDisplayString(notification.data.title), 9, ["href"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode(_sfc_main$M, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(notification.formatted_created_at), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
                                ])
                              ]);
                            }), 128)),
                            createVNode(_sfc_main$2, { item: __props.notifications }, null, 8, ["item"])
                          ], 64)) : (openBlock(), createBlock(_sfc_main$y, {
                            key: 1,
                            class: "!bg-base-300"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$M, null, {
                                default: withCtx(() => [
                                  createTextVNode("Aucune notification a afficher.")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    unref(unreadNotifications).length > 0 ? (openBlock(), createBlock(_sfc_main$I, {
                      key: 0,
                      spacing: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$M, { type: "subtitle" }, {
                          default: withCtx(() => [
                            createTextVNode(" Nouveau ")
                          ]),
                          _: 1
                        }),
                        unref(unreadNotifications).length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(unreadNotifications), (notification, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "relative rounded-lg bg-base-300 p-4"
                          }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", { class: "absolute -left-1.5 -top-2" }, [
                                createVNode(_sfc_main$L, {
                                  name: "ellipse",
                                  outline: false,
                                  class: "text-secondary"
                                })
                              ]),
                              createVNode("div", { class: "ml-2 mr-6" }, [
                                notification.type.includes(
                                  "NewUserNotification"
                                ) ? (openBlock(), createBlock(_sfc_main$E, {
                                  key: 0,
                                  user: notification.data.content
                                }, null, 8, ["user"])) : (openBlock(), createBlock("img", {
                                  key: 1,
                                  src: `/storage/${notification.data.content.path}`,
                                  alt: "",
                                  class: "mx-auto w-16 rounded"
                                }, null, 8, ["src"]))
                              ]),
                              createVNode("div", { class: "flex-1" }, [
                                createVNode(_sfc_main$M, null, {
                                  default: withCtx(() => [
                                    createVNode("a", {
                                      class: "link",
                                      href: _ctx.route(
                                        "notification.show",
                                        notification.id
                                      )
                                    }, toDisplayString(notification.data.title), 9, ["href"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_sfc_main$M, { type: "xs" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(notification.formatted_created_at), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              createVNode("div", { class: "relative z-50 hidden lg:block" }, [
                                createVNode("button", {
                                  onClick: ($event) => unref(FormService$1).handle("update", notification),
                                  class: "btn btn-ghost btn-sm"
                                }, " Marquer comme lu ", 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_sfc_main$I, null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$M, { type: "subtitle" }, {
                          default: withCtx(() => [
                            createTextVNode("Ancien")
                          ]),
                          _: 1
                        }),
                        __props.notifications.data.filter(
                          (notification) => notification.read_at !== null
                        ).length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.notifications.data.filter(
                            (n2) => n2.read_at !== null
                          ), (notification, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "rounded-lg bg-base-300 p-4"
                            }, [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("div", { class: "ml-2 mr-6" }, [
                                  createVNode("img", {
                                    src: `/storage/${notification.data.content.path}`,
                                    alt: "",
                                    class: "mx-auto w-20 rounded"
                                  }, null, 8, ["src"])
                                ]),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode(_sfc_main$M, null, {
                                    default: withCtx(() => [
                                      createVNode("a", {
                                        class: "link",
                                        href: _ctx.route(
                                          "media.show",
                                          notification.data.content.slug
                                        )
                                      }, toDisplayString(notification.data.title), 9, ["href"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                createVNode("div", null, [
                                  createVNode(_sfc_main$M, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(notification.formatted_created_at), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ])
                              ])
                            ]);
                          }), 128)),
                          createVNode(_sfc_main$2, { item: __props.notifications }, null, 8, ["item"])
                        ], 64)) : (openBlock(), createBlock(_sfc_main$y, {
                          key: 1,
                          class: "!bg-base-300"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$M, null, {
                              default: withCtx(() => [
                                createTextVNode("Aucune notification a afficher.")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$I, { spacing: "6" }, {
                default: withCtx(() => [
                  unref(unreadNotifications).length > 0 ? (openBlock(), createBlock(_sfc_main$I, {
                    key: 0,
                    spacing: "3"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$M, { type: "subtitle" }, {
                        default: withCtx(() => [
                          createTextVNode(" Nouveau ")
                        ]),
                        _: 1
                      }),
                      unref(unreadNotifications).length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(unreadNotifications), (notification, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "relative rounded-lg bg-base-300 p-4"
                        }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("div", { class: "absolute -left-1.5 -top-2" }, [
                              createVNode(_sfc_main$L, {
                                name: "ellipse",
                                outline: false,
                                class: "text-secondary"
                              })
                            ]),
                            createVNode("div", { class: "ml-2 mr-6" }, [
                              notification.type.includes(
                                "NewUserNotification"
                              ) ? (openBlock(), createBlock(_sfc_main$E, {
                                key: 0,
                                user: notification.data.content
                              }, null, 8, ["user"])) : (openBlock(), createBlock("img", {
                                key: 1,
                                src: `/storage/${notification.data.content.path}`,
                                alt: "",
                                class: "mx-auto w-16 rounded"
                              }, null, 8, ["src"]))
                            ]),
                            createVNode("div", { class: "flex-1" }, [
                              createVNode(_sfc_main$M, null, {
                                default: withCtx(() => [
                                  createVNode("a", {
                                    class: "link",
                                    href: _ctx.route(
                                      "notification.show",
                                      notification.id
                                    )
                                  }, toDisplayString(notification.data.title), 9, ["href"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_sfc_main$M, { type: "xs" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(notification.formatted_created_at), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            createVNode("div", { class: "relative z-50 hidden lg:block" }, [
                              createVNode("button", {
                                onClick: ($event) => unref(FormService$1).handle("update", notification),
                                class: "btn btn-ghost btn-sm"
                              }, " Marquer comme lu ", 8, ["onClick"])
                            ])
                          ])
                        ]);
                      }), 128)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_sfc_main$I, null, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$M, { type: "subtitle" }, {
                        default: withCtx(() => [
                          createTextVNode("Ancien")
                        ]),
                        _: 1
                      }),
                      __props.notifications.data.filter(
                        (notification) => notification.read_at !== null
                      ).length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.notifications.data.filter(
                          (n2) => n2.read_at !== null
                        ), (notification, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "rounded-lg bg-base-300 p-4"
                          }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", { class: "ml-2 mr-6" }, [
                                createVNode("img", {
                                  src: `/storage/${notification.data.content.path}`,
                                  alt: "",
                                  class: "mx-auto w-20 rounded"
                                }, null, 8, ["src"])
                              ]),
                              createVNode("div", { class: "flex-1" }, [
                                createVNode(_sfc_main$M, null, {
                                  default: withCtx(() => [
                                    createVNode("a", {
                                      class: "link",
                                      href: _ctx.route(
                                        "media.show",
                                        notification.data.content.slug
                                      )
                                    }, toDisplayString(notification.data.title), 9, ["href"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              createVNode("div", null, [
                                createVNode(_sfc_main$M, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(notification.formatted_created_at), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ])
                          ]);
                        }), 128)),
                        createVNode(_sfc_main$2, { item: __props.notifications }, null, 8, ["item"])
                      ], 64)) : (openBlock(), createBlock(_sfc_main$y, {
                        key: 1,
                        class: "!bg-base-300"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$M, null, {
                            default: withCtx(() => [
                              createTextVNode("Aucune notification a afficher.")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Notifications.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    user: {
      type: Array
    },
    medias: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$5, mergeProps({
        user: __props.user,
        medias: __props.medias
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$h, {
              medias: __props.medias,
              "number-of-cols": "4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$h, {
                medias: __props.medias,
                "number-of-cols": "4"
              }, null, 8, ["medias"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
const Ziggy$1 = { "url": "http://localhost", "port": null, "defaults": {}, "routes": { "pulse": { "uri": "admin/pulse", "methods": ["GET", "HEAD"] }, "sanctum.csrf-cookie": { "uri": "sanctum/csrf-cookie", "methods": ["GET", "HEAD"] }, "telescope": { "uri": "admin/telescope/{view?}", "methods": ["GET", "HEAD"], "wheres": { "view": "(.*)" }, "parameters": ["view"] }, "livewire.update": { "uri": "livewire/update", "methods": ["POST"] }, "livewire.upload-file": { "uri": "livewire/upload-file", "methods": ["POST"] }, "livewire.preview-file": { "uri": "livewire/preview-file/{filename}", "methods": ["GET", "HEAD"], "parameters": ["filename"] }, "log-viewer.hosts": { "uri": "admin/logs/api/hosts", "methods": ["GET", "HEAD"] }, "log-viewer.folders": { "uri": "admin/logs/api/folders", "methods": ["GET", "HEAD"] }, "log-viewer.folders.request-download": { "uri": "admin/logs/api/folders/{folderIdentifier}/download/request", "methods": ["GET", "HEAD"], "parameters": ["folderIdentifier"] }, "log-viewer.folders.clear-cache": { "uri": "admin/logs/api/folders/{folderIdentifier}/clear-cache", "methods": ["POST"], "parameters": ["folderIdentifier"] }, "log-viewer.folders.delete": { "uri": "admin/logs/api/folders/{folderIdentifier}", "methods": ["DELETE"], "parameters": ["folderIdentifier"] }, "log-viewer.files": { "uri": "admin/logs/api/files", "methods": ["GET", "HEAD"] }, "log-viewer.files.request-download": { "uri": "admin/logs/api/files/{fileIdentifier}/download/request", "methods": ["GET", "HEAD"], "parameters": ["fileIdentifier"] }, "log-viewer.files.clear-cache": { "uri": "admin/logs/api/files/{fileIdentifier}/clear-cache", "methods": ["POST"], "parameters": ["fileIdentifier"] }, "log-viewer.files.delete": { "uri": "admin/logs/api/files/{fileIdentifier}", "methods": ["DELETE"], "parameters": ["fileIdentifier"] }, "log-viewer.files.clear-cache-all": { "uri": "admin/logs/api/clear-cache-all", "methods": ["POST"] }, "log-viewer.files.delete-multiple-files": { "uri": "admin/logs/api/delete-multiple-files", "methods": ["POST"] }, "log-viewer.logs": { "uri": "admin/logs/api/logs", "methods": ["GET", "HEAD"] }, "log-viewer.folders.download": { "uri": "admin/logs/api/folders/{folderIdentifier}/download", "methods": ["GET", "HEAD"], "parameters": ["folderIdentifier"] }, "log-viewer.files.download": { "uri": "admin/logs/api/files/{fileIdentifier}/download", "methods": ["GET", "HEAD"], "parameters": ["fileIdentifier"] }, "log-viewer.index": { "uri": "admin/logs/{view?}", "methods": ["GET", "HEAD"], "wheres": { "view": "(.*)" }, "parameters": ["view"] }, "ignition.healthCheck": { "uri": "_ignition/health-check", "methods": ["GET", "HEAD"] }, "ignition.executeSolution": { "uri": "_ignition/execute-solution", "methods": ["POST"] }, "ignition.updateConfig": { "uri": "_ignition/update-config", "methods": ["POST"] }, "index": { "uri": "/", "methods": ["GET", "HEAD"] }, "leaderboard": { "uri": "leaderboard", "methods": ["GET", "HEAD"] }, "random": { "uri": "random", "methods": ["GET", "HEAD"] }, "user.show": { "uri": "{username}", "methods": ["GET", "HEAD"], "parameters": ["username"] }, "user.follow": { "uri": "follow/{id}", "methods": ["POST"], "parameters": ["id"] }, "profile.edit": { "uri": "profile", "methods": ["GET", "HEAD"] }, "profile.update": { "uri": "profile", "methods": ["POST"] }, "profile.destroy": { "uri": "profile", "methods": ["DELETE"] }, "media.index": { "uri": "media", "methods": ["GET", "HEAD"] }, "media.create": { "uri": "media/create", "methods": ["GET", "HEAD"] }, "media.store": { "uri": "media", "methods": ["POST"] }, "media.show": { "uri": "media/{medium}", "methods": ["GET", "HEAD"], "parameters": ["medium"] }, "media.edit": { "uri": "media/{medium}/edit", "methods": ["GET", "HEAD"], "parameters": ["medium"] }, "media.update": { "uri": "media/{medium}", "methods": ["PUT", "PATCH"], "parameters": ["medium"] }, "media.destroy": { "uri": "media/{medium}", "methods": ["DELETE"], "parameters": ["medium"] }, "media.duplicate": { "uri": "media/duplicate", "methods": ["POST"] }, "media.download": { "uri": "media/download/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.index": { "uri": "admin/dashboard", "methods": ["GET", "HEAD"] }, "admin.user.index": { "uri": "admin/utilisateurs", "methods": ["GET", "HEAD"] }, "admin.media.index": { "uri": "admin/medias", "methods": ["GET", "HEAD"] }, "admin.media.approve": { "uri": "admin/media/{id}", "methods": ["PATCH"], "parameters": ["id"] }, "admin.tag.index": { "uri": "admin/tag", "methods": ["GET", "HEAD"] }, "admin.tag.create": { "uri": "admin/tag/create", "methods": ["GET", "HEAD"] }, "admin.tag.store": { "uri": "admin/tag", "methods": ["POST"] }, "admin.tag.show": { "uri": "admin/tag/{tag}", "methods": ["GET", "HEAD"], "parameters": ["tag"] }, "admin.tag.edit": { "uri": "admin/tag/{tag}/edit", "methods": ["GET", "HEAD"], "parameters": ["tag"] }, "admin.tag.update": { "uri": "admin/tag/{tag}", "methods": ["PUT", "PATCH"], "parameters": ["tag"] }, "admin.tag.destroy": { "uri": "admin/tag/{tag}", "methods": ["DELETE"], "parameters": ["tag"] }, "admin.badge.index": { "uri": "admin/badge", "methods": ["GET", "HEAD"] }, "admin.badge.create": { "uri": "admin/badge/create", "methods": ["GET", "HEAD"] }, "admin.badge.store": { "uri": "admin/badge", "methods": ["POST"] }, "admin.badge.show": { "uri": "admin/badge/{badge}", "methods": ["GET", "HEAD"], "parameters": ["badge"] }, "admin.badge.edit": { "uri": "admin/badge/{badge}/edit", "methods": ["GET", "HEAD"], "parameters": ["badge"] }, "admin.badge.update": { "uri": "admin/badge/{badge}", "methods": ["PUT", "PATCH"], "parameters": ["badge"] }, "admin.badge.destroy": { "uri": "admin/badge/{badge}", "methods": ["DELETE"], "parameters": ["badge"] } } };
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy$1.routes, window.Ziggy.routes);
}
function t(t4, r2) {
  for (var n2 = 0; n2 < r2.length; n2++) {
    var e2 = r2[n2];
    e2.enumerable = e2.enumerable || false, e2.configurable = true, "value" in e2 && (e2.writable = true), Object.defineProperty(t4, "symbol" == typeof (o2 = function(t5, r3) {
      if ("object" != typeof t5 || null === t5)
        return t5;
      var n3 = t5[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var e3 = n3.call(t5, "string");
        if ("object" != typeof e3)
          return e3;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(t5);
    }(e2.key)) ? o2 : String(o2), e2);
  }
  var o2;
}
function r(r2, n2, e2) {
  return n2 && t(r2.prototype, n2), e2 && t(r2, e2), Object.defineProperty(r2, "prototype", { writable: false }), r2;
}
function n() {
  return n = Object.assign ? Object.assign.bind() : function(t4) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var n2 = arguments[r2];
      for (var e2 in n2)
        Object.prototype.hasOwnProperty.call(n2, e2) && (t4[e2] = n2[e2]);
    }
    return t4;
  }, n.apply(this, arguments);
}
function e(t4) {
  return e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t5) {
    return t5.__proto__ || Object.getPrototypeOf(t5);
  }, e(t4);
}
function o(t4, r2) {
  return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t5, r3) {
    return t5.__proto__ = r3, t5;
  }, o(t4, r2);
}
function i(t4, r2, n2) {
  return i = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if ("function" == typeof Proxy)
      return true;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), true;
    } catch (t5) {
      return false;
    }
  }() ? Reflect.construct.bind() : function(t5, r3, n3) {
    var e2 = [null];
    e2.push.apply(e2, r3);
    var i2 = new (Function.bind.apply(t5, e2))();
    return n3 && o(i2, n3.prototype), i2;
  }, i.apply(null, arguments);
}
function u(t4) {
  var r2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
  return u = function(t5) {
    if (null === t5 || -1 === Function.toString.call(t5).indexOf("[native code]"))
      return t5;
    if ("function" != typeof t5)
      throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r2) {
      if (r2.has(t5))
        return r2.get(t5);
      r2.set(t5, n2);
    }
    function n2() {
      return i(t5, arguments, e(this).constructor);
    }
    return n2.prototype = Object.create(t5.prototype, { constructor: { value: n2, enumerable: false, writable: true, configurable: true } }), o(n2, t5);
  }, u(t4);
}
var f = String.prototype.replace, a = /%20/g, c = "RFC3986", l = { default: c, formatters: { RFC1738: function(t4) {
  return f.call(t4, a, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738", RFC3986: c }, s = Object.prototype.hasOwnProperty, v = Array.isArray, p = function() {
  for (var t4 = [], r2 = 0; r2 < 256; ++r2)
    t4.push("%" + ((r2 < 16 ? "0" : "") + r2.toString(16)).toUpperCase());
  return t4;
}(), y = function(t4, r2) {
  for (var n2 = r2 && r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, e2 = 0; e2 < t4.length; ++e2)
    void 0 !== t4[e2] && (n2[e2] = t4[e2]);
  return n2;
}, d = { arrayToObject: y, assign: function(t4, r2) {
  return Object.keys(r2).reduce(function(t5, n2) {
    return t5[n2] = r2[n2], t5;
  }, t4);
}, combine: function(t4, r2) {
  return [].concat(t4, r2);
}, compact: function(t4) {
  for (var r2 = [{ obj: { o: t4 }, prop: "o" }], n2 = [], e2 = 0; e2 < r2.length; ++e2)
    for (var o2 = r2[e2], i2 = o2.obj[o2.prop], u2 = Object.keys(i2), f2 = 0; f2 < u2.length; ++f2) {
      var a2 = u2[f2], c2 = i2[a2];
      "object" == typeof c2 && null !== c2 && -1 === n2.indexOf(c2) && (r2.push({ obj: i2, prop: a2 }), n2.push(c2));
    }
  return function(t5) {
    for (; t5.length > 1; ) {
      var r3 = t5.pop(), n3 = r3.obj[r3.prop];
      if (v(n3)) {
        for (var e3 = [], o3 = 0; o3 < n3.length; ++o3)
          void 0 !== n3[o3] && e3.push(n3[o3]);
        r3.obj[r3.prop] = e3;
      }
    }
  }(r2), t4;
}, decode: function(t4, r2, n2) {
  var e2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === n2)
    return e2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(e2);
  } catch (t5) {
    return e2;
  }
}, encode: function(t4, r2, n2, e2, o2) {
  if (0 === t4.length)
    return t4;
  var i2 = t4;
  if ("symbol" == typeof t4 ? i2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (i2 = String(t4)), "iso-8859-1" === n2)
    return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
      return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
    });
  for (var u2 = "", f2 = 0; f2 < i2.length; ++f2) {
    var a2 = i2.charCodeAt(f2);
    45 === a2 || 46 === a2 || 95 === a2 || 126 === a2 || a2 >= 48 && a2 <= 57 || a2 >= 65 && a2 <= 90 || a2 >= 97 && a2 <= 122 || o2 === l.RFC1738 && (40 === a2 || 41 === a2) ? u2 += i2.charAt(f2) : a2 < 128 ? u2 += p[a2] : a2 < 2048 ? u2 += p[192 | a2 >> 6] + p[128 | 63 & a2] : a2 < 55296 || a2 >= 57344 ? u2 += p[224 | a2 >> 12] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2] : (a2 = 65536 + ((1023 & a2) << 10 | 1023 & i2.charCodeAt(f2 += 1)), u2 += p[240 | a2 >> 18] + p[128 | a2 >> 12 & 63] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2]);
  }
  return u2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, r2) {
  if (v(t4)) {
    for (var n2 = [], e2 = 0; e2 < t4.length; e2 += 1)
      n2.push(r2(t4[e2]));
    return n2;
  }
  return r2(t4);
}, merge: function t2(r2, n2, e2) {
  if (!n2)
    return r2;
  if ("object" != typeof n2) {
    if (v(r2))
      r2.push(n2);
    else {
      if (!r2 || "object" != typeof r2)
        return [r2, n2];
      (e2 && (e2.plainObjects || e2.allowPrototypes) || !s.call(Object.prototype, n2)) && (r2[n2] = true);
    }
    return r2;
  }
  if (!r2 || "object" != typeof r2)
    return [r2].concat(n2);
  var o2 = r2;
  return v(r2) && !v(n2) && (o2 = y(r2, e2)), v(r2) && v(n2) ? (n2.forEach(function(n3, o3) {
    if (s.call(r2, o3)) {
      var i2 = r2[o3];
      i2 && "object" == typeof i2 && n3 && "object" == typeof n3 ? r2[o3] = t2(i2, n3, e2) : r2.push(n3);
    } else
      r2[o3] = n3;
  }), r2) : Object.keys(n2).reduce(function(r3, o3) {
    var i2 = n2[o3];
    return r3[o3] = s.call(r3, o3) ? t2(r3[o3], i2, e2) : i2, r3;
  }, o2);
} }, b = Object.prototype.hasOwnProperty, h = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, r2) {
  return t4 + "[" + r2 + "]";
}, repeat: function(t4) {
  return t4;
} }, g = Array.isArray, m = String.prototype.split, j = Array.prototype.push, w = function(t4, r2) {
  j.apply(t4, g(r2) ? r2 : [r2]);
}, O = Date.prototype.toISOString, E = l.default, R = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: d.encode, encodeValuesOnly: false, format: E, formatter: l.formatters[E], indices: false, serializeDate: function(t4) {
  return O.call(t4);
}, skipNulls: false, strictNullHandling: false }, S = function t3(r2, n2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2) {
  var b2, h2 = r2;
  if ("function" == typeof f2 ? h2 = f2(n2, h2) : h2 instanceof Date ? h2 = l2(h2) : "comma" === e2 && g(h2) && (h2 = d.maybeMap(h2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === h2) {
    if (o2)
      return u2 && !p2 ? u2(n2, R.encoder, y2, "key", s2) : n2;
    h2 = "";
  }
  if ("string" == typeof (b2 = h2) || "number" == typeof b2 || "boolean" == typeof b2 || "symbol" == typeof b2 || "bigint" == typeof b2 || d.isBuffer(h2)) {
    if (u2) {
      var j2 = p2 ? n2 : u2(n2, R.encoder, y2, "key", s2);
      if ("comma" === e2 && p2) {
        for (var O2 = m.call(String(h2), ","), E2 = "", S2 = 0; S2 < O2.length; ++S2)
          E2 += (0 === S2 ? "" : ",") + v2(u2(O2[S2], R.encoder, y2, "value", s2));
        return [v2(j2) + "=" + E2];
      }
      return [v2(j2) + "=" + v2(u2(h2, R.encoder, y2, "value", s2))];
    }
    return [v2(n2) + "=" + v2(String(h2))];
  }
  var k2, x2 = [];
  if (void 0 === h2)
    return x2;
  if ("comma" === e2 && g(h2))
    k2 = [{ value: h2.length > 0 ? h2.join(",") || null : void 0 }];
  else if (g(f2))
    k2 = f2;
  else {
    var T2 = Object.keys(h2);
    k2 = a2 ? T2.sort(a2) : T2;
  }
  for (var N2 = 0; N2 < k2.length; ++N2) {
    var C2 = k2[N2], D2 = "object" == typeof C2 && void 0 !== C2.value ? C2.value : h2[C2];
    if (!i2 || null !== D2) {
      var $2 = g(h2) ? "function" == typeof e2 ? e2(n2, C2) : n2 : n2 + (c2 ? "." + C2 : "[" + C2 + "]");
      w(x2, t3(D2, $2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2));
    }
  }
  return x2;
}, k = Object.prototype.hasOwnProperty, x = Array.isArray, T = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: d.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, N = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, r2) {
    return String.fromCharCode(parseInt(r2, 10));
  });
}, C = function(t4, r2) {
  return t4 && "string" == typeof t4 && r2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, D = function(t4, r2, n2, e2) {
  if (t4) {
    var o2 = n2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = n2.depth > 0 && /(\[[^[\]]*])/.exec(o2), f2 = u2 ? o2.slice(0, u2.index) : o2, a2 = [];
    if (f2) {
      if (!n2.plainObjects && k.call(Object.prototype, f2) && !n2.allowPrototypes)
        return;
      a2.push(f2);
    }
    for (var c2 = 0; n2.depth > 0 && null !== (u2 = i2.exec(o2)) && c2 < n2.depth; ) {
      if (c2 += 1, !n2.plainObjects && k.call(Object.prototype, u2[1].slice(1, -1)) && !n2.allowPrototypes)
        return;
      a2.push(u2[1]);
    }
    return u2 && a2.push("[" + o2.slice(u2.index) + "]"), function(t5, r3, n3, e3) {
      for (var o3 = e3 ? r3 : C(r3, n3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, f3 = t5[i3];
        if ("[]" === f3 && n3.parseArrays)
          u3 = [].concat(o3);
        else {
          u3 = n3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var a3 = "[" === f3.charAt(0) && "]" === f3.charAt(f3.length - 1) ? f3.slice(1, -1) : f3, c3 = parseInt(a3, 10);
          n3.parseArrays || "" !== a3 ? !isNaN(c3) && f3 !== a3 && String(c3) === a3 && c3 >= 0 && n3.parseArrays && c3 <= n3.arrayLimit ? (u3 = [])[c3] = o3 : "__proto__" !== a3 && (u3[a3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(a2, r2, n2, e2);
  }
}, $ = function(t4, r2) {
  var n2 = function(t5) {
    if (!t5)
      return T;
    if (null != t5.decoder && "function" != typeof t5.decoder)
      throw new TypeError("Decoder has to be a function.");
    if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset)
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    return { allowDots: void 0 === t5.allowDots ? T.allowDots : !!t5.allowDots, allowPrototypes: "boolean" == typeof t5.allowPrototypes ? t5.allowPrototypes : T.allowPrototypes, arrayLimit: "number" == typeof t5.arrayLimit ? t5.arrayLimit : T.arrayLimit, charset: void 0 === t5.charset ? T.charset : t5.charset, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : T.charsetSentinel, comma: "boolean" == typeof t5.comma ? t5.comma : T.comma, decoder: "function" == typeof t5.decoder ? t5.decoder : T.decoder, delimiter: "string" == typeof t5.delimiter || d.isRegExp(t5.delimiter) ? t5.delimiter : T.delimiter, depth: "number" == typeof t5.depth || false === t5.depth ? +t5.depth : T.depth, ignoreQueryPrefix: true === t5.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof t5.interpretNumericEntities ? t5.interpretNumericEntities : T.interpretNumericEntities, parameterLimit: "number" == typeof t5.parameterLimit ? t5.parameterLimit : T.parameterLimit, parseArrays: false !== t5.parseArrays, plainObjects: "boolean" == typeof t5.plainObjects ? t5.plainObjects : T.plainObjects, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : T.strictNullHandling };
  }(r2);
  if ("" === t4 || null == t4)
    return n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var e2 = "string" == typeof t4 ? function(t5, r3) {
    var n3, e3 = {}, o3 = (r3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(r3.delimiter, Infinity === r3.parameterLimit ? void 0 : r3.parameterLimit), i3 = -1, u3 = r3.charset;
    if (r3.charsetSentinel)
      for (n3 = 0; n3 < o3.length; ++n3)
        0 === o3[n3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[n3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[n3] && (u3 = "iso-8859-1"), i3 = n3, n3 = o3.length);
    for (n3 = 0; n3 < o3.length; ++n3)
      if (n3 !== i3) {
        var f3, a3, c2 = o3[n3], l2 = c2.indexOf("]="), s2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
        -1 === s2 ? (f3 = r3.decoder(c2, T.decoder, u3, "key"), a3 = r3.strictNullHandling ? null : "") : (f3 = r3.decoder(c2.slice(0, s2), T.decoder, u3, "key"), a3 = d.maybeMap(C(c2.slice(s2 + 1), r3), function(t6) {
          return r3.decoder(t6, T.decoder, u3, "value");
        })), a3 && r3.interpretNumericEntities && "iso-8859-1" === u3 && (a3 = N(a3)), c2.indexOf("[]=") > -1 && (a3 = x(a3) ? [a3] : a3), e3[f3] = k.call(e3, f3) ? d.combine(e3[f3], a3) : a3;
      }
    return e3;
  }(t4, n2) : t4, o2 = n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(e2), u2 = 0; u2 < i2.length; ++u2) {
    var f2 = i2[u2], a2 = D(f2, e2[f2], n2, "string" == typeof t4);
    o2 = d.merge(o2, a2, n2);
  }
  return d.compact(o2);
}, F = /* @__PURE__ */ function() {
  function t4(t5, r2, n3) {
    var e2, o2;
    this.name = t5, this.definition = r2, this.bindings = null != (e2 = r2.bindings) ? e2 : {}, this.wheres = null != (o2 = r2.wheres) ? o2 : {}, this.config = n3;
  }
  var n2 = t4.prototype;
  return n2.matchesUrl = function(t5) {
    var r2 = this;
    if (!this.definition.methods.includes("GET"))
      return false;
    var n3 = this.template.replace(/(\/?){([^}?]*)(\??)}/g, function(t6, n4, e3, o3) {
      var i3, u3 = "(?<" + e3 + ">" + ((null == (i3 = r2.wheres[e3]) ? void 0 : i3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
      return o3 ? "(" + n4 + u3 + ")?" : "" + n4 + u3;
    }).replace(/^\w+:\/\//, ""), e2 = t5.replace(/^\w+:\/\//, "").split("?"), o2 = e2[0], i2 = e2[1], u2 = new RegExp("^" + n3 + "/?$").exec(decodeURI(o2));
    if (u2) {
      for (var f2 in u2.groups)
        u2.groups[f2] = "string" == typeof u2.groups[f2] ? decodeURIComponent(u2.groups[f2]) : u2.groups[f2];
      return { params: u2.groups, query: $(i2) };
    }
    return false;
  }, n2.compile = function(t5) {
    var r2 = this;
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(n3, e2, o2) {
      var i2, u2;
      if (!o2 && [null, void 0].includes(t5[e2]))
        throw new Error("Ziggy error: '" + e2 + "' parameter is required for route '" + r2.name + "'.");
      if (r2.wheres[e2] && !new RegExp("^" + (o2 ? "(" + r2.wheres[e2] + ")?" : r2.wheres[e2]) + "$").test(null != (u2 = t5[e2]) ? u2 : ""))
        throw new Error("Ziggy error: '" + e2 + "' parameter does not match required format '" + r2.wheres[e2] + "' for route '" + r2.name + "'.");
      return encodeURI(null != (i2 = t5[e2]) ? i2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.origin + "//", this.origin + "/").replace(/\/+$/, "") : this.template;
  }, r(t4, [{ key: "template", get: function() {
    var t5 = (this.origin + "/" + this.definition.uri).replace(/\/+$/, "");
    return "" === t5 ? "/" : t5;
  } }, { key: "origin", get: function() {
    return this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "";
  } }, { key: "parameterSegments", get: function() {
    var t5, r2;
    return null != (t5 = null == (r2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r2.map(function(t6) {
      return { name: t6.replace(/{|\??}/g, ""), required: !/\?}$/.test(t6) };
    })) ? t5 : [];
  } }]), t4;
}(), I = /* @__PURE__ */ function(t4) {
  var e2, i2;
  function u2(r2, e3, o2, i3) {
    var u3;
    if (void 0 === o2 && (o2 = true), (u3 = t4.call(this) || this).t = null != i3 ? i3 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, u3.t = n({}, u3.t, { absolute: o2 }), r2) {
      if (!u3.t.routes[r2])
        throw new Error("Ziggy error: route '" + r2 + "' is not in the route list.");
      u3.i = new F(r2, u3.t.routes[r2], u3.t), u3.u = u3.l(e3);
    }
    return u3;
  }
  i2 = t4, (e2 = u2).prototype = Object.create(i2.prototype), e2.prototype.constructor = e2, o(e2, i2);
  var f2 = u2.prototype;
  return f2.toString = function() {
    var t5 = this, r2 = Object.keys(this.u).filter(function(r3) {
      return !t5.i.parameterSegments.some(function(t6) {
        return t6.name === r3;
      });
    }).filter(function(t6) {
      return "_query" !== t6;
    }).reduce(function(r3, e3) {
      var o2;
      return n({}, r3, ((o2 = {})[e3] = t5.u[e3], o2));
    }, {});
    return this.i.compile(this.u) + function(t6, r3) {
      var n2, e3 = t6, o2 = function(t7) {
        if (!t7)
          return R;
        if (null != t7.encoder && "function" != typeof t7.encoder)
          throw new TypeError("Encoder has to be a function.");
        var r4 = t7.charset || R.charset;
        if (void 0 !== t7.charset && "utf-8" !== t7.charset && "iso-8859-1" !== t7.charset)
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var n3 = l.default;
        if (void 0 !== t7.format) {
          if (!b.call(l.formatters, t7.format))
            throw new TypeError("Unknown format option provided.");
          n3 = t7.format;
        }
        var e4 = l.formatters[n3], o3 = R.filter;
        return ("function" == typeof t7.filter || g(t7.filter)) && (o3 = t7.filter), { addQueryPrefix: "boolean" == typeof t7.addQueryPrefix ? t7.addQueryPrefix : R.addQueryPrefix, allowDots: void 0 === t7.allowDots ? R.allowDots : !!t7.allowDots, charset: r4, charsetSentinel: "boolean" == typeof t7.charsetSentinel ? t7.charsetSentinel : R.charsetSentinel, delimiter: void 0 === t7.delimiter ? R.delimiter : t7.delimiter, encode: "boolean" == typeof t7.encode ? t7.encode : R.encode, encoder: "function" == typeof t7.encoder ? t7.encoder : R.encoder, encodeValuesOnly: "boolean" == typeof t7.encodeValuesOnly ? t7.encodeValuesOnly : R.encodeValuesOnly, filter: o3, format: n3, formatter: e4, serializeDate: "function" == typeof t7.serializeDate ? t7.serializeDate : R.serializeDate, skipNulls: "boolean" == typeof t7.skipNulls ? t7.skipNulls : R.skipNulls, sort: "function" == typeof t7.sort ? t7.sort : null, strictNullHandling: "boolean" == typeof t7.strictNullHandling ? t7.strictNullHandling : R.strictNullHandling };
      }(r3);
      "function" == typeof o2.filter ? e3 = (0, o2.filter)("", e3) : g(o2.filter) && (n2 = o2.filter);
      var i3 = [];
      if ("object" != typeof e3 || null === e3)
        return "";
      var u3 = h[r3 && r3.arrayFormat in h ? r3.arrayFormat : r3 && "indices" in r3 ? r3.indices ? "indices" : "repeat" : "indices"];
      n2 || (n2 = Object.keys(e3)), o2.sort && n2.sort(o2.sort);
      for (var f3 = 0; f3 < n2.length; ++f3) {
        var a2 = n2[f3];
        o2.skipNulls && null === e3[a2] || w(i3, S(e3[a2], a2, u3, o2.strictNullHandling, o2.skipNulls, o2.encode ? o2.encoder : null, o2.filter, o2.sort, o2.allowDots, o2.serializeDate, o2.format, o2.formatter, o2.encodeValuesOnly, o2.charset));
      }
      var c2 = i3.join(o2.delimiter), s2 = true === o2.addQueryPrefix ? "?" : "";
      return o2.charsetSentinel && (s2 += "iso-8859-1" === o2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), c2.length > 0 ? s2 + c2 : "";
    }(n({}, r2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: function(t6, r3) {
      return "boolean" == typeof t6 ? Number(t6) : r3(t6);
    } });
  }, f2.v = function(t5) {
    var r2 = this;
    t5 ? this.t.absolute && t5.startsWith("/") && (t5 = this.p().host + t5) : t5 = this.h();
    var e3 = {}, o2 = Object.entries(this.t.routes).find(function(n2) {
      return e3 = new F(n2[0], n2[1], r2.t).matchesUrl(t5);
    }) || [void 0, void 0];
    return n({ name: o2[0] }, e3, { route: o2[1] });
  }, f2.h = function() {
    var t5 = this.p(), r2 = t5.pathname, n2 = t5.search;
    return (this.t.absolute ? t5.host + r2 : r2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n2;
  }, f2.current = function(t5, r2) {
    var e3 = this.v(), o2 = e3.name, i3 = e3.params, u3 = e3.query, f3 = e3.route;
    if (!t5)
      return o2;
    var a2 = new RegExp("^" + t5.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o2);
    if ([null, void 0].includes(r2) || !a2)
      return a2;
    var c2 = new F(o2, f3, this.t);
    r2 = this.l(r2, c2);
    var l2 = n({}, i3, u3);
    return !(!Object.values(r2).every(function(t6) {
      return !t6;
    }) || Object.values(l2).some(function(t6) {
      return void 0 !== t6;
    })) || Object.entries(r2).every(function(t6) {
      return l2[t6[0]] == t6[1];
    });
  }, f2.p = function() {
    var t5, r2, n2, e3, o2, i3, u3 = "undefined" != typeof window ? window.location : {}, f3 = u3.host, a2 = u3.pathname, c2 = u3.search;
    return { host: null != (t5 = null == (r2 = this.t.location) ? void 0 : r2.host) ? t5 : void 0 === f3 ? "" : f3, pathname: null != (n2 = null == (e3 = this.t.location) ? void 0 : e3.pathname) ? n2 : void 0 === a2 ? "" : a2, search: null != (o2 = null == (i3 = this.t.location) ? void 0 : i3.search) ? o2 : void 0 === c2 ? "" : c2 };
  }, f2.has = function(t5) {
    return Object.keys(this.t.routes).includes(t5);
  }, f2.l = function(t5, r2) {
    var e3 = this;
    void 0 === t5 && (t5 = {}), void 0 === r2 && (r2 = this.i), null != t5 || (t5 = {}), t5 = ["string", "number"].includes(typeof t5) ? [t5] : t5;
    var o2 = r2.parameterSegments.filter(function(t6) {
      return !e3.t.defaults[t6.name];
    });
    if (Array.isArray(t5))
      t5 = t5.reduce(function(t6, r3, e4) {
        var i4, u3;
        return n({}, t6, o2[e4] ? ((i4 = {})[o2[e4].name] = r3, i4) : "object" == typeof r3 ? r3 : ((u3 = {})[r3] = "", u3));
      }, {});
    else if (1 === o2.length && !t5[o2[0].name] && (t5.hasOwnProperty(Object.values(r2.bindings)[0]) || t5.hasOwnProperty("id"))) {
      var i3;
      (i3 = {})[o2[0].name] = t5, t5 = i3;
    }
    return n({}, this.g(r2), this.m(t5, r2));
  }, f2.g = function(t5) {
    var r2 = this;
    return t5.parameterSegments.filter(function(t6) {
      return r2.t.defaults[t6.name];
    }).reduce(function(t6, e3, o2) {
      var i3, u3 = e3.name;
      return n({}, t6, ((i3 = {})[u3] = r2.t.defaults[u3], i3));
    }, {});
  }, f2.m = function(t5, r2) {
    var e3 = r2.bindings, o2 = r2.parameterSegments;
    return Object.entries(t5).reduce(function(t6, r3) {
      var i3, u3, f3 = r3[0], a2 = r3[1];
      if (!a2 || "object" != typeof a2 || Array.isArray(a2) || !o2.some(function(t7) {
        return t7.name === f3;
      }))
        return n({}, t6, ((u3 = {})[f3] = a2, u3));
      if (!a2.hasOwnProperty(e3[f3])) {
        if (!a2.hasOwnProperty("id"))
          throw new Error("Ziggy error: object passed as '" + f3 + "' parameter is missing route model binding key '" + e3[f3] + "'.");
        e3[f3] = "id";
      }
      return n({}, t6, ((i3 = {})[f3] = a2[e3[f3]], i3));
    }, {});
  }, f2.valueOf = function() {
    return this.toString();
  }, f2.check = function(t5) {
    return this.has(t5);
  }, r(u2, [{ key: "params", get: function() {
    var t5 = this.v();
    return n({}, t5.params, t5.query);
  } }]), u2;
}(/* @__PURE__ */ u(String)), P = { install: function(t4, r2) {
  var n2 = function(t5, n3, e2, o2) {
    return void 0 === o2 && (o2 = r2), function(t6, r3, n4, e3) {
      var o3 = new I(t6, r3, n4, e3);
      return t6 ? o3.toString() : o3;
    }(t5, n3, e2, o2);
  };
  t4.mixin({ methods: { route: n2 } }), parseInt(t4.version) > 2 && t4.provide("route", n2);
} };
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": __vite_glob_0_0, "./Pages/Auth/ForgotPassword.vue": __vite_glob_0_1, "./Pages/Auth/Login.vue": __vite_glob_0_2, "./Pages/Auth/Register.vue": __vite_glob_0_3, "./Pages/Auth/ResetPassword.vue": __vite_glob_0_4, "./Pages/Auth/VerifyEmail.vue": __vite_glob_0_5, "./Pages/Error.vue": __vite_glob_0_6, "./Pages/Home.vue": __vite_glob_0_7, "./Pages/Leaderboard.vue": __vite_glob_0_8, "./Pages/Library.vue": __vite_glob_0_9, "./Pages/Medias/Partials/MediaGallery.vue": __vite_glob_0_10, "./Pages/Medias/Show.vue": __vite_glob_0_11, "./Pages/Profile/Edit.vue": __vite_glob_0_12, "./Pages/Profile/Partials/ChangeTheme.vue": __vite_glob_0_13, "./Pages/Profile/Partials/DeleteUserForm.vue": __vite_glob_0_14, "./Pages/Profile/Partials/UpdatePasswordForm.vue": __vite_glob_0_15, "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": __vite_glob_0_16, "./Pages/Search.vue": __vite_glob_0_17, "./Pages/User/Badges.vue": __vite_glob_0_18, "./Pages/User/LikedMedias.vue": __vite_glob_0_19, "./Pages/User/Notifications.vue": __vite_glob_0_20, "./Pages/User/Show.vue": __vite_glob_0_21, "./Pages/User/UserLayout.vue": __vite_glob_0_22 });
      return pages[`./Pages/${name}.vue`];
    },
    setup({ App, props, plugin }) {
      const app = createSSRApp({ render: () => h$1(App, props) });
      app.use(plugin);
      app.config.globalProperties.helperService = HelperService$1;
      app.config.globalProperties.helperService.setProps(props);
      app.config.globalProperties.formService = FormService$1;
      app.use(P, Ziggy$1);
    },
    progress: {
      color: "#1e40af"
    }
  })
);
