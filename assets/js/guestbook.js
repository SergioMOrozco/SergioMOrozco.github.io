/* Guestbook: signing opens a GitHub issue; issues labeled "guestbook" are shown on the page. */
(function () {
  var APPROVED_LABEL = "guestbook";

  var form = document.querySelector("[data-guestbook-form]");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var body = "**From:** " + form.handle.value + "\n" +
        (form.homepage.value ? "**Homepage:** " + form.homepage.value + "\n" : "") +
        "\n" + form.message.value;
      var url = "https://github.com/" + form.dataset.repo + "/issues/new" +
        "?title=" + encodeURIComponent("Guestbook: " + form.handle.value) +
        "&body=" + encodeURIComponent(body);
      window.open(url, "_blank", "noopener");
    });
  }

  var list = document.querySelector("[data-guestbook-entries]");
  if (!list) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  /* Pull the name, homepage and message back out of the issue body the form wrote. */
  function parse(issue) {
    var name = issue.title.replace(/^guestbook:\s*/i, "") || issue.user.login;
    var homepage = "";
    var lines = (issue.body || "").replace(/\r/g, "").split("\n");
    var message = [];
    lines.forEach(function (line) {
      var from = line.match(/^\*\*From:\*\*\s*(.*)$/);
      var site = line.match(/^\*\*Homepage:\*\*\s*(.*)$/);
      if (from) name = from[1].trim() || name;
      else if (site) homepage = site[1].trim();
      else message.push(line);
    });
    return { name: name, homepage: homepage, message: message.join("\n").trim(), date: new Date(issue.created_at) };
  }

  function render(entry) {
    var box = el("div", "guestbook-entry");
    var who = el("p", "guestbook-entry__who");
    if (/^https?:\/\//i.test(entry.homepage)) {
      var link = el("a", null, entry.name);
      link.href = entry.homepage;
      link.rel = "nofollow ugc noopener";
      who.appendChild(link);
    } else {
      who.appendChild(document.createTextNode(entry.name));
    }
    var when = ("0" + (entry.date.getMonth() + 1)).slice(-2) + "/" +
      ("0" + entry.date.getDate()).slice(-2) + "/" + entry.date.getFullYear();
    who.appendChild(el("span", "small", " — " + when));
    box.appendChild(who);
    box.appendChild(el("p", "guestbook-entry__message", entry.message));
    return box;
  }

  var api = "https://api.github.com/repos/" + list.dataset.repo +
    "/issues?state=all&per_page=50&labels=" + encodeURIComponent(APPROVED_LABEL);

  fetch(api, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (issues) {
      list.textContent = "";
      issues = issues.filter(function (issue) { return !issue.pull_request; });
      if (!issues.length) {
        list.appendChild(el("p", "small guestbook-status", "No entries yet. Be the first to sign!"));
      }
      issues.forEach(function (issue) { list.appendChild(render(parse(issue))); });
    })
    .catch(function () {
      list.textContent = "";
      list.appendChild(el("p", "small guestbook-status",
        "The guestbook server is down (very 1999 of it). Try again later!"));
    });
})();
