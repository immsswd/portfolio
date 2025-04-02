---
layout: page
title: Archives
permalink: /archives/
---

<style>
  .archive-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .archive-list li {
    margin: 1px 0;
    padding: 1px 0;
    font-size: 14px;
  }
  .category-title {
    cursor: pointer;
    font-weight: bold;
    margin: 5px 0;
    display: flex;
    align-items: center;
  }
  .arrow {
    margin-right: 5px;
    transition: transform 0.2s ease-in-out;
  }
  .post-list {
    display: none;
    margin-left: 15px;
  }
</style>

<h1 class="mb-3">📂</h1>
<p class="mb-3">Click on a category to expand/collapse its posts.</p>

{% assign categories = site.categories | sort %}
{% for category in categories %}

  <div class="category-title" onclick="toggleCategory('{{ category[0] }}')">
    <span class="arrow mb-1" id="arrow-{{ category[0] }}">▶️</span> 📁 {{ category[0] }}
  </div>
  <ul class="post-list" id="{{ category[0] }}">
    {% for post in category[1] %}
      <li class="mb-1"><a href="/portfolio{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}

<script>
  function toggleCategory(category) {
    var list = document.getElementById(category);
    var arrow = document.getElementById("arrow-" + category);

    if (list.style.display === "none" || list.style.display === "") {
      list.style.display = "block";
      arrow.innerHTML = "🔽"; // Down arrow when expanded
    } else {
      list.style.display = "none";
      arrow.innerHTML = "▶️"; // Right arrow when collapsed
    }
  }
</script>
