<template>
  <div id="ribbon">
    <!-- breadcrumb -->
    <ol class="breadcrumbNav">
      <li v-for="path in paths">
      	<router-link :to=path.path>{{ path.meta.definition }}</router-link>
      </li>
    </ol>
    <div class="pull-right ">
      <div class="btn-group margin-top-4">
        <a class="button button-highlight button-pill margin-left-justify ">某功能</a>
        <a class="button button-highlight button-pill margin-left-justify">预留功能</a>
        <a class="button button-highlight button-pill margin-left-justify">预留功能</a>
        <a class="button button-highlight button-pill margin-left-justify">预留功能</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'nand-header',
    props: ['paths']
  }
</script>
