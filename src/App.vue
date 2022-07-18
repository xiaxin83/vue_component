<template>
  <el-button type="danger" size="mini" @click="visible = true" plain>
    拒绝
    <el-dialog
      title="请填写拒绝理由"
      :visible.sync="visible"
      @closed="resetFields"
      append-to-body
    >
      <el-form :model="model" :rules="rules" ref="reasonForm">
        <el-form-item prop="msg">
          <el-input type="textarea" v-model="model.msg"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitReason" :loading="loading">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </el-button>
</template>

<script>
export default {
    props: {
    info: {
      type: String,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
      visible: false,
      model: {
        msg: "",
      },
      rules: {
        msg: [{ required: true, message: "请输入拒绝理由", trigger: "blur" }],
      },
    };
  },
  methods: {
    resetFields() {
      this.$refs.reasonForm.resetFields;
    },
    async onSubmitReason() {
      if (this.loading) return;
      const valid = await this.$refs.reasonForm.validate().catch(() => null);
      if (!valid) return;
      await this.$confirm("确定要拒绝审核吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      this.loading = true;
      await this.apiReason();
      this.loading = false;
      this.visible = false;
    },
    apiReason() {
      const value ="id为"+this.info+ "的拒绝理由是："+ this.model.msg;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(value);
          console.log(value);
        }, 2000);
      });
    },
  },
};
</script>
