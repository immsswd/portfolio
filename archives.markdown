---
layout: page
title: Archives
permalink: /archives/
---

<style>
.win-explorer {
  --win-border-strong: #d6d6d6;
  --win-header-bg: #f7f7f7;
  --win-row-hover: #e8f1fc;
  --win-row-hover-border: #cce4fa;
  --win-text: #1f1f1f;
  --win-text-dim: #5e5e5e;
  --win-accent: #0067c0;
  --win-folder-fill1: #8ec7f7;
  --win-folder-fill2: #5fa8ee;
  max-width: 820px;
  margin: 0 auto;
  font-family: "Segoe UI Variable", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
  color: var(--win-text);
}

.cursor-able {
  cursor: pointer;
}

/* ---- window chrome ---- */
.win-window {
  border: 1px solid var(--win-border-strong);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 12px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.04);
}
.win-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 16px;
  background: #f3f3f3;
  border-bottom: 1px solid var(--win-border-strong);
  font-size: 0.92rem;
  color: var(--win-text-dim);
  flex-wrap: wrap;
}
.win-titlebar .win-folder-mini { width: 16px; height: 16px; flex-shrink: 0; }
.win-crumb { color: var(--win-text); font-weight: 600; }
.win-crumb-sep { color: #b6b6b6; margin: 0 1px; }
.win-crumb-dim { color: var(--win-text-dim); }

/* ---- rows: a clean single-column tree, no data columns ---- */
.win-row {
  display: flex;
  align-items: center;
  min-height: 42px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 0.98rem;
  line-height: 1.3;
  cursor: default;
}
.win-row:hover {
  background: var(--win-row-hover);
  outline: 1px solid var(--win-row-hover-border);
  outline-offset: -1px;
}

.win-explorer details { border: none; }
.win-explorer summary { list-style: none; cursor: pointer; }
.win-explorer summary::-webkit-details-marker { display: none; }

.twisty {
  width: 11px;
  height: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6b6b6b;
  transition: transform 0.15s ease;
  flex-shrink: 0;
}
details[open] > summary .twisty { transform: rotate(90deg); }

.col-name-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  width: 100%;
  padding: 0 14px;
}
.col-name-inner .label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.depth-0 > summary .col-name-inner { padding-left: 14px; font-weight: 600; }
.depth-1 > summary .col-name-inner { padding-left: 38px; }
.depth-2 .col-name-inner { padding-left: 62px; }
.depth-2 .label { font-weight: 400; color: var(--win-text); }

.icon-folder, .icon-file { width: 19px; height: 19px; flex-shrink: 0; }
.twisty, .icon-folder, .icon-file { flex-shrink: 0; }

a.win-row { text-decoration: none; color: inherit; }
a.win-row:hover .label { color: var(--win-accent); }

.win-statusbar {
  padding: 8px 16px;
  font-size: 0.84rem;
  color: var(--win-text-dim);
  background: var(--win-header-bg);
  border-top: 1px solid var(--win-border-strong);
}

@media (max-width: 480px) {
  .win-row { font-size: 0.95rem; min-height: 44px; }
  .depth-1 > summary .col-name-inner { padding-left: 30px; }
  .depth-2 .col-name-inner { padding-left: 48px; }
}
</style>

<div class="win-explorer">
  <div class="win-window">
    <div class="win-titlebar">
      <span class="win-folder-mini" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5.2C2 4.5 2.6 4 3.3 4h4.4l1.4 1.6h7.6c.7 0 1.3.5 1.3 1.2v8c0 .7-.6 1.2-1.3 1.2H3.3C2.6 16 2 15.5 2 14.8V5.2z" fill="var(--win-folder-fill2)"/>
        </svg>
      </span>
      <span class="win-crumb-dim">/</span>
      <span class="win-crumb-sep">&rsaquo;</span>
      <span class="win-crumb-dim">Blog</span>
      <span class="win-crumb-sep">&rsaquo;</span>
      <span class="win-crumb">Archives</span>
    </div>

{% assign total_items = 0 %}
{% assign postsByCategory = site.posts | sort: "date" | reverse | group_by_exp: "post", "post.categories[0]" | sort: "name" %}
{% for categoryGroup in postsByCategory %}
{% assign categoryName = categoryGroup.name | default: "Uncategorized" %}
{% assign total_items = total_items | plus: categoryGroup.items.size %}

    <details class="depth-0" open>
      <summary class="win-row">
        <span class="col-name-inner">
          <span class="twisty" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
          </span>
          <span class="icon-folder" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6.4C3 5.6 3.7 5 4.5 5h5.3l1.7 1.9h9c.8 0 1.5.6 1.5 1.4v9.3c0 .8-.7 1.4-1.5 1.4h-15C3.7 19 3 18.4 3 17.6V6.4z" fill="var(--win-folder-fill1)"/>
              <path d="M3 9.2c0-.7.7-1.2 1.5-1.2h15c.8 0 1.5.5 1.5 1.2v8.3c0 .8-.7 1.5-1.5 1.5h-15C3.7 19 3 18.3 3 17.5V9.2z" fill="var(--win-folder-fill2)"/>
            </svg>
          </span>
          <span class="label">{{ categoryName }}</span>
        </span>
      </summary>

      {% assign postsByYear = categoryGroup.items | group_by_exp: "post", "post.date | date: '%Y'" | sort: "name" | reverse %}
      {% for yearGroup in postsByYear %}

      <details class="depth-1">
        <summary class="win-row">
          <span class="col-name-inner">
            <span class="twisty" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
            </span>
            <span class="icon-folder" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6.4C3 5.6 3.7 5 4.5 5h5.3l1.7 1.9h9c.8 0 1.5.6 1.5 1.4v9.3c0 .8-.7 1.4-1.5 1.4h-15C3.7 19 3 18.4 3 17.6V6.4z" fill="var(--win-folder-fill1)"/>
                <path d="M3 9.2c0-.7.7-1.2 1.5-1.2h15c.8 0 1.5.5 1.5 1.2v8.3c0 .8-.7 1.5-1.5 1.5h-15C3.7 19 3 18.3 3 17.5V9.2z" fill="var(--win-folder-fill2)"/>
              </svg>
            </span>
            <span class="label">{{ yearGroup.name }}</span>
          </span>
        </summary>

        {% for post in yearGroup.items %}
        <a class="win-row depth-2 cursor-able" href="{{ post.url | relative_url }}">
          <span class="col-name-inner cursor-able">
            <span class="icon-file" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 3.5h7.6L18 7.6v12.4a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 20V5a1.5 1.5 0 0 1 1.5-1.5z" fill="#ffffff" stroke="#9aa3ad" stroke-width="1"/>
                <path d="M14.1 3.5v3.1a1 1 0 0 0 1 1H18" fill="none" stroke="#9aa3ad" stroke-width="1"/>
                <rect x="7.3" y="11.2" width="9" height="2" rx="0.4" fill="var(--win-accent)"/>
                <rect x="7.3" y="14.4" width="6.4" height="2" rx="0.4" fill="#c7d9ea"/>
              </svg>
            </span>
            <span class="label">{{ post.title }}</span>
          </span>
        </a>
        {% endfor %}
      </details>
      {% endfor %}
    </details>

{% endfor %}

    <div class="win-statusbar">{{ total_items }} items &middot; {{ postsByCategory.size }} categories</div>

  </div>
</div>
