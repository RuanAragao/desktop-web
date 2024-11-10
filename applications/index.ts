import type { Application } from '../types'

import about from './about/settings'
import curriculum from './curriculum/settings'

export default function Applications() {
  return [about, curriculum] as Application[]
}
