<template>
    <div class="my-textarea">
      <div class="my-textarea-wrapper">
        <textarea
          ref="textarea"
          v-bind="$attrs"
          v-model="inputValue"
          @keydown.enter.ctrl.prevent
          @keyup.enter="sendInputValue"
          @input="inputChange"
        ></textarea>
        <button class="my-textarea-send-btn" @click="sendInputValue">
          Send
        </button>
        <slot name="send"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TextAreaInput",
    props: {
      value: String,
    },
    data() {
      return {
        inputValue: this.value,
      };
    },
    mounted() {
      this.setInputHeight();
    },
    methods: {
      setInputHeight() {
        this.$refs.textarea.style.height = "34px";
      },
      inputChange(event) {
        this.inputValue = event.target.value;
        this.$nextTick(() => {
          this.$refs.textarea.style.height = "auto";
          this.$refs.textarea.style.height = `${this.$refs.textarea.scrollHeight}px`;
        });
      },
      sendInputValue() {
        this.$emit("input", this.inputValue);
        this.$emit("send", this.inputValue);
      },
    },
    watch: {
      value(newValue) {
        this.inputValue = newValue;
      },
    },
  };
  </script>
  
  <style scoped>
  .my-textarea {
    width: 100%;
    margin-bottom: 8px;
  }
  
  .my-textarea-wrapper {
    position: relative;
  }
  
  textarea {
    resize: none;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    line-height: 1.5;
    outline: none;
    margin-bottom: 0;
    height: auto;
    max-height: 200px;
    overflow-y: hidden;
  }
  
  .my-textarea-send-btn {
    border: none;
    background-color: #007aff;
    color: #fff;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    position: absolute;
    right: 8px;
    bottom: 5px;
  }
  </style>
  