---
layout: page
title: Archives
permalink: /archives/
---

<div class="archive-intro">
  <p class="eyebrow">All articles</p>
  <h1>Archives</h1>
  <p>Browse every article by category and year, or use the explorer on the left.</p>
</div>

{% assign posts_by_category = site.posts | group_by_exp: "post", "post.categories[0]" | sort: "name" %}
<div class="archive-groups">
  {% for category_group in posts_by_category %}
  {% assign category_name = category_group.name | default: "Uncategorized" %}
  {% assign years = category_group.items | group_by_exp: "post", "post.date | date: '%Y'" | sort: "name" | reverse %}
  <section class="archive-group">
    <h2>{{ category_name | escape }}</h2>
    {% for year_group in years %}
    <div class="archive-year">
      <h3>{{ year_group.name }}</h3>
      <ul class="archive-list">
        {% for post in year_group.items %}
        <li>
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %d" }}</time>
          <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
          {% if post.quarto_notebook %}<span class="post-list-item__kind">Quarto</span>{% endif %}
        </li>
        {% endfor %}
      </ul>
    </div>
    {% endfor %}
  </section>
  {% endfor %}
</div>
