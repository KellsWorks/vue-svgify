const replaceFillWithColorProp = (svgContent) => {
  return svgContent.replace(/fill="[^"]*"/g, ':fill="color"');
};

module.exports = (svgContent, svgName) => `
<template>
<div>
  <svg :width="width" :height="height" viewBox="0 0 48 48" :fill="color" xmlns="http://www.w3.org/2000/svg">
    ${replaceFillWithColorProp(svgContent)}
  </svg>
</div>
</template>

<script lang="ts">
export default {
name: '${svgName.toLowerCase()}_icon',
props: {
  color: {
    required: false,
    type: String,
    default: '#333333'
  },
  height: {
    required: false,
    type: Number,
    default: 48
  },
  width: {
    required: false,
    type: Number,
    default: 48
  }
}
}
</script>
`;
