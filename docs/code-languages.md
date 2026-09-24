# Языки подсветки установленного Obsidian

Снимок от 2026-09-24, пакет Obsidian 1.13.4. Источник: `lib/prism.min.js` внутри `/Applications/Obsidian.app/Contents/Resources/obsidian.asar`.

В `Prism.languages` найдено **400 идентификаторов**, включая псевдонимы, plain text и служебные грамматики. Это не 400 разных языков. Наличие грамматики не исключает специальной обработки метки самим Obsidian или плагином: например, mermaid обычно отображается диаграммой.

Язык задаётся явно после открывающих трёх обратных кавычек; автоматического определения по содержимому нет. Этот перечень относится к Prism в режиме чтения. Source mode и Live Preview используют другой механизм, поэтому подсветка может отличаться — см. [документацию Obsidian](https://obsidian.md/help/syntax) и [перечень Prism](https://prismjs.com/#supported-languages).

## Языки code-e051

| Метка | Псевдонимы | Цвет по умолчанию |
| --- | --- | --- |
| sh | bash, shell | зелёный |
| python | py | синий |
| c | — | оранжевый |
| awk | gawk | фиолетовый |
| css | — | розовый |
| markdown | md | циан |
| yaml | yml | оранжевый |
| json | — | жёлтый |
| html | markup | красный |
| lua | — | синий |
| cpp (C++) | — | фиолетовый |
| javascript | js | жёлтый |
| typescript | ts | циан |
| kconfig | — | зелёный |

Каждая из четырнадцати связей независимо выбирает один из восьми цветов --color-*: red, orange, yellow, green, cyan, blue, purple, pink. Меняется левая линия блока, не цвета синтаксиса.

Kconfig отсутствует в установленном Prism: для метки `kconfig` приём задаёт цвет линии, не добавляя грамматику подсветки. Название языка подтверждено [документацией ядра Linux](https://docs.kernel.org/kbuild/kconfig-language.html).

## Полный перечень идентификаторов установленного Prism

### A

`abap`, `abnf`, `actionscript`, `ada`, `adoc`, `agda`, `al`, `antlr4`, `apacheconf`, `apex`, `apl`, `applescript`, `aql`, `arduino`, `arff`, `arm-asm`, `armasm`, `art`, `arturo`, `asciidoc`, `asm6502`, `asmatmel`, `aspnet`, `atom`, `autohotkey`, `autoit`, `avdl`, `avisynth`, `avro-idl`, `avs`, `awk`

### B

`bash`, `basic`, `batch`, `bbcode`, `bbj`, `bicep`, `birb`, `bison`, `bnf`, `bqn`, `brainfuck`, `brightscript`, `bro`, `bsl`

### C

`c`, `cfc`, `cfscript`, `chaiscript`, `cil`, `cilk`, `cilk-c`, `cilk-cpp`, `cilkc`, `cilkcpp`, `clike`, `clojure`, `cmake`, `cobol`, `coffee`, `coffeescript`, `conc`, `concurnas`, `context`, `cooklang`, `coq`, `cpp`, `crystal`, `cs`, `csharp`, `cshtml`, `csp`, `css`, `csv`, `cue`, `cypher`

### D

`d`, `dart`, `dataweave`, `dax`, `dhall`, `diff`, `django`, `dns-zone`, `dns-zone-file`, `docker`, `dockerfile`, `dot`, `dotnet`

### E

`ebnf`, `editorconfig`, `eiffel`, `ejs`, `elisp`, `elixir`, `elm`, `emacs`, `emacs-lisp`, `erb`, `erlang`, `eta`, `etlua`, `excel-formula`

### F

`factor`, `false`, `firestore-security-rules`, `flow`, `fortran`, `fsharp`, `ftl`

### G

`g4`, `gamemakerlanguage`, `gap`, `gawk`, `gcode`, `gdscript`, `gedcom`, `gettext`, `gherkin`, `git`, `gitignore`, `glsl`, `gml`, `gn`, `gni`, `go`, `go-mod`, `go-module`, `gradle`, `graphql`, `groovy`, `gv`

### H

`haml`, `handlebars`, `haskell`, `haxe`, `hbs`, `hcl`, `hgignore`, `hlsl`, `hoon`, `hpkp`, `hs`, `hsts`, `html`, `http`

### I

`ichigojam`, `icon`, `icu-message-format`, `idr`, `idris`, `iecst`, `ignore`, `inform7`, `ini`, `ino`, `io`

### J

`j`, `java`, `javadoc`, `javadoclike`, `javascript`, `javastacktrace`, `jexl`, `jinja2`, `jolie`, `jq`, `js`, `jsdoc`, `json`, `json5`, `jsonp`, `jsstacktrace`, `jsx`, `julia`

### K

`keepalived`, `keyman`, `kotlin`, `kt`, `kts`, `kum`, `kumir`, `kusto`

### L

`latex`, `latte`, `ld`, `less`, `lilypond`, `linker-script`, `liquid`, `lisp`, `livescript`, `llvm`, `log`, `lolcode`, `lua`, `ly`

### M

`magma`, `makefile`, `markdown`, `markup`, `markup-templating`, `mata`, `mathematica`, `mathml`, `matlab`, `maxscript`, `md`, `mel`, `mermaid`, `metafont`, `mizar`, `mongodb`, `monkey`, `moon`, `moonscript`, `mscript`, `mustache`

### N

`n1ql`, `n4js`, `n4jsd`, `nand2tetris-hdl`, `nani`, `naniscript`, `nasm`, `nb`, `neon`, `nevod`, `nginx`, `nim`, `nix`, `npmignore`, `nsis`

### O

`objc`, `objectivec`, `objectpascal`, `ocaml`, `odin`, `opencl`, `openqasm`, `oscript`, `oz`

### P

`parigp`, `parser`, `pascal`, `pascaligo`, `pbfasm`, `pcaxis`, `pcode`, `peoplecode`, `perl`, `php`, `phpdoc`, `plain`, `plaintext`, `plant-uml`, `plantuml`, `plsql`, `po`, `powerquery`, `powershell`, `pq`, `processing`, `prolog`, `promql`, `properties`, `protobuf`, `psl`, `pug`, `puppet`, `pure`, `purebasic`, `purescript`, `purs`, `px`, `py`, `python`

### Q

`q`, `qasm`, `qml`, `qore`, `qs`, `qsharp`

### R

`r`, `racket`, `razor`, `rb`, `rbnf`, `reason`, `regex`, `rego`, `renpy`, `res`, `rescript`, `rest`, `rip`, `rkt`, `roboconf`, `robot`, `robotframework`, `rpy`, `rq`, `rss`, `ruby`, `rust`

### S

`sas`, `sass`, `scala`, `scheme`, `sclang`, `scss`, `sh`, `sh-session`, `shell`, `shell-session`, `shellsession`, `shortcode`, `sln`, `smali`, `smalltalk`, `smarty`, `sml`, `smlnj`, `sol`, `solidity`, `solution-file`, `soy`, `sparql`, `splunk-spl`, `sqf`, `sql`, `squirrel`, `ssml`, `stan`, `stata`, `stylus`, `supercollider`, `svg`, `swift`, `systemd`

### T

`t4`, `t4-cs`, `t4-templating`, `t4-vb`, `tap`, `tcl`, `tex`, `text`, `textile`, `toml`, `tremor`, `trickle`, `trig`, `troy`, `ts`, `tsconfig`, `tsx`, `tt2`, `turtle`, `twig`, `txt`, `typescript`, `typoscript`

### U

`uc`, `unrealscript`, `uorazor`, `uri`, `url`, `uscript`

### V

`v`, `vala`, `vb`, `vba`, `vbnet`, `velocity`, `verilog`, `vhdl`, `vim`, `visual-basic`

### W

`warpscript`, `wasm`, `web-idl`, `webidl`, `webmanifest`, `wgsl`, `wiki`, `wl`, `wolfram`, `wren`

### X

`xeora`, `xeoracube`, `xls`, `xlsx`, `xml`, `xojo`, `xquery`

### Y

`yaml`, `yang`, `yml`

### Z

`zig`

