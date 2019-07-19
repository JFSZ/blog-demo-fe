<template>
  <el-container class="home_container">
    <el-header>
      <div class="home_title">博客管理平台</div>
      <div class="home_userinfoContainer">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link home_userinfo">
            {{currentUserName}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="sysMsg">系统消息</el-dropdown-item>
              <el-dropdown-item command="MyArticle">我的文章</el-dropdown-item>
            <el-dropdown-item command="MyHome">个人主页</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo" style="background-color: #ECECEC" router>
          <template v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" >
            <el-submenu :index="index+''" v-if="item.children && item.children.length>1" :key="index">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" v-if="!child.hidden" :index="child.path" :key="child.path">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
            <template v-if="item.children && item.children.length <= 1">
              <el-menu-item :index="item.children[0].path" :key="item.children[0].path" v-if="!item.children.hidden">
                <i :class="item.children[0].iconCls"></i>
                <span slot="title">{{item.children[0].name}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default{
  methods: {
    handleCommand (command) {
      this.$message('click on item ' + command)
      var _this = this
      if (command === 'logout') {
        this.$confirm('注销登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          _this.$api.post('logout', null, function (result) {
            _this.currentUserName = '游客'
            _this.$router.replace({path: '/'})
          }, function (err) {
            _this.$message({type: 'error', message: '退出失败' + err})
          })
        }, function () {
        })
      } else if (command === 'sysMsg') {
        _this.$router.push({path: '/usermanage'})
      } else if (command === 'MyArticle') {
        _this.$router.push({path: '/articleList'})
      } else if (command === 'MyHome') {
        _this.$router.push({path: '/home'})
      }
    }
  },
  mounted: function () {
  },
  data () {
    return {
      currentUserName: this.$store.state.userInfo.nickname
    }
  }
}
</script>
<style>
  .home_container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .el-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-aside {
    background-color: #ECECEC;
  }

  .el-main {
    background-color: #fff;
    color: #000;
    text-align: center;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .i404 {
    display: block;
    width: 247px;
    height: 120px;
    margin: 30px auto;
    background: url(http://js.90sjimg.com/images/ele_bg_404.png);
  }
  .p404 {
    text-align: center;
    width: 320px;
    height: 120px;
    margin: 30px auto;
  }
</style>
