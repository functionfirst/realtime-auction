import styles from "@/lib/styles";

function getPaletteClasses(selectors) {
  const css = selectors.map(item => {
    if (styles[item]) {
      return styles[item]
    }
  })
  return css.join(' ').split(' ');
}

function definedInPalette(classList) {
  return classList.value.split(' ').filter(item => styles[item]);
}

const Palette = {
  install(Vue) {
    Vue.directive('palette', {
      bind(el) {
        const classList = el.classList;

        const paletteClasses = definedInPalette(classList);
        classList.remove(...paletteClasses);

        const computedClasses = getPaletteClasses(paletteClasses);
        classList.add(...computedClasses);

      }
    })
  }
}

export default Palette

