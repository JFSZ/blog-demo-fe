<template>
  <el-card style="width: 500px" v-loading="loading">
    <div>
      <div style="text-align: left">
        <el-form :model="emailValidateForm" label-position="top" ref="emailValidateForm"
                 style="color:#20a0ff;font-size: 14px">
          <el-form-item
            prop="email"
            label="开启博客评论通知"
            :rules="[{type: 'email', message: '请输入正确的邮箱格式!'},
            { required: true, message: '请输入邮箱地址', trigger: 'blur' }]">
            <el-input type="email" v-model="emailValidateForm.email" auto-complete="off" style="width: 300px"
                      placeholder="请输入邮箱地址..." size="mini"></el-input>
            <el-button type="primary" @click="submitForm('emailValidateForm')" size="mini">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>
<script>
export default{
  data () {
    return {
      emailValidateForm: {
        email: ''
      },
      loading: false
    }
  },
  mounted: function () {
    var _this = this
    _this.$api.post('user/currentUserName', null, resp => {
      if (resp != null) {
        let code = resp.code
        if (Object.is(code, 0)) {
          _this.emailValidateForm.email = resp.data.email
        } else {
          _this.$message({type: 'error', message: '获取用户信息失败!'})
        }
      } else {
        _this.$message({type: 'error', message: '服务器内部错误,请联系管理员!'})
      }
    })
  },
  methods: {
    submitForm (formName) {
      var _this = this
      let param = {
        email: _this.emailValidateForm.email
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.loading = true
          _this.$api.post('user/updateUserEmail', param, resp => {
            if (resp != null) {
              _this.loading = false
              let code = resp.code
              if (Object.is(code, 0)) {
                _this.$message({type: 'success', message: '开启成功!'})
              } else {
                _this.$message({type: 'error', message: '开启失败!'})
              }
            }
          }, resp => {
            _this.loading = false
            _this.$message({type: 'error', message: '开启失败!'})
          })
        } else {
          _this.$message({type: 'warning', message: '邮箱格式不对!'})
          return false
        }
      })
    }
  }
}
</script>
