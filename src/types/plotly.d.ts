declare module "react-plotly.js" {
  import { Component } from "react"
  
  export interface PlotParams {
    data: any[]
    layout?: any
    config?: any
    frames?: any[]
    onInitialized?: (figure: any, graphDiv: HTMLElement) => void
    onUpdate?: (figure: any, graphDiv: HTMLElement) => void
    onPurge?: (figure: any, graphDiv: HTMLElement) => void
    onError?: (err: any) => void
    style?: React.CSSProperties
    className?: string
    useResizeHandler?: boolean
    debug?: boolean
    revision?: number
  }

  export default class Plot extends Component<PlotParams> {}
}

declare module "plotly.js-dist" {
  const Plotly: any
  export default Plotly
}
