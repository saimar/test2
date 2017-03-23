
/*global define*/
(function (global, undefined) {
    "use strict";

    var document = global.document,
	    Alerta;

    Alerta = function () {

        var _alerta = {},
		    dialogs = {},
		    isopen = false,
		    keys = { ENTER: 13, ESC: 27, SPACE: 32 },
		    queue = [],
		    $, btnCancel, btnOK, btnReset, btnFocus, elCallee, elCover, elDialog, elLog, form, input, getTransitionEvent;

        dialogs = {
            buttons: {
                holder: "<nav class=\"alertify-buttons\">{{buttons}}</nav>",
                submit: "<button type=\"submit\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{Aceptar}}</button>",
                ok: "<a href=\"#\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{Aceptar}}</a>",
                cancel: "<a href=\"#\" class=\"alertify-button alertify-button-cancel\" id=\"alertify-cancel\">Cancelar</a>"
            },
            input: "<div class=\"alertify-text-wrapper\"><input type=\"text\" class=\"alertify-text\" id=\"alertify-text\"></div>",
            message: "<p class=\"alertify-message\">{{message}}</p>",
            log: "<article class=\"alertify-log{{class}}\">{{message}}</article>"
        };

        getTransitionEvent = function () {
            var t,
			    el = document.createElement("fakeelement"),
			    transitions = {
			        "WebkitTransition": "webkitTransitionEnd",
			        "MozTransition": "transitionend",
			        "OTransition": "otransitionend",
			        "transition": "transitionend"
			    };

            for (t in transitions) {
                if (el.style[t] !== undefined) return transitions[t];
            }
        };

        $ = function (id) {
            return document.getElementById(id);
        };

        _alerta = {
            labels: {
                ok: "Aceptar",
                cancel: "Cancelar"
            },
            delay: 5000,
            buttonReverse: false,
            transition: undefined,
         
            addListeners: function (fn) {
                var hasOK = (typeof btnOK !== "undefined"),
				    hasCancel = (typeof btnCancel !== "undefined"),
				    hasInput = (typeof input !== "undefined"),
				    val = "",
				    self = this,
				    ok, cancel, common, key, reset;

                ok = function (event) {
                    if (typeof event.preventDefault !== "undefined") event.preventDefault();
                    common(event);
                    if (typeof input !== "undefined") val = input.value;
                    if (typeof fn === "function") {
                        if (typeof input !== "undefined") {
                            fn(true, val);
                        }
                        else fn(true);
                    }
                    return false;
                };

                cancel = function (event) {
                    if (typeof event.preventDefault !== "undefined") event.preventDefault();
                    common(event);
                    if (typeof fn === "function") fn(false);
                    return false;
                };

                common = function (event) {
                    self.hide();
                    self.unbind(document.body, "keyup", key);
                    self.unbind(btnReset, "focus", reset);
                    if (hasInput) self.unbind(form, "submit", ok);
                    if (hasOK) self.unbind(btnOK, "click", ok);
                    if (hasCancel) self.unbind(btnCancel, "click", cancel);
                };

                key = function (event) {
                    var keyCode = event.keyCode;
                    if (keyCode === keys.SPACE && !hasInput) ok(event);
                    if (keyCode === keys.ESC && hasCancel) cancel(event);
                };

                reset = function (event) {
                    if (hasInput) input.focus();
                    else if (hasCancel) btnCancel.focus();
                };

                this.bind(btnReset, "focus", reset);
                if (hasOK) this.bind(btnOK, "click", ok);
                if (hasCancel) this.bind(btnCancel, "click", cancel);
                this.bind(document.body, "keyup", key);
                if (hasInput) this.bind(form, "submit", ok);
                if (typeof this.transition === "undefined") {
                    this.setFocus();
                }
            },

            bind: function (el, event, fn) {
                if (typeof el.addEventListener === "function") {
                    el.addEventListener(event, fn, false);
                } else if (el.attachEvent) {
                    el.attachEvent("on" + event, fn);
                }
            },

            handleErrors: function () {
                if (typeof global.onerror !== "undefined") {
                    var self = this;
                    global.onerror = function (msg, url, line) {
                        self.error("[" + msg + " on line " + line + " of " + url + "]", 0);
                    };
                    return true;
                } else {
                    return false;
                }
            },

         
            appendButtons: function (secondary, primary) {
                return this.buttonReverse ? primary + secondary : secondary + primary;
            },

            build: function (item) {
                var html = "",
				    type = item.type,
				    message = item.message,
				    css = item.cssClass || "";

                html += "<div class=\"alertify-dialog\">";

                if (_alerta.buttonFocus === "none") html += "<a href=\"#\" id=\"alertify-noneFocus\" class=\"alertify-hidden\"></a>";

                if (type === "prompt") html += "<form id=\"alertify-form\">";

                html += "<article class=\"alertify-inner\">";
                html += dialogs.message.replace("{{message}}", message);

                if (type === "prompt") html += dialogs.input;

                html += dialogs.buttons.holder;
                html += "</article>";

                if (type === "prompt") html += "</form>";

                html += "<a id=\"alertify-resetFocus\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";
                html += "</div>";

                switch (type) {
                    case "prompt":
                        html = html.replace("{{buttons}}", this.appendButtons(dialogs.buttons.cancel, dialogs.buttons.submit));
                        html = html.replace("{{Aceptar}}", this.labels.ok).replace("cancelar", this.labels.cancel);
                        break;
                    case "Comentario":
                        html = html.replace("{{buttons}}", dialogs.buttons.ok);
                        html = html.replace("{{Aceptar}}", this.labels.ok);
                        break;
                    default:
                        break;
                }

                elDialog.className = "alertify alertify-show alertify-" + type + " " + css;
                elCover.className = "alertify-cover";
                return html;
            },

       
            close: function (elem, wait) {
                var timer = (wait && !isNaN(wait)) ? +wait : this.delay,
				    self = this,
				    hideElement, transitionDone;

                this.bind(elem, "click", function () {
                    hideElement(elem);
                });
                transitionDone = function (event) {
                    event.stopPropagation();
                    self.unbind(this, self.transition, transitionDone);
                    elLog.removeChild(this);
                    if (!elLog.hasChildNodes()) elLog.className += " alertify-logs-hidden";
                };
                hideElement = function (el) {
                    if (typeof el !== "undefined" && el.parentNode === elLog) {
                        if (typeof self.transition !== "undefined") {
                            self.bind(el, self.transition, transitionDone);
                            el.className += " alertify-log-hide";
                        } else {
                            elLog.removeChild(el);
                            if (!elLog.hasChildNodes()) elLog.className += " alertify-logs-hidden";
                        }
                    }
                };
                if (wait === 0) return;
                setTimeout(function () { hideElement(elem); }, timer);
            },

            /**
			 * Create a dialog box
			 *
			 * @param  {String}   message        The message passed from the callee
			 * @param  {String}   type           Type of dialog to create
			 * @param  {Function} fn             [Optional] Callback function
			 * @param  {String}   placeholder    [Optional] Default value for prompt input field
			 * @param  {String}   cssClass       [Optional] Class(es) to append to dialog box
			 *
			 * @return {Object}
			 */
            dialog: function (message, type, fn, placeholder, cssClass) {
                elCallee = document.activeElement;
                var check = function () {
                    if (elDialog && elDialog.scrollTop !== null) return;
                    else check();
                };
                // error catching
                if (typeof message !== "string") throw new Error("message must be a string");
                if (typeof type !== "string") throw new Error("type must be a string");
                if (typeof fn !== "undefined" && typeof fn !== "function") throw new Error("fn must be a function");
                // initialize alertify if it hasn't already been done
                if (typeof this.init === "function") {
                    this.init();
                    check();
                }

                queue.push({ type: type, message: message, callback: fn, placeholder: placeholder, cssClass: cssClass });
                if (!isopen) this.setup();

                return this;
            },

            extend: function (type) {
                if (typeof type !== "string") throw new Error("extend method must have exactly one paramter");
                return function (message, wait) {
                    this.log(message, type, wait);
                    return this;
                };
            },

       
            hide: function () {
                var transitionDone,
				    self = this;
                queue.splice(0, 1);
                if (queue.length > 0) this.setup();
                else {
                    isopen = false;
                    transitionDone = function (event) {
                        event.stopPropagation();
                        elDialog.className += " alertify-isHidden";
                        self.unbind(elDialog, self.transition, transitionDone);
                    };
                    // whether CSS transition exists
                    if (typeof this.transition !== "undefined") {
                        this.bind(elDialog, this.transition, transitionDone);
                        elDialog.className = "alertify alertify-hide alertify-hidden";
                    } else {
                        elDialog.className = "alertify alertify-hide alertify-hidden alertify-isHidden";
                    }
                    elCover.className = "alertify-cover alertify-cover-hidden";
                    elCallee.focus();
                }
            },

          
            init: function () {
                document.createElement("nav");
                document.createElement("article");
                document.createElement("section");
                elCover = document.createElement("div");
                elCover.setAttribute("id", "alertify-cover");
                elCover.className = "alertify-cover alertify-cover-hidden";
                document.body.appendChild(elCover);
                elDialog = document.createElement("section");
                elDialog.setAttribute("id", "alertify");
                elDialog.className = "alertify alertify-hidden";
                document.body.appendChild(elDialog);
                elLog = document.createElement("section");
                elLog.setAttribute("id", "alertify-logs");
                elLog.className = "alertify-logs alertify-logs-hidden";
                document.body.appendChild(elLog);
               
                document.body.setAttribute("tabindex", "0");
                this.transition = getTransitionEvent();
                delete this.init;
            },

          
            log: function (message, type, wait) {
                var check = function () {
                    if (elLog && elLog.scrollTop !== null) return;
                    else check();
                };
                if (typeof this.init === "function") {
                    this.init();
                    check();
                }
                elLog.className = "alertify-logs";
                this.notify(message, type, wait);
                return this;
            },

         
            notify: function (message, type, wait) {
                var log = document.createElement("article");
                log.className = "alertify-log" + ((typeof type === "string" && type !== "") ? " alertify-log-" + type : "");
                log.innerHTML = message;
                // prepend child
                elLog.insertBefore(log, elLog.firstChild);
                // triggers the CSS animation
                setTimeout(function () { log.className = log.className + " alertify-log-show"; }, 50);
                this.close(log, wait);
            },

            set: function (args) {
                var k;
                if (typeof args !== "object" && args instanceof Array) throw new Error("args must be an object");
                for (k in args) {
                    if (args.hasOwnProperty(k)) {
                        this[k] = args[k];
                    }
                }
            },

         
            setFocus: function () {
                if (input) {
                    input.focus();
                    input.select();
                }
                else btnFocus.focus();
            },

          
            setup: function () {
                var item = queue[0],
				    self = this,
				    transitionDone;

                isopen = true;
                transitionDone = function (event) {
                    event.stopPropagation();
                    self.unbind(elDialog, self.transition, transitionDone);
                };
                if (typeof this.transition !== "undefined") {
                    this.bind(elDialog, this.transition, transitionDone);
                }
                elDialog.innerHTML = this.build(item);
                btnReset = $("alertify-resetFocus");
                btnOK = $("alertify-ok") || undefined;
                btnCancel = $("alertify-cancel") || undefined;
                input = $("alertify-text") || undefined;
                form = $("alertify-form") || undefined;

                if (typeof item.placeholder === "string" && item.placeholder !== "") input.value = item.placeholder;
                this.addListeners(item.callback);
            },

        
            unbind: function (el, event, fn) {
                if (typeof el.removeEventListener === "function") {
                    el.removeEventListener(event, fn, false);
                } else if (el.detachEvent) {
                    el.detachEvent("on" + event, fn);
                }
            }
        };

        return {
            Comentario: function (message, fn, cssClass) { _alerta.dialog(message, "Comentario", fn, "", cssClass); return this; },
            extend: _alerta.extend,
            init: _alerta.init,
            log: function (message, type, wait) { _alerta.log(message, type, wait); return this; },
            prompt: function (message, fn, placeholder, cssClass) { _alerta.dialog(message, "prompt", fn, placeholder, cssClass); return this; },
            success: function (message, wait) { _alerta.log(message, "success", wait); return this; },
            error: function (message, wait) { _alerta.log(message, "error", wait); return this; },
            set: function (args) { _alerta.set(args); },
            labels: _alerta.labels,
            debug: _alerta.handleErrors
        };
    };

    if (typeof define === "function") {
        define([], function () { return new Alerta(); });
    } else if (typeof global.alerta === "undefined") {
        global.alerta = new Alerta();
    }

}(this));
