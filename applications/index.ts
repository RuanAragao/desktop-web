import type { Application } from '../types'

import about from './about/settings'
// import xterm from './xterm/settings'

export default function Applications() {
  return [about] as Application[]
}
