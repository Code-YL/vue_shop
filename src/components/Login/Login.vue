<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="@/assets/logo.png" alt="">
            </div>
            <!-- 表单区域 -->
            <el-form :model="login_form" class="login_form" :rules='loginForm_rules' ref="loginFormRef" enctype="application/x-www-form-urlencoded">
                <el-form-item prop="username">
                    <el-input v-model="login_form.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="login_form.password" prefix-icon="el-icon-lock" type='password'></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {login_in} from 'network/login_in'


export default {
    data() {
      return {
        login_form: {
          username: 'admin',
          password:'123456'
        },
        loginForm_rules:{
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
        ]
    }
      }
    },
    methods: {
        login(){
            this.$refs.loginFormRef.validate(async valid=>{
                if(!valid) return;
                //const abc = JSON.parse(JSON.stringify(this.login_form))
                const result = await login_in(this.login_form)
                // console.log(result);
                if(result.meta.status !== 200) return this.$message.error('登录失败！');
                this.$message.success('登录成功！')
                window.sessionStorage.setItem('token',result.data.token)
                this.$router.push('/home')
            })
        },
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields()
        },
        login_in
    //   onSubmit() {
    //     console.log('submit!');
    //   }
    },
    
}
</script >

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .avatar_box{
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%,-50%);
            overflow: hidden;
            width: 130px;
            height: 130px;
            border:1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            background-color: #fff;
            box-shadow: 0 0 10px #ddd;
            img{
                width: 100%;
                background-color: #eee;
                border-radius: 50%;
            }
        }
        .login_form{
            padding: 110px 20px;
            .btns{
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}

</style>