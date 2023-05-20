(function(b) {
    b.hotkeys = {
        version: "0.8",
        specialKeys: {
            8 : "backspace",
            9 : "tab",
            13 : "return",
            16 : "shift",
            17 : "ctrl",
            18 : "alt",
            19 : "pause",
            20 : "capslock",
            27 : "esc",
            32 : "space",
            33 : "pageup",
            34 : "pagedown",
            35 : "end",
            36 : "home",
            37 : "left",
            38 : "up",
            39 : "right",
            40 : "down",
            45 : "insert",
            46 : "del",
            96 : "0",
            97 : "1",
            98 : "2",
            99 : "3",
            100 : "4",
            101 : "5",
            102 : "6",
            103 : "7",
            104 : "8",
            105 : "9",
            106 : "*",
            107 : "+",
            109 : "-",
            110 : ".",
            111 : "/",
            112 : "f1",
            113 : "f2",
            114 : "f3",
            115 : "f4",
            116 : "f5",
            117 : "f6",
            118 : "f7",
            119 : "f8",
            120 : "f9",
            121 : "f10",
            122 : "f11",
            123 : "f12",
            144 : "numlock",
            145 : "scroll",
            191 : "/",
            224 : "meta"
        },
        shiftNums: {
            "`": "~",
            "1": "!",
            "2": "@",
            "3": "#",
            "4": "$",
            "5": "%",
            "6": "^",
            "7": "&",
            "8": "*",
            "9": "(",
            "0": ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        }
    };
    function a(d) {
        if (typeof d.data !== "string") {
            return
        }
        var c = d.handler,
        e = d.data.toLowerCase().split(" ");
        d.handler = function(n) {
            if (this !== n.target && (/textarea|select/i.test(n.target.nodeName) || n.target.type === "text")) {
                return
            }
            var h = n.type !== "keypress" && b.hotkeys.specialKeys[n.which],
            o = String.fromCharCode(n.which).toLowerCase(),
            k,
            m = "",
            g = {};
            if (n.altKey && h !== "alt") {
                m += "alt+"
            }
            if (n.ctrlKey && h !== "ctrl") {
                m += "ctrl+"
            }
            if (n.metaKey && !n.ctrlKey && h !== "meta") {
                m += "meta+"
            }
            if (n.shiftKey && h !== "shift") {
                m += "shift+"
            }
            if (h) {
                g[m + h] = true
            } else {
                g[m + o] = true;
                g[m + b.hotkeys.shiftNums[o]] = true;
                if (m === "shift+") {
                    g[b.hotkeys.shiftNums[o]] = true
                }
            }
            for (var j = 0,
            f = e.length; j < f; j++) {
                if (g[e[j]]) {
                    return c.apply(this, arguments)
                }
            }
        }
    }
    b.each(["keydown", "keyup", "keypress"],
    function() {
        b.event.special[this] = {
            add: a
        }
    })
})(jQuery); (function(a) {
    a.browserTest = function(e, g) {
        var f = "unknown",
        d = "X",
        b = function(k, j) {
            for (var c = 0; c < j.length; c = c + 1) {
                k = k.replace(j[c][0], j[c][1])
            }
            return k
        },
        h = function(l, k, j, n) {
            var m = {
                name: b((k.exec(l) || [f, f])[1], j)
            };
            m[m.name] = true;
            m.version = (n.exec(l) || [d, d, d, d])[3];
            if (m.name.match(/safari/) && m.version > 400) {
                m.version = "2.0"
            }
            if (m.name === "presto") {
                m.version = (a.browser.version > 9.27) ? "futhark": "linear_b"
            }
            m.versionNumber = parseFloat(m.version, 10) || 0;
            m.versionX = (m.version !== d) ? (m.version + "").substr(0, 1) : d;
            m.className = m.name + m.versionX;
            return m
        };
        e = (e.match(/Opera|Navigator|Minefield|KHTML|Chrome/) ? b(e, [[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ""], ["Chrome Safari", "Chrome"], ["KHTML", "Konqueror"], ["Minefield", "Firefox"], ["Navigator", "Netscape"]]) : e).toLowerCase();
        a.browser = a.extend((!g) ? a.browser: {},
        h(e, /(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/, [], /(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));
        a.layout = h(e, /(gecko|konqueror|msie|opera|webkit)/, [["konqueror", "khtml"], ["msie", "trident"], ["opera", "presto"]], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);
        a.os = {
            name: (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [f])[0].replace("sunos", "solaris")
        };
        if (!g) {
            a("html").addClass([a.os.name, a.browser.name, a.browser.className, a.layout.name, a.layout.className].join(" "))
        }
    };
    a.browserTest(navigator.userAgent)
})(jQuery); (function(a) {
    a.fn.whoami = function(b, c) {
        c = a.extend({},
        a.fn.whoami.params, c);
        this.each(function() {
            var d = a(this);
            d.bind("whoami", b).bind("keyup",
            function(e) {
                a.fn.whoami.checkCode(e, c, d)
            })
        });
        return this
    };
    a.fn.whoami.params = {
        code: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
        step: 0
    };
    a.fn.whoami.checkCode = function(b, c, d) {
        if (b.keyCode == c.code[c.step]) {
            c.step++
        } else {
            c.step = 0
        }
        if (c.step == c.code.length) {
            d.trigger("whoami");
            c.step = 0
        }
    }
})(jQuery);
function ltrim(b) {
    if (b) {
        var a = /\s*((\S+\s*)*)/;
        return b.replace(a, "$1")
    }
    return ""
}
function rtrim(b) {
    if (b) {
        var a = /((\s*\S+)*)\s*/;
        return b.replace(a, "$1")
    }
    return ""
}
function trim(a) {
    if (a) {
        return ltrim(rtrim(a))
    }
    return ""
}
function entityEncode(a) {
    a = a.replace(/&/g, "&amp;");
    a = a.replace(/</g, "&lt;");
    a = a.replace(/>/g, "&gt;");
    a = a.replace(/  /g, " &nbsp;");
    if (/msie/i.test(navigator.userAgent)) {
        a = a.replace("\n", "&nbsp;<br />")
    } else {
        a = a.replace(/\x0D/g, "&nbsp;<br />")
    }
    return a
}
var TerminalShell = {
    commands: {
        help: function help(a) {
            a.print($("<h3>help</h3>"));
            cmd_list = $("<ul>");
            $.each(["cd", "ls", "cat", "write", "sqlmap", "ifconfig", "arch", "..."],
            function(c, b) {
                cmd_list.append($("<li>").text(b))
            });
            a.print(cmd_list);
            a.print(cow("Are you not hacker???"))
        },
        clear: function(a) {
            a.clear()
        }
    },
    filters: [],
    fallback: null,
    lastCommand: null,
    process: function(a, b) {
        try {
            $.each(this.filters, $.proxy(function(e, g) {
                b = g.call(this, a, b)
            },
            this));
            var f = b.split(" ");
            var d = f.shift();
            f.unshift(a);
            if (this.commands.hasOwnProperty(d)) {
                this.commands[d].apply(this, f)
            } else {
                if (! (this.fallback && this.fallback(a, b))) {
                    a.print('Unrecognized command. Type "help" for assistance.')
                }
            }
            this.lastCommand = b
        } catch(c) {
            a.print($("<p>").addClass("error").text("An internal error occured: " + c));
            a.setWorking(false)
        }
    },
};
var Terminal = {
    buffer: "",
    pos: 0,
    history: [],
    historyPos: 0,
    promptActive: true,
    cursorBlinkState: true,
    _cursorBlinkTimeout: null,
    spinnerIndex: 0,
    _spinnerTimeout: null,
    output: TerminalShell,
    config: {
        scrollStep: 20,
        scrollSpeed: 100,
        bg_color: "#000",
        fg_color: "#FFF",
        cursor_blink_time: 700,
        cursor_style: "block",
        prompt: "i0gan@arch:~$ ",
        spinnerCharacters: ["[   ]", "[.  ]", "[.. ]", "[...]"],
        spinnerSpeed: 250,
        typingSpeed: 50
    },
    sticky: {
        keys: {
            ctrl: false,
            alt: false,
            scroll: false
        },
        set: function(a, b) {
            this.keys[a] = b;
            $("#" + a + "-indicator").toggle(this.keys[a])
        },
        toggle: function(a) {
            this.set(a, !this.keys[a])
        },
        reset: function(a) {
            this.set(a, false)
        },
        resetAll: function(a) {
            $.each(this.keys, $.proxy(function(b, c) {
                this.reset(b)
            },
            this))
        }
    },
    init: function() {
        function a(b) {
            return function() {
                if (Terminal.promptActive) {
                    b.apply(this, arguments)
                }
            }
        }
        $(document).keypress($.proxy(a(function(d) {
            if (d.which >= 32 && d.which <= 126) {
                var c = String.fromCharCode(d.which);
                var b = c.toLowerCase()
            } else {
                return
            }
            if ($.browser.opera && !(/[\w\s]/.test(c))) {
                return
            }
            if (this.sticky.keys.ctrl) {
                if (b == "w") {
                    this.deleteWord()
                } else {
                    if (b == "h") {
                        Terminal.deleteCharacter(false)
                    } else {
                        if (b == "l") {
                            this.clear()
                        } else {
                            if (b == "a") {
                                this.setPos(0)
                            } else {
                                if (b == "e") {
                                    this.setPos(this.buffer.length)
                                } else {
                                    if (b == "d") {
                                        this.runCommand("logout")
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (c) {
                    this.addCharacter(c);
                    d.preventDefault()
                }
            }
        }), this)).bind("keydown", "return", a(function(b) {
            Terminal.processInputBuffer()
        })).bind("keydown", "backspace", a(function(b) {
            b.preventDefault();
            Terminal.deleteCharacter(b.shiftKey)
        })).bind("keydown", "del", a(function(b) {
            Terminal.deleteCharacter(true)
        })).bind("keydown", "left", a(function(b) {
            Terminal.moveCursor( - 1)
        })).bind("keydown", "right", a(function(b) {
            Terminal.moveCursor(1)
        })).bind("keydown", "up", a(function(b) {
            b.preventDefault();
            if (b.shiftKey || Terminal.sticky.keys.scroll) {
                Terminal.scrollLine( - 1)
            } else {
                if (b.ctrlKey || Terminal.sticky.keys.ctrl) {
                    Terminal.scrollPage( - 1)
                } else {
                    Terminal.moveHistory( - 1)
                }
            }
        })).bind("keydown", "down", a(function(b) {
            b.preventDefault();
            if (b.shiftKey || Terminal.sticky.keys.scroll) {
                Terminal.scrollLine(1)
            } else {
                if (b.ctrlKey || Terminal.sticky.keys.ctrl) {
                    Terminal.scrollPage(1)
                } else {
                    Terminal.moveHistory(1)
                }
            }
        })).bind("keydown", "pageup", a(function(b) {
            Terminal.scrollPage( - 1)
        })).bind("keydown", "pagedown", a(function(b) {
            Terminal.scrollPage(1)
        })).bind("keydown", "home", a(function(b) {
            b.preventDefault();
            if (b.ctrlKey || Terminal.sticky.keys.ctrl) {
                Terminal.jumpToTop()
            } else {
                Terminal.setPos(0)
            }
        })).bind("keydown", "end", a(function(b) {
            b.preventDefault();
            if (b.ctrlKey || Terminal.sticky.keys.ctrl) {
                Terminal.jumpToBottom()
            } else {
                Terminal.setPos(Terminal.buffer.length)
            }
        })).bind("keydown", "tab",
        function(b) {
            b.preventDefault()
        }).keyup(function(c) {
            var b = $.hotkeys.specialKeys[c.which];
            if (b in {
                ctrl: true,
                alt: true,
                scroll: true
            }) {
                Terminal.sticky.toggle(b)
            } else {
                if (! (b in {
                    left: true,
                    right: true,
                    up: true,
                    down: true
                })) {
                    Terminal.sticky.resetAll()
                }
            }
        });
        $(window).resize(function(b) {
            $("#screen").scrollTop($("#screen")[0].scrollHeight)
        });
        this.setCursorState(true);
        this.setWorking(false);
        $("#prompt").html(this.config.prompt);
        $("#screen").hide().fadeIn("fast",
        function() {
            $("#screen").triggerHandler("cli-load")
        })
    },
    setCursorState: function(b, a) {
        this.cursorBlinkState = b;
        if (this.config.cursor_style == "block") {
            if (b) {
                $("#cursor").css({
                    color: this.config.bg_color,
                    backgroundColor: this.config.fg_color
                })
            } else {
                $("#cursor").css({
                    color: this.config.fg_color,
                    background: "none"
                })
            }
        } else {
            if (b) {
                $("#cursor").css("textDecoration", "underline")
            } else {
                $("#cursor").css("textDecoration", "none")
            }
        }
        if (!a && this._cursorBlinkTimeout) {
            window.clearTimeout(this._cursorBlinkTimeout);
            this._cursorBlinkTimeout = null
        }
        this._cursorBlinkTimeout = window.setTimeout($.proxy(function() {
            this.setCursorState(!this.cursorBlinkState, true)
        },
        this), this.config.cursor_blink_time)
    },
    updateInputDisplay: function() {
        var c = "",
        b = " ",
        a = "";
        if (this.pos < 0) {
            this.pos = 0
        }
        if (this.pos > this.buffer.length) {
            this.pos = this.buffer.length
        }
        if (this.pos > 0) {
            c = this.buffer.substr(0, this.pos)
        }
        if (this.pos < this.buffer.length) {
            b = this.buffer.substr(this.pos, 1)
        }
        if (this.buffer.length - this.pos > 1) {
            a = this.buffer.substr(this.pos + 1, this.buffer.length - this.pos - 1)
        }
        $("#lcommand").text(c);
        $("#cursor").text(b);
        if (b == " ") {
            $("#cursor").html("&nbsp;")
        }
        $("#rcommand").text(a);
        $("#prompt").text(this.config.prompt);
        return
    },
    clearInputBuffer: function() {
        this.buffer = "";
        this.pos = 0;
        this.updateInputDisplay()
    },
    clear: function() {
        $("#display").html("")
    },
    sudo: function(a) {
        if (a) {
            this.config.prompt = this.config.prompt.replace("$", "#").replace("i0gan", "root")
        } else {
            this.config.prompt = this.config.prompt.replace("#", "$").replace("root", "i0gan")
        }
        $("#prompt").text(this.config.prompt)
    },
    addCharacter: function(b) {
        var c = this.buffer.substr(0, this.pos);
        var a = this.buffer.substr(this.pos, this.buffer.length - this.pos);
        this.buffer = c + b + a;
        this.pos++;
        this.updateInputDisplay();
        this.setCursorState(true)
    },
    deleteCharacter: function(a) {
        var d = a ? 1 : 0;
        if (this.pos >= (1 - d)) {
            var c = this.buffer.substr(0, this.pos - 1 + d);
            var b = this.buffer.substr(this.pos + d, this.buffer.length - this.pos - d);
            this.buffer = c + b;
            this.pos -= 1 - d;
            this.updateInputDisplay()
        }
        this.setCursorState(true)
    },
    deleteWord: function() {
        if (this.pos > 0) {
            var a = this.pos;
            while (a > 0 && this.buffer.charAt(a) !== " ") {
                a--
            }
            left = this.buffer.substr(0, a - 1);
            right = this.buffer.substr(a, this.buffer.length - this.pos);
            this.buffer = left + right;
            this.pos = a;
            this.updateInputDisplay()
        }
        this.setCursorState(true)
    },
    moveCursor: function(a) {
        this.setPos(this.pos + a)
    },
    setPos: function(a) {
        if ((a >= 0) && (a <= this.buffer.length)) {
            this.pos = a;
            Terminal.updateInputDisplay()
        }
        this.setCursorState(true)
    },
    moveHistory: function(b) {
        var a = this.historyPos + b;
        if ((a >= 0) && (a <= this.history.length)) {
            if (a == this.history.length) {
                this.clearInputBuffer()
            } else {
                this.buffer = this.history[a]
            }
            this.pos = this.buffer.length;
            this.historyPos = a;
            this.updateInputDisplay();
            this.jumpToBottom()
        }
        this.setCursorState(true)
    },
    addHistory: function(a) {
        this.historyPos = this.history.push(a)
    },
    jumpToBottom: function() {
        $("#screen").animate({
            scrollTop: $("#screen")[0].scrollHeight
        },
        this.config.scrollSpeed, "linear")
    },
    jumpToTop: function() {
        $("#screen").animate({
            scrollTop: 0
        },
        this.config.scrollSpeed, "linear")
    },
    scrollPage: function(a) {
        $("#screen").animate({
            scrollTop: $("#screen").scrollTop() + a * ($("#screen").height() * 0.75)
        },
        this.config.scrollSpeed, "linear")
    },
    scrollLine: function(a) {
        $("#screen").scrollTop($("#screen").scrollTop() + a * this.config.scrollStep)
    },
    print: function(b) {
        if (!b) {
            $("#display").append($("<div>"))
        } else {
            if (b instanceof jQuery) {
                $("#display").append(b)
            } else {
                var a = Array.prototype.slice.call(arguments, 0);
                $("#display").append($("<p>").text(a.join(" ")))
            }
        }
        this.jumpToBottom()
    },
    processInputBuffer: function(a) {
        this.print($("<p>").addClass("command").text(this.config.prompt + this.buffer));
        var a = trim(this.buffer);
        this.clearInputBuffer();
        if (a.length == 0) {
            return false
        }
        this.addHistory(a);
        if (this.output) {
            return this.output.process(this, a)
        } else {
            return false
        }
    },
    setPromptActive: function(a) {
        this.promptActive = a;
        $("#inputline").toggle(this.promptActive)
    },
    setWorking: function(a) {
        if (a && !this._spinnerTimeout) {
            $("#display .command:last-child").add("#bottomline").first().append($("#spinner"));
            this._spinnerTimeout = window.setInterval($.proxy(function() {
                if (!$("#spinner").is(":visible")) {
                    $("#spinner").fadeIn()
                }
                this.spinnerIndex = (this.spinnerIndex + 1) % this.config.spinnerCharacters.length;
                $("#spinner").text(this.config.spinnerCharacters[this.spinnerIndex])
            },
            this), this.config.spinnerSpeed);
            this.setPromptActive(false);
            $("#screen").triggerHandler("cli-busy")
        } else {
            if (!a && this._spinnerTimeout) {
                clearInterval(this._spinnerTimeout);
                this._spinnerTimeout = null;
                $("#spinner").fadeOut();
                this.setPromptActive(true);
                $("#screen").triggerHandler("cli-ready")
            }
        }
    },
    runCommand: function(e) {
        var b = 0;
        var d = false;
        this.promptActive = false;
        var a = window.setInterval($.proxy(function c() {
            if (b < e.length) {
                this.addCharacter(e.charAt(b));
                b += 1
            } else {
                clearInterval(a);
                this.promptActive = true;
                this.processInputBuffer()
            }
        },
        this), this.config.typingSpeed)
    }
};
$(document).ready(function() {
    $("#welcome").show();
    document.onkeydown = document.onkeypress = function(a) {
        return $.hotkeys.specialKeys[a.keyCode] != "backspace"
    };
    Terminal.init()
});
function pathFilename(b) {
    var a = /\/([^\/]+)$/.exec(b);
    if (a) {
        return a[1]
    }
}
function getRandomInt(b, a) {
    return Math.floor(Math.random() * (a - b + 1)) + b
}
function randomChoice(a) {
    return a[getRandomInt(0, a.length - 1)]
}
var xkcd = {
    lang: "en",
    face: '              \\|/ ____ \\|/\n              "@\'/ ,. \\`@"\n              /_| \\__/ |_\\\n                 \\__U_/\n\n',
    cow: "             \\   ^__^\n              \\  (xx)\\_______\n                 (__)\\       )\\/\\\n                  U  ||----w |\n                     ||     ||\n\n",
    logo: "   __                             \n /'__`\\                           \n/\\ \\/\\ \\    ___   _____     ____  \n\\ \\ \\ \\ \\  / __`\\/\\ '__`\\  /',__\\ \n \\ \\ \\_\\ \\/\\ \\L\\ \\ \\ \\L\\ \\/\\__, `\\\n  \\ \\____/\\ \\____/\\ \\ ,__/\\/\\____/\n   \\/___/  \\/___/  \\ \\ \\/  \\/___/ \n                    \\ \\_\\         \n                     \\/_/         \n\n"
};
function cow(b) {
    var a = "";
    a += "     " + " _________________________________________________________________________________________________".substr(0, b.length + 3) + "\n";
    a += "     < " + b + " >\n";
    a += "     " + " -------------------------------------------------------------------------------------------------".substr(0, b.length + 3) + "\n";
    a += xkcd.cow + "\n";
    return a
}
TerminalShell.commands.sudo = function(a) {
    var c = Array.prototype.slice.call(arguments);
    c.shift();
    if (c.join(" ") == "key") {
        a.print("Okay.")
    } else {
        var b = c.shift();
        c.unshift(a);
        c.push("sudo");
        if (TerminalShell.commands.hasOwnProperty(b)) {
            if (a.god) {
                this.commands[b].apply(this, c)
            } else {
                a.god = true;
                this.commands[b].apply(this, c);
                delete a.god
            }
        } else {
            if (!b) {
                a.print("usage: sudo -h | -K | -k | -V")
            } else {
                a.print("sudo: " + b + ": command not found")
            }
        }
    }
};
TerminalShell.commands.whosyourdaddy = function(a) {
    a.god = true;
    a.sudo(true)
};
TerminalShell.commands.blacksheepwall = function(a) {
    a.map = true
};
TerminalShell.filters.push(function(b, c) {
    if (/!!/.test(c)) {
        var a = c.replace("!!", this.lastCommand);
        b.print(a);
        return a
    } else {
        return c
    }
});
TerminalShell.commands.shutdown = TerminalShell.commands.poweroff = function(a) {
    if (a.god) {
        if (a.god) {
            a.print("Broadcast message from root@arch")
        } else {
            a.print("Broadcast message from i0gan@arch")
        }
        a.print();
        a.print("The system is going down for maintenance now!");
        return $("#screen").fadeOut()
    } else {
        a.print("Must be root.")
    }
};
TerminalShell.commands.logout = TerminalShell.commands.exit = TerminalShell.commands.quit = function(a) {
    if (a.god) {
        delete a.god;
        a.sudo(false);
        return
    }
    a.print("Bye.");
    $("#prompt, #cursor").hide();
    a.promptActive = false
};


TerminalShell.commands.restart = TerminalShell.commands.reboot = function(a) {
    if (a.god) {
        TerminalShell.commands.poweroff(a).queue(function(b) {
            window.location.reload()
        })
    } else {
        a.print("Must be root.")
    }
};


TerminalShell.commands.sh = TerminalShell.commands.bash = function(a) {
    window.location.reload()
};


function linkFile(a) {
    return {
        type: "dir",
        enter: function() {
            top.location = a
        }
    }
}

Filesystem = {
    "welcome": {
        type: "file",
        read: function(a) {
            a.print()
            a.print($("<p>").html("<b>This website has been attacked at 2020-10-17 03:25:08</b>"))
            a.print()
            a.print($("<p>").html("<b>Welcome you hacker has got my shell!</b>"))
        }
    },
    "about": {
        type: "file",
        read: function(a) {
            a.print();
            a.print($("<p>").html("<b>*</b>&nbsp;&nbsp;I'm <b>i0gan</b>. I like rap and dance. low~"));
            a.print($("<p>").html("<b>*</b>&nbsp;&nbsp;A Chengdu University of information technology sophomore and a member of d0g3."));
            a.print($("<p>").html("<b>*</b>&nbsp;&nbsp;A tea or water deliverer for every dalao..."))
            a.print($("<p>").html("<b>*</b>&nbsp;&nbsp;<a target='_blank' href='http://i0gan.pwnsky.com'>Blog</a> & <a target='_blank' href='https://github.com/i0gan'>Github</a>."));
        }
    },
    
    ".contact": {
        type: "file",
        read: function(a) {
            a.print();
            a.print($("<p>").html('<b>*</b>&nbsp;&nbsp;Email: l418894113@gmail.com'));
            a.print();
        }
    },
    
    ".flag": {
        type: "file",
        read: function(a) {
            a.print(xkcd.face);
            a.print(randomChoice(["flag{QQ_418894113}", "flag{like_to_sleep}", "flag{no_money...}", "flag{so_many_dreams_not_realized}", "flag{singal_boy}", "flag{no_girl_friend}"]))
        }
    }
};

Filesystem.github = linkFile("https://github.com/i0gan");
Filesystem.blog = linkFile("http://i0gan.pwnsky.com");

TerminalShell.pwd = Filesystem;
TerminalShell.commands.cd = function(a, b) {
    if (b in this.pwd) {
        if (this.pwd[b].type == "dir") {
            this.pwd[b].enter(a)
        } else {
            if (this.pwd[b].type == "file") {
                a.print("cd: " + b + ": Not a directory")
            }
        }
    } else {
        if(b == "/") {
            a.print("cd: " + b + ": Permission denied");
        }else if(b == "..") {
            a.print("cd: " + b + ": Permission denied");
        }
        else{
            a.print("cd: " + b + ": No such file or directory");
        }
    }
};


TerminalShell.commands.dir = TerminalShell.commands.ls = function(b, c) {
    var a = $("<ul>");
    $.each(this.pwd,
    function(d, e) {
        if (e.type == "dir") {
            d += "/"
        }
        if (d[0] != "." || b.map || b.god) {
            a.append($("<li>").text(d))
        }
    });
    if(c) {
        if(c == "/") {
            b.print("bin  boot  dev  etc  home  lib  lib64  lost+found  opt  proc  root  run  sbin  srv  sys  tmp  usr  var");
        }else if(c == "/home") {
            b.print("i0gan");
        }else {
            b.print("ls: cannot access '" + c + "': Permission denied");
        }
        
    }else {
        b.print(a)
    }
};
TerminalShell.commands.type = TerminalShell.commands.cat = function(a, b) {
    if (b in this.pwd) {
        if (this.pwd[b].type == "file") {
            this.pwd[b].read(a)
        } else {
            if (this.pwd[b].type == "dir") {
                a.print("cat: " + b + ": Is a directory")
            }
        }
    } else {
        a.print($("<p>").addClass("error").text('cat: "' + b + '": No such file or directory.'))
    }
};

TerminalShell.commands.rm = function(b, a, c) {
    if (a && a[0] != "-") {
        c = a
    }
    if (!c) {
        b.print("rm: missing operand")
    } else {
        if (c in this.pwd) {
            if (this.pwd[c].type == "file") {
                delete this.pwd[c]
            } else {
                if (this.pwd[c].type == "dir") {
                    if (/r/.test(a)) {
                        delete this.pwd[c]
                    } else {
                        b.print("rm: cannot remove " + c + ": Is a directory")
                    }
                }
            }
        } else {
            if (a == "-rf" && c == "/") {
                if (b.god) {
                    TerminalShell.commands = {}
                } else {
                    b.print("rm: cannot remove /: Permission denied")
                }
            }
        }
    }
};


TerminalShell.commands.hint = TerminalShell.commands.cheat = function(a) {
    a.print(cow("Do you know me about more? try cat ... flag"))
};

TerminalShell.commands.wget = TerminalShell.commands.curl = function(c, b) {
    if (b) {
        c.setWorking(true);
        var a = $("<div>").addClass("browser").append($("<iframe>").attr("src", b).width("100%").height(300).one("load",
        function() {
            c.setWorking(false)
        }));
        c.print(a);
        return a
    } else {
        c.print("Please specify a URL.")
    }
};

function oneLiner(a, c, b) {
    if (b.hasOwnProperty(c)) {
        a.print(b[c]);
        return true
    } else {
        return false
    }
}

TerminalShell.commands.sleep = function(a, b) {
    b = Number(b);
    if (!b) {
        b = 5
    }
    a.setWorking(true);
    a.print("You take a nap...");
    $("#screen").fadeOut(1000);
    window.setTimeout(function() {
        a.setWorking(false);
        $("#screen").fadeIn();
        a.print("You awake refreshed.")
    },
    1000 * b)
};

TerminalShell.commands.ifconfig = function(a, b) {
    a.print("lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536");
    a.print("    inet 127.0.0.1  netmask 255.0.0.0");
    a.print("    inet6 ::1  prefixlen 128  scopeid 0x10<host>");
    a.print("    loop  txqueuelen 1000  (Local Loopback)");
    a.print("    RX packets 89381  bytes 28035256 (26.7 MiB)");
    a.print("    RX errors 0  dropped 0  overruns 0  frame 0");
    a.print("    TX packets 89381  bytes 28035256 (26.7 MiB)");
    a.print("    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0");
}

TerminalShell.commands.ip = function(a, b) {
    a.print("lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536");
    a.print("    inet 127.0.0.1  netmask 255.0.0.0");
    a.print("    inet6 ::1  prefixlen 128  scopeid 0x10<host>");
    a.print("    loop  txqueuelen 1000  (Local Loopback)");
    a.print("    RX packets 89381  bytes 28035256 (26.7 MiB)");
    a.print("    RX errors 0  dropped 0  overruns 0  frame 0");
    a.print("    TX packets 89381  bytes 28035256 (26.7 MiB)");
    a.print("    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0");
}

TerminalShell.commands.ping = function(a, b) {
    if(b) {
        var ip = b;
        a.print("PING " + ip + " (" + ip + ") 56(84) bytes of data.");
        for(var i = 0; i < 4; i++) {
            a.print("64 bytes from " + ip + ": icmp_seq=" + i + " ttl=64 time=0.043 ms");
            //sleep(100);
        }
        a.print("4 packets transmitted, 4 received, 0% packet loss, time 3049ms");
    }else {
        a.print("ping: usage error: Destination address required");
    }
}

TerminalShell.commands.nmap = function(a, b) {
    if(b) {
        a.print("Starting Nmap 7.80 ( https://nmap.org ) at " + new Date().toDateString() + " CST");
        a.print("Nmap scan report for " + b);
        a.print("Host is up (0.094s latency).");
        a.print("Not shown: 953 closed ports, 40 filtered ports");
        a.print("PORT     STATE SERVICE");
        a.print("22/tcp   open  ssh");
        a.print("80/tcp   open  http");
        a.print("81/tcp   open  hosts2-ns");
        a.print("82/tcp   open  xfer");
        a.print("88/tcp   open  kerberos-sec");
        a.print("1024/tcp open  kdm");
        a.print("8080/tcp open  http-proxy");
    }else {
        a.print("Usage: nmap [Scan Type(s)] [Options] {target specification}");
    }
}


TerminalShell.commands.file = function(a, b) {
    if(b) {
        if(this.pwd[b].type == "file") {
            a.print("type: file");
        }else {
            a.print("type: directory");
        }
    }else {
        a.print("Usage: file [-bcCdEhikLlNnprsSvzZ0] [--apple] [--extension] [--mime-encoding]");
        a.print("            [--mime-type] [-e <testname>] [-F <separator>]  [-f <namefile>]");
        a.print("            [-m <magicfiles>] [-P <parameter=value>] <file> ...");
        a.print("       file -C [-m <magicfiles>]");
        a.print("       file [--help]");
    }
}

TerminalShell.commands.sqlmap = function(a, b) {
    
    a.print("        ___");
    a.print("       __H__");
    a.print(" ___ ___[(]_____ ___ ___  {1.4.4#stable}");
    a.print("|_ -| . [,]     | .'| . |");
    a.print("|___|_  [']_|_|_|__,|  _|");
    a.print("      |_|V...       |_|   http://sqlmap.org");

    if(b) {
        a.print("attacking.... [" + b + "]");
    }else {
        a.print("Usage: python sqlmap.py [options]");
        a.print("sqlmap.py: error: missing a mandatory option (-d, -u, -l, -m, -r, -g, -c, --list-tampers, --wizard, --update,--   purge or --dependencies). Use -h for basic and -hh for advanced help");
    }

}

TerminalShell.commands.uname = function(a, b) {
    a.print("Linux arch 5.7.2-arch1-1 #1 SMP PREEMPT Wed, 10 Jun 2020 20:36:24 +0000 x86_64 GNU/Linux");
};

TerminalShell.commands.lsblk = function(a, b) {
    
    a.print("NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT");
    a.print("nvme0n1     259:0    0   477G  0 disk ");
    a.print("├─nvme0n1p1 259:1    0   256M  0 part /boot/efi");
    a.print("├─nvme0n1p2 259:2    0   100G  0 part ");
    a.print("├─nvme0n1p3 259:3    0    75G  0 part ");
    a.print("├─nvme0n1p4 259:4    0   100G  0 part /");
    a.print("├─nvme0n1p5 259:5    0   100G  0 part /run/media/logan/disk1");
    a.print("└─nvme0n1p6 259:6    0 101.7G  0 part /run/media/logan/disk2");
}



TerminalShell.commands.ps = function(a, b) {
    a.print("PID TTY          TIME CMD");
    a.print("  18437 pts/2    00:00:00 bash");
    a.print("  18504 pts/2    00:00:00 ps");
}

TerminalShell.commands.who = function(a, b) {
    a.print("i0gan                 2019-12-23 16:09");
    a.print("i0gan    tty1         2020-03-02 16:11 (:0)");
    a.print("i0gan    pts/1        2020-05-22 18:00 (:0)");
    a.print("i0gan    pts/2        2020-06-11 00:04 (:0)");
}

TerminalShell.commands.os = TerminalShell.commands.neofeach = TerminalShell.commands.arch = function(a, b) {
    
    a.print("                   -`                    logan@arch ");
    a.print("                  .o+`                   ---------- ");
    a.print("                 `ooo/                   OS: Arch Linux x86_64 ");
    a.print("                `+oooo:                  Host: 81XD Lenovo XiaoXinPro-14API 2020 ");
    a.print("               `+oooooo:                 Kernel: 5.8.2-arch1-1 ");
    a.print("               -+oooooo+:                Uptime: 220 hours, 40 mins ");
    a.print("             `/:-:++oooo+:               Packages: 1132 (pacman) ");
    a.print("            `/++++/+++++++:              Shell: zsh 5.8 ");
    a.print("           `/++++++++++++++:             Resolution: 2560x1600 ");
    a.print("          `/+++ooooooooooooo/`           DE: Plasma ");
    a.print("         ./ooosssso++osssssso+`          WM: KWin ");
    a.print("        .oossssso-````/ossssss+`         WM Theme: Layan ");
    a.print("       -osssssso.      :ssssssso.        Theme: Layan [Plasma] ");
    a.print("      :osssssss/        osssso+++.       Icons: Tela [Plasma] ");
    a.print("     /ossssssss/        +ssssooo/-       Terminal: konsole ");
    a.print("   `/ossssso+/:-        -:/+osssso+-     Terminal Font: Hack 18 ");
    a.print("  `+sso+:-`                 `.-/+oso:    CPU: AMD Ryzen 8 3550H with Radeon Vega Mobile Gfx (10) @ 2.10 ");
    a.print(" `++:.                           `-/+/   GPU: AMD ATI 03:00.0 Picasso ");
    a.print(" .`                                 `/   Memory: 3232MiB / 15940MiB");

}

TerminalShell.commands.echo = function(a, b) {
    a.print(b)
};

TerminalShell.commands.write = function(a, b) {
    if(b) {
        a.print("you write [" + b + "] to admin "); 
        a.print("i0gan will response your qurestion soon"); 
    }else {
        a.print("Usage: write [your msg]"); 
    }
    
};

TerminalShell.fallback = function(a, b) {
    oneliners = {
        pwd: "/",
        date: new Date().toDateString(),
        time: new Date().toTimeString(),
        fuck: "The connection was reset...",
        whoami: "i0gan",
        
    };
    oneliners.emacs = "You should really use vim.";
    oneliners.vi = oneliners.vim = "You should really use emacs.";
    b = b.toLowerCase();
    if (!oneLiner(a, b, oneliners)) {
        $.get("/cnf", {
            cmd: b
        });
        return false
    }
    return true
};
var whoamiCount = 0;
$(document).ready(function() {
    Terminal.promptActive = false;
    $("#screen").bind("cli-load",
    function(a) {
        // init show
        Terminal.print(" _  ___                     ");  
        Terminal.print("(_)/ _ \\  __ _  __ _ _ __  ");
        Terminal.print("| | | | |/ _` |/ _` | '_ \\ ");
        Terminal.print("| | |_| | (_| | (_| | | | |");
        Terminal.print("|_|\\___/ \\__, |\\__,_|_| |_|");
        Terminal.print("         |___/             ");
        
        
        Terminal.print();
        Terminal.print($("<h4>").text("i0gan's shell"));
        Terminal.print();
        Terminal.print($("<h4>").text("Enter 'help' for a list of commands."));
        Terminal.print();
        Terminal.runCommand("cat welcome")
    });
    $(document).whoami(function() {
        function a(b) {
            b.css("position", "relative");
            return window.setInterval(function() {
                b.css({
                    top: getRandomInt( - 3, 3),
                    left: getRandomInt( - 3, 3)
                })
            },
            100)
        }
        if (whoamiCount == 0) {
            $("#screen").css("text-transform", "uppercase")
        } else {
            if (whoamiCount == 1) {
                $("#screen").css("text-shadow", "gray 0 0 2px")
            } else {
                if (whoamiCount == 2) {
                    $("#screen").css("text-shadow", "orangered 0 0 10px")
                } else {
                    if (whoamiCount == 3) {
                        a($("#screen"))
                    } else {
                        window["\x65\x76\x61\x6c"](Terminal["\x72\x75\x6e\x43\x6f\x6d\x6d\x61\x6e\x64"](unescape("%63%75\x72%6c%20%66%6c\x61%67%5f\u0069%73%5f%6e\x6f%74\u005f\u0068%65%72%65")))
                    }
                }
            }
        }
        $("<div>").height("100%").width("100%").css({
            background: "white",
            position: "absolute",
            top: 0,
            left: 0
        }).appendTo($("body")).show().fadeOut(1000);
        if (Terminal.buffer.substring(Terminal.buffer.length - 2) == "ba") {
            Terminal.buffer = Terminal.buffer.substring(0, Terminal.buffer.length - 2);
            Terminal.updateInputDisplay()
        }
        Terminal.god = true;
        Terminal.sudo(true);
        whoamiCount += 1
    })
});
