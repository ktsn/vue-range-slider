// @flow

export function relativeMouseOffset (event: MouseEvent, base: HTMLElement): { left: number, top: number } {
  const bounds = base.getBoundingClientRect()
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
