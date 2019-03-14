<template>
<div>
<!--  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="name">
      <el-input type="password" v-model="ruleForm2.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="validate">
      <el-input v-model.number="ruleForm2.validate"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
  </el-form>-->
  <animate-css></animate-css>
</div>
</template>

<script>
import {HOST} from '../assets/js/HOST'
import AnimateCss from './Animatecss'
export default {
  name: 'Login',
  components: {
    AnimateCss
  },
  data () {
    var checkImg = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        aliplayerSdkPath: '//g.alicdn.com/de/prismplayer/2.6.0/aliplayer-min.js',
        pass: '',
        name: '',
        validate: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        validate: [
          { validator: checkImg, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('' + HOST + '/api/login', this.ruleForm2).then(res => {
            console.log(res)
          }, err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.el-form{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -240px;
  width: 480px;
}
</style>
