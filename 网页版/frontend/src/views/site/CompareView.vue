<template>
  <div class="shell page">
    <div class="panel content">
      <h1>营地对比</h1>
      <table>
        <thead>
          <tr>
            <th>字段</th>
            <th>湖风松坡营地</th>
            <th>太湖栈桥营地</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>价格</td><td>¥198 - ¥398</td><td>¥168 - ¥298</td></tr>
          <tr><td>可过夜</td><td>是</td><td>是</td></tr>
          <tr><td>卫生间</td><td>有</td><td>有</td></tr>
          <tr><td>亲子友好</td><td>是</td><td>是</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.content { padding: 28px; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; border-bottom: 1px solid var(--line); text-align: left; }
</style>
