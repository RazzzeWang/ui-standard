<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-09 16:19:30
 * @Function: Please Input Function
-->
<script>
export default {
  data() {
    return {
      downloading: false,
    };
  },
  methods: {
    shortcut(e) {
      if (e.keyCode === 90 && (e.ctrlKey || e.metaKey)) {
        if (e.shiftKey) {
          this.redo();
        } else {
          this.undo();
        }
      }
    },
    enableShortcut() {
      document.addEventListener("keydown", this.shortcut);
    },
    disableShortcut() {
      document.removeEventListener("keydown", this.shortcut);
    },
  },
};
</script>
