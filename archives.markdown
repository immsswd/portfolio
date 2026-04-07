---
layout: page
title: Archives
permalink: /archives/
---

<style>
.fa {
  max-width: 680px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 13px;
  color: #1d1d1f;
}
.fa-row {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
}
.fa-row:hover { background: #f5f5f7; }
.tri {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.15s ease;
}
.tri.open { transform: rotate(90deg); }
.tri svg path { fill: #6e6e73; }
.tri-leaf { width: 16px; flex-shrink: 0; }
.icon { width: 16px; height: 16px; margin-right: 5px; flex-shrink: 0; }
.children { display: none; }
.label { font-size: 13px; }
.muted { color: #6e6e73; font-size: 12px; margin-left: 6px; }
.fa-file {
  display: flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: 6px;
}
.fa-file:hover { background: #f5f5f7; }
.fa-file a {
  color: #1463d0;
  text-decoration: none;
  font-size: 13px;
}
.fa-file a:hover { text-decoration: underline; }
</style>

<div class="fa">
  <h1>{{ page.title }}</h1>

{% assign postsByYear = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for yearGroup in postsByYear %}
{% assign year = yearGroup.name %}
{% assign yearPosts = yearGroup.items %}
{% assign postCount = yearPosts | size %}

  <div>
    <div class="fa-row" onclick="toggle('y-{{ year }}')">
      <span class="tri" id="t-y-{{ year }}">
        <svg width="8" height="8" viewBox="0 0 8 8"><path d="M2 1.5l4 2.5-4 2.5V1.5z"/></svg>
      </span>
      <svg class="icon" id="fi-y-{{ year }}" viewBox="0 0 16 16" fill="none">
        <path d="M2.5 3A1.5 1.5 0 001 4.5v7A1.5 1.5 0 002.5 13h11A1.5 1.5 0 0015 11.5V6A1.5 1.5 0 0013.5 4.5H7.5L6 3H2.5z" fill="#F5C842"/>
      </svg>
      <span class="label">{{ year }}</span>
      <span class="muted">{{ postCount }} posts</span>
    </div>

    <div class="children" id="y-{{ year }}">
      {% for post in yearPosts %}
        <div class="fa-file" style="margin-left:20px">
          <span class="tri-leaf"></span>
          <svg class="icon" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="1" width="10" height="13" rx="1.5" fill="#E8F0FB" stroke="#B5D4F4" stroke-width="0.8"/>
            <path d="M9 1v4h4" stroke="#B5D4F4" stroke-width="0.8" fill="none"/>
            <path d="M9 1l4 4" stroke="#B5D4F4" stroke-width="0.8"/>
            <rect x="4" y="7" width="6" height="1" rx="0.5" fill="#378ADD"/>
            <rect x="4" y="9.5" width="5" height="1" rx="0.5" fill="#378ADD"/>
            <rect x="4" y="12" width="4" height="1" rx="0.5" fill="#378ADD"/>
          </svg>
          <a href="/portfolio{{ post.url }}">{{ post.title }}</a>
        </div>
      {% endfor %}
    </div>

  </div>

{% endfor %}

</div>

<script>
const openFolderPath = `<path d="M1 4.5A1.5 1.5 0 012.5 3H6l1.5 1.5H13.5A1.5 1.5 0 0115 6v5.5A1.5 1.5 0 0113.5 13h-11A1.5 1.5 0 011 11.5v-7z" fill="#FBD061"/>
  <path d="M1 6h14v5.5A1.5 1.5 0 0113.5 13h-11A1.5 1.5 0 011 11.5V6z" fill="#F5C842"/>`;
const closedFolderPath = `<path d="M2.5 3A1.5 1.5 0 001 4.5v7A1.5 1.5 0 002.5 13h11A1.5 1.5 0 0015 11.5V6A1.5 1.5 0 0013.5 4.5H7.5L6 3H2.5z" fill="#F5C842"/>`;

function toggle(id) {
  const children = document.getElementById(id);
  const tri = document.getElementById('t-' + id);
  const folderIcon = document.getElementById('fi-' + id);
  const isOpen = children.style.display === 'block';
  children.style.display = isOpen ? 'none' : 'block';
  tri.classList.toggle('open', !isOpen);
  if (folderIcon) folderIcon.innerHTML = isOpen ? closedFolderPath : openFolderPath;
}
</script>
