---
layout: page
title: Archives
permalink: /archives/
---

<style>
/* ===== Finder-like Base ===== */
.finder-archive {
  max-width: 760px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
               "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #1d1d1f;
}

/* ===== Folder Row ===== */
.finder-folder {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 6px;
  user-select: none;
}

.finder-folder:hover {
  background: #f5f5f7;
}

/* ===== Disclosure Triangle ===== */
.disclosure {
  width: 12px;
  height: 12px;
  margin-right: 6px;
  position: relative;
}

.disclosure::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 2px;
  width: 6px;
  height: 6px;
  border-right: 1.5px solid #6e6e73;
  border-bottom: 1.5px solid #6e6e73;
  transform: rotate(-45deg);
  transition: transform 0.15s ease;
}

.disclosure.open::before {
  transform: rotate(45deg);
}

/* ===== Folder Name ===== */
.folder-name {
  font-weight: 500;
}

/* ===== Children ===== */
.finder-children {
  margin-left: 22px;
  display: none;
}

/* ===== File Rows ===== */
.finder-file {
  padding: 4px 8px 4px 26px;
  font-size: 13px;
}

.finder-file a {
  color: #0066cc;
  text-decoration: none;
}

.finder-file a:hover {
  text-decoration: underline;
}

/* ===== Divider ===== */
.finder-divider {
  height: 1px;
  background: #e5e5ea;
  margin: 4px 0;
}
</style>

<div class="finder-archive">
  <h1>{{ page.title }}</h1>
  <p style="color:#6e6e73;font-size:13px;">
    Click to expand or collapse.
  </p>

{% assign categories = site.categories | sort %}
{% for category in categories %}

    <div class="finder-folder" onclick="toggleFinder('{{ category[0] }}')">
      <span class="disclosure" id="disc-{{ category[0] }}"></span>
      <span class="folder-name">{{ category[0] }}</span>
    </div>

    <div class="finder-children" id="{{ category[0] }}">
      {% for post in category[1] %}
        <div class="finder-file">
          <a href="/portfolio{{ post.url }}">{{ post.title }}</a>
        </div>
      {% endfor %}
    </div>

    <!-- <div class="finder-divider"></div> -->

{% endfor %}

</div>

<script>
function toggleFinder(id) {
  const children = document.getElementById(id);
  const disc = document.getElementById("disc-" + id);

  const open = children.style.display === "block";
  children.style.display = open ? "none" : "block";
  disc.classList.toggle("open", !open);
}
</script>
