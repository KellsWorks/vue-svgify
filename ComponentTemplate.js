module.exports = (svgContent, svgName) => `
<template>
  <div>
    <svg :fillColor="color">
    ${svgContent}
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
    }
  }
}
</script>
`;
