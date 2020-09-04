<template>
  <div>
    <Row>
      <Col span="18">
        <Table border :columns="columns12" :data="workerList" style="height: 630px">
          <template slot-scope="{ row }" slot="workerName">
            <strong>{{ row.workerName }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="warning" size="small" style="margin-right: 5px" @click="writeWorker(index)">写入</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
      </Col>
      <Col span="6">
        <card style="height: 633px;">
          <h2 slot="title">修改面板</h2>
        <div style="padding-left: 50px; display: inline"><!--  添加人员start-->
          <Button @click="value3 = true" type="primary">添加人员</Button>
          <Drawer
            title="添加人员"
            v-model="value3"
            width="360"
            :mask-closable="false"
            :styles="styles"
          >
            <Form>

                <FormItem label="Name" >
                  <label>
                    <Input v-model="workerName" placeholder="用户名"/>
                  </label>
                </FormItem>
                <FormItem label="Role" >
                  <label>
                    <Select v-model="workerRole" placeholder="角色">
                      <Option value="前台管理">前台管理</Option>
                      <Option value="医生">医生</Option>
                      <Option value="人事管理">人事管理</Option>
                      <Option value="药品管理">药品管理</Option>
                    </Select>
                  </label>
                </FormItem>
                  <FormItem label="Sex" label-position="top">
                    <RadioGroup v-model="workerSex" placeholder="性别">
                      <br>
                      <Radio label="男"></Radio>
                      <Radio label="女"></Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem label="Age" label-position="top">
                    <Input v-model="workerAge" placeholder="年龄"></Input>
                  </FormItem>
                <FormItem label="Account" label-position="top">
                  <Input v-model="workerAccount" placeholder="账户">
                  </Input>
                </FormItem>
                <FormItem label="Password" label-position="top">
                  <Input v-model="workerPassword" type="password" placeholder="密码" placement="bottom-end"></Input>
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
              <Button style="margin-right: 8px" @click="value3 = false">返回</Button>
              <Button type="primary" @click="addWorker">提交</Button>
            </div>
          </Drawer>
        </div><!--  添加人员-->
          <Button type="error" style="margin-left: 60px" @click="logto">退出登录</Button>
          <Divider></Divider>
          <Form :model="formItem" >
            <FormItem label="姓名">
                <Input v-model="workerName" placeholder="workerName..."></Input>
            </FormItem>
            <FormItem label="年龄">
              <Input v-model="workerAge" placeholder="workerAge..."></Input>
            </FormItem>
            <FormItem label="性别">
              <RadioGroup v-model="workerSex">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="角色">
              <label>
                <Select v-model="workerRole">
                  <Option value="前台管理">前台管理</Option>
                  <Option value="医生">医生</Option>
                  <Option value="人事管理">人事管理</Option>
                  <Option value="药品管理"></Option>
                </Select>
              </label>
            </FormItem>
          </Form>
        </card>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "rooter",
  data() {
    return {
      value3: false,
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      columns12: [
        {
          title: '编号',
          key: 'workerID',
          sortable: true,
          resizable: true,
          width: 140
        },
        {
          title: '姓名',
          slot: 'workerName',
          resizable: true,
          width: 180
        },
        {
          title: '年龄',
          key: 'workerAge',
          resizable: true,
          sortable: true,
          width: 180
        },
        {
          title: '性别',
          key: 'workerSex',
          resizable: true,
          width: 170
        },
        {
          title: '角色',
          key: 'workerRole',
          resizable: true,
          width: 160
        },
        {
          title: '账户',
          key: 'workerAccount',
          resizable: true,
          width: 130
        },
        {
          title: 'Action',
          slot: 'action',
          width: 190,
          align: 'center',
          resizable: true,
        }
      ],
      workerID: '',
      workerList: [],
      workerName: null,
      workerRole: null,
      workerSex: null,
      workerAge: null,
      workerAccount: '',
      workerPassword: ''
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    logto(){
      this.$router.push({path: '/'})
    },
    addWorker(index) {
      axios.get('http://chongyouyun.free.vipnps.vip/addWorker',
        {
          params: {
            'workerName': this.workerName,
            'workerRole': this.workerRole,
            'workerSex': this.workerSex,
            'workerAge': this.workerAge,
            'workerAccount': this.workerAccount,
            'workerPassword': this.workerPassword
          }
        })
        .then((res) => {
          this.$Message.success('添加成功')
          this.getAll()
        })
        .catch((err) => {
          this.$Message.error('添加失败')
        })
    },
    getAll() {
      axios.get('http://chongyouyun.free.vipnps.vip/getAllWorkers')
        .then((res) => {
          this.workerList = res.data
        })
    },
    writeWorker(index) {
      axios.get('http://chongyouyun.free.vipnps.vip/updateWorker',{params:{
        'workerName':this.workerName,
          'workerAge':this.workerAge,
          'workerRole':this.workerRole,
          'workerSex':this.workerSex,
          'workerID':this.workerList[index].workerID,
          'workerAccount':this.workerList[index].workerAccount
        }})
      .then((res)=>{
        this.getAll()
        this.$Message.success('修改成功')
      })
      .catch((err)=>{
        this.$Message.error('修改失败')
      })
    },
    remove(index) {
      axios.get('http://chongyouyun.free.vipnps.vip/deleteWorker',
        {
          params: {
            'workerID': this.workerList[index].workerID,
            'workerRole': this.workerList[index].workerRole
          }
        }).then((res) => {
        this.workerList.splice(index, 1);
      })
        .catch((err) => {
          alert(err)
        })
    }
  }
}
</script>

<style scoped>
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
