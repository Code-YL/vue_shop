<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!-- 搜索 添加 -->
            <el-row :gutter="20">
                <el-col :span="6">
                <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='getUsersInfo'>
                    <el-button slot="append" icon="el-icon-search" @click="getUsersInfo"></el-button>
                </el-input>
                </el-col>
                <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="userList" border stripe>
                <!-- stripe: 斑马条纹 border：边框-->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column label="状态">
                    <template v-slot="scope">
                        <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align='center' header-align='left'>
                    <template v-slot="scope">
                        <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click="showEditDialog(scope.row.id)"
                        ></el-button>
                        <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click="removeUserById(scope.row.id)"
                        ></el-button>
                        <el-tooltip
                        class="item"
                        effect="dark"
                        content="角色分配"
                        :enterable="false"
                        placement="top"
                        >
                        <el-button
                            type="warning"
                            icon="el-icon-setting"
                            size="mini"
                        ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[3, 5, 7, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
        </el-card>
        <!-- 添加新用户 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体 -->
            <el-form
                :model="addUserForm"
                ref="addUserFormRef"
                :rules="addUserFormRules"
                label-width="70px"
            >
                <el-form-item label="用户名" prop="username">
                <el-input v-model="addUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                <el-input v-model="addUserForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                <el-input v-model="addUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户的对话框 -->
        <el-dialog
        title="修改用户信息"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed">
            <!-- 内容主体 -->
            <el-form
                :model="editUserForm"
                ref="editUserFormRef"
                :rules="editUserFormRules"
                label-width="70px">
                <el-form-item label="用户名">
                <el-input v-model="editUserForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                <el-input v-model="editUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                <el-input v-model="editUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {getUsersInfo,userStateChange,addUserForm,showEditDialog,editUser,removeUser} from 'network/Home.js'


export default {
    data(){
        // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
        return{
            queryInfo: {
                query: '',
                // 当前页数
                pagenum: 1,
                // 每页显示多少数据
                pagesize: 3
            }, 
            userList:[],
            total:0,
            // 添加用户对话框
            addDialogVisible: false,
            // 用户添加
            addUserForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            addUserFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {min: 2, max: 10, message: '用户名的长度在2～10个字', trigger: 'blur'}
                ],
                password: [
                    { required: true, message:'请输入用户密码', trigger: 'blur' },
                    { min: 6, max: 18, message:'用户密码的长度在6～18个字',trigger: 'blur'}
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ]
            },
            editDialogVisible: false,
            editUserForm: {},
            // 编辑用户表单验证
            editUserFormRules: {
                email: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { validator: checkEmail, trigger: 'blur' }
                ],
                mobile: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { validator: checkMobile, trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.getUsersInfo()
    },
    methods: {
        getUsersInfo(){
            getUsersInfo(this.queryInfo).then(res => {
                if(res.meta.status !== 200) return this.$message.error('获取用户列表失败！');
                this.userList = res.data.users
                this.total = res.data.total
            })
        },
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize
            this.getUsersInfo()
        },
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage
            this.getUsersInfo()
        },
        userStateChange(userInfo){
            console.log(userInfo)
            userStateChange(userInfo).then(res => {
                if(res.meta.status !== 200) return this.$message.error('更新状态失败！');
                this.$message.success('更新状态成功！')
            })
        },
        // 监听 添加用户对话框的关闭事件
        addDialogClosed () {
            this.$refs.addUserFormRef.resetFields()
        },
        //添加用户
        addUser () {
            // 提交请求前，表单预验证
            this.$refs.addUserFormRef.validate(async valid => {
                // console.log(valid)
                // 表单预校验失败
                if (!valid) return
                const res = await addUserForm(this.addUserForm)
                if (res.meta.status !== 201) {
                this.$message.error('添加用户失败！')
                }
                this.$message.success('添加用户成功！')
                // 隐藏添加用户对话框
                this.addDialogVisible = false
                this.getUsersInfo()
            })
        },
        // 编辑用户信息
        async showEditDialog (id) {
            const res = await showEditDialog('users/' + id)
            if (res.meta.status !== 200) {
                return this.$message.error('查询用户信息失败！')
            }
            this.editUserForm = res.data
            this.editDialogVisible = true
        },
        // 监听修改用户对话框的关闭事件
        editDialogClosed () {
        this.$refs.editUserFormRef.resetFields()
        },
        // 修改用户信息
        editUser () {
        // 提交请求前，表单预验证
        this.$refs.editUserFormRef.validate(async valid => {
            // console.log(valid)
            // 表单预校验失败
            if (!valid) return
            const res = await editUser(
            'users/' + this.editUserForm.id,
            {
                email: this.editUserForm.email,
                mobile: this.editUserForm.mobile
            }
            )
            if (res.meta.status !== 200) {
            this.$message.error('更新用户信息失败！')
            }
            // 隐藏添加用户对话框
            this.editDialogVisible = false
            this.$message.success('更新用户信息成功！')
            this.getUsersInfo()
        })
        },
        // 删除用户
        async removeUserById (id) {
            const confirmResult = await this.$confirm(
                '此操作将永久删除该用户, 是否继续?',
                '提示',
                {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }
            ).catch(err => err)
            // 点击确定 返回值为：confirm
            // 点击取消 返回值为： cancel
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }
            const res = await removeUser('users/' + id)
            if (res.meta.status !== 200) return this.$message.error('删除用户失败！')
            this.$message.success('删除用户成功！')
            this.getUsersInfo()
        }
    },
}
</script>

<style lang="less" scoped>
    .el-card{
        margin-top: 15px;
        .el-table{
            margin-top: 15px;
            font-size: 12px;
        }
    }
</style>