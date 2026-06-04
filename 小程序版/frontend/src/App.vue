<script setup lang="ts">
import { onLaunch } from "@dcloudio/uni-app";

onLaunch(() => {
  uni.setNavigationBarTitle({
    title: "露之营",
  });
});
</script>

<style>
page {
  background: #f4f1e8;
  color: #24352d;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}
</style>
