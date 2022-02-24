const formatters = (decCount=2) => {

  const money = (value) => {
    const parsedValue = `${parseFloat(value)}`
    const decPos = parsedValue.indexOf('.')
    const beforeDec = parsedValue.substring(0, decPos > -1 ? decPos : parsedValue.length)
    const afterDec = decPos > -1 ? parsedValue.substring(decPos+1, parsedValue.length).substring(0, decCount) : ''.padEnd(decCount, '0')
    const revBeforeDec = beforeDec.split('').reverse().join('')
    let ret = ''
    for (let i = 0; i < Math.ceil(revBeforeDec.length / 3); i++) {
      ret += `${revBeforeDec.substring(3*i, 3*(i+1))}`
      if (i+1 < revBeforeDec.length / 3) ret += ','
    }
    ret = `\$${ret.split('').reverse().join('')}${decCount > 0 ? '.' + afterDec : ''}`
    return ret
  }

  const percent = (value) => {
    const parsedValue = `${parseFloat(value)}`
    const decPos = parsedValue.indexOf('.')
    const beforeDec = parsedValue.substring(0, decPos > -1 ? decPos : parsedValue.length)
    const afterDec = decPos > -1 ? parsedValue.substring(decPos+1, parsedValue.length).substring(0, decCount) : ''.padEnd(decCount, '0')
    if (parsedValue > 1) {
      return `${beforeDec}${decCount > 0 ? '.' + afterDec : ''}%`
    } else {
      return `${(afterDec * 100).toFixed(decCount)}`
    }
  }

  const remove = (value, toRemove) => {
    const re = new RegExp(`[${toRemove}]+`, 'g')
    return value.replaceAll(re, '')
  }

  return { money, percent, remove }
}

function annualizedRate(r, n, ny) {
  return (Math.pow(1+r/ny, n*ny)-1)
}
function faceValue(n, ny, p, rc, rm) {
  const a = annualizedRate(rm, n, ny)
  return p / (a+1) * (1+ (rc/rm)*a)
}
function removeAndShift(val, toRemove='', toShift=100) {
  const re = new RegExp(`[${toRemove}]+`, 'g')
  return parseFloat(val.replaceAll(re, ''))/toShift
}
function calculate() {
  const { money, remove } = formatters()
  const n = document.getElementById('n').value
  const ny = document.getElementById('ny').value
  const p = parseFloat(remove(document.getElementById('p').value, '$,'))
  const rc = parseFloat(remove(document.getElementById('rc').value, '%')) / 100
  const rm = parseFloat(remove(document.getElementById('rm').value, '%')) / 100
  const fv = faceValue(n, ny, p, rc, rm)
  document.getElementById('out').innerText = `The face value of this bond is ${money(fv)}`
}
calculate()

const years = document.getElementById('n')
const nper = document.getElementById('ny')
const principal = document.getElementById('p')
const couponRate = document.getElementById('rc')
const marketRate = document.getElementById('rm')

// format percents to x.xx% when the field is deselected
function percentFormatter(rate) {
  const { percent } = formatters(2)
  return (e) => {
    rate.value = percent(rate.value)
  }
}
couponRate.addEventListener('blur', percentFormatter(couponRate))
marketRate.addEventListener('blur', percentFormatter(marketRate))

// remove the % when the field is selected so the user can edit it easier
function removeValues(withValue, toRemove) {
  const { remove } = formatters()
  return () => {withValue.value = remove(withValue.value, toRemove)}
}
couponRate.addEventListener('focus', removeValues(couponRate, '%'))
marketRate.addEventListener('focus', removeValues(marketRate, '%'))

// format monetary values on blur
function moneyFormatter(dolla) {
  const { money } = formatters(0)
  return (e) => {
    dolla.value = money(dolla.value)
  }
}
principal.addEventListener('blur', moneyFormatter(principal))

// remove additional characters on focus
principal.addEventListener('focus', removeValues(principal, '$,'))

// recalculate bond face value whenever a value changes
years.addEventListener('blur', calculate)
nper.addEventListener('blur', calculate)
principal.addEventListener('blur', calculate)
couponRate.addEventListener('blur', calculate)
marketRate.addEventListener('blur', calculate)