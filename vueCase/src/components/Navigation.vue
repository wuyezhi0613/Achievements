<template>
  <aside id="left-panel">
    <navigation-header></navigation-header>
    <nav>
      <ul>
        <li v-for="(route, key, index) in routes" :class="{active: route.isActive}">
          <router-link :to="route.path">
            <i :class='computedClass(route)'></i>
            <span  class="font-space">{{ route.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <navigation-loginout></navigation-loginout>
  </aside>
</template>
<script>
  import NavigationHeader from './NavigationHeader'
  import NavigationLoginout from './NavigationLoginout.vue'
  import $ from 'jquery'
  export default {
    components: {
      NavigationLoginout,
      NavigationHeader
    },
    name: 'navigation',
    props: ['routes'],
    mounted () {
      if ($('nav span:contains(' + this.$route.meta.godfather + ')').parents('li').html() !== undefined) {
        let index = $('nav span:contains(' + this.$route.meta.godfather + ')').parents('li').index()
        this.routes[index].isActive = true
      }
    },
    methods: {
      computedClass: function (route) {
        return route.icon + ' ' + route.color
      }
    }
  }
</script>
