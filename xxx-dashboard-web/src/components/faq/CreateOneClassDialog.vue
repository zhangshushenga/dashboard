<template>
    <div >
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
  <el-table :data="gridData">
    <el-table-column property="date" label="日期" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table>
</el-dialog>

    </div>

</template>

<script>
    export default{
        name: 'CreateOneClassDialog',
        data(){
            return{

            };
        },
        method:{

        },

    }
</script>

<style>

</style>