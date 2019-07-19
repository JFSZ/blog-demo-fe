<template>
  <el-container class="home_container">
    <el-header>
      <div style="background:white;">
        <span>博客首页</span>
        <el-link style="font-size: 16px;" type="primary" @click="doLogin">登录</el-link>
      </div>
    </el-header>
    <el-main>
      <div>
        <a></a>
      </div>
    </el-main>
    <el-footer>
      <div></div>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      articleList: []
    }
  },
  mounted () {
    this.getArticleList()
  },
  methods: {
    doLogin () {
      let _this = this
      _this.$router.push({path: '/login'})
    },
    getArticleList () {
      let _this = this
      _this.$api.post('/article/getAllArticle', null, resp => {
        console.log(resp)
      },
      resp => {
        console.log(resp)
      })
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
  .el-header, .el-footer {
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
