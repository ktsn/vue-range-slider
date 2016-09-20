// @flow

export function touch (data: Object, path: string[]): void {
  path.reduce((value, key) => {
    return value[key] || (value[key] = {})
  }, data)
}

export function mergeOnHooks (vnode: any, hooks: any): void {
  touch(vnode, ['data', 'on'])
  const onData: { on: { [key: string]: Function }} = vnode.data.on

  Object.keys(hooks).forEach(key => {
    if (!onData[key]) {
      onData[key] = hooks[key]
    } else {
      onData[key] = [onData[key], hooks[key]]
    }
  })
}

export function relativeMouseOffset (event: MouseEvent): { left: number, top: number } {
  const el: HTMLElement = (event.currentTarget: any)
  const bounds = el.getBoundingClientRect()
  return {
    left: event.clientX - bounds.left,
    top: event.clientY - bounds.top
  }
}

export function round (value: number, min: number, max: number, step: number): number {
  const v = Math.max(min, Math.min(max, value))
  const normalize = (v - min) / step
  const decimal = Math.floor(normalize)
  const fraction = normalize - decimal

  if (fraction === 0) return v

  if (fraction < 0.5) {
    return step * decimal + min
  } else {
    return step * (decimal + 1) + min
  }
}
