<template>
  <header id="nav-header">
    <div class="row">
      <div id="logo" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> <span></span> </div>
      <div id="user-icon" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="">
          <img src="../../static/img/user.png"/>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <span id="username" v-show="showUsername">{{userName}}</span>
      </div>
    </div>
  </header>
</template>
<script>
  export default {
    name: 'navigation-header',
    data () {
    	return {
    		showUsername: true,
    	  userName: '用户名'
    	}   	
    }    
  }
</script>
