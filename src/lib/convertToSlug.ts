const convertToSlug = (text: string) => {
  const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, '_')
    .replace(/[\s\W-]+/g, '_')
}

export default convertToSlug
