<template>
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div class="header-left">
                <img src="~assets/logo.png" alt="">
                <span>胖墩管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 主体 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="togleCollapse">|||</div>
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" :default-active="activePath" unique-opened router :collapse="isCollapse" :collapse-transition="false" >
                <!-- 一级菜单 -->
                <el-submenu :index="item.id + ''" v-for="item in menuList" :key='item.id'>
                <!-- 一级菜单模块 -->
                <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{item.authName}}</span>
                </template>
                <!-- 二级菜单模块 -->
                <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)"> 
                    <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{subItem.authName}}</span>
                    </template>
                </el-menu-item>
                </el-submenu>
                
                </el-menu>
            </el-aside>
            <!-- 内容主体 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { getMenusList } from 'network/Home.js'


export default {
    data() {
        return{
            menuList:[],
            iconsObj: {
                '125': 'el-icon-s-custom',
                '103': 'el-icon-s-tools',
                '101': 'el-icon-goods',
                '102': 'el-icon-s-order',
                '145': 'el-icon-s-data'
            },
            isCollapse:false,
            activePath:''
        }
    },
    created(){
        this.getMenusList()
    },
    methods: {
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        getMenusList(){
            getMenusList().then(
                res => {
                    if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
                    this.menuList = res.data
                    // console.log(this.menuList)
                }
            )
        },
        togleCollapse () {
            this.isCollapse = !this.isCollapse
        },
        saveNavState (activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        }
    },
}
</script>

<style lang='less' scoped>

.home-container{
    height: 100%;
    .el-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #373d41;
        .header-left{
            height: 60px;
            color: #fff;
            font-size: 20px;
            img{
                vertical-align: middle;
                height: 60px;
                margin-right: 15px;
            }
        }
    }
    .el_main{
        background-color: #eaedf1;
    }
    .el-aside{
        background-color: #333744;
        .el-menu{
            border-right: none;
        }
        .toggle-button {
            background-color: #4A5064;
            font-size: 10px;
            line-height: 24px;
            color: #fff;
            text-align: center;
            letter-spacing: 0.2em;
            // 鼠标放上去变成小手
            cursor: pointer;
        }
    }
}
</style>