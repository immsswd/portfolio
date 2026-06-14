---
layout: page
title: Archives
permalink: /archives/
---

<style>
.archive-tree {
  max-width: 900px;
  width: min(100%, 900px);
  margin: 0 auto;
  padding: 24px 20px 36px;
  color: #111827;
}
.archive-tree h1 {
  margin: 0 0 24px;
  font-size: clamp(2rem, 3vw, 2.6rem);
  letter-spacing: -0.03em;
}
.archive-tree details {
  border: none;
  border-radius: 18px;
  background: transparent;
  margin-bottom: 16px;
  overflow: hidden;
}
.archive-tree summary {
  list-style: none;
}
.archive-tree summary::-webkit-details-marker {
  display: none;
}
.archive-category {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 16px 50px rgba(15, 23, 42, 0.06);
}
.archive-year {
  margin: 0 0 0 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  overflow: hidden;
  background: #f8fbff;
}
.category-summary,
.year-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 18px 22px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.category-summary {
  background: #ffffff;
}
.year-summary {
  background: #eff7ff;
}
.category-summary:hover,
.year-summary:hover {
  background: rgba(15, 23, 42, 0.08);
}
.category-summary::after,
.year-summary::after {
  content: "";
  width: 12px;
  height: 12px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg);
  margin-left: auto;
  transition: transform 0.2s ease;
}
details[open] > summary::after {
  transform: rotate(135deg);
}
.summary-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.summary-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.summary-copy strong {
  font-size: 1.05rem;
  font-weight: 700;
  overflow-wrap: anywhere;
}
.summary-meta {
  color: #64748b;
  font-size: 0.95rem;
  white-space: nowrap;
}
.archive-icon,
.year-icon {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  flex-shrink: 0;
}
.post-list {
  list-style: none;
  margin: 0;
  padding: 18px 20px 20px;
}
.post-list li {
  margin: 0;
}
.post-link {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  color: #0f172a;
  text-decoration: none;
  background: #ffffff;
  border-radius: 16px;
  transition: background 0.2s ease;
}
.post-link + .post-link {
  margin-top: 12px;
}
.post-link:hover {
  background: rgba(59, 130, 246, 0.08);
}
.post-name {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}
.post-meta {
  display: inline-flex;
  color: #64748b;
  font-size: 0.92rem;
  white-space: nowrap;
}
.post-icon {
  width: 16px;
  height: 16px;
  color: #475569;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
@media (max-width: 720px) {
  .archive-tree {
    padding: 18px 14px 28px;
  }
  .category-summary,
  .year-summary,
  .post-link {
    padding: 14px 16px;
  }
  .archive-year {
    margin-left: 0;
  }
  .post-link {
    grid-template-columns: 1fr;
  }
  .post-meta {
    display: none;
  }
}
</style>

<div class="archive-tree">
  <h1>{{ page.title }}</h1>

{% assign postsByCategory = site.posts | sort: "date" | reverse | group_by_exp: "post", "post.categories[0]" | sort: "name" %}
{% for categoryGroup in postsByCategory %}
{% assign categoryName = categoryGroup.name | default: "Uncategorized" %}

  <details class="archive-category" open>
    <summary class="category-summary">
      <span class="summary-left">
        <span class="archive-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 7.5A1.5 1.5 0 014.5 6h3l1.5 1.5h8A1.5 1.5 0 0120.5 9v9A1.5 1.5 0 0119 19.5h-14A1.5 1.5 0 013.5 18v-10.5z" />
          </svg>
        </span>
        <span class="summary-copy">
          <strong>{{ categoryName }}</strong>
          <span class="summary-meta">{{ categoryGroup.items | size }} posts</span>
        </span>
      </span>
    </summary>

    {% assign postsByYear = categoryGroup.items | group_by_exp: "post", "post.date | date: '%Y'" | sort: "name" | reverse %}
    {% for yearGroup in postsByYear %}
      <details class="archive-year">
        <summary class="year-summary">
          <span class="summary-left">
            <span class="year-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 7.5V5.5A1.5 1.5 0 014.5 4h3l1.5 1.5h7.5A1.5 1.5 0 0118 7.5v10.5A1.5 1.5 0 0116.5 19.5h-9A1.5 1.5 0 016 18V7.5z" />
              </svg>
            </span>
            <span class="summary-copy">
              <strong>{{ yearGroup.name }}</strong>
              <span class="summary-meta">{{ yearGroup.items | size }} posts</span>
            </span>
          </span>
        </summary>

        <ul class="post-list">
          {% for post in yearGroup.items %}
            <li>
              <a class="post-link" href="{{ post.url | relative_url }}">
                <span class="post-name">
                  <span class="post-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 4.5h9.75a1.75 1.75 0 011.75 1.75v12.5a1.75 1.75 0 01-1.75 1.75H6a1.75 1.75 0 01-1.75-1.75V6.25A1.75 1.75 0 016 4.5z" />
                      <path d="M11.25 4.5v4.5h4.5" />
                    </svg>
                  </span>
                  {{ post.title }}
                </span>
                <span class="post-meta">{{ post.date | date: "%b %-d" }}</span>
              </a>
            </li>
          {% endfor %}
        </ul>
      </details>
    {% endfor %}

  </details>

{% endfor %}

</div>
