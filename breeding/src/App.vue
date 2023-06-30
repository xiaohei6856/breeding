<template>
<div>
  <router-view/>
</div>
</template>

<style>
:root{
  --td-backround-card-color: rgba(255, 255, 255, 0.6);
}
:root[theme-mode="dark"]{
  --td-backround-card-color: rgba(1, 1, 1, 0.6);
}
::-webkit-scrollbar {
  /*整体样式*/
  width: 6px; 
  height: 9px;
}
::-webkit-scrollbar-track {
  /*轨道*/
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  box-shadow: inset 0 0 5px var(--td-table-shadow-color);
  /* background: #ededed; */
  /* background: #333; */
  background: var(--td-scrollbar-hover-color);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  /*滚动条小方块*/
  border-radius: 10px;
  /* background-color: #2e75d3; */
  /* background-color: #888; */
  background-color: var(--td-scroll-track-color);
  background-image: -webkit-linear-gradient(
    45deg,
    var(--td-border-level-1-color) 25%,
    transparent 25%,
    transparent 50%,
    var(--td-border-level-1-color) 50%,
    var(--td-border-level-1-color) 75%,
    transparent 75%,
    transparent
  );
}
</style>