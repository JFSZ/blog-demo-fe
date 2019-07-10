<template>
  <el-container>
    <el-header class="cate_mana_header">
      <el-input
        placeholder="请输入栏目名称"
        v-model="cateName" style="width: 200px;">
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px" @click="addNewCate">新增栏目</el-button>
    </el-header>
    <el-main class="cate_mana_main">
      <el-table
        ref="multipleTable"
        :data="categories"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column
          type="selection"
          width="55" align="left">
        </el-table-column>
        <el-table-column
          label="编号"
          prop="id"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          label="栏目名称"
          prop="catename"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          prop="date"
          label="启用时间" align="left">
          <template slot-scope="scope">{{ scope.row.date | formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" :disabled="this.selItems.length==0" style="margin-top: 10px;width: 100px;"
                 @click="deleteAll" v-if="this.categories.length>0">批量删除
      </el-button>
    </el-main>
  </el-container>
</template>
<script>
export default{
  methods: {
    addNewCate () {
      this.loading = true
      var _this = this
      let param = {
        catename: this.cateName
      }
      _this.$api.post('admin/addCategory', param, resp => {
        if (resp != null) {
          let code = resp.code
          if (Object.is(code, 0)) {
            _this.$message({type: 'success', message: resp.message})
            _this.cateName = ''
            _this.refresh()
            _this.loading = false
          }
        } else {
          _this.$message({type: 'error', message: resp.message})
        }
      }, resp => {
        _this.$message({
          type: 'error',
          message: resp.message
        })
        _this.loading = false
      })
    },
    deleteAll () {
      var _this = this
      this.$confirm('确认删除这 ' + this.selItems.length + ' 条数据?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        var selItems = _this.selItems
        var ids = ''
        for (var i = 0; i < selItems.length; i++) {
          ids += selItems[i].id + ','
        }
        _this.deleteCate(ids.substring(0, ids.length - 1))
      }).catch(() => {
        // 取消
        _this.loading = false
      })
    },
    handleSelectionChange (val) {
      this.selItems = val
    },
    handleEdit (index, row) {
      var _this = this
      this.$prompt('请输入新名称', '编辑', {
        confirmButtonText: '更新',
        inputValue: row.catename,
        cancelButtonText: '取消'
      }).then(({value}) => {
        // value就是输入值
        if (value == null || value.length === 0) {
          _this.$message({
            type: 'info',
            message: '数据不能为空!'
          })
        } else {
          _this.loading = true
          let param = {
            id: row.id,
            catename: value
          }
          _this.$api.post('admin/editCategory', param, resp => {
            if (resp != null) {
              let code = resp.code
              if (Object.is(code, 0)) {
                _this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                _this.refresh()
              } else {
                _this.$message({
                  type: 'error',
                  message: resp.message
                })
              }
            }
          }, resp => {
            if (resp.response.status === 403) {
              _this.$message({
                type: 'error',
                message: resp.message
              })
            }
            _this.loading = false
          })
        }
      })
    },
    handleDelete (index, row) {
      let _this = this
      this.$confirm('确认删除 ' + row.catename + ' ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.deleteCate(row.id)
      }).catch(() => {
        // 取消
        _this.loading = false
      })
    },
    deleteCate (ids) {
      var _this = this
      this.loading = true
      let param = {
        ids: JSON.stringify(ids)
      }
      // 删除
      _this.$api.post('admin/deleteCategory', param, resp => {
        if (resp != null) {
          let code = resp.code
          if (Object.is(code, 0)) {
            _this.$message({
              type: 'success',
              message: '删除成功!'
            })
            _this.refresh()
          } else {
            _this.$message({
              type: 'error',
              message: resp.message
            })
          }
        }
      }, resp => {
        _this.loading = false
        if (resp.response.status === 403) {
          _this.$message({
            type: 'error',
            message: resp.message
          })
        } else if (resp.response.status === 500) {
          _this.$message({
            type: 'error',
            message: '该栏目下尚有文章，删除失败!'
          })
        }
      })
    },
    refresh () {
      let _this = this
      _this.$api.post('admin/getAllCategory', null, resp => {
        if (resp != null) {
          let code = resp.code
          if (Object.is(code, 0)) {
            _this.categories = resp.data
            _this.loading = false
          }
        } else {
          _this.$message({
            type: 'error',
            message: resp.message
          })
        }
      }, resp => {
        _this.$message({
          type: 'error',
          message: resp.message
        })
        _this.loading = false
      })
    }
  },
  mounted: function () {
    this.loading = true
    this.refresh()
  },
  data () {
    return {
      cateName: '',
      selItems: [],
      categories: [],
      loading: false
    }
  }
}
</script>
<style>
  .cate_mana_header {
    background-color: #ececec;
    margin-top: 20px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .cate_mana_main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    background-color: #ececec;
    margin-top: 20px;
    padding-top: 10px;
  }
</style>
