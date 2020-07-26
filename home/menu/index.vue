<template>
    <div class="home-dom">
        <div style="margin-bottom:10px">
            <Breadcrumb>
                <BreadcrumbItem>主页</BreadcrumbItem>
                <BreadcrumbItem>菜单</BreadcrumbItem>
                <BreadcrumbItem>列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Form ref="formInline" :model="formInline" inline>
            <!-- <FormItem>
                <Input type="text" v-model="formInline.userName" placeholder="姓名" />
            </FormItem>
            <FormItem>
                <Input type="text" v-model="formInline.deptName" placeholder="部门" />
            </FormItem>
            <FormItem>
                <Input type="text" v-model="formInline.phone" placeholder="手机号" />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="getList(1)">查询</Button>
            </FormItem> -->
            <FormItem>
                <Button type="warning" @click="modal1=true">新增</Button>
            </FormItem>
        </Form>
        <Table width="100%" border v-if="list.length" :columns="columns2" :data="list || []">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
                <Button type="error" size="small" @click="dele(index)">删除</Button>
            </template>
        </Table>
        <Modal v-model="modal1" :title="formLeft.id?'编辑':'新增'" :loading="loading" @on-visible-change="$refs['addUser'].resetFields()">
            <Form :model="formLeft" ref="addUser" :loading="loading" label-position="right" :label-width="80" :rules="ruleValidate">
                <FormItem label="菜单名称" prop="Name">
                    <Input v-model="formLeft.Name" />
                </FormItem>
                <FormItem label="url地址" prop="Location">
                    <Input v-model="formLeft.Location" />
                </FormItem>
                <FormItem label="icon图标" prop="Icon">
                    <Input v-model="formLeft.Icon" />
                </FormItem>
                <FormItem label="姓名" prop="ParentNumber">
                    <Select v-model="formLeft.ParentNumber" placeholder="请选择">
                        <Option v-for="item in [{code: '001',name:'系统管理'},{code: '002',name:'人员管理'},{code: '003',name:'流程管理'},{code: '004',name:'经营分析'},{code: '005',name:'名骏学院'},{code: '006',name:'门店管理'}]" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button style="margin-left:8px" @click="modal1=false">取消</Button>
                <Button type="primary" :loading="loading" @click="ok">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<style lang="less" scoped>
.home-dom {
    background: #fff;
    padding: 20px;
}
</style>
<script>
export default {
    data () {
        return {
            loading: false,
            modal1: false,
            formInline: {
                pageCurent: 1,
                pageSize: 10
            },
            formLeft: {
                CreatorUserId: '',
                LastModifierUserId: '',
                DeleterUserId: '',
                ParentNumber: '001'
            },
            pageList: {},
            deptNames: [],

            ruleValidate: {
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                userId: [
                    { required: true, message: '请输入ID', trigger: 'blur' }
                ],
                oaId: [
                    { required: true, message: '请输入oaId', trigger: 'blur' }
                ],
                managerId: [
                    // { required: true, message: '请输入上级ID', trigger: 'blur' }
                ],
                deptName: [
                    { required: true, message: '请输入部门', trigger: 'blur' }
                ],
                deptCode: [
                    { required: true, message: '请输入部门编码', trigger: 'blur' }
                ],
                companyName: [
                    { required: true, message: '请输入公司名', trigger: 'blur' }
                ],
                cardNo: [
                    { required: true, message: '请输入卡号', trigger: 'blur' }
                ],
                workCode: [
                    { required: true, message: '请输入工号', trigger: 'blur' }
                ]
            },
            columns2: [
                {
                    title: '菜单名称',
                    key: 'Name',
                    width: 200, render: (h, params) => {
                        let Name = params.row.Name
                        let isExpand = params.row.isExpand
                        let isDown = params.row.isDown
                        let iconType = !isDown ? 'ios-arrow-forward' : 'ios-arrow-down'
                        if (!isExpand) {
                            return h('div', { style: { cursor: 'pointer' } }, [
                                h('Icon', { props: { type: iconType }, style: { marginRight: '5px' }, on: { click: (e) => { e.stopPropagation(); this.expandRow(params) } } }),
                                h('span', Name)
                            ])
                        } else {
                            return h('div', { style: { marginLeft: '25px' } }, Name)
                        }
                    }
                },
                {
                    title: '父级ID',
                    key: 'ParentId',
                    width: 100
                },
                {
                    title: 'url地址',
                    key: 'Location'
                },
                {
                    title: 'Icon',
                    key: 'Icon',
                    width: 100
                },
                {
                    title: '操作',
                    key: 'action',
                    slot: 'action',
                    width: 220
                }
            ],
            list: []
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        expandRow (params) {
            //判断当前行是否展开，如果未展开，执行以下方法，先展开再请求接口加载到tabledata中当前data index 后
            if (!this.list[params.index].isDown) {
                this.list[params.index].isDown = true
                let newArrayData = this.list[params.index].childrens || []
                console.log(this.list[params.index])
                this.list[params.index].totals = newArrayData.length //将展开操作查询到的数据总条数加到当前行数据的totals上
                newArrayData.map(item => {
                    item.isExpand = true
                    item.upLevelIndex = params.index
                })
                newArrayData.map((value, key) => {
                    this.list.splice(params.index + key + 1, 0, value)
                })
            } else {//如果当前行已展开，则隐藏
                this.list[params.index].isDown = false
                this.list.splice(params.index + 1, params.row.totals)
            }
        },
        getJsonTree (data) {
            let parents = data.filter(value => value.ParentId == 0)
            let childrens = data.filter(value => value.ParentId != 0)
            let translator = (parents, childrens) => {
                parents.forEach((parent) => {
                    childrens.forEach((current, index) => {
                        if (current.ParentId === parent.MenuId) {
                            let temp = JSON.parse(JSON.stringify(childrens))
                            temp.splice(index, 1)
                            translator([current], temp)
                            typeof parent.childrens !== 'undefined' ? parent.childrens.push(current) : parent.childrens = [current]
                        }
                    }
                    )
                }
                )
            }
            translator(parents, childrens)
            return parents
        },
        edit (row) {
            console.log(row)
        },
        dele () { },
        ok () { },
        getList () {
            this.$model.system.PlateMenuRequest_GetAll().then(res => {
                let _list = res.data || []
                if (_list.length)
                    this.list = this.getJsonTree(_list)
            })
            //  this.$model.system.PlateMenuRequest_GetAllFromParentId({ParentId:'37'}).then(res => {
            //     this.list = res.data || []
            // })
        }
    }
}
</script>