<template>
  <Row>
    <Col span="18">
      <div>
        <Table height="584px" :columns="columns15" :data="drugsList" border show-summary :summary-method="handleSummary"></Table>
      </div>
    </Col>
    <Col span="6">
      <card style="height: 630px">
        <h2 slot="title">操作面板</h2>
        <Input style="width: 280px;padding-right: 20px" placeholder="输入关键字" v-model="medicineName"></Input>
        <Button type="info" @click="search">查询</Button>
        <Divider></Divider>
        <Form>
          <FormItem label="病人名称">
            <label>
              <Input v-model="patientName" placeholder="patientName..."></Input>
            </label>
          </FormItem>
          <FormItem label="药品名称">
            <label>
              <Input v-model="medicineName" placeholder="medicineName..."></Input>
            </label>
          </FormItem>
          <FormItem label="药品数量">
            <Input v-model="outcount" placeholder="outCount..."></Input>
          </FormItem>
          <Button style="float: right;margin-top: 120px" size="large" type="success" @click="add">添加</Button>
          <Button style="float: right;margin-top: 120px;margin-right: 30px" size="large" type="error" @click="router">入库管理</Button>
        </Form>
      </card>
    </Col>
  </Row>
</template>

<script>
import axios from "axios";

export default {
  name: "outdrugs",
  data() {
    return {
      columns15: [
        {
          title: '病人编号',
          key: 'patientID',
          sortable: true,
          width: 120
        },
        {
          title: '病人名称',
          key: 'patientName'
        },
        {
          title: '药品名称',
          key: 'medicineName'
        },
        {
          title: '药品单价',
          key: 'medicinePrice',
          width: 130
        },
        {
          title: '出库数量',
          key: 'outcount',
          width:120,
          sortable: true
        },
        {
          title: '出库时间',
          key: 'outtime',
          sortable: true
        },
        {
          title: '总价',
          key: 'totalMoney',
          sortable: true,
          width: 140
        },
      ],
      drugsList: [],
      medicineName: null,
      patientName: null,
      medicinePrice: null,
      outcount: '',
      patientID: '',
      totalMoney: '',
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh(){
      axios.get('http://chongyouyun.free.vipnps.vip/getAllOutRecord')
        .then((res) => {
          this.drugsList = res.data
          this.$Message.success('刷新成功')
        })
        .catch((err)=>{
          this.$Message.error('刷新失败')
        })
    },
    router(){
      this.$router.push('drugs')
    },
    handleSummary({columns, data}) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: '总价'
          };
          return;
        }
        const values = data.map(item => Number(item[key]));
        if (!values.every(value => isNaN(value))) {
          const v = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[key] = {
            key,
            value: v
          };
        } else {
          sums[key] = {
            key,
            value: 'N/A'
          };
        }
      });

      return sums;
    },
    search() {
      axios.get('http://chongyouyun.free.vipnps.vip/getOutRecordByName', {
        params: {
          'patientName': this.patientName
        }
      })
        .then((res) => {
          this.drugsList = res.data
        })
        .catch((res) => {
          this.$Message.error('查无此物')
        })
    },
    add() {
      axios.get('http://chongyouyun.free.vipnps.vip/addOutRecord', {
        params: {
          'patientName': this.patientName,
          'medicineName': this.medicineName,
          'outcount':this.outcount
        }
      })
        .then((res) => {
          this.drugsList = res.data
          this.refresh()
          this.$Message.success('添加成功')
        })
        .catch((res) => {
          this.$Message.error('添加失败')
        })
    }
  }
}
</script>

<style scoped>

</style>
