---
layout: page
title: Archives
permalink: /archives/
---

<style>
.archive-tree {
  max-width: 980px;
  width: min(100%, 980px);
  margin: 0 auto;
  padding: 28px 20px 40px;
  color: #0f172a;
}
.archive-tree h1 {
  margin: 0 0 24px;
  font-size: clamp(2rem, 3vw, 2.8rem);
  letter-spacing: -0.03em;
}
.archive-tree details {
  border: none;
  margin-bottom: 18px;
}
.archive-tree summary {
  list-style: none;
}
.archive-tree summary::-webkit-details-marker {
  display: none;
}
.archive-category {
  border: 1px solid #e5e7eb;
  border-radius: 22px;
  overflow: hidden;
  background: #f8fbff;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.06);
}
.archive-year {
  margin: 0 0 0 18px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  overflow: hidden;
  background: #ffffff;
}
.category-summary,
.year-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.category-summary {
  background: #f8fbff;
}
.year-summary {
  background: #ffffff;
}
.category-summary:hover,
.year-summary:hover {
  background: #eef6ff;
}
.summary-disclosure {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}
details[open] > summary .summary-disclosure {
  transform: rotate(90deg);
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
  gap: 2px;
  min-width: 0;
}
.summary-copy strong {
  font-size: 1rem;
  font-weight: 700;
  overflow-wrap: anywhere;
}
.summary-meta {
  color: #6b7280;
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
  padding: 12px 0 20px 42px;
}
.post-item {
  margin: 0;
  padding: 0;
}
.post-item + .post-item {
  margin-top: 10px;
}
.post-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 0;
  color: #0f172a;
  text-decoration: none;
  background: transparent;
  border: none;
  border-radius: 0;
  transition: color 0.2s ease;
}
.post-link:hover {
  color: #1d4ed8;
}
.post-name {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}
.post-meta {
  color: #6b7280;
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
        <span class="summary-disclosure" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
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
            <span class="summary-disclosure" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
            <span class="year-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M3 10h18" />
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
            <li class="post-item">
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
