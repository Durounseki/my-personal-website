import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "./index.css";

export default class MonkeyCode {
  static get toolbox() {
    return {
      title: "Code",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"><path d="M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  constructor({ data, config, readOnly }) {
    this.data = data;
    this.readOnly = readOnly;
    this.language = this.data.language || {
      value: "plaintext",
      text: "Text",
      faClass: "fa-solid fa-file",
    };
    this.languages = config.languages || [
      { value: "javascript", text: "JavaScript", faClass: "fa-brands fa-js" },
      { value: "html", text: "HTML", faClass: "fa-brands fa-html5" },
      { value: "css", text: "CSS", faClass: "fa-brands fa-css3-alt" },
      { value: "python", text: "Python", faClass: "fa-brands fa-python" },
      { value: "bash", text: "Bash", faClass: "fa-solid fa-terminal" },
      { value: "plaintext", text: "Text", faClass: "fa-solid fa-file" },
    ];
    this.wrapper = null;
    this.header = null;
    this.name = null;
    this.copyButton = null;
    this.languageContainer = null;
    this.languageTag = null;
    this.languageButton = null;
    this.languageList = null;
    this.lineNumbers = null;
    this.pre = null;
    this.code = null;
    this.textarea = null;
  }

  render() {
    this.wrapper = this.createWrapper();
    this.header = this.createHeader();

    this.wrapper.appendChild(this.header);
    this.lineNumbers = this.createLineNumbers();

    this.wrapper.appendChild(this.lineNumbers);
    this.codeContainer = this.createCodeContainer();

    this.wrapper.appendChild(this.codeContainer);

    if (!this.readOnly) {
      this.textarea = this.createTextarea();
      this.wrapper.appendChild(this.textarea);
      this.textarea.value = this.data.code
        ? this.unescapeText(this.data.code)
        : "";
      this.update(this.textarea.value);
    } else {
      this.update(
        this.data ? this.unescapeText(this.data.code) : "Code block..."
      );
    }
    this.updateLineNumbers();

    return this.wrapper;
  }

  createWrapper() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("custom-code-block");
    if (this.readOnly) {
      wrapper.classList.add("read-only");
    }
    return wrapper;
  }

  createHeader() {
    const header = document.createElement("div");
    header.classList.add("code-block-header");

    this.name = this.createNameInput();
    header.appendChild(this.name);

    this.copyButton = this.createCopyButton();
    header.appendChild(this.copyButton);

    this.languageContainer = this.createLanguageContainer();
    header.appendChild(this.languageContainer);

    return header;
  }

  createNameInput() {
    let name;
    if (this.readOnly) {
      name = document.createElement("p");
      name.textContent = this.data.name || "";
    } else {
      name = document.createElement("input");
      name.spellcheck = false;
      name.placeholder = "File name...";
      name.value = this.data.name || "";
    }
    name.classList.add("code-block-name");
    return name;
  }
  createCopyButton() {
    const copyButton = document.createElement("button");
    copyButton.classList.add("code-block-copy-button");
    const copyIcon = document.createElement("i");
    copyIcon.className = "fa-regular fa-copy";
    const checkIcon = document.createElement("i");
    checkIcon.className = "fa-solid fa-check";
    copyButton.appendChild(copyIcon);
    copyButton.appendChild(checkIcon);
    copyButton.type = "button";

    copyButton.addEventListener("click", () => this.copyCode());
    return copyButton;
  }
  createLanguageContainer() {
    const languageContainer = document.createElement("div");

    languageContainer.classList.add("code-block-language-container");

    if (this.readOnly) {
      const languageTag = document.createElement("div");
      this.languageTag = languageTag;
      languageTag.classList.add("code-block-language-tag");
      languageTag.textContent = this.language.text;
      languageContainer.appendChild(languageTag);
    } else {
      const languageButton = document.createElement("button");
      this.languageButton = languageButton;
      languageButton.classList.add("code-block-language-button");
      languageButton.textContent = this.language.text;
      languageButton.type = "button";

      const languageList = document.createElement("ul");
      languageList.classList.add("code-block-language-list");
      languageList.classList.add("hidden");
      this.languageList = languageList;

      this.languages.forEach((language) => {
        const listItem = document.createElement("li");
        listItem.textContent = language.text;
        listItem.dataset.value = language.value;
        listItem.classList.add("code-block-language-item");

        listItem.addEventListener("click", () =>
          this.handleLanguageSelection(language)
        );

        languageList.appendChild(listItem);
      });
      languageContainer.appendChild(languageButton);
      languageContainer.appendChild(languageList);

      languageButton.addEventListener("click", () => this.toggleLanguageList());

      document.addEventListener("click", (event) =>
        this.closeLanguageList(event)
      );
    }
    return languageContainer;
  }

  createLineNumbers() {
    const lineNumbers = document.createElement("pre");
    lineNumbers.classList.add("code-block-line-numbers");
    return lineNumbers;
  }

  createCodeContainer() {
    const pre = document.createElement("pre");
    this.pre = pre;
    pre.classList.add("code-block-pre");

    const code = document.createElement("code");
    this.code = code;
    code.classList.add("code-block-code");
    code.classList.add(`language-${this.language.value}`);

    pre.appendChild(code);
    return pre;
  }
  createTextarea() {
    const textarea = document.createElement("textarea");

    textarea.spellcheck = false;
    textarea.classList.add("code-block-textarea");
    textarea.placeholder = "Enter your code here...";

    textarea.addEventListener("input", () => this.handleTextareaInput());

    textarea.addEventListener("scroll", () => this.sync_scroll());

    textarea.addEventListener("keydown", (event) =>
      this.handleTextAreaKeydown(event)
    );

    return textarea;
  }

  update(text) {
    this.code.textContent = text;
    Prism.highlightElement(this.code);
  }

  updateLineNumbers() {
    let lines;
    if (!this.readOnly) {
      lines = this.textarea.value.split("\n");
    } else {
      lines = this.data ? this.unescapeText(this.data.code).split("\n") : [];
    }
    let numbers = "";
    for (let i = 1; i <= lines.length; i++) {
      numbers += `${i}\n`;
    }
    this.lineNumbers.textContent = numbers;
  }

  copyCode() {
    let content;
    if (this.readOnly) {
      content = this.data.code ? this.unescapeText(this.data.code) : "";
    } else {
      content = this.textarea.value;
    }
    navigator.clipboard.writeText(content).then(() => {
      this.copyButton.classList.add("copied");
      setTimeout(() => {
        this.copyButton.classList.remove("copied");
      }, 1000);
    });
  }

  handleLanguageSelection(language) {
    this.language.value = language.value;
    this.language.text = language.text;
    this.languageButton.textContent = language.text;
    this.code.className = `code-block-code language-${language.value}`;
    this.update(this.textarea.value);
    this.languageList.classList.add("hidden");
  }
  toggleLanguageList() {
    this.languageList.classList.toggle("hidden");
  }
  closeLanguageList(event) {
    if (!this.languageContainer.contains(event.target)) {
      this.languageList.classList.add("hidden");
    }
  }
  handleTextareaInput() {
    this.update(this.textarea.value);
    this.updateLineNumbers();
    this.sync_scroll();
  }
  handleTextAreaKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.insertLineBreak();
    } else if (event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();
      if (event.shiftKey) {
        this.handleDedent();
      } else {
        this.handleIndent();
      }
    } else if (event.key === "/" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      event.stopPropagation();
      this.handleCommentToggle();
    }
  }

  getSelectionInfo() {
    const textarea = this.textarea;
    const text = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const startIndex = text.lastIndexOf("\n", start - 1) + 1;
    let endIndex = text.indexOf("\n", end);
    if (endIndex === -1) {
      endIndex = text.length;
    }
    const selectedText = text.substring(startIndex, endIndex);
    const lines = selectedText.split("\n");
    const relativeStart = start - startIndex;
    return {
      text,
      start,
      end,
      startIndex,
      endIndex,
      selectedText,
      lines,
      relativeStart,
    };
  }
  modifyLines(modifier) {
    const textarea = this.textarea;
    const { text, start, end, startIndex, endIndex, lines } =
      this.getSelectionInfo(textarea);
    let newText = "";
    const modifiedLines = lines.map(modifier);
    newText =
      text.substring(0, startIndex) +
      modifiedLines.join("\n") +
      text.substring(endIndex);
    textarea.value = newText;
    return { text, newText, start, end };
  }
  updateTextAndCursor(modifier, startOffset = 0, endOffset = 0) {
    const textarea = this.textarea;
    const { text, newText, start, end } = this.modifyLines(modifier);

    const addedChars = newText.length - text.length;
    this.update(textarea.value);
    textarea.selectionStart = start + startOffset;
    textarea.selectionEnd = end + addedChars + endOffset;
    this.sync_scroll();
  }

  insertLineBreak() {
    const { start, end, relativeStart } = this.getSelectionInfo();
    if (start === end) {
      const modifier = (line) =>
        line.substring(0, relativeStart) + "\n" + line.substring(relativeStart);
      this.updateTextAndCursor(modifier, 1, 0);
    } else {
      const modifier = (line, index) =>
        index === 0 ? line.substring(0, relativeStart) : "";
      this.updateTextAndCursor(modifier, 1, 0);
    }
  }

  handleIndent() {
    const { start, end, relativeStart } = this.getSelectionInfo();

    if (start === end && relativeStart !== 0) {
      const modifier = (line) =>
        line.substring(0, relativeStart) +
        "    " +
        line.substring(relativeStart);
      this.updateTextAndCursor(modifier, 4, 0);
    } else {
      const modifier = (line) => {
        const spaces = line.match(/^\s*/)?.[0].length;
        const spacesToAdd = 4 - (spaces % 4);
        return line.padStart(line.length + spacesToAdd, " ");
      };
      this.updateTextAndCursor(modifier, 4, 0);
    }
  }

  handleDedent() {
    const modifier = (line) => {
      const spaces = line.match(/^\s*/)?.[0].length;
      const spacesToRemove = spaces > 0 && spaces % 4 === 0 ? 4 : spaces % 4;
      return line.substring(spacesToRemove);
    };
    this.updateTextAndCursor(modifier, -4, 0);
  }

  handleCommentToggle() {
    const { lines } = this.getSelectionInfo();
    const { start: startString, end: endString } = this.getCommentStrings();
    const shouldComment = lines.some(
      (line) => !line.trim().startsWith(startString)
    );
    const modifier = (line) =>
      shouldComment
        ? startString + line + endString
        : line.substring(startString.length, line.length - endString.length);
    this.updateTextAndCursor(
      modifier,
      shouldComment ? startString.length : -startString.length,
      shouldComment ? -endString.length : endString.length
    );
  }
  getCommentStrings() {
    let start, end;
    switch (this.language.value) {
      case "html":
        start = "<!-- ";
        end = " -->";
        break;
      case "css":
        start = "/* ";
        end = " */";
        break;
      case "python":
      case "bash":
        start = "#";
        end = "";
        break;
      default:
        start = "//";
        end = "";
    }
    return { start, end };
  }

  escapeText(text) {
    return text.replace(/[<>"'&]/g, function (match) {
      switch (match) {
        case "<":
          return "\\u003c";
        case ">":
          return "\\u003e";
        case '"':
          return "\\u0022";
        case "'":
          return "\\u0027";
        case "&":
          return "\\u0026";
        default:
          return match;
      }
    });
  }
  unescapeText(text) {
    return text
      .replace(/\\u003c/g, "<")
      .replace(/\\u003e/g, ">")
      .replace(/\\u0022/g, '"')
      .replace(/\\u0027/g, "'")
      .replace(/\\u0026/g, "&");
  }
  sync_scroll() {
    const pre = this.pre;
    const textarea = this.textarea;
    pre.scrollTop = textarea.scrollTop;
    pre.scrollLeft = textarea.scrollLeft;
  }

  save() {
    return {
      name: this.name.value,
      code: this.escapeText(this.textarea.value),
      language: this.language,
    };
  }
  validate(blockData) {
    if (!blockData.code.trim()) {
      return false;
    }
    return true;
  }
}
