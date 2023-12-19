const generateSortFn = (props: any) => {
    return function (a: { [x: string]: number }, b: { [x: string]: number }) {
        for (var i = 0; i < props.length; i++) {
          var prop = props[i]
          var name = prop.name
          var reverse = prop.reverse
          if (a[name] < b[name]) return reverse ? 1 : -1
          if (a[name] > b[name]) return reverse ? -1 : 1
        }
        return 0
      }
  }
  
  export default generateSortFn